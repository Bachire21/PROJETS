// Migration des données locales vers Supabase (Vercel).
// 1. Charge les variables depuis .env.local (ou l'environnement).
// 2. Crée le bucket public `uploads` si absent.
// 3. Uploade les images de public/uploads/.
// 4. Écrit chaque contenu de content/*.json dans la table `documents`,
//    en réécrivant les URLs /uploads/... vers les URLs publiques.
//
// Usage :  node scripts/migrate-to-supabase.mjs
// Prérequis : SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY définis.

import { createClient } from "@supabase/supabase-js";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function loadEnv() {
  const envPath = path.join(root, ".env.local");
  try {
    const raw = await fs.readFile(envPath, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (match && !(match[1] in process.env)) {
        process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    // pas de .env.local : on utilise l'environnement
  }
}

await loadEnv();

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Erreur : SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont requis.");
  process.exit(1);
}

const bucket = process.env.SUPABASE_BUCKET ?? "uploads";
const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function ensureBucket() {
  const { data: existing, error } = await supabase.storage.getBucket(bucket);
  if (error && error.message.includes("not found")) {
    const { error: createError } = await supabase.storage.createBucket(bucket, {
      public: true,
    });
    if (createError) throw createError;
    console.log(`Bucket "${bucket}" créé (public).`);
  } else if (!existing) {
    throw error;
  } else {
    console.log(`Bucket "${bucket}" déjà présent.`);
  }
}

async function uploadLocalFiles() {
  const dir = path.join(root, "public", "uploads");
  const mapping = new Map();
  let files;
  try {
    files = await fs.readdir(dir);
  } catch {
    console.log("Aucune image locale à migrer.");
    return mapping;
  }
  for (const name of files) {
    const buffer = await fs.readFile(path.join(dir, name));
    const { error } = await supabase.storage.from(bucket).upload(name, buffer, {
      upsert: true,
    });
    if (error) {
      console.warn(`Échec upload ${name} : ${error.message}`);
      continue;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(name);
    mapping.set(`/uploads/${name}`, data.publicUrl);
    console.log(`Image migrée : ${name}`);
  }
  return mapping;
}

async function migrateDocuments() {
  const dir = path.join(root, "content");
  let files;
  try {
    files = (await fs.readdir(dir)).filter((f) => f.endsWith(".json"));
  } catch {
    console.error("Aucun dossier content/.");
    return;
  }
  for (const file of files) {
    const key = file.replace(/\.json$/, "");
    const raw = await fs.readFile(path.join(dir, file), "utf8");
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      console.warn(`Fichier ignoré (JSON invalide) : ${file}`);
      continue;
    }
    const { error } = await supabase
      .from("documents")
      .upsert({ key, data, updated_at: new Date().toISOString() }, { onConflict: "key" });
    if (error) {
      console.warn(`Échec document ${key} : ${error.message}`);
      continue;
    }
    console.log(`Document migré : ${key}`);
  }
}

async function main() {
  await ensureBucket();
  const mapping = await uploadLocalFiles();
  if (mapping.size > 0) {
    const dir = path.join(root, "content");
    const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const filePath = path.join(dir, file);
      const raw = await fs.readFile(filePath, "utf8");
      const rewritten = raw.replace(/\/uploads\/[A-Za-z0-9._-]+/g, (match) => {
        return mapping.get(match) ?? match;
      });
      if (rewritten !== raw) {
        await fs.writeFile(filePath, rewritten, "utf8");
        console.log(`URLs réécrites dans ${file}`);
      }
    }
  }
  await migrateDocuments();
  console.log("Migration terminée.");
}

main().catch((error) => {
  console.error("Échec de la migration :", error);
  process.exit(1);
});
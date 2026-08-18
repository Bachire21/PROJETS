import { promises as fs } from "fs";
import path from "path";
import type { StorageProvider, UploadedObject } from "./types";

const contentDir = path.join(process.cwd(), "content");
const uploadsDir = path.join(process.cwd(), "public", "uploads");

// Stockage local par fichiers : comportement historique, utilisé en
// développement et sur un serveur classique (VPS). Sur Vercel, utiliser
// le provider Supabase : le filesystem y est éphémère.
export const fileProvider: StorageProvider = {
  async readDocument(key: string): Promise<string | null> {
    const start = Date.now();
    try {
      const raw = await fs.readFile(path.join(contentDir, `${key}.json`), "utf8");
      console.log(`[DEBUG] file readDocument "${key}" -> ${raw.length} bytes in ${Date.now() - start}ms`);
      return raw;
    } catch {
      console.log(`[DEBUG] file readDocument "${key}" -> file not found in ${Date.now() - start}ms`);
      return null;
    }
  },

  async writeDocument(key: string, json: string): Promise<void> {
    const start = Date.now();
    await fs.mkdir(contentDir, { recursive: true });
    await fs.writeFile(path.join(contentDir, `${key}.json`), json, "utf8");
    console.log(`[DEBUG] file writeDocument "${key}" -> ${json.length} bytes in ${Date.now() - start}ms`);
  },

  async uploadObject(
    fileName: string,
    buffer: Buffer,
  ): Promise<UploadedObject> {
    const start = Date.now();
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(path.join(uploadsDir, fileName), buffer);
    console.log(`[DEBUG] file uploadObject "${fileName}" -> ${buffer.length} bytes in ${Date.now() - start}ms`);
    return { url: `/uploads/${fileName}`, size: buffer.length };
  },

  async deleteObject(url: string): Promise<void> {
    if (!url.startsWith("/uploads/")) return;
    const fileName = path.basename(url);
    const start = Date.now();
    await fs.unlink(path.join(uploadsDir, fileName)).catch((error) => {
      console.log(`[DEBUG] file deleteObject "${fileName}" ERROR: ${(error as Error).message}`);
    });
    console.log(`[DEBUG] file deleteObject "${fileName}" in ${Date.now() - start}ms`);
  },
};
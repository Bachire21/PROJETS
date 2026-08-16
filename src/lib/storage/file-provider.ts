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
    try {
      return await fs.readFile(path.join(contentDir, `${key}.json`), "utf8");
    } catch {
      return null;
    }
  },

  async writeDocument(key: string, json: string): Promise<void> {
    await fs.mkdir(contentDir, { recursive: true });
    await fs.writeFile(path.join(contentDir, `${key}.json`), json, "utf8");
  },

  async uploadObject(
    fileName: string,
    buffer: Buffer,
  ): Promise<UploadedObject> {
    await fs.mkdir(uploadsDir, { recursive: true });
    await fs.writeFile(path.join(uploadsDir, fileName), buffer);
    return { url: `/uploads/${fileName}`, size: buffer.length };
  },

  async deleteObject(url: string): Promise<void> {
    if (!url.startsWith("/uploads/")) return;
    const fileName = path.basename(url);
    await fs.unlink(path.join(uploadsDir, fileName)).catch(() => {});
  },
};
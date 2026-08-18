export type UploadedObject = {
  url: string;
  size: number;
  path: string;
};

export interface StorageProvider {
  readDocument(key: string): Promise<string | null>;
  writeDocument(key: string, json: string): Promise<void>;
  uploadObject(
    fileName: string,
    buffer: Buffer,
    contentType: string,
  ): Promise<UploadedObject>;
  deleteObject(url: string): Promise<void>;
}

export const DOCUMENT_KEYS = {
  logement: "logement-installation",
  faq: "faq",
  temoignages: "temoignages",
  services: "services",
  etudes: "etudes",
  ecoles: "ecoles",
  demandes: "demandes",
  settings: "settings",
  activity: "activity",
  media: "media",
} as const;
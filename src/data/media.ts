export type MediaItem = {
  id: string;
  name: string;
  type: "image" | "document" | "video";
  size: number;
  url: string;
  createdAt: string;
  usage: string[];
  custom: boolean;
  path?: string;
  mimeType?: string;
};

export const seedMediaItems: MediaItem[] = [];
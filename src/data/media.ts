export type MediaItem = {
  id: string;
  name: string;
  type: "image" | "document" | "video";
  size: number;
  url: string;
  createdAt: string;
  usage: string[];
  custom: boolean;
};

export const seedMediaItems: MediaItem[] = [];
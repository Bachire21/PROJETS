import type { MetadataRoute } from "next";
import { siteUrl } from "./layout";

const publicRoutes = [
  "",
  "/etudier-au-maroc",
  "/ecoles-formations",
  "/nos-services",
  "/logement-installation",
  "/temoignages",
  "/faq",
  "/trouver-mon-ecole",
  "/a-propos",
  "/contact",
  "/mentions-legales",
  "/politique-de-confidentialite",
  "/conditions-generales",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Uploads dans la Médiathèque : les Server Actions rejettent par défaut
  // tout body > 1 Mo (E394 « An unexpected response was received from the
  // server. » côté client). La limite est relevée pour couvrir les vidéos
  // (15 Mo max) en laissant la marge de l'encodage multipart ; les fichiers
  // sont plafonnés par type dans uploadMediaAction (images 4 Mo, documents
  // 10 Mo, vidéos 15 Mo — cf. limites plateforme Vercel).
  experimental: {
    serverActions: {
      bodySizeLimit: "22mb",
    },
  },
  images: {
    // SVG autorisé : la médiathèque Admin accepte les SVG (validés par
    // extension/type) et ils sont servis depuis le même domaine ou Supabase.
    dangerouslyAllowSVG: true,
    // SSRF désactivé pour les IP locales : le DNS du réseau renvoie des
    // adresses NAT64 (64:ff9b::/96, RFC 6052) pour *.supabase.co, que le
    // garde SSRF classe à tort comme privées → 400 « url parameter is not
    // allowed » sur /_next/image. Sans danger : remotePatterns limite déjà
    // l'optimisation à **.supabase.co.
    dangerouslyAllowLocalIP: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
    // Wildcard **.supabase.co : indépendant de SUPABASE_URL au moment de
    // l'évaluation de la config (le serveur dev n'a pas besoin d'être
    // redémarré après un changement d'env) et couvre tout projet Supabase.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
};

export default nextConfig;
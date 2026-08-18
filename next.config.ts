import type { NextConfig } from "next";

const supabaseUrl = process.env.SUPABASE_URL;

const nextConfig: NextConfig = {
  // Uploads d'images dans la Médiathèque : les Server Actions rejettent
  // par défaut tout body > 1 Mo (E394 « An unexpected response was
  // received from the server. » côté client). La limite est relevée et
  // les fichiers sont plafonnés à 4 Mo dans uploadMediaAction (marge
  // laissée pour l'encodage multipart, cf. limites plateforme Vercel).
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  images: {
    // SVG autorisé : la médiathèque Admin accepte les SVG (validés par
    // extension/type) et ils sont servis depuis le même domaine ou Supabase.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: supabaseUrl
      ? [
          {
            protocol: "https",
            hostname: new URL(supabaseUrl).hostname,
          },
        ]
      : [],
  },
};

export default nextConfig;
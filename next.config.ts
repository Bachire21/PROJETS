import type { NextConfig } from "next";

const supabaseUrl = process.env.SUPABASE_URL;

const nextConfig: NextConfig = {
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
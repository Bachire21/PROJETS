// Génère les identifiants d'un compte admin Campus Way (sel + hash scrypt
// d'un code d'accès). À utiliser avec le format multi-admin CW_ADMINS :
//
//   node scripts/generate-admin-credentials.mjs "email@exemple.com" "mon-code"
//
// Copie ensuite la ligne JSON affichée dans la variable CW_ADMINS de
// .env.local (voir .env.example), puis redémarre le serveur.

import crypto from "node:crypto";

const [, , email, code] = process.argv;

if (!email || !code) {
  console.error(
    "Usage : node scripts/generate-admin-credentials.mjs \"email@exemple.com\" \"mon-code\"",
  );
  process.exit(1);
}

if (code.length < 8) {
  console.error("Le code d'accès doit contenir au moins 8 caractères.");
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.scryptSync(code, salt, 64).toString("hex");

console.log(
  `Identifiants pour "${email}" — à ajouter dans CW_ADMINS (.env.local) :`,
);
console.log("");
console.log(
  JSON.stringify({ email: email.trim(), codeSalt: salt, codeHash: hash }),
);
console.log("");
console.log("Exemple complet de variable (en une seule ligne) :");
console.log("");
console.log(
  `CW_ADMINS=[{"email":"${email.trim()}","codeSalt":"${salt}","codeHash":"${hash}"}]`,
);
console.log("");
console.log("Ne jamais commiter .env.local ni ces valeurs.");
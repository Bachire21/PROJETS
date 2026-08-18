import type { Metadata } from "next";
import { Hero } from "@/components/contact/Hero";
import { ContactMethods } from "@/components/contact/ContactMethods";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description:
    "Contacte Campus Way à Casablanca : WhatsApp au +33 7 53 19 24 25, email campusway458@gmail.com ou téléphone au +212 7 70 73 75 68 / +212 7 12 52 43 11.",
};

export default function ContactPage() {
  console.log("[DEBUG] render page: /contact");
  return (
    <>
      <Hero />
      <ContactMethods />
      <ContactForm />
    </>
  );
}
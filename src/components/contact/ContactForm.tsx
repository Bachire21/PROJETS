"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppIcon, ArrowRightIcon, UserIcon } from "@/components/icons";
import { contactPage } from "@/data/contact";

export function ContactForm() {
  const { form } = contactPage;
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = `Bonjour Campus Way, je suis ${name.trim() || "un étudiant"}. ${message.trim()}`;
    const url = `https://wa.me/33753192425?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative overflow-hidden bg-cream py-20 sm:py-28">
      <div
        className="pointer-events-none absolute -top-32 left-[-10%] h-96 w-96 rounded-full bg-magenta-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[-30%] right-[-10%] h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative">
        <Reveal>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-white ring-1 ring-navy-100">
            <div className="px-8 py-12 sm:px-14 sm:py-16">
              <p className="flex items-center gap-2.5 text-label uppercase tracking-[0.16em] text-magenta-500">
                <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
                {form.eyebrow}
              </p>
              <h2 className="mt-5 text-h2 text-navy-900 sm:text-h2-lg">
                {form.title}
              </h2>
              <p className="mt-4 max-w-xl text-lead text-navy-700/75">
                {form.description}
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-secondary font-bold text-navy-900"
                  >
                    {form.nameLabel}
                  </label>
                  <div className="relative">
                    <UserIcon className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-navy-900/40" />
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={form.namePlaceholder}
                      className="w-full rounded-2xl border border-navy-200 bg-white py-3.5 pr-4 pl-12 text-body text-navy-900 placeholder:text-navy-900/40 focus:border-magenta-500 focus:outline-none focus:ring-2 focus:ring-magenta-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-secondary font-bold text-navy-900"
                  >
                    {form.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={form.messagePlaceholder}
                    className="w-full resize-none rounded-2xl border border-navy-200 bg-white px-4 py-3.5 text-body text-navy-900 placeholder:text-navy-900/40 focus:border-magenta-500 focus:outline-none focus:ring-2 focus:ring-magenta-500/20"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-7 text-button-lg font-semibold tracking-tight text-white uppercase shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-whatsapp-dark hover:shadow-md active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {form.submitLabel}
                  <ArrowRightIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
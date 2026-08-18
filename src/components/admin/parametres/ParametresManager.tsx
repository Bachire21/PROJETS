"use client";

import { useEffect, useState } from "react";
import type { SiteSettings } from "@/data/settings";
import { saveSettingsContentAction } from "@/app/admin/parametres/actions";
import { AdminPageHeader } from "@/components/admin/ui/PageHeader";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";
import { Toast, type ToastData } from "@/components/admin/ui/Toast";
import { Field, TextArea, TextInput } from "@/components/admin/ui/fields";
import {
  ArrowRightIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/icons";

export function ParametresManager({
  initialContent,
}: {
  initialContent: SiteSettings;
}) {
  const [content, setContent] = useState<SiteSettings>(initialContent);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [toast, setToast] = useState<ToastData>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const patch = (patch: Partial<SiteSettings>) => {
    setContent((current) => ({ ...current, ...patch }));
    setDirty(true);
  };

  const save = async () => {
    if (!content.name.trim()) {
      setToast({ kind: "error", message: "Le nom du site est obligatoire." });
      return;
    }
    setSaving(true);
    try {
      const result = await saveSettingsContentAction(content);
      if (result.ok) {
        setDirty(false);
        setToast({
          kind: "success",
          message: "Paramètres enregistrés. Ils alimenteront le site public.",
        });
      } else {
        setToast({
          kind: "error",
          message: result.message ?? "L'enregistrement a échoué.",
        });
      }
    } catch (error) {
      console.error("save : la Server Action a rejeté la requête.", error);
      setToast({
        kind: "error",
        message:
          "L'enregistrement n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader
        title="Paramètres"
        description="Informations générales du site, destinées à alimenter le Header et le Footer publics"
        destination="/"
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setResetting(true)}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-navy-300 bg-white px-6 text-admin-button text-navy-900 transition-colors hover:border-red-500 hover:text-red-600"
            >
              Réinitialiser
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving || !dirty}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-magenta-500 px-6 text-admin-button text-white transition-all hover:bg-magenta-600 disabled:opacity-40"
            >
              <ArrowRightIcon className="h-4.5 w-4.5" />
              {saving ? "Enregistrement…" : dirty ? "Enregistrer" : "Enregistré"}
            </button>
          </div>
        }
      />

      {dirty ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-xs font-bold text-orange-600">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          Modifications non enregistrées
        </p>
      ) : null}

      <div className="mt-8 space-y-5">
        <section className="rounded-3xl bg-white p-7 ring-1 ring-navy-100">
          <h2 className="text-admin-section font-bold text-navy-900">
            Identité du site
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Nom du site">
              <TextInput
                value={content.name}
                onChange={(value) => patch({ name: value })}
              />
            </Field>
            <Field label="Slogan">
              <TextInput
                value={content.tagline}
                onChange={(value) => patch({ tagline: value })}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description">
                <TextArea
                  value={content.description}
                  rows={3}
                  onChange={(value) => patch({ description: value })}
                />
              </Field>
            </div>
            <Field label="Ville">
              <TextInput
                value={content.city}
                onChange={(value) => patch({ city: value })}
              />
            </Field>
            <Field label="Adresse">
              <TextInput
                value={content.address}
                onChange={(value) => patch({ address: value })}
              />
            </Field>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-7 ring-1 ring-navy-100">
          <h2 className="text-admin-section font-bold text-navy-900">
            Contact
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Email">
              <TextInput
                value={content.email}
                onChange={(value) => patch({ email: value })}
              />
            </Field>
            <Field label="Lien WhatsApp">
              <TextInput
                value={content.whatsappUrl}
                onChange={(value) => patch({ whatsappUrl: value })}
                placeholder="https://wa.me/..."
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                label="Téléphones"
                hint="Un numéro par ligne"
              >
                <TextArea
                  value={content.phoneNumbers.join("\n")}
                  rows={3}
                  onChange={(value) =>
                    patch({
                      phoneNumbers: value
                        .split("\n")
                        .map((phone) => phone.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Field>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-7 ring-1 ring-navy-100">
          <h2 className="text-admin-section font-bold text-navy-900">
            Réseaux sociaux
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <Field label="Instagram">
              <TextInput
                value={content.socials.instagram}
                onChange={(value) =>
                  patch({ socials: { ...content.socials, instagram: value } })
                }
                placeholder="https://instagram.com/..."
              />
            </Field>
            <Field label="TikTok">
              <TextInput
                value={content.socials.tiktok}
                onChange={(value) =>
                  patch({ socials: { ...content.socials, tiktok: value } })
                }
                placeholder="https://tiktok.com/@..."
              />
            </Field>
            <Field label="LinkedIn">
              <TextInput
                value={content.socials.linkedin}
                onChange={(value) =>
                  patch({ socials: { ...content.socials, linkedin: value } })
                }
                placeholder="https://linkedin.com/company/..."
              />
            </Field>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-7 ring-1 ring-navy-100">
          <h2 className="text-admin-section font-bold text-navy-900">
            Footer
          </h2>
          <div className="mt-6 grid gap-5">
            <Field label="Informations du Footer">
              <TextArea
                value={content.footerInfo}
                rows={3}
                onChange={(value) => patch({ footerInfo: value })}
              />
            </Field>
            <div>
              <p className="text-admin-label uppercase tracking-[0.12em] text-navy-600">
                Liens légaux
              </p>
              <div className="mt-3 space-y-3">
                {content.legalLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex flex-wrap items-center gap-3 rounded-2xl bg-cream p-3"
                  >
                    <TextInput
                      value={link.label}
                      onChange={(value) =>
                        patch({
                          legalLinks: content.legalLinks.map((item, i) =>
                            i === index ? { ...item, label: value } : item,
                          ),
                        })
                      }
                    />
                    <TextInput
                      value={link.href}
                      onChange={(value) =>
                        patch({
                          legalLinks: content.legalLinks.map((item, i) =>
                            i === index ? { ...item, href: value } : item,
                          ),
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        patch({
                          legalLinks: content.legalLinks.filter(
                            (_, i) => i !== index,
                          ),
                        })
                      }
                      aria-label="Supprimer ce lien"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-navy-600 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  patch({
                    legalLinks: [...content.legalLinks, { label: "", href: "" }],
                  })
                }
                className="mt-3 inline-flex h-10 items-center gap-2 rounded-full border-2 border-dashed border-navy-200 px-5 text-sm font-bold text-navy-700 transition-colors hover:border-magenta-500 hover:text-magenta-600"
              >
                <PlusIcon className="h-4 w-4" />
                Ajouter un lien
              </button>
            </div>
          </div>
        </section>
      </div>

      <ConfirmDialog
        open={resetting}
        title="Réinitialiser les paramètres ?"
        description="Les paramètres reviendront aux valeurs par défaut de Campus Way. Cette action remplace les valeurs enregistrées."
        confirmLabel="Réinitialiser"
        onConfirm={() => {
          setContent(initialContent);
          setDirty(true);
          setResetting(false);
        }}
        onCancel={() => setResetting(false)}
      />

      <Toast toast={toast} />
    </div>
  );
}
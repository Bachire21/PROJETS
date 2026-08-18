"use client";

import { useEffect, useMemo, useState } from "react";
import type { Service, ServicesPageData } from "@/data/services";
import { sortByOrder } from "@/lib/logement-content-utils";
import { saveServicesContentAction } from "@/app/admin/services/actions";
import { actionErrorMessage } from "@/lib/client-action-error";
import { SectionCard } from "@/components/admin/logement/SectionCard";
import { SimpleItemsEditor } from "@/components/admin/etudes/SimpleItemsEditor";
import { ServicesListEditor } from "@/components/admin/services/ServicesListEditor";
import { PreviewModal } from "@/components/admin/services/PreviewModal";
import { PublicDestination } from "@/components/admin/ui/PublicDestination";
import {
  Field,
  ImageField,
  StatusChip,
  TextArea,
  TextInput,
} from "@/components/admin/ui/fields";
import {
  ArrowRightIcon,
  CheckIcon,
  EyeIcon,
  FlagIcon,
  GlobeIcon,
  ListIcon,
  PlusIcon,
  SparkleIcon,
  TrashIcon,
} from "@/components/icons";

type Toast = { kind: "success" | "error"; message: string } | null;

const sectionKeys: { key: PublishableKey; label: string }[] = [
  { key: "hero", label: "Hero" },
  { key: "servicesSection", label: "Nos services" },
  { key: "parcours", label: "Parcours" },
  { key: "immersive", label: "Section immersive" },
  { key: "cta", label: "CTA final" },
];

type PublishableKey =
  | "hero"
  | "servicesSection"
  | "parcours"
  | "immersive"
  | "cta";

export function ServicesManager({
  initialContent,
}: {
  initialContent: ServicesPageData;
}) {
  const [content, setContent] = useState<ServicesPageData>(initialContent);
  const [openSection, setOpenSection] = useState<string>("hero");
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const publishedSections = useMemo(
    () =>
      sectionKeys.filter(({ key }) => content[key].published === true).length,
    [content],
  );

  const patchSection = <K extends keyof ServicesPageData>(
    key: K,
    sectionPatch: Partial<ServicesPageData[K]>,
  ) => {
    setContent((current) => ({
      ...current,
      [key]: { ...current[key], ...sectionPatch },
    }));
    setDirty(true);
  };

  const save = async (contentToSave: ServicesPageData) => {
    setSaving(true);
    try {
      const result = await saveServicesContentAction(contentToSave);
      if (result.ok) {
        setContent(contentToSave);
        setDirty(false);
        setToast({
          kind: "success",
          message: "Contenu enregistré. Il est visible sur /nos-services.",
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
        message: actionErrorMessage(
          error,
          "L'enregistrement n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
        ),
      });
    } finally {
      setSaving(false);
    }
  };

  const publishAll = () => {
    const published: ServicesPageData = {
      ...content,
      hero: { ...content.hero, published: true },
      servicesSection: { ...content.servicesSection, published: true },
      parcours: { ...content.parcours, published: true },
      immersive: { ...content.immersive, published: true },
      cta: { ...content.cta, published: true },
    };
    save(published);
  };

  // ----- services -----

  const addService = () => {
    setContent((current) => {
      const services = sortByOrder(current.servicesSection.services);
      return {
        ...current,
        servicesSection: {
          ...current.servicesSection,
          services: [
            ...services,
            {
              id: crypto.randomUUID(),
              title: "Nouveau service",
              description: "",
              icon: "✨",
              href: "/",
              ctaLabel: "Découvrir",
              image: null,
              order: services.length + 1,
              published: true,
            },
          ],
        },
      };
    });
    setDirty(true);
  };

  const patchService = (id: string, patch: Partial<Service>) => {
    setContent((current) => ({
      ...current,
      servicesSection: {
        ...current.servicesSection,
        services: current.servicesSection.services.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      },
    }));
    setDirty(true);
  };

  const moveService = (index: number, direction: -1 | 1) => {
    setContent((current) => {
      const list = sortByOrder(current.servicesSection.services);
      const target = index + direction;
      if (target < 0 || target >= list.length) return current;
      const next = [...list];
      [next[index], next[target]] = [next[target], next[index]];
      next.forEach((item, i) => {
        item.order = i + 1;
      });
      return {
        ...current,
        servicesSection: { ...current.servicesSection, services: next },
      };
    });
    setDirty(true);
  };

  const deleteService = (id: string) => {
    setContent((current) => ({
      ...current,
      servicesSection: {
        ...current.servicesSection,
        services: current.servicesSection.services.filter(
          (item) => item.id !== id,
        ),
      },
    }));
    setDirty(true);
  };

  const toggleService = (id: string) => {
    setContent((current) => ({
      ...current,
      servicesSection: {
        ...current.servicesSection,
        services: current.servicesSection.services.map((item) =>
          item.id === id ? { ...item, published: !item.published } : item,
        ),
      },
    }));
    setDirty(true);
  };

  // ----- étapes du parcours -----

  const addStep = () => {
    setContent((current) => {
      const steps = sortByOrder(current.parcours.steps);
      return {
        ...current,
        parcours: {
          ...current.parcours,
          steps: [
            ...steps,
            {
              id: crypto.randomUUID(),
              label: "Nouvelle étape",
              order: steps.length + 1,
              published: true,
            },
          ],
        },
      };
    });
    setDirty(true);
  };

  const patchStep = (id: string, patch: { label?: string }) => {
    setContent((current) => ({
      ...current,
      parcours: {
        ...current.parcours,
        steps: current.parcours.steps.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      },
    }));
    setDirty(true);
  };

  const moveStep = (index: number, direction: -1 | 1) => {
    setContent((current) => {
      const list = sortByOrder(current.parcours.steps);
      const target = index + direction;
      if (target < 0 || target >= list.length) return current;
      const next = [...list];
      [next[index], next[target]] = [next[target], next[index]];
      next.forEach((item, i) => {
        item.order = i + 1;
      });
      return { ...current, parcours: { ...current.parcours, steps: next } };
    });
    setDirty(true);
  };

  const deleteStep = (id: string) => {
    setContent((current) => ({
      ...current,
      parcours: {
        ...current.parcours,
        steps: current.parcours.steps.filter((item) => item.id !== id),
      },
    }));
    setDirty(true);
  };

  const toggleStep = (id: string) => {
    setContent((current) => ({
      ...current,
      parcours: {
        ...current.parcours,
        steps: current.parcours.steps.map((item) =>
          item.id === id ? { ...item, published: !item.published } : item,
        ),
      },
    }));
    setDirty(true);
  };

  // ----- points forts (sans statut : toujours visibles) -----

  const patchStrength = (index: number, label: string) => {
    setContent((current) => {
      const strengths = current.strengths.map((item, i) =>
        i === index ? { label } : item,
      );
      return { ...current, strengths };
    });
    setDirty(true);
  };

  const addStrength = () => {
    setContent((current) => ({
      ...current,
      strengths: [...current.strengths, { label: "Nouveau point fort" }],
    }));
    setDirty(true);
  };

  const deleteStrength = (index: number) => {
    setContent((current) => ({
      ...current,
      strengths: current.strengths.filter((_, i) => i !== index),
    }));
    setDirty(true);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-admin-title tracking-tight text-navy-900">
              Parcours &amp; services
            </h1>
            <StatusChip published={publishedSections === sectionKeys.length} />
          </div>
          <p className="mt-2 max-w-2xl text-admin-body leading-relaxed text-navy-700/70">
            Gérez les services et les étapes d&apos;accompagnement qui
            apparaissent sur la page publique /nos-services. Les services sont
            numérotés automatiquement selon leur ordre : ajoute un 6e service
            et il apparaît directement sur le site public une fois publié.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-navy-300 bg-white px-6 text-admin-button text-navy-900 transition-colors hover:border-navy-900"
          >
            <EyeIcon className="h-4.5 w-4.5" />
            Aperçu
          </button>
          <button
            type="button"
            onClick={publishAll}
            disabled={saving}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-navy-900 px-6 text-admin-button text-white transition-colors hover:bg-navy-700 disabled:opacity-60"
          >
            Publier tout
          </button>
          <button
            type="button"
            onClick={() => save(content)}
            disabled={saving || !dirty}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-magenta-500 px-6 text-admin-button text-white transition-all hover:bg-magenta-600 disabled:opacity-40"
          >
            <ArrowRightIcon className="h-4.5 w-4.5" />
            {saving ? "Enregistrement…" : dirty ? "Enregistrer" : "Enregistré"}
          </button>
        </div>
      </div>

      <PublicDestination href="/nos-services" />

      {dirty ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-xs font-bold text-orange-600">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          Modifications non enregistrées
        </p>
      ) : null}

      <div className="mt-8 space-y-5">
        <SectionCard
          icon={<GlobeIcon className="h-5 w-5" />}
          title="Hero"
          subtitle="Sur-titre, titre, description, image et bouton principal"
          published={content.hero.published}
          onTogglePublished={(published) => patchSection("hero", { published })}
          open={openSection === "hero"}
          onToggleOpen={() =>
            setOpenSection(openSection === "hero" ? "" : "hero")
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Sur-titre">
              <TextInput
                value={content.hero.eyebrow}
                onChange={(value) => patchSection("hero", { eyebrow: value })}
              />
            </Field>
            <Field label="Bouton principal — texte">
              <TextInput
                value={content.hero.primaryCta.label}
                onChange={(value) =>
                  patchSection("hero", {
                    primaryCta: { ...content.hero.primaryCta, label: value },
                  })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Titre">
                <TextInput
                  value={content.hero.title}
                  onChange={(value) => patchSection("hero", { title: value })}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Description">
                <TextArea
                  value={content.hero.description}
                  onChange={(value) =>
                    patchSection("hero", { description: value })
                  }
                />
              </Field>
            </div>
            <Field label="Bouton principal — destination">
              <TextInput
                value={content.hero.primaryCta.href}
                onChange={(value) =>
                  patchSection("hero", {
                    primaryCta: { ...content.hero.primaryCta, href: value },
                  })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Image du hero">
                <ImageField
                  url={content.hero.image.url}
                  alt={content.hero.image.alt}
                  onChangeUrl={(url) =>
                    patchSection("hero", {
                      image: { url, alt: content.hero.image.alt },
                    })
                  }
                  onChangeAlt={(alt) =>
                    patchSection("hero", {
                      image: { url: content.hero.image.url, alt },
                    })
                  }
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          icon={<ListIcon className="h-5 w-5" />}
          title="Nos services"
          subtitle="La liste des services : chaque service publié apparaît automatiquement sur le site public"
          published={content.servicesSection.published}
          onTogglePublished={(published) =>
            patchSection("servicesSection", { published })
          }
          open={openSection === "services"}
          onToggleOpen={() =>
            setOpenSection(openSection === "services" ? "" : "services")
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Sur-titre">
              <TextInput
                value={content.servicesSection.eyebrow}
                onChange={(value) =>
                  patchSection("servicesSection", { eyebrow: value })
                }
              />
            </Field>
            <Field label="Titre de la section">
              <TextInput
                value={content.servicesSection.title}
                onChange={(value) =>
                  patchSection("servicesSection", { title: value })
                }
              />
            </Field>
          </div>
          <div className="mt-6">
            <ServicesListEditor
              services={sortByOrder(content.servicesSection.services)}
              onAdd={addService}
              onPatch={patchService}
              onDelete={deleteService}
              onMove={moveService}
              onTogglePublished={toggleService}
            />
          </div>
        </SectionCard>

        <SectionCard
          icon={<FlagIcon className="h-5 w-5" />}
          title="Parcours"
          subtitle="Les étapes de la timeline « Ton parcours »"
          published={content.parcours.published}
          onTogglePublished={(published) =>
            patchSection("parcours", { published })
          }
          open={openSection === "parcours"}
          onToggleOpen={() =>
            setOpenSection(openSection === "parcours" ? "" : "parcours")
          }
        >
          <Field label="Sur-titre">
            <TextInput
              value={content.parcours.eyebrow}
              onChange={(value) => patchSection("parcours", { eyebrow: value })}
            />
          </Field>
          <div className="mt-6">
            <SimpleItemsEditor
              addLabel="Ajouter une étape"
              items={sortByOrder(content.parcours.steps).map((step) => ({
                id: step.id,
                title: step.label,
                order: step.order,
                published: step.published,
              }))}
              onAdd={addStep}
              onPatch={(id, patch) =>
                patchStep(id, { label: patch.title ?? "" })
              }
              onDelete={deleteStep}
              onMove={moveStep}
              onTogglePublished={toggleStep}
            />
          </div>
        </SectionCard>

        <SectionCard
          icon={<SparkleIcon className="h-5 w-5" />}
          title="Section immersive"
          subtitle="Sur-titre, titre, description, pastilles et image"
          published={content.immersive.published}
          onTogglePublished={(published) =>
            patchSection("immersive", { published })
          }
          open={openSection === "immersive"}
          onToggleOpen={() =>
            setOpenSection(openSection === "immersive" ? "" : "immersive")
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Sur-titre">
              <TextInput
                value={content.immersive.eyebrow}
                onChange={(value) =>
                  patchSection("immersive", { eyebrow: value })
                }
              />
            </Field>
            <Field label="Titre">
              <TextInput
                value={content.immersive.title}
                onChange={(value) =>
                  patchSection("immersive", { title: value })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description">
                <TextArea
                  value={content.immersive.description}
                  onChange={(value) =>
                    patchSection("immersive", { description: value })
                  }
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field
                label="Pastilles"
                hint="Séparées par des virgules. Ex. : Orientation, Admission, Logement"
              >
                <TextInput
                  value={content.immersive.pills.join(", ")}
                  onChange={(value) =>
                    patchSection("immersive", {
                      pills: value
                        .split(",")
                        .map((pill) => pill.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Image">
                <ImageField
                  url={content.immersive.image.url}
                  alt={content.immersive.image.alt}
                  onChangeUrl={(url) =>
                    patchSection("immersive", {
                      image: { url, alt: content.immersive.image.alt },
                    })
                  }
                  onChangeAlt={(alt) =>
                    patchSection("immersive", {
                      image: { url: content.immersive.image.url, alt },
                    })
                  }
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          icon={<CheckIcon className="h-5 w-5" />}
          title="Points forts"
          subtitle="Les petites étiquettes affichées sous la section immersive"
          published
          onTogglePublished={() => {}}
          open={openSection === "points-forts"}
          onToggleOpen={() =>
            setOpenSection(openSection === "points-forts" ? "" : "points-forts")
          }
        >
          <p className="mb-4 rounded-2xl bg-cream px-4 py-3 text-xs text-navy-600">
            Les points forts sont toujours visibles sur le site public : ils ne
            possèdent pas de statut de publication.
          </p>
          <div className="space-y-3">
            {content.strengths.map((strength, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <TextInput
                  value={strength.label}
                  onChange={(value) => patchStrength(index, value)}
                />
                <button
                  type="button"
                  onClick={() => deleteStrength(index)}
                  aria-label="Supprimer ce point fort"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-navy-600 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addStrength}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-full border-2 border-dashed border-navy-200 px-5 text-sm font-bold text-navy-700 transition-colors hover:border-magenta-500 hover:text-magenta-600"
          >
            <PlusIcon className="h-4 w-4" />
            Ajouter un point fort
          </button>
        </SectionCard>

        <SectionCard
          icon={<ArrowRightIcon className="h-5 w-5" />}
          title="CTA final"
          subtitle="Sur-titre, titre, description et boutons de la section finale"
          published={content.cta.published}
          onTogglePublished={(published) => patchSection("cta", { published })}
          open={openSection === "cta"}
          onToggleOpen={() => setOpenSection(openSection === "cta" ? "" : "cta")}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Sur-titre">
              <TextInput
                value={content.cta.eyebrow}
                onChange={(value) => patchSection("cta", { eyebrow: value })}
              />
            </Field>
            <Field label="Bouton principal — texte">
              <TextInput
                value={content.cta.primaryButton.label}
                onChange={(value) =>
                  patchSection("cta", {
                    primaryButton: {
                      ...content.cta.primaryButton,
                      label: value,
                    },
                  })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Titre">
                <TextInput
                  value={content.cta.title}
                  onChange={(value) => patchSection("cta", { title: value })}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Description">
                <TextArea
                  value={content.cta.description}
                  onChange={(value) =>
                    patchSection("cta", { description: value })
                  }
                />
              </Field>
            </div>
            <Field label="Bouton principal — destination">
              <TextInput
                value={content.cta.primaryButton.href}
                onChange={(value) =>
                  patchSection("cta", {
                    primaryButton: {
                      ...content.cta.primaryButton,
                      href: value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Bouton secondaire — texte">
              <TextInput
                value={content.cta.secondaryButton.label}
                onChange={(value) =>
                  patchSection("cta", {
                    secondaryButton: {
                      ...content.cta.secondaryButton,
                      label: value,
                    },
                  })
                }
              />
            </Field>
          </div>
        </SectionCard>
      </div>

      {toast ? (
        <div
          role="status"
          className={`fixed right-5 bottom-5 z-50 max-w-md rounded-2xl px-5 py-4 text-sm font-bold text-white shadow-2xl ${
            toast.kind === "success" ? "bg-whatsapp-dark" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      ) : null}

      {previewOpen ? (
        <PreviewModal content={content} onClose={() => setPreviewOpen(false)} />
      ) : null}
    </div>
  );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  LogementPageData,
  PageImage,
  PageStep,
  SupportItem,
} from "@/data/logement-installation";
import { sortByOrder } from "@/lib/logement-content-utils";
import { saveLogementContentAction } from "@/app/admin/logement/actions";
import { SectionCard } from "@/components/admin/logement/SectionCard";
import { PublicDestination } from "@/components/admin/ui/PublicDestination";
import {
  ItemsEditor,
  type EditableItem,
} from "@/components/admin/logement/ItemsEditor";
import { PreviewModal } from "@/components/admin/logement/PreviewModal";
import {
  Field,
  ImageField,
  SelectInput,
  StatusChip,
  TextArea,
  TextInput,
} from "@/components/admin/logement/fields";
import {
  ArrowRightIcon,
  BedIcon,
  EyeIcon,
  FlagIcon,
  GlobeIcon,
  InfoIcon,
  MapPinIcon,
  SearchIcon,
} from "@/components/icons";

type Toast = { kind: "success" | "error"; message: string } | null;

const stepIconOptions = [
  { value: "search", label: "Recherche" },
  { value: "pin", label: "Zone" },
  { value: "flag", label: "Arrivée" },
  { value: "bed", label: "Logement" },
];

const serviceIconOptions = [
  { value: "search", label: "Recherche" },
  { value: "pin", label: "Zone" },
  { value: "flag", label: "Arrivée" },
  { value: "chat", label: "Accueil" },
  { value: "check", label: "Vérifié" },
];

const buttonTypeOptions = [
  { value: "internal", label: "Lien interne" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "external", label: "Lien externe" },
];

export function LogementManager({
  initialContent,
}: {
  initialContent: LogementPageData;
}) {
  const [content, setContent] = useState<LogementPageData>(initialContent);
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

  const publishedSections = useMemo(() => {
    const sections = [
      content.hero,
      content.stepsSection,
      content.supportSection,
      content.visualSection,
      content.information,
      content.cta,
    ];
    return sections.filter((section) => section.published).length;
  }, [content]);

  const patchSection = <K extends keyof LogementPageData>(
    key: K,
    sectionPatch: Partial<LogementPageData[K]>,
  ) => {
    setContent((current) => ({
      ...current,
      [key]: { ...current[key], ...sectionPatch },
    }));
    setDirty(true);
  };

  const moveItem = (
    key: "steps" | "items",
    index: number,
    direction: -1 | 1,
  ) => {
    setContent((current) => {
      const list: (PageStep | SupportItem)[] =
        key === "steps"
          ? current.stepsSection.steps
          : current.supportSection.items;
      const sorted = sortByOrder(list);
      const target = index + direction;
      if (target < 0 || target >= sorted.length) return current;
      const next = [...sorted];
      [next[index], next[target]] = [next[target], next[index]];
      next.forEach((item, i) => {
        item.order = i + 1;
      });
return key === "steps"
        ? {
            ...current,
            stepsSection: {
              ...current.stepsSection,
              steps: next as LogementPageData["stepsSection"]["steps"],
            },
          }
        : {
            ...current,
            supportSection: {
              ...current.supportSection,
              items: next as LogementPageData["supportSection"]["items"],
            },
          };
    });
    setDirty(true);
  };

  const addStep = () => {
    setContent((current) => {
      const steps = sortByOrder(current.stepsSection.steps);
      const nextNumber = String(steps.length + 1).padStart(2, "0");
      return {
        ...current,
        stepsSection: {
          ...current.stepsSection,
          steps: [
            ...steps,
            {
              id: crypto.randomUUID(),
              number: nextNumber,
              title: "Nouvelle étape",
              description: "",
              icon: "search" as const,
              order: steps.length + 1,
              published: true,
            },
          ],
        },
      };
    });
    setDirty(true);
  };

  const addService = () => {
    setContent((current) => {
      const items = sortByOrder(current.supportSection.items);
      return {
        ...current,
        supportSection: {
          ...current.supportSection,
          items: [
            ...items,
            {
              id: crypto.randomUUID(),
              title: "Nouvelle prestation",
              description: "",
              icon: "check" as const,
              order: items.length + 1,
              published: true,
            },
          ],
        },
      };
    });
    setDirty(true);
  };

  const patchItem = (
    key: "steps" | "items",
    id: string,
    itemPatch: Partial<EditableItem>,
  ) => {
    setContent((current) => {
      const list =
        key === "steps"
          ? current.stepsSection.steps
          : current.supportSection.items;
      const next = list.map((item) =>
        item.id === id ? { ...item, ...itemPatch } : item,
      ) as LogementPageData["stepsSection"]["steps"] | LogementPageData["supportSection"]["items"];
      return key === "steps"
        ? { ...current, stepsSection: { ...current.stepsSection, steps: next as LogementPageData["stepsSection"]["steps"] } }
        : {
            ...current,
            supportSection: { ...current.supportSection, items: next as LogementPageData["supportSection"]["items"] },
          };
    });
    setDirty(true);
  };

  const deleteItem = (key: "steps" | "items", id: string) => {
    setContent((current) => {
      const list =
        key === "steps"
          ? current.stepsSection.steps
          : current.supportSection.items;
      const next = list.filter((item) => item.id !== id) as
        LogementPageData["stepsSection"]["steps"] |
        LogementPageData["supportSection"]["items"];
      return key === "steps"
        ? { ...current, stepsSection: { ...current.stepsSection, steps: next as LogementPageData["stepsSection"]["steps"] } }
        : {
            ...current,
            supportSection: { ...current.supportSection, items: next as LogementPageData["supportSection"]["items"] },
          };
    });
    setDirty(true);
  };

  const toggleItem = (key: "steps" | "items", id: string) => {
    setContent((current) => {
      const list =
        key === "steps"
          ? current.stepsSection.steps
          : current.supportSection.items;
      const next = list.map((item) =>
        item.id === id ? { ...item, published: !item.published } : item,
      ) as LogementPageData["stepsSection"]["steps"] | LogementPageData["supportSection"]["items"];
      return key === "steps"
        ? { ...current, stepsSection: { ...current.stepsSection, steps: next as LogementPageData["stepsSection"]["steps"] } }
        : {
            ...current,
            supportSection: { ...current.supportSection, items: next as LogementPageData["supportSection"]["items"] },
          };
    });
    setDirty(true);
  };

  const save = async (contentToSave: LogementPageData) => {
    setSaving(true);
    try {
      const result = await saveLogementContentAction(contentToSave);
      if (result.ok) {
        setContent(contentToSave);
        setDirty(false);
        setToast({ kind: "success", message: "Contenu enregistré. Il est visible sur /logement-installation." });
      } else {
        setToast({ kind: "error", message: result.message ?? "L'enregistrement a échoué." });
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

  const publishAll = () => {
    const published = {
      ...content,
      hero: { ...content.hero, published: true },
      stepsSection: { ...content.stepsSection, published: true },
      supportSection: { ...content.supportSection, published: true },
      visualSection: { ...content.visualSection, published: true },
      information: { ...content.information, published: true },
      cta: { ...content.cta, published: true },
    };
    save(published);
  };

  const heroImagePatch = (image: PageImage) =>
    patchSection("hero", { image });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-admin-title tracking-tight text-navy-900">
              Logement &amp; Installation
            </h1>
            <StatusChip published={publishedSections === 6} />
          </div>
          <p className="mt-2 max-w-2xl text-admin-body leading-relaxed text-navy-700/70">
            Gérez le contenu de la page « Logement &amp; Installation ». Une
            section ou une donnée non publiée n&apos;apparaît jamais sur le site
            public.
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

      <PublicDestination href="/logement-installation" />

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
                value={content.hero.primaryButton.label}
                onChange={(value) =>
                  patchSection("hero", {
                    primaryButton: { ...content.hero.primaryButton, label: value },
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
                value={content.hero.primaryButton.href}
                onChange={(value) =>
                  patchSection("hero", {
                    primaryButton: { ...content.hero.primaryButton, href: value },
                  })
                }
              />
            </Field>
            <Field label="Bouton principal — type de lien">
              <SelectInput
                value={content.hero.primaryButton.type}
                onChange={(value) =>
                  patchSection("hero", {
                    primaryButton: {
                      ...content.hero.primaryButton,
                      type: value as "internal" | "whatsapp" | "external",
                    },
                  })
                }
                options={buttonTypeOptions}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Image du hero">
                <ImageField
                  url={content.hero.image.url}
                  alt={content.hero.image.alt}
                  onChangeUrl={(url) => heroImagePatch({ url, alt: content.hero.image.alt })}
                  onChangeAlt={(alt) => heroImagePatch({ url: content.hero.image.url, alt })}
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          icon={<MapPinIcon className="h-5 w-5" />}
          title="Parcours d'installation"
          subtitle="Les étapes de la timeline « Ton arrivée, étape par étape »"
          published={content.stepsSection.published}
          onTogglePublished={(published) =>
            patchSection("stepsSection", { published })
          }
          open={openSection === "steps"}
          onToggleOpen={() =>
            setOpenSection(openSection === "steps" ? "" : "steps")
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Titre de la section">
              <TextInput
                value={content.stepsSection.title}
                onChange={(value) =>
                  patchSection("stepsSection", { title: value })
                }
              />
            </Field>
            <Field label="Sous-titre">
              <TextInput
                value={content.stepsSection.subtitle}
                onChange={(value) =>
                  patchSection("stepsSection", { subtitle: value })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description">
                <TextArea
                  value={content.stepsSection.description}
                  rows={2}
                  onChange={(value) =>
                    patchSection("stepsSection", { description: value })
                  }
                />
              </Field>
            </div>
          </div>
          <div className="mt-6">
            <ItemsEditor
              addLabel="Ajouter une étape"
              iconOptions={stepIconOptions}
              showNumber
              showImage={false}
              items={sortByOrder(content.stepsSection.steps)}
              onAdd={addStep}
              onPatch={(id, patch) => patchItem("steps", id, patch)}
              onDelete={(id) => deleteItem("steps", id)}
              onMove={(index, direction) => moveItem("steps", index, direction)}
              onTogglePublished={(id) => toggleItem("steps", id)}
            />
          </div>
        </SectionCard>

        <SectionCard
          icon={<SearchIcon className="h-5 w-5" />}
          title="Notre accompagnement"
          subtitle="Les prestations de la section « Ce que nous pouvons accompagner »"
          published={content.supportSection.published}
          onTogglePublished={(published) =>
            patchSection("supportSection", { published })
          }
          open={openSection === "support"}
          onToggleOpen={() =>
            setOpenSection(openSection === "support" ? "" : "support")
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Titre de la section">
              <TextInput
                value={content.supportSection.title}
                onChange={(value) =>
                  patchSection("supportSection", { title: value })
                }
              />
            </Field>
            <Field label="Sous-titre">
              <TextInput
                value={content.supportSection.subtitle}
                onChange={(value) =>
                  patchSection("supportSection", { subtitle: value })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description">
                <TextArea
                  value={content.supportSection.description}
                  rows={2}
                  onChange={(value) =>
                    patchSection("supportSection", { description: value })
                  }
                />
              </Field>
            </div>
          </div>
          <div className="mt-6">
            <ItemsEditor
              addLabel="Ajouter une prestation"
              iconOptions={serviceIconOptions}
              showNumber={false}
              showImage
              items={sortByOrder(content.supportSection.items)}
              onAdd={addService}
              onPatch={(id, patch) => patchItem("items", id, patch)}
              onDelete={(id) => deleteItem("items", id)}
              onMove={(index, direction) => moveItem("items", index, direction)}
              onTogglePublished={(id) => toggleItem("items", id)}
            />
          </div>
        </SectionCard>

        <SectionCard
          icon={<FlagIcon className="h-5 w-5" />}
          title="Section visuelle"
          subtitle="Badge, petit label, titre, description et image"
          published={content.visualSection.published}
          onTogglePublished={(published) =>
            patchSection("visualSection", { published })
          }
          open={openSection === "visual"}
          onToggleOpen={() =>
            setOpenSection(openSection === "visual" ? "" : "visual")
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Badge (pastille)">
              <TextInput
                value={content.visualSection.badge}
                onChange={(value) =>
                  patchSection("visualSection", { badge: value })
                }
              />
            </Field>
            <Field label="Petit label">
              <TextInput
                value={content.visualSection.eyebrow}
                onChange={(value) =>
                  patchSection("visualSection", { eyebrow: value })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Titre">
                <TextInput
                  value={content.visualSection.title}
                  onChange={(value) =>
                    patchSection("visualSection", { title: value })
                  }
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Description">
                <TextArea
                  value={content.visualSection.description}
                  onChange={(value) =>
                    patchSection("visualSection", { description: value })
                  }
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Image">
                <ImageField
                  url={content.visualSection.image.url}
                  alt={content.visualSection.image.alt}
                  onChangeUrl={(url) =>
                    patchSection("visualSection", {
                      image: { url, alt: content.visualSection.image.alt },
                    })
                  }
                  onChangeAlt={(alt) =>
                    patchSection("visualSection", {
                      image: { url: content.visualSection.image.url, alt },
                    })
                  }
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          icon={<InfoIcon className="h-5 w-5" />}
          title="Information importante"
          subtitle="Le bloc « À savoir »"
          published={content.information.published}
          onTogglePublished={(published) =>
            patchSection("information", { published })
          }
          open={openSection === "information"}
          onToggleOpen={() =>
            setOpenSection(openSection === "information" ? "" : "information")
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Pastille (badge)">
              <TextInput
                value={content.information.badge}
                onChange={(value) =>
                  patchSection("information", { badge: value })
                }
              />
            </Field>
            <Field label="Titre">
              <TextInput
                value={content.information.title}
                onChange={(value) =>
                  patchSection("information", { title: value })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description">
                <TextArea
                  value={content.information.description}
                  onChange={(value) =>
                    patchSection("information", { description: value })
                  }
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          icon={<BedIcon className="h-5 w-5" />}
          title="CTA final"
          subtitle="Titre, description et boutons de la section finale"
          published={content.cta.published}
          onTogglePublished={(published) => patchSection("cta", { published })}
          open={openSection === "cta"}
          onToggleOpen={() => setOpenSection(openSection === "cta" ? "" : "cta")}
        >
          <div className="grid gap-5 sm:grid-cols-2">
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
            <Field label="Bouton principal — texte">
              <TextInput
                value={content.cta.primaryButton.label}
                onChange={(value) =>
                  patchSection("cta", {
                    primaryButton: { ...content.cta.primaryButton, label: value },
                  })
                }
              />
            </Field>
            <Field label="Bouton principal — destination">
              <TextInput
                value={content.cta.primaryButton.href}
                onChange={(value) =>
                  patchSection("cta", {
                    primaryButton: { ...content.cta.primaryButton, href: value },
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
            <Field label="Bouton secondaire — type de lien">
              <SelectInput
                value={content.cta.secondaryButton.type}
                onChange={(value) =>
                  patchSection("cta", {
                    secondaryButton: {
                      ...content.cta.secondaryButton,
                      type: value as "internal" | "whatsapp" | "external",
                    },
                  })
                }
                options={buttonTypeOptions}
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
        <PreviewModal data={content} onClose={() => setPreviewOpen(false)} />
      ) : null}
    </div>
  );
}
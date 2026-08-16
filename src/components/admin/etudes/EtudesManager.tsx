"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  EtudeAdvantage,
  EtudeCity,
  EtudeJourneyStep,
  EtudesPageData,
} from "@/data/etudier-au-maroc";
import type { MediaItem } from "@/data/media";
import { sortByOrder } from "@/lib/logement-content-utils";
import { saveEtudesContentAction } from "@/app/admin/etudes/actions";
import { SectionCard } from "@/components/admin/logement/SectionCard";
import { SimpleItemsEditor } from "@/components/admin/etudes/SimpleItemsEditor";
import { PreviewModal } from "@/components/admin/etudes/PreviewModal";
import { PublicDestination } from "@/components/admin/ui/PublicDestination";
import { MediaPickerField } from "@/components/admin/media/MediaPicker";
import {
  Field,
  ImageField,
  StatusChip,
  TextArea,
  TextInput,
} from "@/components/admin/ui/fields";
import {
  ArrowRightIcon,
  CompassIcon,
  EyeIcon,
  GlobeIcon,
  InfoIcon,
  MapPinIcon,
  QuoteIcon,
  SparkleIcon,
  UserIcon,
} from "@/components/icons";

type Toast = { kind: "success" | "error"; message: string } | null;

const advantageIconOptions = [
  { value: "graduation", label: "Diplôme" },
  { value: "building", label: "Établissement" },
  { value: "chat", label: "Échange" },
  { value: "globe", label: "Monde" },
  { value: "pin", label: "Ville" },
];

const sectionKeys: (keyof EtudesPageData)[] = [
  "hero",
  "advantagesSection",
  "visualSection",
  "citiesSection",
  "journeySection",
  "transparency",
  "finalCta",
];

export function EtudesManager({
  initialContent,
  initialMedia,
}: {
  initialContent: EtudesPageData;
  initialMedia: MediaItem[];
}) {
  const [content, setContent] = useState<EtudesPageData>(initialContent);
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
      sectionKeys.filter((key) => content[key].published === true).length,
    [content],
  );

  const patchSection = <K extends keyof EtudesPageData>(
    key: K,
    sectionPatch: Partial<EtudesPageData[K]>,
  ) => {
    setContent((current) => ({
      ...current,
      [key]: { ...current[key], ...sectionPatch },
    }));
    setDirty(true);
  };

  const save = async (contentToSave: EtudesPageData) => {
    setSaving(true);
    const result = await saveEtudesContentAction(contentToSave);
    setSaving(false);
    if (result.ok) {
      setContent(contentToSave);
      setDirty(false);
      setToast({
        kind: "success",
        message: "Contenu enregistré. Il est visible sur /etudier-au-maroc.",
      });
    } else {
      setToast({
        kind: "error",
        message: result.message ?? "L'enregistrement a échoué.",
      });
    }
  };

  const publishAll = () => {
    const published: EtudesPageData = {
      ...content,
      hero: { ...content.hero, published: true },
      advantagesSection: { ...content.advantagesSection, published: true },
      visualSection: { ...content.visualSection, published: true },
      citiesSection: { ...content.citiesSection, published: true },
      journeySection: { ...content.journeySection, published: true },
      transparency: { ...content.transparency, published: true },
      finalCta: { ...content.finalCta, published: true },
    };
    save(published);
  };

  // ----- listes (avantages, villes, étapes) -----

  const addAdvantage = () => {
    setContent((current) => {
      const advantages = sortByOrder(current.advantagesSection.advantages);
      return {
        ...current,
        advantagesSection: {
          ...current.advantagesSection,
          advantages: [
            ...advantages,
            {
              id: crypto.randomUUID(),
              title: "Nouvel avantage",
              description: "",
              icon: "globe" as const,
              order: advantages.length + 1,
              published: true,
            },
          ],
        },
      };
    });
    setDirty(true);
  };

  const patchAdvantage = (id: string, patch: Partial<EtudeAdvantage>) => {
    setContent((current) => ({
      ...current,
      advantagesSection: {
        ...current.advantagesSection,
        advantages: current.advantagesSection.advantages.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      },
    }));
    setDirty(true);
  };

  const moveAdvantage = (index: number, direction: -1 | 1) => {
    setContent((current) => {
      const list = sortByOrder(current.advantagesSection.advantages);
      const target = index + direction;
      if (target < 0 || target >= list.length) return current;
      const next = [...list];
      [next[index], next[target]] = [next[target], next[index]];
      next.forEach((item, i) => {
        item.order = i + 1;
      });
      return {
        ...current,
        advantagesSection: {
          ...current.advantagesSection,
          advantages: next,
        },
      };
    });
    setDirty(true);
  };

  const deleteAdvantage = (id: string) => {
    setContent((current) => ({
      ...current,
      advantagesSection: {
        ...current.advantagesSection,
        advantages: current.advantagesSection.advantages.filter(
          (item) => item.id !== id,
        ),
      },
    }));
    setDirty(true);
  };

  const toggleAdvantage = (id: string) => {
    setContent((current) => ({
      ...current,
      advantagesSection: {
        ...current.advantagesSection,
        advantages: current.advantagesSection.advantages.map((item) =>
          item.id === id ? { ...item, published: !item.published } : item,
        ),
      },
    }));
    setDirty(true);
  };

  const addCity = () => {
    setContent((current) => {
      const cities = sortByOrder(current.citiesSection.cities);
      return {
        ...current,
        citiesSection: {
          ...current.citiesSection,
          cities: [
            ...cities,
            {
              id: crypto.randomUUID(),
              name: "Nouvelle ville",
              order: cities.length + 1,
              published: true,
            },
          ],
        },
      };
    });
    setDirty(true);
  };

  const patchCity = (id: string, patch: Partial<EtudeCity>) => {
    setContent((current) => ({
      ...current,
      citiesSection: {
        ...current.citiesSection,
        cities: current.citiesSection.cities.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      },
    }));
    setDirty(true);
  };

  const moveCity = (index: number, direction: -1 | 1) => {
    setContent((current) => {
      const list = sortByOrder(current.citiesSection.cities);
      const target = index + direction;
      if (target < 0 || target >= list.length) return current;
      const next = [...list];
      [next[index], next[target]] = [next[target], next[index]];
      next.forEach((item, i) => {
        item.order = i + 1;
      });
      return {
        ...current,
        citiesSection: { ...current.citiesSection, cities: next },
      };
    });
    setDirty(true);
  };

  const deleteCity = (id: string) => {
    setContent((current) => ({
      ...current,
      citiesSection: {
        ...current.citiesSection,
        cities: current.citiesSection.cities.filter((item) => item.id !== id),
      },
    }));
    setDirty(true);
  };

  const toggleCity = (id: string) => {
    setContent((current) => ({
      ...current,
      citiesSection: {
        ...current.citiesSection,
        cities: current.citiesSection.cities.map((item) =>
          item.id === id ? { ...item, published: !item.published } : item,
        ),
      },
    }));
    setDirty(true);
  };

  const addStep = () => {
    setContent((current) => {
      const steps = sortByOrder(current.journeySection.steps);
      return {
        ...current,
        journeySection: {
          ...current.journeySection,
          steps: [
            ...steps,
            {
              id: crypto.randomUUID(),
              title: "Nouvelle étape",
              order: steps.length + 1,
              published: true,
            },
          ],
        },
      };
    });
    setDirty(true);
  };

  const patchStep = (id: string, patch: Partial<EtudeJourneyStep>) => {
    setContent((current) => ({
      ...current,
      journeySection: {
        ...current.journeySection,
        steps: current.journeySection.steps.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      },
    }));
    setDirty(true);
  };

  const moveStep = (index: number, direction: -1 | 1) => {
    setContent((current) => {
      const list = sortByOrder(current.journeySection.steps);
      const target = index + direction;
      if (target < 0 || target >= list.length) return current;
      const next = [...list];
      [next[index], next[target]] = [next[target], next[index]];
      next.forEach((item, i) => {
        item.order = i + 1;
      });
      return {
        ...current,
        journeySection: { ...current.journeySection, steps: next },
      };
    });
    setDirty(true);
  };

  const deleteStep = (id: string) => {
    setContent((current) => ({
      ...current,
      journeySection: {
        ...current.journeySection,
        steps: current.journeySection.steps.filter((item) => item.id !== id),
      },
    }));
    setDirty(true);
  };

  const toggleStep = (id: string) => {
    setContent((current) => ({
      ...current,
      journeySection: {
        ...current.journeySection,
        steps: current.journeySection.steps.map((item) =>
          item.id === id ? { ...item, published: !item.published } : item,
        ),
      },
    }));
    setDirty(true);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-admin-title tracking-tight text-navy-900">
              Étudier au Maroc
            </h1>
            <StatusChip published={publishedSections === sectionKeys.length} />
          </div>
          <p className="mt-2 max-w-2xl text-admin-body leading-relaxed text-navy-700/70">
            Gérez le contenu de la page « Étudier au Maroc ». Une section non
            publiée n&apos;apparaît jamais sur le site public.
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

      <PublicDestination href="/etudier-au-maroc" />

      {dirty ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-4 py-2 text-xs font-bold text-orange-600">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          Modifications non enregistrées
        </p>
      ) : null}

      <div className="mt-8 space-y-5">
        <SectionCard
          icon={<CompassIcon className="h-5 w-5" />}
          title="Hero"
          subtitle="Sur-titre, titre, description, bouton principal, réassurance et image"
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
            <Field label="Réassurance">
              <TextInput
                value={content.hero.reassurance}
                onChange={(value) =>
                  patchSection("hero", { reassurance: value })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Image du hero">
                <MediaPickerField
                  value={content.hero.image}
                  onChange={(image) => patchSection("hero", { image })}
                  initialMedia={initialMedia}
                  defaultSrc="/images/etudier-hero.jpg"
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          icon={<SparkleIcon className="h-5 w-5" />}
          title="Avantages"
          subtitle="Les avantages mis en avant avec leur icône et leur ordre"
          published={content.advantagesSection.published}
          onTogglePublished={(published) =>
            patchSection("advantagesSection", { published })
          }
          open={openSection === "avantages"}
          onToggleOpen={() =>
            setOpenSection(openSection === "avantages" ? "" : "avantages")
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Sur-titre">
              <TextInput
                value={content.advantagesSection.eyebrow}
                onChange={(value) =>
                  patchSection("advantagesSection", { eyebrow: value })
                }
              />
            </Field>
            <Field label="Titre de la section">
              <TextInput
                value={content.advantagesSection.title}
                onChange={(value) =>
                  patchSection("advantagesSection", { title: value })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description">
                <TextArea
                  value={content.advantagesSection.description}
                  rows={2}
                  onChange={(value) =>
                    patchSection("advantagesSection", { description: value })
                  }
                />
              </Field>
            </div>
          </div>
          <div className="mt-6">
            <SimpleItemsEditor
              addLabel="Ajouter un avantage"
              showDescription
              showIcon
              iconOptions={advantageIconOptions}
              items={sortByOrder(content.advantagesSection.advantages)}
              onAdd={addAdvantage}
              onPatch={(id, patch) =>
                patchAdvantage(id, patch as Partial<EtudeAdvantage>)
              }
              onDelete={deleteAdvantage}
              onMove={moveAdvantage}
              onTogglePublished={toggleAdvantage}
            />
          </div>
        </SectionCard>

        <SectionCard
          icon={<GlobeIcon className="h-5 w-5" />}
          title="Section information"
          subtitle="Badge, titre, description, bouton et image de la section visuelle"
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
            <Field label="Sur-titre">
              <TextInput
                value={content.visualSection.eyebrow}
                onChange={(value) =>
                  patchSection("visualSection", { eyebrow: value })
                }
              />
            </Field>
            <Field label="Badge">
              <TextInput
                value={content.visualSection.badge}
                onChange={(value) =>
                  patchSection("visualSection", { badge: value })
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
            <Field label="Bouton — texte">
              <TextInput
                value={content.visualSection.cta.label}
                onChange={(value) =>
                  patchSection("visualSection", {
                    cta: { ...content.visualSection.cta, label: value },
                  })
                }
              />
            </Field>
            <Field label="Bouton — destination">
              <TextInput
                value={content.visualSection.cta.href}
                onChange={(value) =>
                  patchSection("visualSection", {
                    cta: { ...content.visualSection.cta, href: value },
                  })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Image">
                <ImageField
                  url={content.visualSection.image.src}
                  alt={content.visualSection.image.alt}
                  onChangeUrl={(src) =>
                    patchSection("visualSection", {
                      image: { src, alt: content.visualSection.image.alt },
                    })
                  }
                  onChangeAlt={(alt) =>
                    patchSection("visualSection", {
                      image: { src: content.visualSection.image.src, alt },
                    })
                  }
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          icon={<MapPinIcon className="h-5 w-5" />}
          title="Villes"
          subtitle="Les villes mises en avant, avec leur ordre d'affichage"
          published={content.citiesSection.published}
          onTogglePublished={(published) =>
            patchSection("citiesSection", { published })
          }
          open={openSection === "villes"}
          onToggleOpen={() =>
            setOpenSection(openSection === "villes" ? "" : "villes")
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Sur-titre">
              <TextInput
                value={content.citiesSection.eyebrow}
                onChange={(value) =>
                  patchSection("citiesSection", { eyebrow: value })
                }
              />
            </Field>
            <Field label="Titre de la section">
              <TextInput
                value={content.citiesSection.title}
                onChange={(value) =>
                  patchSection("citiesSection", { title: value })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description">
                <TextArea
                  value={content.citiesSection.description}
                  rows={2}
                  onChange={(value) =>
                    patchSection("citiesSection", { description: value })
                  }
                />
              </Field>
            </div>
          </div>
          <div className="mt-6">
            <SimpleItemsEditor
              addLabel="Ajouter une ville"
              items={sortByOrder(content.citiesSection.cities).map((city) => ({
                id: city.id,
                title: city.name,
                order: city.order,
                published: city.published,
              }))}
              onAdd={addCity}
              onPatch={(id, patch) =>
                patchCity(id, { name: patch.title ?? "" })
              }
              onDelete={deleteCity}
              onMove={moveCity}
              onTogglePublished={toggleCity}
            />
          </div>
        </SectionCard>

        <SectionCard
          icon={<UserIcon className="h-5 w-5" />}
          title="Parcours"
          subtitle="Les étapes du parcours d'accompagnement"
          published={content.journeySection.published}
          onTogglePublished={(published) =>
            patchSection("journeySection", { published })
          }
          open={openSection === "parcours"}
          onToggleOpen={() =>
            setOpenSection(openSection === "parcours" ? "" : "parcours")
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Sur-titre">
              <TextInput
                value={content.journeySection.eyebrow}
                onChange={(value) =>
                  patchSection("journeySection", { eyebrow: value })
                }
              />
            </Field>
            <Field label="Titre de la section">
              <TextInput
                value={content.journeySection.title}
                onChange={(value) =>
                  patchSection("journeySection", { title: value })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description">
                <TextArea
                  value={content.journeySection.description}
                  rows={2}
                  onChange={(value) =>
                    patchSection("journeySection", { description: value })
                  }
                />
              </Field>
            </div>
          </div>
          <div className="mt-6">
            <SimpleItemsEditor
              addLabel="Ajouter une étape"
              items={sortByOrder(content.journeySection.steps).map((step) => ({
                id: step.id,
                title: step.title,
                order: step.order,
                published: step.published,
              }))}
              onAdd={addStep}
              onPatch={(id, patch) =>
                patchStep(id, { title: patch.title ?? "" })
              }
              onDelete={deleteStep}
              onMove={moveStep}
              onTogglePublished={toggleStep}
            />
          </div>
        </SectionCard>

        <SectionCard
          icon={<InfoIcon className="h-5 w-5" />}
          title="Information importante"
          subtitle="Le bloc de transparence « À vérifier avant toute décision »"
          published={content.transparency.published}
          onTogglePublished={(published) =>
            patchSection("transparency", { published })
          }
          open={openSection === "transparence"}
          onToggleOpen={() =>
            setOpenSection(openSection === "transparence" ? "" : "transparence")
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Titre">
                <TextInput
                  value={content.transparency.title}
                  onChange={(value) =>
                    patchSection("transparency", { title: value })
                  }
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Description">
                <TextArea
                  value={content.transparency.description}
                  onChange={(value) =>
                    patchSection("transparency", { description: value })
                  }
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          icon={<QuoteIcon className="h-5 w-5" />}
          title="CTA final"
          subtitle="Sur-titre, titre, description et boutons de la section finale"
          published={content.finalCta.published}
          onTogglePublished={(published) =>
            patchSection("finalCta", { published })
          }
          open={openSection === "cta"}
          onToggleOpen={() => setOpenSection(openSection === "cta" ? "" : "cta")}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Sur-titre">
              <TextInput
                value={content.finalCta.eyebrow}
                onChange={(value) =>
                  patchSection("finalCta", { eyebrow: value })
                }
              />
            </Field>
            <Field label="Bouton principal — texte">
              <TextInput
                value={content.finalCta.primaryCta.label}
                onChange={(value) =>
                  patchSection("finalCta", {
                    primaryCta: { ...content.finalCta.primaryCta, label: value },
                  })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Titre">
                <TextInput
                  value={content.finalCta.title}
                  onChange={(value) =>
                    patchSection("finalCta", { title: value })
                  }
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Description">
                <TextArea
                  value={content.finalCta.description}
                  onChange={(value) =>
                    patchSection("finalCta", { description: value })
                  }
                />
              </Field>
            </div>
            <Field label="Bouton principal — destination">
              <TextInput
                value={content.finalCta.primaryCta.href}
                onChange={(value) =>
                  patchSection("finalCta", {
                    primaryCta: { ...content.finalCta.primaryCta, href: value },
                  })
                }
              />
            </Field>
            <Field label="Bouton secondaire — texte">
              <TextInput
                value={content.finalCta.secondaryCta.label}
                onChange={(value) =>
                  patchSection("finalCta", {
                    secondaryCta: {
                      ...content.finalCta.secondaryCta,
                      label: value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Bouton secondaire — destination">
              <TextInput
                value={content.finalCta.secondaryCta.href}
                onChange={(value) =>
                  patchSection("finalCta", {
                    secondaryCta: {
                      ...content.finalCta.secondaryCta,
                      href: value,
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
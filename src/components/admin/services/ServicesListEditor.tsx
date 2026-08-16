import type { Service } from "@/data/services";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/icons";
import {
  Field,
  ImageField,
  StatusChip,
  TextArea,
  TextInput,
  Toggle,
} from "@/components/admin/ui/fields";

export function ServicesListEditor({
  services,
  onAdd,
  onPatch,
  onDelete,
  onMove,
  onTogglePublished,
}: {
  services: Service[];
  onAdd: () => void;
  onPatch: (id: string, patch: Partial<Service>) => void;
  onDelete: (id: string) => void;
  onMove: (index: number, direction: -1 | 1) => void;
  onTogglePublished: (id: string) => void;
}) {
  return (
    <div>
      <div className="space-y-4">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="rounded-2xl bg-cream p-4 ring-1 ring-navy-100 sm:p-5"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-900 text-xs font-bold text-white">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-bold text-navy-900">
                {service.title || "Sans titre"}
              </span>
              <StatusChip published={service.published} />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Monter"
                  disabled={index === 0}
                  onClick={() => onMove(index, -1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-600 transition-colors hover:bg-navy-100 disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowUpIcon className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Descendre"
                  disabled={index === services.length - 1}
                  onClick={() => onMove(index, 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-600 transition-colors hover:bg-navy-100 disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowDownIcon className="h-4 w-4" />
                </button>
                <Toggle
                  checked={service.published}
                  onChange={() => onTogglePublished(service.id)}
                  label={`${service.published ? "Masquer" : "Publier"} ${service.title}`}
                />
              </div>
            </div>

            <details className="group mt-3">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-magenta-600 hover:text-magenta-500">
                <PencilIcon className="h-3.5 w-3.5" />
                Modifier
              </summary>
              <div className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Titre">
                    <TextInput
                      value={service.title}
                      onChange={(value) => onPatch(service.id, { title: value })}
                    />
                  </Field>
                  <Field label="Icône">
                    <TextInput
                      value={service.icon}
                      onChange={(value) => onPatch(service.id, { icon: value })}
                      placeholder="Ex. 🎓"
                    />
                  </Field>
                  <Field label="Lien de destination">
                    <TextInput
                      value={service.href}
                      onChange={(value) => onPatch(service.id, { href: value })}
                      placeholder="Ex. /etudier-au-maroc"
                    />
                  </Field>
                  <Field label="Texte du bouton">
                    <TextInput
                      value={service.ctaLabel}
                      onChange={(value) =>
                        onPatch(service.id, { ctaLabel: value })
                      }
                      placeholder="Ex. Découvrir"
                    />
                  </Field>
                </div>
                <Field label="Description">
                  <TextArea
                    value={service.description}
                    rows={3}
                    onChange={(value) =>
                      onPatch(service.id, { description: value })
                    }
                  />
                </Field>
                <Field label="Image (facultative)">
                  <ImageField
                    url={service.image?.url ?? ""}
                    alt={service.image?.alt ?? ""}
                    onChangeUrl={(value) =>
                      onPatch(service.id, {
                        image: value
                          ? { url: value, alt: service.image?.alt ?? "" }
                          : null,
                      })
                    }
                    onChangeAlt={(value) =>
                      onPatch(service.id, {
                        image: service.image?.url
                          ? { url: service.image.url, alt: value }
                          : null,
                      })
                    }
                  />
                </Field>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onDelete(service.id)}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-red-500/10 px-4 text-xs font-bold text-red-600 transition-colors hover:bg-red-500/20"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                    Supprimer
                  </button>
                </div>
              </div>
            </details>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="mt-4 inline-flex h-10 items-center gap-2 rounded-full border-2 border-dashed border-navy-200 px-5 text-sm font-bold text-navy-700 transition-colors hover:border-magenta-500 hover:text-magenta-600"
      >
        <PlusIcon className="h-4 w-4" />
        Ajouter un service
      </button>
    </div>
  );
}
import type { PageImage } from "@/data/logement-installation";
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
  SelectInput,
  StatusChip,
  TextArea,
  TextInput,
  Toggle,
} from "@/components/admin/logement/fields";

export type EditableItem = {
  id: string;
  number?: string;
  title: string;
  description: string;
  icon: string;
  image?: PageImage | null;
  order: number;
  published: boolean;
};

export function ItemsEditor({
  addLabel,
  iconOptions,
  showNumber,
  showImage,
  items,
  onAdd,
  onPatch,
  onDelete,
  onMove,
  onTogglePublished,
}: {
  addLabel: string;
  iconOptions: { value: string; label: string }[];
  showNumber: boolean;
  showImage: boolean;
  items: EditableItem[];
  onAdd: () => void;
  onPatch: (id: string, patch: Partial<EditableItem>) => void;
  onDelete: (id: string) => void;
  onMove: (index: number, direction: -1 | 1) => void;
  onTogglePublished: (id: string) => void;
}) {
  return (
    <div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="rounded-2xl bg-cream p-4 ring-1 ring-navy-100 sm:p-5"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-900 text-xs font-bold text-white">
                {index + 1}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-bold text-navy-900">
                {item.title || "Sans titre"}
              </span>
              <StatusChip published={item.published} />
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
                  disabled={index === items.length - 1}
                  onClick={() => onMove(index, 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-600 transition-colors hover:bg-navy-100 disabled:pointer-events-none disabled:opacity-30"
                >
                  <ArrowDownIcon className="h-4 w-4" />
                </button>
                <Toggle
                  checked={item.published}
                  onChange={() => onTogglePublished(item.id)}
                  label={`${item.published ? "Masquer" : "Publier"} ${item.title}`}
                />
              </div>
            </div>

            <details className="group mt-3">
              <summary className="flex cursor-pointer list-none items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-magenta-600 hover:text-magenta-500">
                <PencilIcon className="h-3.5 w-3.5" />
                Modifier
              </summary>
              <div className="mt-4 space-y-4">
                {showNumber ? (
                  <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
                    <Field label="Numéro">
                      <TextInput
                        value={item.number ?? ""}
                        onChange={(value) =>
                          onPatch(item.id, { number: value })
                        }
                        placeholder="01"
                      />
                    </Field>
                    <Field label="Icône">
                      <SelectInput
                        value={item.icon}
                        onChange={(value) => onPatch(item.id, { icon: value })}
                        options={iconOptions}
                      />
                    </Field>
                  </div>
                ) : (
                  <Field label="Icône">
                    <SelectInput
                      value={item.icon}
                      onChange={(value) => onPatch(item.id, { icon: value })}
                      options={iconOptions}
                    />
                  </Field>
                )}
                <Field label="Titre">
                  <TextInput
                    value={item.title}
                    onChange={(value) => onPatch(item.id, { title: value })}
                  />
                </Field>
                <Field label="Description">
                  <TextArea
                    value={item.description}
                    rows={3}
                    onChange={(value) =>
                      onPatch(item.id, { description: value })
                    }
                  />
                </Field>
                {showImage ? (
                  <Field label="Image facultative">
                    <ImageField
                      url={item.image?.url ?? ""}
                      alt={item.image?.alt ?? ""}
                      onChangeUrl={(value) =>
                        onPatch(item.id, {
                          image: value
                            ? { url: value, alt: item.image?.alt ?? "" }
                            : null,
                        })
                      }
                      onChangeAlt={(value) =>
                        onPatch(item.id, {
                          image: item.image?.url
                            ? { url: item.image.url, alt: value }
                            : null,
                        })
                      }
                    />
                  </Field>
                ) : null}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
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
        {addLabel}
      </button>
    </div>
  );
}
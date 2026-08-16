import {
  ArrowDownIcon,
  ArrowUpIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/icons";
import {
  Field,
  SelectInput,
  StatusChip,
  TextInput,
  Toggle,
} from "@/components/admin/ui/fields";

export type SimpleEditableItem = {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  order: number;
  published: boolean;
};

export function SimpleItemsEditor({
  addLabel,
  items,
  showDescription,
  showIcon,
  iconOptions,
  onAdd,
  onPatch,
  onDelete,
  onMove,
  onTogglePublished,
}: {
  addLabel: string;
  items: SimpleEditableItem[];
  showDescription?: boolean;
  showIcon?: boolean;
  iconOptions?: { value: string; label: string }[];
  onAdd: () => void;
  onPatch: (id: string, patch: Partial<SimpleEditableItem>) => void;
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

            <div className="mt-4 space-y-4">
              {showIcon && iconOptions ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Titre">
                    <TextInput
                      value={item.title}
                      onChange={(value) => onPatch(item.id, { title: value })}
                    />
                  </Field>
                  <Field label="Icône">
                    <SelectInput
                      value={item.icon ?? ""}
                      onChange={(value) => onPatch(item.id, { icon: value })}
                      options={iconOptions}
                    />
                  </Field>
                </div>
              ) : (
                <Field label="Titre">
                  <TextInput
                    value={item.title}
                    onChange={(value) => onPatch(item.id, { title: value })}
                  />
                </Field>
              )}
              {showDescription ? (
                <Field label="Description">
                  <TextInput
                    value={item.description ?? ""}
                    onChange={(value) =>
                      onPatch(item.id, { description: value })
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
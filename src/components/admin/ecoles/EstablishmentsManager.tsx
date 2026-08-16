"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Establishment } from "@/data/ecoles-formations";
import { statutOptions, villeOptions } from "@/data/ecoles-formations";
import type { EcolesContent } from "@/lib/content-store";
import {
  deleteEstablishmentAction,
  publishEstablishmentAction,
  saveEcolesContentAction,
} from "@/app/admin/ecoles/actions";
import { AdminPageHeader } from "@/components/admin/ui/PageHeader";
import { AdminSearch } from "@/components/admin/ui/Search";
import { AdminEmptyState } from "@/components/admin/ui/EmptyState";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";
import { Toast, type ToastData } from "@/components/admin/ui/Toast";
import {
  Field,
  SelectInput,
  StatusChip,
  TextArea,
  TextInput,
  Toggle,
} from "@/components/admin/ui/fields";
import {
  BuildingIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/icons";

const emptyEstablishment: Omit<Establishment, "id" | "slug"> = {
  name: "",
  status: "reference",
  city: "Casablanca",
  neighborhood: "",
  description: "",
  logo: "",
  coverImage: "",
  fields: [],
  formations: [],
  levels: [],
  diplomas: [],
  accreditation: "",
  admissionConditions: "",
  foreignStudentAdmission: "",
  intakeDates: "",
  tuitionFees: "",
  additionalFees: "",
  contact: { phone: "", email: "", address: "" },
  website: "",
  published: false,
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function EstablishmentsManager({
  initialContent,
}: {
  initialContent: EcolesContent;
}) {
  const [content, setContent] = useState(initialContent);
  const [query, setQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("Toutes");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [editing, setEditing] = useState<Establishment | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [draft, setDraft] = useState<Establishment>({ ...emptyEstablishment, id: "", slug: "" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<Establishment | null>(null);
  const [toast, setToast] = useState<ToastData>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const items = content.establishments;

  const filtered = items.filter((item) => {
    const matchesQuery =
      query.trim().length === 0 ||
      [item.name, item.city, item.description]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase());
    const matchesCity = cityFilter === "Toutes" || item.city === cityFilter;
    const matchesStatus =
      statusFilter === "Tous" ||
      (statusFilter === "publié" && item.published) ||
      (statusFilter === "brouillon" && !item.published);
    return matchesQuery && matchesCity && matchesStatus;
  });

  const notify = (message: string, kind: "success" | "error" = "success") =>
    setToast({ kind, message });

  const openNew = () => {
    setDraft({ ...emptyEstablishment, id: crypto.randomUUID(), slug: "" });
    setIsNew(true);
    setEditing(draft);
  };

  const openEdit = (item: Establishment) => {
    setDraft({ ...item });
    setIsNew(false);
    setEditing(item);
  };

  const closeEditor = () => setEditing(null);

  const saveItem = async () => {
    if (!editing) return;
    if (!draft.name.trim()) {
      notify("Le nom de l'établissement est obligatoire.", "error");
      return;
    }
    const clean = { ...draft };
    if (isNew || !clean.slug.trim()) {
      clean.slug = slugify(clean.name) || clean.id;
    }
    setSaving(true);
    const next: EcolesContent = {
      ...content,
      establishments: isNew
        ? [...content.establishments, clean]
        : content.establishments.map((item) =>
            item.id === clean.id ? clean : item,
          ),
    };
    const result = await saveEcolesContentAction(
      next,
      isNew ? "Établissement ajouté" : "Établissement modifié",
    );
    setSaving(false);
    if (result.ok) {
      setContent(next);
      closeEditor();
      notify(
        isNew
          ? "Établissement ajouté en brouillon. Le publier pour l'afficher sur /ecoles-formations."
          : "Établissement enregistré.",
      );
    } else {
      notify(result.message ?? "L'enregistrement a échoué.", "error");
    }
  };

  const togglePublished = async (item: Establishment) => {
    const published = !item.published;
    const nextItems = items.map((current) =>
      current.id === item.id ? { ...current, published } : current,
    );
    setContent({ ...content, establishments: nextItems });
    const result = await publishEstablishmentAction(item, published);
    if (!result.ok) notify(result.message ?? "L'action a échoué.", "error");
    else
      notify(
        published
          ? "Établissement publié : visible sur /ecoles-formations."
          : "Établissement dépublié : masqué du site public.",
      );
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    const result = await deleteEstablishmentAction(deleting);
    if (result.ok) {
      setContent({
        ...content,
        establishments: content.establishments.filter(
          (item) => item.id !== deleting.id,
        ),
      });
      notify("Établissement supprimé.");
    } else {
      notify(result.message ?? "La suppression a échoué.", "error");
    }
    setDeleting(null);
  };

  const patch = (patch: Partial<Establishment>) => setDraft({ ...draft, ...patch });

  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        title="Établissements"
        description="Gère le catalogue d'établissements affiché sur la page"
        destination="/ecoles-formations"
        actions={
          <button
            type="button"
            onClick={openNew}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-magenta-500 px-6 text-admin-button text-white transition-colors hover:bg-magenta-600"
          >
            <PlusIcon className="h-4 w-4" />
            Ajouter un établissement
          </button>
        }
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <AdminSearch
          value={query}
          onChange={setQuery}
          placeholder="Rechercher un établissement..."
        />
        <SelectInput
          value={cityFilter}
          onChange={setCityFilter}
          options={["Toutes", ...villeOptions].map((city) => ({
            value: city,
            label: city,
          }))}
        />
        <SelectInput
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: "Tous", label: "Tous les statuts" },
            { value: "publié", label: "Publié" },
            { value: "brouillon", label: "Brouillon" },
          ]}
        />
      </div>

      <p className="mt-6 text-sm font-semibold text-navy-600" aria-live="polite">
        {filtered.length} établissement{filtered.length > 1 ? "s" : ""}
        {filtered.length !== items.length ? ` sur ${items.length}` : ""}
      </p>

      {items.length === 0 ? (
        <div className="mt-6">
          <AdminEmptyState
            icon={<BuildingIcon className="h-6 w-6" />}
            title="Aucun établissement pour le moment."
            description="Le catalogue se remplit ici : seuls les établissements publiés apparaissent sur le site public."
            actionLabel="Ajouter un établissement"
            onAction={openNew}
          />
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-navy-200 bg-white px-6 py-12 text-center">
          <p className="text-sm text-navy-600">
            Aucun établissement ne correspond à ta recherche.
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((item) => (
            <li key={item.id} className="rounded-3xl bg-white p-5 ring-1 ring-navy-100">
              <div className="flex flex-wrap items-center gap-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-navy-900">
                    {item.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-navy-500">
                    {item.city}
                    {item.website ? ` · ${item.website}` : ""}
                  </span>
                </span>
                <StatusChip published={item.published} />
                <div className="flex items-center gap-1">
                  <Toggle
                    checked={item.published}
                    onChange={() => togglePublished(item)}
                    label={`${item.published ? "Dépublier" : "Publier"} ${item.name}`}
                  />
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    aria-label="Modifier"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-600 transition-colors hover:bg-navy-100"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleting(item)}
                    aria-label="Supprimer"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-600 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {item.published ? (
                <Link
                  href={`/ecoles-formations/${item.slug}`}
                  target="_blank"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-magenta-600 hover:text-magenta-500"
                >
                  Voir la fiche publique
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {editing ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={isNew ? "Ajouter un établissement" : "Modifier l'établissement"}
          onClick={closeEditor}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-admin-section text-navy-900">
              {isNew ? "Ajouter un établissement" : "Modifier l'établissement"}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Nom">
                  <TextInput
                    value={draft.name}
                    onChange={(value) => patch({ name: value })}
                  />
                </Field>
              </div>
              <Field label="Ville">
                <SelectInput
                  value={draft.city}
                  onChange={(value) => patch({ city: value })}
                  options={villeOptions.map((city) => ({ value: city, label: city }))}
                />
              </Field>
              <Field label="Quartier (facultatif)">
                <TextInput
                  value={draft.neighborhood}
                  onChange={(value) => patch({ neighborhood: value })}
                />
              </Field>
              <Field label="Statut d'établissement">
                <SelectInput
                  value={draft.status}
                  onChange={(value) =>
                    patch({ status: value as "partenaire" | "reference" })
                  }
                  options={statutOptions.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                />
              </Field>
              <Field label="Site web">
                <TextInput
                  value={draft.website}
                  onChange={(value) => patch({ website: value })}
                  placeholder="https://..."
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Description">
                  <TextArea
                    value={draft.description}
                    rows={4}
                    onChange={(value) => patch({ description: value })}
                  />
                </Field>
              </div>
              <Field label="Logo (URL /images/...)">
                <TextInput
                  value={draft.logo}
                  onChange={(value) => patch({ logo: value })}
                />
              </Field>
              <Field label="Image de couverture (URL /images/...)">
                <TextInput
                  value={draft.coverImage}
                  onChange={(value) => patch({ coverImage: value })}
                />
              </Field>
              <Field label="Filières (séparées par des virgules)">
                <TextInput
                  value={draft.fields.join(", ")}
                  onChange={(value) =>
                    patch({
                      fields: value
                        .split(",")
                        .map((field) => field.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Field>
              <Field label="Niveaux (séparés par des virgules)">
                <TextInput
                  value={draft.levels.join(", ")}
                  onChange={(value) =>
                    patch({
                      levels: value
                        .split(",")
                        .map((level) => level.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </Field>
              <Field label="Accréditation">
                <TextInput
                  value={draft.accreditation}
                  onChange={(value) => patch({ accreditation: value })}
                />
              </Field>
              <Field label="Conditions d'admission">
                <TextInput
                  value={draft.admissionConditions}
                  onChange={(value) => patch({ admissionConditions: value })}
                />
              </Field>
              <Field label="Admission étudiants étrangers">
                <TextInput
                  value={draft.foreignStudentAdmission}
                  onChange={(value) => patch({ foreignStudentAdmission: value })}
                />
              </Field>
              <Field label="Dates de rentrée">
                <TextInput
                  value={draft.intakeDates}
                  onChange={(value) => patch({ intakeDates: value })}
                />
              </Field>
              <Field label="Frais de scolarité">
                <TextInput
                  value={draft.tuitionFees}
                  onChange={(value) => patch({ tuitionFees: value })}
                />
              </Field>
              <Field label="Frais supplémentaires">
                <TextInput
                  value={draft.additionalFees}
                  onChange={(value) => patch({ additionalFees: value })}
                />
              </Field>
              <Field label="Contact — téléphone">
                <TextInput
                  value={draft.contact.phone}
                  onChange={(value) =>
                    patch({ contact: { ...draft.contact, phone: value } })
                  }
                />
              </Field>
              <Field label="Contact — email">
                <TextInput
                  value={draft.contact.email}
                  onChange={(value) =>
                    patch({ contact: { ...draft.contact, email: value } })
                  }
                />
              </Field>
              <Field label="Contact — adresse">
                <TextInput
                  value={draft.contact.address}
                  onChange={(value) =>
                    patch({ contact: { ...draft.contact, address: value } })
                  }
                />
              </Field>
              <Field label="Statut">
                <SelectInput
                  value={draft.published ? "publié" : "brouillon"}
                  onChange={(value) =>
                    patch({ published: value === "publié" })
                  }
                  options={[
                    { value: "brouillon", label: "Brouillon" },
                    { value: "publié", label: "Publié" },
                  ]}
                />
              </Field>
            </div>
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeEditor}
                className="inline-flex h-10 items-center justify-center rounded-full border border-navy-200 px-6 text-admin-button text-navy-900 transition-colors hover:border-navy-900"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={saveItem}
                disabled={saving}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-magenta-500 px-6 text-admin-button text-white transition-colors hover:bg-magenta-600 disabled:opacity-60"
              >
                {saving ? "Enregistrement…" : isNew ? "Ajouter" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <ConfirmDialog
        open={deleting !== null}
        title="Supprimer cet établissement ?"
        description="Cette action est définitive. Les formations liées resteront dans le catalogue mais l'établissement disparaîtra du site public."
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />

      <Toast toast={toast} />
    </div>
  );
}
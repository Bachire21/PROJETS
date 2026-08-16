"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Testimonial } from "@/data/temoignages";
import type { TemoignagesContent } from "@/lib/content-store";
import { sortByOrder } from "@/lib/logement-content-utils";
import {
  deleteTestimonialAction,
  publishTestimonialAction,
  saveTemoignagesContentAction,
} from "@/app/admin/temoignages/actions";
import { AdminPageHeader } from "@/components/admin/ui/PageHeader";
import { AdminSearch } from "@/components/admin/ui/Search";
import { AdminEmptyState } from "@/components/admin/ui/EmptyState";
import { ConfirmDialog } from "@/components/admin/ui/ConfirmDialog";
import { Toast, type ToastData } from "@/components/admin/ui/Toast";
import {
  Field,
  ImageField,
  SelectInput,
  StatusChip,
  TextArea,
  TextInput,
  Toggle,
} from "@/components/admin/ui/fields";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  QuoteIcon,
  TrashIcon,
} from "@/components/icons";
import { TemoignagesPreviewModal } from "@/components/admin/temoignages/TemoignagesPreviewModal";

const emptyTestimonial: Omit<Testimonial, "id"> = {
  firstName: "",
  lastName: "",
  country: "",
  city: "",
  formation: "",
  school: "",
  quote: "",
  image: null,
  published: false,
  order: 1,
  featured: false,
};

export function TemoignagesManager({
  initialContent,
}: {
  initialContent: TemoignagesContent;
}) {
  const [content, setContent] = useState(initialContent);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [draft, setDraft] = useState<Testimonial>({
    ...emptyTestimonial,
    id: "",
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<Testimonial | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [toast, setToast] = useState<ToastData>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const items = useMemo(
    () => sortByOrder(content.testimonials),
    [content.testimonials],
  );

  const filtered = items.filter((item) => {
    const matchesQuery =
      query.trim().length === 0 ||
      [
        item.firstName,
        item.lastName,
        item.country,
        item.city,
        item.formation,
        item.quote,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase());
    const matchesStatus =
      statusFilter === "Tous" ||
      (statusFilter === "publié" && item.published) ||
      (statusFilter === "brouillon" && !item.published);
    return matchesQuery && matchesStatus;
  });

  const notify = (message: string, kind: "success" | "error" = "success") =>
    setToast({ kind, message });

  const openNew = () => {
    setDraft({
      ...emptyTestimonial,
      id: crypto.randomUUID(),
      order: items.length + 1,
    });
    setIsNew(true);
    setEditing(draft);
  };

  const openEdit = (item: Testimonial) => {
    setDraft({ ...item });
    setIsNew(false);
    setEditing(item);
  };

  const closeEditor = () => setEditing(null);

  const saveItem = async () => {
    if (!editing) return;
    if (!draft.firstName.trim() || !draft.quote.trim()) {
      notify("Le prénom et le témoignage sont obligatoires.", "error");
      return;
    }
    setSaving(true);
    const next: TemoignagesContent = {
      ...content,
      testimonials: isNew
        ? [...content.testimonials, draft]
        : content.testimonials.map((item) =>
            item.id === draft.id ? draft : item,
          ),
    };
    const result = await saveTemoignagesContentAction(
      next,
      isNew ? "Témoignage ajouté" : "Témoignage modifié",
    );
    setSaving(false);
    if (result.ok) {
      setContent(next);
      closeEditor();
      notify(
        isNew
          ? "Témoignage ajouté en brouillon. Le publier pour le rendre visible."
          : "Témoignage enregistré.",
      );
    } else {
      notify(result.message ?? "L'enregistrement a échoué.", "error");
    }
  };

  const togglePublished = async (item: Testimonial) => {
    const published = !item.published;
    const nextItems = items.map((current) =>
      current.id === item.id ? { ...current, published } : current,
    );
    setContent({ ...content, testimonials: nextItems });
    const result = await publishTestimonialAction(item, published);
    if (!result.ok) notify(result.message ?? "L'action a échoué.", "error");
    else
      notify(
        published
          ? "Témoignage publié : visible sur /temoignages."
          : "Témoignage dépublié : masqué du site public.",
      );
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    const result = await deleteTestimonialAction(deleting);
    if (result.ok) {
      setContent({
        ...content,
        testimonials: content.testimonials.filter(
          (item) => item.id !== deleting.id,
        ),
      });
      notify("Témoignage supprimé.");
    } else {
      notify(result.message ?? "La suppression a échoué.", "error");
    }
    setDeleting(null);
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    next.forEach((item, i) => {
      item.order = i + 1;
    });
    setContent({ ...content, testimonials: next });
    saveTemoignagesContentAction(
      { ...content, testimonials: next },
      "Témoignages réordonnés",
    ).then((result) => {
      if (result.ok) notify("Ordre enregistré.");
      else notify(result.message ?? "Erreur lors de l'enregistrement.", "error");
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        title="Témoignages"
        description="Gère les témoignages affichés sur la page"
        destination="/temoignages"
        actions={
          <button
            type="button"
            onClick={openNew}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-magenta-500 px-6 text-admin-button text-white transition-colors hover:bg-magenta-600"
          >
            <PlusIcon className="h-4 w-4" />
            Ajouter un témoignage
          </button>
        }
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
        <AdminSearch
          value={query}
          onChange={setQuery}
          placeholder="Rechercher un témoignage..."
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

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-navy-600" aria-live="polite">
          {filtered.length} témoignage{filtered.length > 1 ? "s" : ""}
          {filtered.length !== items.length ? ` sur ${items.length}` : ""}
        </p>
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-navy-300 bg-white px-5 text-sm font-bold text-navy-900 transition-colors hover:border-navy-900"
        >
          <EyeIcon className="h-4 w-4" />
          Aperçu de la page
        </button>
      </div>

      {items.length === 0 ? (
        <div className="mt-6">
          <AdminEmptyState
            icon={<QuoteIcon className="h-6 w-6" />}
            title="Aucun témoignage pour le moment."
            description="Les témoignages des étudiants accompagnés seront ajoutés ici, sans aucune donnée fictive."
            actionLabel="Ajouter un témoignage"
            onAction={openNew}
          />
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-navy-200 bg-white px-6 py-12 text-center">
          <p className="text-sm text-navy-600">
            Aucun témoignage ne correspond à ta recherche.
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((item, index) => (
            <li
              key={item.id}
              className="rounded-3xl bg-white p-5 ring-1 ring-navy-100"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white">
                  {(item.firstName[0] ?? "") + (item.lastName[0] ?? "")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-navy-900">
                    {item.firstName} {item.lastName}
                    {item.featured ? " ★" : ""}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-navy-500">
                    {[item.formation, item.city].filter(Boolean).join(" · ") ||
                      "Sans formation"}
                  </span>
                </span>
                <StatusChip published={item.published} />
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Monter"
                    disabled={index === 0}
                    onClick={() => move(index, -1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-600 transition-colors hover:bg-navy-100 disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ArrowUpIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Descendre"
                    disabled={index === filtered.length - 1}
                    onClick={() => move(index, 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-600 transition-colors hover:bg-navy-100 disabled:pointer-events-none disabled:opacity-30"
                  >
                    <ArrowDownIcon className="h-4 w-4" />
                  </button>
                  <Toggle
                    checked={item.published}
                    onChange={() => togglePublished(item)}
                    label={`${item.published ? "Dépublier" : "Publier"} le témoignage de ${item.firstName}`}
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
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-navy-700/75">
                « {item.quote} »
              </p>
              {item.published ? (
                <Link
                  href="/temoignages"
                  target="_blank"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-magenta-600 hover:text-magenta-500"
                >
                  Voir sur le site public
                  <ArrowRightIcon className="h-3.5 w-3.5" />
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
          aria-label={isNew ? "Ajouter un témoignage" : "Modifier le témoignage"}
          onClick={closeEditor}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-admin-section text-navy-900">
              {isNew ? "Ajouter un témoignage" : "Modifier le témoignage"}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Prénom">
                <TextInput
                  value={draft.firstName}
                  onChange={(value) => setDraft({ ...draft, firstName: value })}
                />
              </Field>
              <Field label="Nom">
                <TextInput
                  value={draft.lastName}
                  onChange={(value) => setDraft({ ...draft, lastName: value })}
                />
              </Field>
              <Field label="Pays">
                <TextInput
                  value={draft.country}
                  onChange={(value) => setDraft({ ...draft, country: value })}
                  placeholder="Ex. Côte d'Ivoire"
                />
              </Field>
              <Field label="Ville au Maroc">
                <TextInput
                  value={draft.city}
                  onChange={(value) => setDraft({ ...draft, city: value })}
                  placeholder="Ex. Rabat"
                />
              </Field>
              <Field label="Formation">
                <TextInput
                  value={draft.formation}
                  onChange={(value) => setDraft({ ...draft, formation: value })}
                  placeholder="Ex. Master en droit"
                />
              </Field>
              <Field label="Établissement">
                <TextInput
                  value={draft.school}
                  onChange={(value) => setDraft({ ...draft, school: value })}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Témoignage">
                  <TextArea
                    value={draft.quote}
                    rows={5}
                    onChange={(value) => setDraft({ ...draft, quote: value })}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Photo (facultative)">
                  <ImageField
                    url={draft.image?.url ?? ""}
                    alt={draft.image?.alt ?? ""}
                    onChangeUrl={(value) =>
                      setDraft({
                        ...draft,
                        image: value
                          ? { url: value, alt: draft.image?.alt ?? "" }
                          : null,
                      })
                    }
                    onChangeAlt={(value) =>
                      setDraft({
                        ...draft,
                        image: draft.image?.url
                          ? { url: draft.image.url, alt: value }
                          : null,
                      })
                    }
                  />
                </Field>
              </div>
              <Field label="Statut">
                <SelectInput
                  value={draft.published ? "publié" : "brouillon"}
                  onChange={(value) =>
                    setDraft({ ...draft, published: value === "publié" })
                  }
                  options={[
                    { value: "brouillon", label: "Brouillon" },
                    { value: "publié", label: "Publié" },
                  ]}
                />
              </Field>
              <Field
                label="Témoignage mis en avant"
                hint="La première carte de la page publique."
              >
                <div className="flex h-11 items-center">
                  <Toggle
                    checked={draft.featured}
                    onChange={(value) => setDraft({ ...draft, featured: value })}
                    label="Témoignage mis en avant"
                  />
                </div>
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
                <ArrowRightIcon className="h-4 w-4" />
                {saving ? "Enregistrement…" : isNew ? "Ajouter" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <ConfirmDialog
        open={deleting !== null}
        title="Supprimer ce témoignage ?"
        description="Cette action est définitive. Le témoignage sera retiré de l'Admin et du site public."
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />

      {previewOpen ? (
        <TemoignagesPreviewModal
          content={content}
          onClose={() => setPreviewOpen(false)}
        />
      ) : null}

      <Toast toast={toast} />
    </div>
  );
}
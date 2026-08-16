"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { FAQItem } from "@/data/faq";
import type { FaqContent } from "@/lib/content-store";
import { sortByOrder } from "@/lib/logement-content-utils";
import {
  deleteFaqAction,
  publishFaqAction,
  saveFaqContentAction,
} from "@/app/admin/faq/actions";
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
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  QuestionIcon,
  TrashIcon,
} from "@/components/icons";
import { FaqPreviewModal } from "@/components/admin/faq/FaqPreviewModal";

const emptyItem: Omit<FAQItem, "id"> = {
  question: "",
  answer: "",
  category: "",
  order: 1,
  published: false,
};

export function FaqManager({ initialContent }: { initialContent: FaqContent }) {
  const [content, setContent] = useState(initialContent);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Toutes");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [editing, setEditing] = useState<FAQItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [draft, setDraft] = useState<FAQItem>({ ...emptyItem, id: "" });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<FAQItem | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [toast, setToast] = useState<ToastData>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const items = useMemo(() => sortByOrder(content.faqItems), [content.faqItems]);
  const categories = useMemo(() => {
    const set = new Set(items.map((item) => item.category).filter(Boolean));
    return ["Toutes", ...set];
  }, [items]);

  const filtered = items.filter((item) => {
    const matchesQuery =
      query.trim().length === 0 ||
      [item.question, item.answer]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase());
    const matchesCategory =
      categoryFilter === "Toutes" || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === "Tous" ||
      (statusFilter === "publié" && item.published) ||
      (statusFilter === "brouillon" && !item.published);
    return matchesQuery && matchesCategory && matchesStatus;
  });

  const notify = (message: string, kind: "success" | "error" = "success") =>
    setToast({ kind, message });

  const openNew = () => {
    setDraft({
      ...emptyItem,
      id: crypto.randomUUID(),
      order: items.length + 1,
    });
    setIsNew(true);
    setEditing(draft);
  };

  const openEdit = (item: FAQItem) => {
    setDraft({ ...item });
    setIsNew(false);
    setEditing(item);
  };

  const closeEditor = () => {
    setEditing(null);
  };

  const saveItem = async () => {
    if (!editing) return;
    if (!draft.question.trim() || !draft.answer.trim()) {
      notify("La question et la réponse sont obligatoires.", "error");
      return;
    }
    setSaving(true);
    const next: FaqContent = {
      ...content,
      faqItems: isNew
        ? [...content.faqItems, draft]
        : content.faqItems.map((item) => (item.id === draft.id ? draft : item)),
    };
    const result = await saveFaqContentAction(
      next,
      isNew ? "FAQ ajoutée" : "FAQ modifiée",
    );
    setSaving(false);
    if (result.ok) {
      setContent(next);
      closeEditor();
      notify(isNew ? "Question ajoutée. La publier pour la rendre visible." : "Question enregistrée.");
    } else {
      notify(result.message ?? "L'enregistrement a échoué.", "error");
    }
  };

  const togglePublished = async (item: FAQItem) => {
    const published = !item.published;
    const nextItems = items.map((current) =>
      current.id === item.id ? { ...current, published } : current,
    );
    setContent({ ...content, faqItems: nextItems });
    const result = await publishFaqAction(item, published);
    if (!result.ok) notify(result.message ?? "L'action a échoué.", "error");
    else
      notify(
        published
          ? "Question publiée : visible sur /faq."
          : "Question dépubliée : masquée du site public.",
      );
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    const result = await deleteFaqAction(deleting);
    if (result.ok) {
      setContent({
        ...content,
        faqItems: content.faqItems.filter((item) => item.id !== deleting.id),
      });
      notify("Question supprimée.");
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
    setContent({ ...content, faqItems: next });
    saveFaqContentAction({ ...content, faqItems: next }, "FAQ réordonnée").then(
      (result) => {
        if (result.ok) notify("Ordre enregistré.");
        else notify(result.message ?? "Erreur lors de l'enregistrement.", "error");
      },
    );
  };

  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        title="FAQ"
        description="Gère les questions et réponses affichées sur la page"
        destination="/faq"
        actions={
          <button
            type="button"
            onClick={openNew}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-magenta-500 px-6 text-admin-button text-white transition-colors hover:bg-magenta-600"
          >
            <PlusIcon className="h-4 w-4" />
            Ajouter une question
          </button>
        }
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <AdminSearch
          value={query}
          onChange={setQuery}
          placeholder="Rechercher une question..."
        />
        <SelectInput
          value={categoryFilter}
          onChange={setCategoryFilter}
          options={categories.map((category) => ({
            value: category,
            label: category,
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

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-navy-600" aria-live="polite">
          {filtered.length} question{filtered.length > 1 ? "s" : ""}
          {filtered.length !== items.length
            ? ` sur ${items.length}`
            : ""}
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
            icon={<QuestionIcon className="h-6 w-6" />}
            title="Aucune question pour le moment."
            description="Ajoute une première question : elle apparaîtra sur /faq une fois publiée."
            actionLabel="Ajouter une question"
            onAction={openNew}
          />
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-navy-200 bg-white px-6 py-12 text-center">
          <p className="text-sm text-navy-600">
            Aucune question ne correspond à ta recherche.
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
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-900 text-xs font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-navy-900">
                    {item.question || "Question sans titre"}
                  </span>
                  <span className="mt-0.5 block text-xs text-navy-500">
                    {item.category || "Sans catégorie"}
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
                    label={`${item.published ? "Dépublier" : "Publier"} ${item.question}`}
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
                  href="/faq"
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
          aria-label={isNew ? "Ajouter une question" : "Modifier la question"}
          onClick={closeEditor}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-admin-section text-navy-900">
              {isNew ? "Ajouter une question" : "Modifier la question"}
            </h2>
            <div className="mt-6 space-y-5">
              <div>
                <Field label="Question">
                  <TextInput
                    value={draft.question}
                    onChange={(value) => setDraft({ ...draft, question: value })}
                    placeholder="Ex. Comment préparer mon logement avant mon arrivée ?"
                  />
                </Field>
              </div>
              <div>
                <Field label="Réponse">
                  <TextArea
                    value={draft.answer}
                    rows={5}
                    onChange={(value) => setDraft({ ...draft, answer: value })}
                  />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Catégorie"
                  hint="Les catégories du site public sont générées automatiquement."
                >
                  <TextInput
                    value={draft.category}
                    onChange={(value) => setDraft({ ...draft, category: value })}
                    placeholder="Ex. Logement, Études, Admission"
                  />
                </Field>
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
              </div>
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
        title="Supprimer cette question ?"
        description="Cette action est définitive. La question sera retirée de l'Admin et du site public."
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />

      {previewOpen ? (
        <FaqPreviewModal
          content={content}
          onClose={() => setPreviewOpen(false)}
        />
      ) : null}

      <Toast toast={toast} />
    </div>
  );
}
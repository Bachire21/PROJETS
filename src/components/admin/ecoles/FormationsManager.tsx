"use client";

import { useEffect, useState } from "react";
import type { Establishment, Formation } from "@/data/ecoles-formations";
import {
  filiereOptions,
  niveauOptions,
  statutOptions,
  villeOptions,
} from "@/data/ecoles-formations";
import type { EcolesContent } from "@/lib/content-store";
import {
  deleteFormationAction,
  publishFormationAction,
  saveEcolesContentAction,
} from "@/app/admin/ecoles/actions";
import { actionErrorMessage } from "@/lib/client-action-error";
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
  FileTextIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@/components/icons";

const emptyFormation: Omit<Formation, "id"> = {
  establishmentId: "",
  name: "",
  slug: "",
  field: "",
  level: "",
  diploma: "",
  description: "",
  duration: "",
  admissionConditions: "",
  tuitionFees: "",
  published: false,
};

const emptyNewEstablishment = {
  name: "",
  city: "Casablanca",
  status: "reference" as Establishment["status"],
  published: false,
  website: "",
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export function FormationsManager({
  initialContent,
}: {
  initialContent: EcolesContent;
}) {
  const [content, setContent] = useState(initialContent);
  const [query, setQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("Tous");
  const [fieldFilter, setFieldFilter] = useState("Toutes");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [editing, setEditing] = useState<Formation | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [draft, setDraft] = useState<Formation>({
    ...emptyFormation,
    id: "",
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<Formation | null>(null);
  const [toast, setToast] = useState<ToastData>(null);
  const [addingEstablishment, setAddingEstablishment] = useState(false);
  const [estDraft, setEstDraft] = useState(emptyNewEstablishment);
  const [savingEstablishment, setSavingEstablishment] = useState(false);
  const [estQuery, setEstQuery] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const items = content.formations;

  const establishmentName = (id: string) =>
    content.establishments.find((item) => item.id === id)?.name ?? "";

  const selectedEstablishment = content.establishments.find(
    (item) => item.id === draft.establishmentId,
  );

  const isPubliclyVisible =
    draft.published && !!selectedEstablishment && selectedEstablishment.published;

  const establishmentByName = (name: string) =>
    content.establishments.find((item) => item.name === name.trim());

  const estSuggestions = content.establishments
    .filter((item) => {
      const q = estQuery.trim().toLowerCase();
      return (
        q.length === 0 ||
        [item.name, item.city, item.website]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    })
    .sort((a, b) => {
      const q = estQuery.trim().toLowerCase();
      const score = (item: Establishment) =>
        item.name.toLowerCase().startsWith(q) ? 0 : 1;
      return score(a) - score(b) || a.name.localeCompare(b.name);
    })
    .slice(0, 8);

  const selectEstablishment = (item: Establishment) => {
    setEstQuery(item.name);
    patch({ establishmentId: item.id });
    setPickerOpen(false);
  };

  const filtered = items.filter((item) => {
    const matchesQuery =
      query.trim().length === 0 ||
      [item.name, item.field, item.level, item.diploma, establishmentName(item.establishmentId)]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase());
    const matchesLevel = levelFilter === "Tous" || item.level === levelFilter;
    const matchesField = fieldFilter === "Toutes" || item.field === fieldFilter;
    const matchesStatus =
      statusFilter === "Tous" ||
      (statusFilter === "publié" && item.published) ||
      (statusFilter === "brouillon" && !item.published);
    return matchesQuery && matchesLevel && matchesField && matchesStatus;
  });

  const notify = (message: string, kind: "success" | "error" = "success") =>
    setToast({ kind, message });

  const openNew = () => {
    setDraft({ ...emptyFormation, id: crypto.randomUUID() });
    setEstQuery("");
    setIsNew(true);
    setEditing(draft);
  };

  const openEdit = (item: Formation) => {
    setDraft({ ...item });
    setEstQuery(
      content.establishments.find((est) => est.id === item.establishmentId)
        ?.name ?? "",
    );
    setIsNew(false);
    setEditing(item);
  };

  const closeEditor = () => setEditing(null);

  const createEstablishment = async (name: string) => {
    if (!name.trim()) {
      notify("Le nom de l'établissement est obligatoire.", "error");
      return;
    }
    const establishment: Establishment = {
      id: crypto.randomUUID(),
      name: name.trim(),
      slug: slugify(name) || crypto.randomUUID(),
      status: estDraft.status,
      city: estDraft.city,
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
      website: estDraft.website.trim(),
      published: estDraft.published,
    };
    setSavingEstablishment(true);
    const next: EcolesContent = {
      ...content,
      establishments: [...content.establishments, establishment],
    };
    try {
      const result = await saveEcolesContentAction(next, "Établissement ajouté");
      if (result.ok) {
        setContent(next);
        setDraft({ ...draft, establishmentId: establishment.id });
        setEstQuery(establishment.name);
        setEstDraft(emptyNewEstablishment);
        setAddingEstablishment(false);
        notify(
          estDraft.published
            ? "Établissement créé et publié : la formation sera visible sur le site public."
            : "Établissement créé en brouillon. La formation n'apparaîtra sur le site public qu'après publication de l'établissement.",
        );
      } else {
        notify(result.message ?? "L'enregistrement a échoué.", "error");
      }
    } catch (error) {
      console.error("createEstablishment : la Server Action a rejeté la requête.", error);
      notify(
        actionErrorMessage(
          error,
          "L'enregistrement n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
        ),
        "error",
      );
    } finally {
      setSavingEstablishment(false);
    }
  };

  const saveItem = async () => {
    if (!editing) return;
    if (!draft.name.trim()) {
      notify("Le titre de la formation est obligatoire.", "error");
      return;
    }
    const clean = { ...draft };
    if (isNew || !clean.slug.trim()) {
      clean.slug = slugify(clean.name) || clean.id;
    }
    setSaving(true);
    const next: EcolesContent = {
      ...content,
      formations: isNew
        ? [...content.formations, clean]
        : content.formations.map((item) => (item.id === clean.id ? clean : item)),
    };
    try {
      const result = await saveEcolesContentAction(
        next,
        isNew ? "Formation ajoutée" : "Formation modifiée",
      );
      if (result.ok) {
        setContent(next);
        closeEditor();
        notify(
          isNew
            ? isPubliclyVisible
              ? "Formation ajoutée : visible sur le site public."
              : "Formation ajoutée en brouillon. Elle n'apparaîtra sur le site public qu'une fois publiée et rattachée à un établissement publié."
            : "Formation enregistrée.",
        );
      } else {
        notify(result.message ?? "L'enregistrement a échoué.", "error");
      }
    } catch (error) {
      console.error("saveItem : la Server Action a rejeté la requête.", error);
      notify(
        actionErrorMessage(
          error,
          "L'enregistrement n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
        ),
        "error",
      );
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (item: Formation) => {
    const published = !item.published;
    const nextItems = items.map((current) =>
      current.id === item.id ? { ...current, published } : current,
    );
    setContent({ ...content, formations: nextItems });
    try {
      const result = await publishFormationAction(item, published);
      if (!result.ok) notify(result.message ?? "L'action a échoué.", "error");
      else {
        if (published) {
          const linked = content.establishments.find(
            (current) => current.id === item.establishmentId,
          );
          notify(
            linked && linked.published
              ? "Formation publiée : visible sur le site public."
              : "Formation publiée. Elle n'apparaîtra sur le site public qu'après publication de son établissement.",
          );
        } else {
          notify("Formation dépubliée : masquée du site public.");
        }
      }
    } catch (error) {
      console.error("togglePublished : la Server Action a rejeté la requête.", error);
      notify(
        actionErrorMessage(
          error,
          "L'action n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
        ),
        "error",
      );
    }
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    try {
      const result = await deleteFormationAction(deleting);
      if (result.ok) {
        setContent({
          ...content,
          formations: content.formations.filter((item) => item.id !== deleting.id),
        });
        notify("Formation supprimée.");
      } else {
        notify(result.message ?? "La suppression a échoué.", "error");
      }
    } catch (error) {
      console.error("confirmDelete : la Server Action a rejeté la requête.", error);
      notify(
        actionErrorMessage(
          error,
          "La suppression n'a pas abouti (réseau ou serveur indisponible). Réessaie.",
        ),
        "error",
      );
    } finally {
      setDeleting(null);
    }
  };

  const patch = (patch: Partial<Formation>) => setDraft({ ...draft, ...patch });

  return (
    <div className="mx-auto max-w-5xl">
      <AdminPageHeader
        title="Formations"
        description="Gère les formations du catalogue, rattachées aux établissements de la page"
        destination="/ecoles-formations"
        actions={
          <button
            type="button"
            onClick={openNew}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-magenta-500 px-6 text-admin-button text-white transition-colors hover:bg-magenta-600"
          >
            <PlusIcon className="h-4 w-4" />
            Ajouter une formation
          </button>
        }
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto]">
        <AdminSearch
          value={query}
          onChange={setQuery}
          placeholder="Rechercher une formation..."
        />
        <SelectInput
          value={levelFilter}
          onChange={setLevelFilter}
          options={["Tous", ...niveauOptions].map((level) => ({
            value: level,
            label: level,
          }))}
        />
        <SelectInput
          value={fieldFilter}
          onChange={setFieldFilter}
          options={["Toutes", ...filiereOptions].map((field) => ({
            value: field,
            label: field,
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
        {filtered.length} formation{filtered.length > 1 ? "s" : ""}
        {filtered.length !== items.length ? ` sur ${items.length}` : ""}
      </p>

      {items.length === 0 ? (
        <div className="mt-6">
          <AdminEmptyState
            icon={<FileTextIcon className="h-6 w-6" />}
            title="Aucune formation pour le moment."
            description="Seules les formations publiées, rattachées à un établissement publié, apparaissent sur le site public."
            actionLabel="Ajouter une formation"
            onAction={openNew}
          />
        </div>
      ) : filtered.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-navy-200 bg-white px-6 py-12 text-center">
          <p className="text-sm text-navy-600">
            Aucune formation ne correspond à ta recherche.
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
                  <span className="mt-0.5 block truncate text-xs text-navy-500">
                    {[establishmentName(item.establishmentId) || "Sans établissement", item.level, item.field]
                      .filter(Boolean)
                      .join(" · ")}
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
            </li>
          ))}
        </ul>
      )}

      {editing ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 p-5 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={isNew ? "Ajouter une formation" : "Modifier la formation"}
          onClick={closeEditor}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-admin-section text-navy-900">
              {isNew ? "Ajouter une formation" : "Modifier la formation"}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Titre">
                  <TextInput
                    value={draft.name}
                    onChange={(value) => patch({ name: value })}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field
                  label="Établissement"
                  hint="Écris le nom d'un établissement, choisis une suggestion ou crée-le. Le site web de l'école est consultable depuis la liste."
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={estQuery}
                      onChange={(event) => {
                        const value = event.target.value;
                        setEstQuery(value);
                        const match = establishmentByName(value);
                        patch({ establishmentId: match ? match.id : "" });
                      }}
                      onFocus={() => setPickerOpen(true)}
                      onBlur={() =>
                        setTimeout(() => setPickerOpen(false), 150)
                      }
                      placeholder="Ex. Université Mohammed V"
                      className="w-full rounded-xl border border-navy-200 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-navy-300 focus:border-magenta-500 focus:outline-none focus:ring-2 focus:ring-magenta-500/20"
                    />
                    {pickerOpen ? (
                      <div className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-navy-200 bg-white shadow-lg">
                        {estSuggestions.length === 0 ? (
                          <p className="px-3.5 py-3 text-xs text-navy-500">
                            Aucun établissement ne correspond.
                          </p>
                        ) : (
                          estSuggestions.map((item) => (
                            <div
                              key={item.id}
                              onMouseDown={(event) => event.preventDefault()}
                              onClick={() => selectEstablishment(item)}
                              className="flex cursor-pointer items-center gap-2 px-3.5 py-2.5 transition-colors hover:bg-navy-50"
                            >
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-semibold text-navy-900">
                                  {item.name}
                                  {!item.published ? (
                                    <span className="ml-1.5 text-admin-label text-amber-700">
                                      (brouillon)
                                    </span>
                                  ) : null}
                                </span>
                                <span className="block truncate text-xs text-navy-500">
                                  {[item.city, item.website].filter(Boolean).join(" · ")}
                                </span>
                              </span>
                              {item.website ? (
                                <a
                                  href={item.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onMouseDown={(event) => event.stopPropagation()}
                                  onClick={(event) => event.stopPropagation()}
                                  className="shrink-0 rounded-lg bg-navy-100 px-2 py-1 text-admin-label text-navy-700 transition-colors hover:bg-magenta-500 hover:text-white"
                                >
                                  Voir le site
                                </a>
                              ) : null}
                            </div>
                          ))
                        )}
                      </div>
                    ) : null}
                  </div>
                </Field>
                {selectedEstablishment?.website ? (
                  <a
                    href={selectedEstablishment.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-block text-xs font-semibold text-navy-600 transition-colors hover:text-magenta-600"
                  >
                    Site de l&apos;école : {selectedEstablishment.website}
                  </a>
                ) : null}
                {estQuery.trim() && !establishmentByName(estQuery) ? (
                  <button
                    type="button"
                    onClick={() => createEstablishment(estQuery)}
                    disabled={savingEstablishment}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-magenta-600 transition-colors hover:text-magenta-700 disabled:opacity-60"
                  >
                    <PlusIcon className="h-3.5 w-3.5" />
                    {savingEstablishment
                      ? "Création…"
                      : `Créer l'établissement « ${estQuery.trim()} »`}
                  </button>
                ) : null}
                {isPubliclyVisible ? (
                  <p className="mt-2 flex items-start gap-2 rounded-xl bg-whatsapp/10 px-3.5 py-2.5 text-xs leading-relaxed font-semibold text-whatsapp-dark">
                    <span aria-hidden="true">✓</span>
                    <span>
                      Visible sur le site public dans la fiche de «{" "}
                      {selectedEstablishment.name} » (
                      /ecoles-formations/{selectedEstablishment.slug}).
                    </span>
                  </p>
                ) : (
                  <p className="mt-2 flex items-start gap-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-xs leading-relaxed font-semibold text-amber-800 ring-1 ring-amber-200">
                    <span aria-hidden="true">!</span>
                    <span>
                      {!selectedEstablishment ? (
                        <>
                          Sans établissement, cette formation n&apos;apparaîtra
                          jamais sur le site public. Choisis un établissement{" "}
                          <strong>publié</strong> ci-dessus pour la rendre
                          visible dans le catalogue.
                        </>
                      ) : (
                        <>
                          « {selectedEstablishment.name} » est en brouillon :
                          cette formation n&apos;apparaîtra sur le site public
                          qu&apos;après publication de l&apos;établissement
                          (dans /admin/etablissements).
                        </>
                      )}
                    </span>
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setAddingEstablishment(!addingEstablishment);
                    setEstDraft(emptyNewEstablishment);
                  }}
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-magenta-600 transition-colors hover:text-magenta-700"
                >
                  <PlusIcon className="h-3.5 w-3.5" />
                  {addingEstablishment
                    ? "Masquer le formulaire"
                    : "Ajouter un établissement"}
                </button>
                {addingEstablishment ? (
                  <div className="mt-3 rounded-2xl border border-navy-200 bg-navy-50/60 p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <Field label="Nom de l'établissement">
                          <TextInput
                            value={estDraft.name}
                            onChange={(value) =>
                              setEstDraft({ ...estDraft, name: value })
                            }
                            placeholder="Ex. Université Mohammed V"
                          />
                        </Field>
                      </div>
                      <Field label="Ville">
                        <SelectInput
                          value={estDraft.city}
                          onChange={(value) =>
                            setEstDraft({ ...estDraft, city: value })
                          }
                          options={villeOptions.map((city) => ({
                            value: city,
                            label: city,
                          }))}
                        />
                      </Field>
                      <Field label="Statut">
                        <SelectInput
                          value={estDraft.status}
                          onChange={(value) =>
                            setEstDraft({
                              ...estDraft,
                              status: value as Establishment["status"],
                            })
                          }
                          options={statutOptions.map((option) => ({
                            value: option.value,
                            label: option.label,
                          }))}
                        />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field label="Site web de l'école">
                          <TextInput
                            value={estDraft.website}
                            onChange={(value) =>
                              setEstDraft({ ...estDraft, website: value })
                            }
                            placeholder="Ex. https://www.univ5.ac.ma"
                          />
                        </Field>
                      </div>
                      <div className="sm:col-span-2">
                        <div className="flex items-center justify-between rounded-xl border border-navy-200 bg-white px-3.5 py-2.5">
                          <span className="text-sm font-semibold text-navy-800">
                            Publier l&apos;établissement tout de suite
                          </span>
                          <Toggle
                            checked={estDraft.published}
                            onChange={(value) =>
                              setEstDraft({ ...estDraft, published: value })
                            }
                            label="Publier l'établissement"
                          />
                        </div>
                        {estDraft.published ? (
                          <p className="mt-1.5 text-xs text-navy-500">
                            Publié : la formation rattachée sera visible sur le
                            site public.
                          </p>
                        ) : (
                          <p className="mt-1.5 text-xs text-navy-500">
                            Brouillon : à publier depuis /admin/etablissements
                            avant d&apos;apparaître sur le site public.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => createEstablishment(estDraft.name)}
                        disabled={savingEstablishment}
                        className="inline-flex h-9 items-center gap-2 rounded-full bg-navy-900 px-5 text-xs font-bold text-white transition-colors hover:bg-navy-700 disabled:opacity-60"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                        {savingEstablishment
                          ? "Création…"
                          : "Créer l'établissement"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
              <Field label="Niveau">
                <SelectInput
                  value={draft.level}
                  onChange={(value) => patch({ level: value })}
                  options={niveauOptions.map((level) => ({ value: level, label: level }))}
                />
              </Field>
              <Field label="Domaine">
                <SelectInput
                  value={draft.field}
                  onChange={(value) => patch({ field: value })}
                  options={filiereOptions.map((field) => ({ value: field, label: field }))}
                />
              </Field>
              <Field label="Diplôme">
                <TextInput
                  value={draft.diploma}
                  onChange={(value) => patch({ diploma: value })}
                  placeholder="Ex. Licence"
                />
              </Field>
              <Field label="Durée">
                <TextInput
                  value={draft.duration}
                  onChange={(value) => patch({ duration: value })}
                  placeholder="Ex. 3 ans"
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
              <Field label="Conditions d'admission">
                <TextInput
                  value={draft.admissionConditions}
                  onChange={(value) => patch({ admissionConditions: value })}
                />
              </Field>
              <Field label="Frais de scolarité">
                <TextInput
                  value={draft.tuitionFees}
                  onChange={(value) => patch({ tuitionFees: value })}
                />
              </Field>
              <Field label="Statut">
                <SelectInput
                  value={draft.published ? "publié" : "brouillon"}
                  onChange={(value) => patch({ published: value === "publié" })}
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
        title="Supprimer cette formation ?"
        description="Cette action est définitive. La formation sera retirée du catalogue et du site public."
        confirmLabel="Supprimer"
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />

      <Toast toast={toast} />
    </div>
  );
}
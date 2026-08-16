import Link from "next/link";
import Image from "next/image";
import type { Establishment, Formation } from "@/data/ecoles-formations";
import { statutOptions } from "@/data/ecoles-formations";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  FileTextIcon,
  GlobeIcon,
  GraduationIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
} from "@/components/icons";

type EstablishmentDetailProps = {
  establishment: Establishment;
  formations: Formation[];
};

function InfoBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 ring-1 ring-navy-100 sm:p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-50 text-navy-900">
          {icon}
        </span>
        <h2 className="text-h4 text-navy-900">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function EstablishmentDetail({
  establishment,
  formations,
}: EstablishmentDetailProps) {
  const statut = statutOptions.find(
    (option) => option.value === establishment.status,
  );
  const relatedFormations = formations.filter(
    (formation) => formation.establishmentId === establishment.id,
  );

  return (
    <section className="bg-cream pb-20 sm:pb-28">
      <Container className="pt-10 sm:pt-14">
        <nav aria-label="Fil d'Ariane" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-secondary text-navy-600">
            <li className="flex items-center gap-2">
              <Link href="/" className="transition-colors hover:text-navy-900">
                Accueil
              </Link>
              <span aria-hidden="true">/</span>
            </li>
            <li className="flex items-center gap-2">
              <Link
                href="/ecoles-formations"
                className="transition-colors hover:text-navy-900"
              >
                Écoles & Formations
              </Link>
              <span aria-hidden="true">/</span>
            </li>
            <li>
              <span className="font-medium text-navy-900" aria-current="page">
                {establishment.name}
              </span>
            </li>
          </ol>
        </nav>

        <Link
          href="/ecoles-formations"
          className="inline-flex items-center gap-2 text-secondary font-bold text-navy-700 transition-colors hover:text-magenta-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-500"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Retour au catalogue
        </Link>

        <header className="mt-8 overflow-hidden rounded-[2rem] bg-navy-900 p-8 sm:p-12">
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-magenta-500/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            {establishment.logo ? (
              <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-white p-2">
                <Image
                  src={establishment.logo}
                  alt={`Logo de ${establishment.name}`}
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </span>
            ) : (
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/10 font-display text-h3-lg font-bold text-white">
                {establishment.name.charAt(0)}
              </span>
            )}
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-label font-bold ${
                    establishment.status === "partenaire"
                      ? "bg-magenta-500 text-white"
                      : "bg-white/10 text-cream"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      establishment.status === "partenaire"
                        ? "bg-white"
                        : "bg-navy-300"
                    }`}
                    aria-hidden="true"
                  />
                  {statut?.label ?? establishment.status}
                </span>
                {statut ? (
                  <span className="hidden text-secondary text-cream/60 sm:inline">
                    {statut.description}
                  </span>
                ) : null}
              </div>
              <h1 className="mt-4 text-hero text-white sm:text-hero-lg">
                {establishment.name}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-body font-semibold text-cream/80">
                <MapPinIcon className="h-4.5 w-4.5 text-magenta-400" />
                {establishment.city}
                {establishment.neighborhood
                  ? ` · ${establishment.neighborhood}`
                  : ""}
              </p>
            </div>
          </div>
        </header>

        {establishment.description ? (
          <p className="mt-8 max-w-3xl text-lead text-navy-700/80">
            {establishment.description}
          </p>
        ) : null}

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {relatedFormations.length > 0 ? (
            <InfoBlock
              icon={<GraduationIcon className="h-5 w-5" />}
              title="Formations"
            >
              <ul className="space-y-3">
                {relatedFormations.map((formation) => (
                  <li
                    key={formation.id}
                    className="rounded-2xl bg-navy-50 p-4"
                  >
                    <p className="text-h4 text-navy-900">
                      {formation.name}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formation.level ? (
                        <span className="rounded-full bg-navy-100 px-3 py-1 text-label font-bold text-navy-700">
                          {formation.level}
                        </span>
                      ) : null}
                      {formation.diploma ? (
                        <span className="rounded-full bg-navy-100 px-3 py-1 text-label font-bold text-navy-700">
                          {formation.diploma}
                        </span>
                      ) : null}
                      {formation.duration ? (
                        <span className="rounded-full bg-navy-100 px-3 py-1 text-label font-bold text-navy-700">
                          {formation.duration}
                        </span>
                      ) : null}
                    </div>
                    {formation.description ? (
                      <p className="mt-2.5 text-secondary leading-relaxed text-navy-700/75">
                        {formation.description}
                      </p>
                    ) : null}
                    {formation.tuitionFees ? (
                      <p className="mt-2.5 text-secondary font-semibold text-navy-700">
                        {formation.tuitionFees}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </InfoBlock>
          ) : establishment.formations.length > 0 ? (
            <InfoBlock
              icon={<GraduationIcon className="h-5 w-5" />}
              title="Formations principales"
            >
              <div className="flex flex-wrap gap-2">
                {establishment.formations.map((formation) => (
                  <span
                    key={formation}
                    className="rounded-full bg-navy-50 px-3.5 py-1.5 text-secondary font-semibold text-navy-800"
                  >
                    {formation}
                  </span>
                ))}
              </div>
            </InfoBlock>
          ) : null}

          {establishment.fields.length > 0 ? (
            <InfoBlock
              icon={<GraduationIcon className="h-5 w-5" />}
              title="Filières"
            >
              <div className="flex flex-wrap gap-2">
                {establishment.fields.map((field) => (
                  <span
                    key={field}
                    className="rounded-full bg-navy-50 px-3.5 py-1.5 text-secondary font-semibold text-navy-800"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </InfoBlock>
          ) : null}

          {establishment.levels.length > 0 ? (
            <InfoBlock
              icon={<GraduationIcon className="h-5 w-5" />}
              title="Niveaux accessibles"
            >
              <div className="flex flex-wrap gap-2">
                {establishment.levels.map((level) => (
                  <span
                    key={level}
                    className="rounded-full bg-navy-50 px-3.5 py-1.5 text-secondary font-semibold text-navy-800"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </InfoBlock>
          ) : null}

          {establishment.diplomas.length > 0 ? (
            <InfoBlock
              icon={<FileTextIcon className="h-5 w-5" />}
              title="Diplômes"
            >
              <div className="flex flex-wrap gap-2">
                {establishment.diplomas.map((diploma) => (
                  <span
                    key={diploma}
                    className="rounded-full bg-navy-50 px-3.5 py-1.5 text-secondary font-semibold text-navy-800"
                  >
                    {diploma}
                  </span>
                ))}
              </div>
            </InfoBlock>
          ) : null}

          {establishment.accreditation ? (
            <InfoBlock
              icon={<ShieldCheckIcon className="h-5 w-5" />}
              title="Reconnaissance & accréditation"
            >
              <p className="text-secondary leading-relaxed text-navy-700/75">
                {establishment.accreditation}
              </p>
            </InfoBlock>
          ) : null}

          {establishment.admissionConditions ? (
            <InfoBlock
              icon={<FileTextIcon className="h-5 w-5" />}
              title="Conditions d'admission"
            >
              <p className="text-secondary leading-relaxed text-navy-700/75">
                {establishment.admissionConditions}
              </p>
            </InfoBlock>
          ) : null}

          {establishment.foreignStudentAdmission ? (
            <InfoBlock
              icon={<GlobeIcon className="h-5 w-5" />}
              title="Admission étudiant étranger"
            >
              <p className="text-secondary leading-relaxed text-navy-700/75">
                {establishment.foreignStudentAdmission}
              </p>
            </InfoBlock>
          ) : null}

          {establishment.intakeDates ? (
            <InfoBlock
              icon={<GraduationIcon className="h-5 w-5" />}
              title="Dates de rentrée"
            >
              <p className="text-secondary leading-relaxed text-navy-700/75">
                {establishment.intakeDates}
              </p>
            </InfoBlock>
          ) : null}

          {establishment.tuitionFees ? (
            <InfoBlock
              icon={<FileTextIcon className="h-5 w-5" />}
              title="Frais de scolarité"
            >
              <p className="text-secondary leading-relaxed text-navy-700/75">
                {establishment.tuitionFees}
              </p>
            </InfoBlock>
          ) : null}

          {establishment.additionalFees ? (
            <InfoBlock
              icon={<FileTextIcon className="h-5 w-5" />}
              title="Frais complémentaires"
            >
              <p className="text-secondary leading-relaxed text-navy-700/75">
                {establishment.additionalFees}
              </p>
            </InfoBlock>
          ) : null}

          {establishment.contact.phone ||
          establishment.contact.email ||
          establishment.contact.address ? (
            <InfoBlock
              icon={<PhoneIcon className="h-5 w-5" />}
              title="Contact de l'établissement"
            >
              <ul className="space-y-2.5 text-secondary text-navy-700/80">
                {establishment.contact.phone ? (
                  <li className="flex items-center gap-2.5">
                    <PhoneIcon className="h-4 w-4 shrink-0 text-magenta-500" />
                    {establishment.contact.phone}
                  </li>
                ) : null}
                {establishment.contact.email ? (
                  <li className="flex items-center gap-2.5">
                    <MailIcon className="h-4 w-4 shrink-0 text-magenta-500" />
                    {establishment.contact.email}
                  </li>
                ) : null}
                {establishment.contact.address ? (
                  <li className="flex items-start gap-2.5">
                    <MapPinIcon className="mt-1 h-4 w-4 shrink-0 text-magenta-500" />
                    {establishment.contact.address}
                  </li>
                ) : null}
              </ul>
            </InfoBlock>
          ) : null}

          {establishment.website ? (
            <InfoBlock
              icon={<GlobeIcon className="h-5 w-5" />}
              title="Site officiel"
            >
              <a
                href={establishment.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-secondary font-bold text-magenta-600 underline-offset-4 transition-colors hover:text-magenta-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta-500"
              >
                {establishment.website}
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            </InfoBlock>
          ) : null}
        </div>

        <div className="mt-10 rounded-3xl bg-navy-900 p-8 text-center sm:p-12">
          <h2 className="text-h3 text-white sm:text-h3-lg">
            Tu es intéressé par cet établissement ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lead text-cream/80">
            Campus Way peut t&apos;accompagner pour préparer ton projet.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href="/trouver-mon-ecole"
              size="lg"
              variant="accent"
              className="group hover:-translate-y-0.5 focus-visible:outline-white"
            >
              Je suis intéressé par cette école
              <ArrowUpRightIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>
          <p className="mt-6 text-secondary text-cream/60">
            Les informations de cette fiche sont à vérifier auprès de
            l&apos;établissement concerné avant toute décision.
          </p>
        </div>
      </Container>
    </section>
  );
}
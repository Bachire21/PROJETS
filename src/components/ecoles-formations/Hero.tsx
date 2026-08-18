import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { InfoIcon } from "@/components/icons";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-cream blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 right-[-12%] h-[26rem] w-[26rem] rounded-full bg-magenta-500/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
        <nav aria-label="Fil d'Ariane" className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 text-body text-navy-600">
            <li className="flex items-center gap-2">
              <Link href="/" className="font-medium transition-colors hover:text-navy-900">
                Accueil
              </Link>
              <span aria-hidden="true" className="text-navy-300">
                /
              </span>
              <span className="font-semibold text-navy-900" aria-current="page">
                Écoles & Formations
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-xl">
            <p className="flex items-center gap-2.5 text-label uppercase tracking-[0.16em] text-magenta-500">
              <span className="h-px w-8 bg-magenta-500/70" aria-hidden="true" />
              Écoles & Formations
            </p>
            <h1 className="mt-6 text-hero tracking-tight text-navy-900 sm:text-hero-lg">
              Trouve la formation qui correspond à ton projet.
            </h1>
            <p className="mt-7 max-w-lg text-lead text-navy-700/80">
              Découvre les établissements et les formations vers lesquels
              Campus Way peut t&apos;orienter.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-cream p-4 ring-1 ring-navy-100">
              <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-magenta-500" />
              <p className="text-secondary leading-relaxed text-navy-700/75">
                Les informations présentées sont destinées à faciliter la
                comparaison et la prise de contact. Vérifie toujours les
                conditions d&apos;admission et de frais directement auprès de
                l&apos;établissement.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                href="#catalogue"
                size="lg"
                className="group hover:-translate-y-0.5 focus-visible:outline-magenta-500"
              >
                Parcourir le catalogue
              </Button>
              <Button
                href="/trouver-mon-ecole"
                size="lg"
                variant="outline"
                className="group hover:-translate-y-0.5 focus-visible:outline-magenta-500"
              >
                Trouver mon école
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div
              className="pointer-events-none absolute -top-6 -right-2 h-40 w-40 rounded-full border-2 border-dashed border-magenta-500/30 sm:-right-6"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-900/20 ring-1 ring-navy-900/10">
              <Image
                src="/images/catalogue-hero.jpg"
                alt="Jeunes étudiants avec sacs à dos marchant en ville, cadre urbain moderne"
                width={1400}
                height={933}
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
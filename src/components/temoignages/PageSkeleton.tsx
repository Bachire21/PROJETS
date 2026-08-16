import { Container } from "@/components/ui/Container";

export function PageSkeleton() {
  return (
    <div role="status" aria-label="Chargement des témoignages" className="animate-pulse">
      <div className="bg-white">
        <Container className="grid items-center gap-16 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:py-32">
          <div className="space-y-6">
            <div className="h-7 w-44 rounded-full bg-navy-900/10" />
            <div className="h-12 w-11/12 rounded-2xl bg-navy-900/10" />
            <div className="h-6 w-full rounded-xl bg-navy-900/10" />
            <div className="h-6 w-5/6 rounded-xl bg-navy-900/10" />
          </div>
          <div className="aspect-[4/3] rounded-[2rem] bg-cream ring-1 ring-navy-100" />
        </Container>
      </div>
      <div className="bg-cream py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div className="h-10 w-2/3 rounded-2xl bg-white shadow-sm ring-1 ring-navy-100" />
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-11 w-32 rounded-full bg-white shadow-sm ring-1 ring-navy-100" />
            ))}
          </div>
        </Container>
      </div>
      <div className="bg-white py-20 sm:py-28">
        <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-80 rounded-3xl bg-cream ring-1 ring-navy-100" />
          ))}
        </Container>
      </div>
    </div>
  );
}
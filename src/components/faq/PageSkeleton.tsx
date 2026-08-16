import { Container } from "@/components/ui/Container";

export function PageSkeleton() {
  return (
    <div role="status" aria-label="Chargement de la FAQ" className="animate-pulse">
      <div className="bg-white">
        <Container className="grid items-center gap-16 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:py-32">
          <div className="space-y-6">
            <div className="h-7 w-28 rounded-full bg-navy-900/10" />
            <div className="h-12 w-11/12 rounded-2xl bg-navy-900/10" />
            <div className="h-12 w-8/12 rounded-2xl bg-navy-900/10" />
            <div className="h-6 w-full rounded-xl bg-navy-900/10" />
            <div className="h-6 w-5/6 rounded-xl bg-navy-900/10" />
          </div>
          <div className="aspect-[4/3] rounded-[2rem] bg-cream ring-1 ring-navy-100" />
        </Container>
      </div>
      <div className="bg-white py-20 sm:py-28">
        <Container className="max-w-3xl space-y-6">
          <div className="h-14 w-full rounded-full bg-cream ring-1 ring-navy-100" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-9 w-24 rounded-full bg-cream ring-1 ring-navy-100" />
            ))}
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-16 rounded-2xl bg-cream ring-1 ring-navy-100" />
          ))}
        </Container>
      </div>
    </div>
  );
}
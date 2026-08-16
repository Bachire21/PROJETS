import { Container } from "@/components/ui/Container";

export function PageSkeleton() {
  return (
    <div
      role="status"
      aria-label="Chargement des informations"
      className="animate-pulse"
    >
      <div className="bg-navy-900">
        <Container className="grid items-center gap-16 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:py-32">
          <div className="space-y-6">
            <div className="h-7 w-48 rounded-full bg-white/15" />
            <div className="h-12 w-11/12 rounded-2xl bg-white/15" />
            <div className="h-12 w-8/12 rounded-2xl bg-white/15" />
            <div className="h-6 w-full rounded-xl bg-white/10" />
            <div className="h-6 w-5/6 rounded-xl bg-white/10" />
            <div className="h-14 w-56 rounded-full bg-white/15" />
          </div>
          <div className="aspect-[4/3] rounded-[2rem] bg-white/10" />
        </Container>
      </div>
      <div className="bg-cream py-20 sm:py-28">
        <Container className="space-y-6">
          <div className="h-10 w-1/2 rounded-2xl bg-navy-900/10" />
          <div className="h-6 w-1/3 rounded-xl bg-navy-900/10" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-64 rounded-3xl bg-white shadow-sm ring-1 ring-navy-100"
              />
            ))}
          </div>
        </Container>
      </div>
      <div className="bg-white py-20 sm:py-28">
        <Container className="space-y-6">
          <div className="h-10 w-1/2 rounded-2xl bg-navy-900/10" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-52 rounded-3xl bg-cream ring-1 ring-navy-100"
              />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
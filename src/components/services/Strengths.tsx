import type { ServicesPageData } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CheckIcon } from "@/components/icons";

export function Strengths({
  strengths,
}: {
  strengths: ServicesPageData["strengths"];
}) {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container>
        <div className="grid gap-px overflow-hidden rounded-3xl bg-navy-100 sm:grid-cols-2 lg:grid-cols-4">
          {strengths.map((item, index) => (
            <Reveal key={item.label} delay={index * 70}>
              <div className="group flex h-full items-center gap-4 bg-white p-6 transition-colors duration-300 hover:bg-navy-900 sm:p-8">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-magenta-500/10 text-magenta-500 transition-all duration-300 group-hover:bg-magenta-500 group-hover:text-white">
                  <CheckIcon className="h-5 w-5" />
                </span>
                <p className="text-h4 text-navy-900 transition-colors duration-300 group-hover:text-white">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
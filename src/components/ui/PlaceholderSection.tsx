import { Container } from "./Container";
import { Reveal } from "./Reveal";

type PlaceholderSectionProps = {
  note: string;
};

export function PlaceholderSection({ note }: PlaceholderSectionProps) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-dashed border-navy-200 bg-navy-50/60 px-6 py-14 text-center sm:py-16">
            <p className="mx-auto max-w-xl text-lead leading-relaxed text-navy-700/75">
              {note}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
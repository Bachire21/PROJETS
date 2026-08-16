import Image from "next/image";
import type { PageImage as PageImageData } from "@/data/logement-installation";
import { GraduationIcon } from "@/components/icons";

type PageImageProps = {
  image?: PageImageData | null;
  alt?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function PageImage({
  image,
  alt,
  imgClassName = "",
  sizes = "100vw",
  priority = false,
}: PageImageProps) {
  if (image?.url) {
    return (
      <Image
        src={image.url}
        alt={alt ?? image.alt}
        width={1400}
        height={933}
        sizes={sizes}
        priority={priority}
        className={imgClassName}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt ?? "Illustration à venir"}
      className={`flex items-center justify-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 ${imgClassName}`}
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-white/70">
        <GraduationIcon className="h-9 w-9" />
      </span>
    </div>
  );
}

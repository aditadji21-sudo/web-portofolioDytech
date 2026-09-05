import Image from "next/image";
import Link from "next/link";
import logoPutih from "@/assets/Dytechputih.png";
import logoUhuy from "@/assets/dytech-uhuy-cropped.png";
import logoOri from "@/assets/dytech ori.png";

export type LogoVariant = "auto" | "putih" | "uhuy" | "ori";

type LogoProps = {
  theme?: "light" | "dark" | "auto";
  variant?: LogoVariant;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  asLink?: boolean;
  priority?: boolean;
};

export function Logo({
  theme = "auto",
  variant = "auto",
  size = "md",
  className = "",
  asLink = false,
  priority = false,
}: LogoProps) {
  // Determine effective variant
  let effectiveVariant = variant;
  if (effectiveVariant === "auto") {
    effectiveVariant = theme === "dark" ? "putih" : "uhuy";
  }

  // Size styling maps
  const heightClasses = {
    sm: "h-7 sm:h-8",
    md: "h-9 sm:h-10",
    lg: "h-11 sm:h-12",
    xl: "h-14 sm:h-16",
  };

  const oriSizeClasses = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-10 h-10 rounded-xl",
    lg: "w-12 h-12 rounded-xl",
    xl: "w-16 h-16 rounded-2xl",
  };

  let imageElement: React.ReactNode;

  if (effectiveVariant === "putih") {
    // Dytechputih is the transparent PNG with white lettering (perfect for dark backgrounds)
    imageElement = (
      <Image
        src={logoPutih}
        alt="Dytech Computer"
        className={`${heightClasses[size]} w-auto object-contain select-none`}
        priority={priority}
      />
    );
  } else if (effectiveVariant === "ori") {
    // dytech ori.png is the original square brand emblem
    imageElement = (
      <div className={`relative ${oriSizeClasses[size]} overflow-hidden shadow-sm shrink-0 select-none`}>
        <Image
          src={logoOri}
          alt="Dytech Computer"
          className="w-full h-full object-cover"
          priority={priority}
        />
      </div>
    );
  } else {
    // dytech uhuy is the transparent PNG with full color logo & dark text (perfect for light backgrounds)
    imageElement = (
      <Image
        src={logoUhuy}
        alt="Dytech Computer"
        className={`${heightClasses[size]} w-auto object-contain select-none`}
        priority={priority}
      />
    );
  }

  const content = (
    <div className={`inline-flex items-center shrink-0 select-none ${className}`}>
      {imageElement}
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="inline-flex items-center shrink-0 hover:opacity-90 transition-opacity" aria-label="Dytech Computer Beranda">
        {content}
      </Link>
    );
  }

  return content;
}
import { useState } from "react";

interface LazyImageProps {
  src: string;
  srcAvif?: string;
  alt: string;
  className?: string;
}

export const LazyImage = ({ src, srcAvif, alt, className }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900/50">
      <div
        className={`absolute inset-0 bg-gray-900/50 backdrop-blur-md transition-opacity duration-700 ease-out ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      <picture>
        {srcAvif && <source srcSet={srcAvif} type="image/avif" />}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transform-gpu transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            loaded
              ? "blur-0 scale-100 opacity-100"
              : "blur-xl scale-105 opacity-90"
          } ${className || ""}`}
        />
      </picture>
    </div>
  );
};

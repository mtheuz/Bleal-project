import { useState } from "react";

interface LazyImageProps {
  src: string;       // JPG/JPEG/PNG
  srcAvif?: string;  // AVIF opcional
  alt: string;
  className?: string;
}

export const LazyImage = ({ src, srcAvif, alt, className }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-900/50">
      {/* Placeholder shimmer */}
      {!loaded && (
        <div className="absolute inset-0 overflow-hidden bg-gray-800/60">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-800/60 via-gray-700/40 to-gray-800/60 blur-sm" />
        </div>
      )}

      <picture>
        {/* AVIF com tamanhos otimizados */}
        {srcAvif && (
          <source
            type="image/avif"
            srcSet={`
              ${srcAvif}?w=400 400w,
              ${srcAvif}?w=800 800w,
              ${srcAvif}?w=1200 1200w
            `}
            sizes="
              (max-width: 640px) 400px,
              (max-width: 1024px) 800px,
              1200px
            "
          />
        )}


        <source
          type="image/jpeg"
          srcSet={`
            ${src}?w=400 400w,
            ${src}?w=800 800w,
            ${src}?w=1200 1200w
          `}
          sizes="
            (max-width: 640px) 400px,
            (max-width: 1024px) 800px,
            1200px
          "
        />

  
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`
            w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${loaded ? "blur-0 scale-100 opacity-100" : "blur-xl scale-105 opacity-90"}
            ${className || ""}
          `}
        />
      </picture>
    </div>
  );
};

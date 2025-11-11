import { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const LazyImage = ({ src, alt, className }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className={`absolute inset-0 bg-gray-900/60 animate-pulse blur-xl transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
          loaded
            ? "blur-0 scale-100 opacity-100"
            : "blur-xl scale-105 opacity-80"
        } ${className || ""}`}
      />
    </div>
  );
};

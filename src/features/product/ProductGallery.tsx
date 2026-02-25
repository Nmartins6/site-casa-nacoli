import React, { useState, useRef } from "react";

interface Props {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const baseUrl = import.meta.env.BASE_URL;

  const getFullSrc = (src: string) => {
    if (src.startsWith("/")) {
      return `${baseUrl}${src.slice(1)}`;
    }
    return src;
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full rounded-2xl bg-[#FAEEDE] flex items-center justify-center text-[#494238]/20 ring-1 ring-black/5">
        Sem imagem
      </div>
    );
  }

  const validImages = images.filter(Boolean);

  if (validImages.length === 0) {
    return (
      <div className="aspect-square w-full rounded-2xl bg-[#FAEEDE] flex items-center justify-center text-[#494238]/20 ring-1 ring-black/5">
        Sem imagem
      </div>
    );
  }

  const scrollTo = (index: number) => {
    setSelectedIndex(index);
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const width = scrollContainerRef.current.offsetWidth;
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const index = Math.round(scrollLeft / width);
      setSelectedIndex(index);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#FAEEDE] ring-1 ring-black/5">
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {validImages.map((src, i) => (
            <div key={i} className="flex-none w-full h-full snap-center">
              <img
                src={getFullSrc(src)}
                alt={`${title} - Imagem ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {validImages.length > 1 && (
          <>
            <button
              onClick={() => scrollTo(Math.max(0, selectedIndex - 1))}
              disabled={selectedIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#494238] shadow-sm backdrop-blur transition hover:bg-white disabled:opacity-0"
              aria-label="Imagem anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
              </svg>
            </button>
            <button
              onClick={() => scrollTo(Math.min(validImages.length - 1, selectedIndex + 1))}
              disabled={selectedIndex === validImages.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-[#494238] shadow-sm backdrop-blur transition hover:bg-white disabled:opacity-0"
              aria-label="Próxima imagem"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </button>
          </>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {validImages.map((src, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`relative aspect-square overflow-hidden rounded-xl bg-[#FAEEDE] transition-all ${
                selectedIndex === i
                  ? "ring-2 ring-[#494238] ring-offset-2"
                  : "ring-1 ring-black/5 hover:opacity-80"
              }`}
            >
              <img
                src={getFullSrc(src)}
                alt={`Miniatura ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

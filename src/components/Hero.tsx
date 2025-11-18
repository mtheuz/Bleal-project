import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import logoImage from "@/assets/img/b.png";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);

  const logoRef = useRef(null);
  const descriptionRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2Ref = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: 1.2, // mais suave e com menos recalculo
        },
      });

      tl.fromTo(logoRef.current, { y: 0 }, { y: -50, duration: 0.8 })

        .fromTo(descriptionRef.current, { opacity: 1 }, { opacity: 0, duration: 1 })

        .fromTo(btn1Ref.current, { opacity: 1, x: 0 }, { opacity: 0, x: -100, duration: 1 })

        .fromTo(
          btn2Ref.current,
          { opacity: 1, x: 0 },
          { opacity: 0, x: 100, duration: 1 },
          "<"
        )

        .fromTo(arrowRef.current, { opacity: 1 }, { opacity: 0, duration: 1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black md:min-h-screen flex items-center justify-center overflow-hidden w-full"
      role="banner"
      aria-label="Seção principal: apresentação da B Leal Produções"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute inset-0 -rotate-12 scale-145">
          <video
            src="/logo3d.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full h-full object-cover opacity-100"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/10" />
      </div>

      {/* CONTENT */}
      <div className="z-10 text-center px-6 md:max-w-7xl mx-auto mt-36">
        <div className="p-5 md:p-10">
          <div className="mb-8 mt-24 md:mt-8 flex flex-col items-center">
            <div ref={logoRef} className="p-2 rounded-xl">
              <img
                src={logoImage}
                alt="B Leal Produções - Logo"
                className="h-10 md:h-14"
                loading="eager"
                
              />
            </div>
          </div>

          <div ref={descriptionRef} className="text-center">
            <h3 className="text-2xl md:text-4xl leading-tight">
              <span className="text-zinc-200 text-3xl md:text-5xl font-extralight oswald uppercase pb-2 border-b-[0.5px] border-white/15">
                Levamos seu evento ao próximo nível
              </span>
            </h3>

            <p className="text-xs md:text-sm font-extralight mt-5 text-white/90 max-w-xl mx-auto leading-relaxed">
              Iluminação, estrutura, efeitos visuais e shows que transformam
              momentos em experiências inesquecíveis.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 md:mt-10">
            <a
              href="https://wa.me/5575999535995"
              target="_blank"
              rel="noopener noreferrer"
              ref={btn1Ref}
              className="
                relative inline-block px-10 py-4 text-xs text-white uppercase
                border-2 border-white/40 rounded-xl overflow-hidden
                transition-all duration-500 bg-gradient-to-r from-zinc-800/50 via-black/70 to-zinc-800/50
                hover:scale-105 active:scale-95 group
              "
            >
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc to-white">
                Solicitar meu orçamento
              </span>

              <span
                className="
                  absolute inset-0 rounded-xl
                  bg-gradient-to-r from-transparent via-white/40 to-transparent
                  translate-x-[-200%]
                  group-hover:translate-x-[200%]
                  transition-transform duration-[1200ms]
                "
              />
            </a>

            <button
              ref={btn2Ref}
              className="cursor-pointer uppercase text-xs md:text-md px-8 py-4 border-red text-red hover:bg-red hover:text-white border-2 rounded-2xl hover:border-white transition-colors duration-300"
              onClick={() =>
                document
                  .getElementById("portfolio")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Veja a Magia Acontecendo
            </button>
          </div>
        </div>
      </div>

      {/* ARROW */}
      <a
        href="#sobre"
        ref={arrowRef}
        className="hidden sm:flex absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="border-2 border-red rounded-full flex justify-center animate-bounce">
          <div className="px-1 py-1 bg-gradient-to-b from-red via-green to-blue rounded-full pulse-rgb">
            <ArrowDown size={20} />
          </div>
        </div>
      </a>
    </section>
  );
};

export default Hero;

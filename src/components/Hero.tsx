import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import logoImage from "@/assets/img/b.png";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const logo2Ref = useRef(null);
  const descriptionRef = useRef(null);
  const btn1Ref = useRef(null);
  const btn2nRef = useRef(null);
  const arrowDownRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 0%",
          end: "bottom 30%",
          scrub: true,
        },
      });

      tl.fromTo(logo2Ref.current, { y: 0 }, { y: -50, duration: 0.8 })
        .fromTo(
          descriptionRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 1 }
        )
        .fromTo(
          btn1Ref.current,
          { opacity: 1, x: 0 },
          { opacity: 0, x: -100, duration: 1 }
        )
        .fromTo(
          btn2nRef.current,
          { opacity: 1, x: 0 },
          { opacity: 0, x: 100, duration: 1 },
          "<"
        )
        .fromTo(
          arrowDownRef.current,
          { opacity: 1 },
          { opacity: 0, duration: 1 }
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative  md:min-h-screen flex items-center justify-center overflow-hidden bg-stage spotlight w-full"
    >
       {/* Vídeo de fundo inclinado */}
      <div className="absolute inset-0 overflow-hidden z-0 " >
        <div className="absolute inset-0 -rotate-12 scale-145">
          <video
            src="src\assets\logo3d.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-100"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/10 transition-all duration-700 ease-in-out" />
      </div>
      
      <div className="z-10 text-center px-6 md:max-w-7xl mx-auto mt-36">
        <div className="p-5 md:p-10">
          <div className="mb-8 mt-24 md:mt-8 flex flex-col items-center ">
            <div ref={logo2Ref} className="p-2  rounded-xl">
              <img
                src={logoImage}
                alt="B Leal Produções - Logo"
                className="h-10 md:h-14"
              />
            </div>
          </div>

          <div ref={descriptionRef} className=" text-center">
            <h3 className="text-2xl md:text-4xl lg:text-4xl  leading-tight">
              <span className="text-zinc-200 text-3xl md:text-5xl font-extralight leading-none oswald uppercase border-b-[0.5px] border-white/15 border-red pb-2 ">
                Levamos seu evento ao próximo nível
              </span>
            </h3>

            <p className="text-xs md:text-sm font-extralight mt-5 text-white/90 max-w-xl mx-auto  leading-relaxed pt-2 uper">
              Iluminação, estrutura, efeitos visuais e shows que transformam
              momentos em experiências inesquecíveis.
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 md:mt-10">
            <a
              href="https://wa.me/5575999535995"
              target="_blank"
              rel="noopener   noreferrer"
              ref={btn1Ref}
              className="
                      relative
                      inline-block
                      px-10 py-4
                      text-xs
                      text-white
                      uppercase
                      
                      border-2
                      border-white/40
                      rounded-xl
                      overflow-hidden
                      transition-all
                      duration-500
                      ease-in-out
                      bg-gradient-to-r from-zinc-800/50 via-black/70 to-zinc-800/50
                      shadow-[10px_10px_20px_rgba(0,0,0,0.2)]
                      hover:shadow-[0_0_10px_rgba(0,0,0,0.9)]
                      hover:scale-105
                      active:scale-95
                      group
                      "
            >
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc to-white">
                Solicitar meu orçamento
              </span>

              <span
                className="
                        absolute inset-0
                        rounded-xl
                        bg-gradient-to-r from-transparent via-white/40 to-transparent
                        translate-x-[-200%]
                        group-hover:translate-x-[200%]
                        transition-transform duration-[1200ms] ease-in-out
                        "
              />

              <span
                className="
      absolute inset-0 rounded-xl border-2 border-transparent
      
      transition-all duration-500 ease-in-out
    "
              />
            </a>

            <button
              ref={btn2nRef}
              className="cursor-pointer uppercase text-xs md:text-md px-8 py-4 border-red text-red hover:bg-red hover:text-white border-2 rounded-2xl border-transparent hover:border-white transition-colors duration-300 ease-out"
              onClick={() => {
                const portfolioSection = document.getElementById("portfolio");
                portfolioSection?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Veja a Magia Acontecendo
            </button>
          </div>
        </div>
      </div>


      <div>
        <a
          href="#sobre"
          ref={arrowDownRef}
          className="hidden sm:flex absolute bottom-24 md:bottom-8 left-1/2 transform -translate-x-1/2 "
        >
          <div className="border-2 border-red rounded-full flex justify-center animate-bounce">
            <div className="px-1 py-1 bg-gradient-to-b from-red via-green to-blue rounded-full pulse-rgb ">
              <ArrowDown size={20} />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;

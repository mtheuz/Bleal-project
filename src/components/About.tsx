import { useRef, useLayoutEffect } from "react";
import { Award, Heart, Zap, Target, Eye, Gem } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp } from "react-icons/fa";
import heroImage from "@/assets/img/rgb-stage.png";
import Carousel from "./ui/Carrousiel";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textsRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const valuesRef = useRef<HTMLDivElement[]>([]);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const logosRef = useRef<HTMLImageElement[]>([]);
  const barsRef = useRef<HTMLDivElement[]>([]);

  const addBarRef = (el: HTMLDivElement | null) => {
    if (el && !barsRef.current.includes(el)) barsRef.current.push(el);
  };
  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };
  const addValueRef = (el: HTMLDivElement | null) => {
    if (el && !valuesRef.current.includes(el)) valuesRef.current.push(el);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      logosRef.current.forEach((logo, index) => {
        gsap.to(logo, {
          y: index % 2 === 0 ? 20 : -40,
          rotation: index % 2 === 0 ? 5 : -5,
          filter: "blur(3px)",
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.4,
        });
      });

      gsap.fromTo(
        textsRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,

              start: "top 95%",
              toggleActions: "play none none reverse",
              markers: false,
            },
          }
        );
      });

      gsap.fromTo(
        videoRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      barsRef.current.forEach((bar, i) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            delay: i * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      });

      valuesRef.current.forEach((val, i) => {
        gsap.fromTo(
          val,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: val,
              start: "top 95%",
              toggleActions: "play none none reverse",
              scrub: true,
              markers: false,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="relative overflow-hidden bg-black pb-8"
    >
      {/* Botão WhatsApp */}
      <a
        href="https://wa.me/5575999535995"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 animate-bounce right-6 w-16 h-16 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:shadow-[0_0_40px_rgba(34,197,94,0.9)] hover:scale-110 active:scale-95 overflow-hidden transition-all duration-500 ease-in-out group z-50"
      >
        <FaWhatsapp size={28} className="relative z-10" />
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[1200ms] ease-in-out" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/40 transition-all duration-500 ease-in-out" />
      </a>

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Palco profissional com iluminação RGB"
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-red-dark/20 to-black/90" />
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-6xl mx-auto relative z-10 px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-4xl font-black mb-4 mt-16 oswald">
            SOBRE NÓS
          </h2>
          <div className="flex gap-1 max-w-36 mx-auto mb-34">
            {["bg-red-500", "bg-green-500", "bg-blue-500"].map((color, i) => (
              <div
                key={i}
                ref={addBarRef}
                className={`w-24 h-0.5 ${color} mx-auto rounded-full sm:w-42`}
              />
            ))}
          </div>
        </div>

        <div className=" items-center ">
          {/* Texto */}
          <div
            ref={textsRef}
            className="sm:space-x-6 flex justify-between max-w-6xl items-center mx-auto sm:flex-row flex-col"
          >
            <div className="max-w-lg space-y-6  ">
              <h3 className="text-lg sm:text-2xl font-light  uppercase oswald ">
                Referência em soluções técnicas para eventos
              </h3>
              <p className="text-sm sm:text-[15px] leading-relaxed text-white/70">
                A <span className="text-white">BLeal Produções</span> é
                referência em soluções técnicas para eventos. Com cede em Feira
                de Santana e atuação em todo o estado, entregamos estrutura,
                iluminação e impacto visual com precisão, criatividade e
                responsabilidade.
              </p>
              <p className="text-sm sm:text-md text-white/70 leading-relaxed">
                Mais do que uma produtora, somos parceiros estratégicos de quem
                busca se destacar no palco e fora dele. Contamos com uma equipe
                própria, tecnologia de ponta e um compromisso claro: transformar
                cada projeto em uma experiência memorável.
              </p>
              <p className="text-xs font-light leading-relaxed  uppercase mb-5 sm:md-0">
                Atendemos eventos de todos os portes e estilos, sempre prontos
                para encarar novos desafios e superar expectativas.
              </p>
            </div>
            <Carousel />
          </div>

      
          <div className="space-y-6 sm:space-y-0 sm:space-x-6  flex md:flex-row flex-col  w-full mt-12">
            <div 
              ref={addCardRef}
              className="space-y-3 text-red-500 border-2 border-white/20 p-5 rounded-xl backdrop-blur-sm md:w-1/2 w-full"
            >
              <div className="flex gap-2 text-md font-semibold oswald uppercase items-center">
                <Target size={20} className="relative z-10" />
                <h4>Nossa Missão</h4>
              </div>
              <p className="text-white/70 text-[12px]">
                Transformar cada evento em uma experiência audiovisual
                inesquecível, superando expectativas e elevando padrões de
                qualidade.
              </p>
            </div>
            <div
              ref={addCardRef}
              className="space-y-3 text-green-500 border-2 border-white/20 p-5 rounded-xl backdrop-blur-sm sm:w-1/2"
            >
              <div className="flex gap-2 text-md font-semibold oswald uppercase items-center">
                <Eye size={20} className="relative z-10" />
                <h4>Nossa Visão</h4>
              </div>

              <p className="text-white/70 text-[12px]">
                Ser referência nacional em produção de eventos e entretenimento,
                reconhecida pela inovação, excelência e pela capacidade de criar
                experiências que marcam histórias.
              </p>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="mt-12 sm:mt-20 pt-16 border-t border-white/10">
          <div className="flex justify-center text-blue-500 gap-2 text-lg font-semibold oswald uppercase items-center mb-6">
            <Gem size={20} className="relative z-10" />
            <h4>Nossos Valores</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Award className="h-6 w-6 text-black" />,
                title: "Excelência",
                color: "black",
                desc: "Buscamos a perfeição em cada detalhe, garantindo resultados que superam expectativas.",
              },
              {
                icon: <Heart className="h-6 w-6 text-black" />,
                title: "Paixão",
                color: "green",
                desc: "Vivemos intensamente o que fazemos, colocando emoção e dedicação em cada projeto.",
              },
              {
                icon: <Zap className="h-6 w-6 text-black" />,
                title: "Inovação",
                color: "blue",
                desc: "Estamos sempre à frente, explorando novas ideias e tecnologias para criar experiências únicas.",
              },
            ].map((val, i) => (
              <div
                key={i}
                ref={addValueRef}
                className="text-center space-y-4  border-4 border-white/10 p-6 sm:p-8 rounded-xl backdrop-blur-sm hover:scale-105 transition-transform duration-500"
              >
                <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center bg-white text-black">
                  {val.icon}
                </div>
                <h1 className="relative uppercase text-md z-10 inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-white/50 to-white bg-[length:200%_auto] animate-shine-text font-black">
                  {val.title}
                </h1>
                <p className="text-sm sm:text-md text-white/70 font-light leading-relaxed oslwald ">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

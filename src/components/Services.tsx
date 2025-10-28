import { useRef, useLayoutEffect } from "react";
import { Heart } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import corporativoImage from "@/assets/img/servicesIMG/coporativo.jpg";
import comemorativoImage from "@/assets/img/servicesIMG/comemorativo.jpg";
import audiovisualImage from "@/assets/img/servicesIMG/audiovisual.jpg";
import publicosImage from "@/assets/img/servicesIMG/palco.jpg";
import CircularGallery from "../utils/circularGallery";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Eventos Públicos",
    description:
      "De festas tradicionais a celebrações municipais, garantimos segurança, fluidez e excelência em grandes montagens com foco em experiência coletiva e visibilidade.",
    icon: Heart,
    image: publicosImage,
  },
  {
    title: "Eventos Corporativos",
    description:
      "Atendemos congressos, ativações de marca, convenções e lançamentos, com soluções elegantes e precisas para transmitir credibilidade e sofisticação.",
    icon: Heart,
    image: corporativoImage,
  },
  {
    title: "Eventos Comemorativos",
    description:
      "De aniversários a casamentos, entregamos estrutura completa, iluminação e sonorização de alto padrão para transformar cada celebração em uma experiência única, marcante e cheia de emoção.",
    icon: Heart,
    image: comemorativoImage,
  },
  {
    title: "Gravações audiovisuais",
    description:
      "Cuidamos da estrutura e da luz com o olhar de quem entende a linguagem do vídeo. Trabalhamos em conjunto com produtoras para garantir o melhor resultado em cena.",
    icon: Heart,
    image: audiovisualImage,
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const barRefs = useRef<HTMLDivElement[]>([]);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  barRefs.current = [];

  const addToBars = (el: HTMLDivElement | null) => {
    if (el && !barRefs.current.includes(el)) barRefs.current.push(el);
  };

  const addToCards = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          delay: 0.2,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      barRefs.current.forEach((bar, i) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            delay: i * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            },
          }
        );
      });

      cardsRef.current.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.fromTo(
        galleryRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-black relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-0 left-1/3 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
        {/* Cabeçalho */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            ref={titleRef}
            className="text-2xl sm:text-4xl font-black mb-2 uppercase oswald"
          >
            Nossos Serviços
          </h2>
          <p
            ref={subtitleRef}
            className="text-xs text-white/70 max-w-2xl mx-auto mb-2 font-extralight uppercase"
          >
            Soluções completas para transformar seu evento em uma experiência
            memorável
          </p>

          <div className="flex gap-1 max-w-36 mx-auto">
            {["bg-red-500", "bg-green-500", "bg-blue-500"].map((color, i) => (
              <div
                key={i}
                ref={addToBars}
                className={`w-24 sm:w-42 h-0.5 ${color} mx-auto rounded-full`}
              />
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-12 sm:mt-20">
          {services.map((service, index) => (
            <div
              key={index}
              ref={addToCards}
              className="group overflow-hidden border border-gray-900 transition-all duration-500 hover:scale-[1.02] bg-gray-800/30 backdrop-blur-sm rounded-xl shadow-md "
            >
              {service.image && (
                <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-xl">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/50 to-transparent"></div>
                </div>
              )}
              <div className="p-4 sm:p-6 flex gap-4 border-t border-gray-700/30">
                <div>
                  <h3 className="font-light text-white group-hover:text-zinc-300 transition-colors duration-300 uppercase text-sm sm:text-lg oswald">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-2 font-light">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Texto adicional */}
        <div className="mt-16 sm:mt-28 text-center px-4 max-w-xl sm:max-w-2xl mx-auto">
          <h1 className="text-xl sm:text-2xl oswald mb-2 uppercase">
            Casamentos e aniversários
          </h1>
          <p className="text-xs text-white/70 max-w-2xl mx-auto  font-extralight uppercase">
            Transformamos sonhos em cenários reais, com iluminação cênica, som
            de alta fidelidade e estruturas sob medida para momentos que marcam
            para sempre.
          </p>
        </div>

        <div
          ref={galleryRef}
          style={{ height: "600px", position: "relative" }}
       
        >
          <CircularGallery
            bend={3 }
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;

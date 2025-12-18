import { useState, useEffect, useRef, useLayoutEffect, type FC } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import logoImage from "@/assets/img/logovermelha.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Thiago Oliver",
    role: "Diretor de Marketing e Comercial do Grupo nobre, União Medica e Rede Vida Nobre de Saude",
    company: "Lançamento do centro universitário UNEF",
    rating: 5,
    content:
      "Esse evento foi incrível, né, e trabalhar com o Bruno Leal é sempre uma honra, porque, primeiro, tudo sai impecável, a gente não se preocupa com nada e traz inovação, traz tecnologia. Nesse evento, o Bruno colocou um monte de coisas novas, não tem só esse telão, tem muitos telões, fora a estrutura, a segurança, uma equipe que nos acolhe. Então, assim, eu só tenho a agradecer a essa empresa, que eu amo, por essa parceria, que não é de agora, né, é uma parceria que vai continuar por muito tempo.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Israel Levy",
    role: "Marketing Grupo Nobre",
    company: "",
    rating: 5,
    content:
      "É muito bom trabalhar com a BLeal! Atendimento e serviço excelentes!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Carolina Trindade",
    role: "Marketing Boulevard Feira",
    company: "",
    rating: 5,
    content:
      "Trabalhar com Bruno é sempre uma experiência excelente. Além de cumprir todos os prazos com eficiência e comprometimento, ele e sua equipe se destacam pela criatividade e pelas soluções inovadoras que trazem para cada montagem em cada evento. São parceiros de verdade, estão sempre disponíveis e com uma equipe super solícita. É o tipo de fornecedor que faz toda diferença no sucesso de um evento!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
];

// =====================
// 🔹 Componente
// =====================
const Testimonials: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const mainCardRef = useRef<HTMLDivElement | null>(null);
  const logosRef = useRef<(HTMLImageElement | null)[]>([]);

  // =====================
  // 🔹 GSAP ScrollTrigger Animations
  // =====================
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, textRef.current], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom 90%",
          scrub: true,
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      });

      if (mainCardRef.current) {
        gsap.from(mainCardRef.current, {
          scrollTrigger: {
            trigger: mainCardRef.current,
            start: "top 85%",
            scrub: true,
          },
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
        });
      }

    logosRef.current
      .filter((logo): logo is HTMLImageElement => logo !== null)
      .forEach((logo, index) => {
        gsap.to(logo, {
          y: index % 2 === 0 ? 20 : -20,
          rotation: index % 2 === 0 ? 8 : -16,
          filter: "blur(8px)",
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.8,
        });
      });
  }, sectionRef); 
  return () => ctx.revert();
}, []);

 
  const goToIndex = (index: number) => {
    setCurrentIndex(() => {
      const total = testimonials.length;
      if (index < 0) return total - 1;
      if (index >= total) return 0;
      return index;
    });
  };

  const nextTestimonial = (): void => {
    setIsAutoPlaying(false);
    goToIndex(currentIndex + 1);
  };

  const prevTestimonial = (): void => {
    setIsAutoPlaying(false);
    goToIndex(currentIndex - 1);
  };


  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      goToIndex(currentIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

 
  useEffect(() => {
    if (!mainCardRef.current) return;

    gsap.fromTo(
      mainCardRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [currentIndex]);

  const currentTestimonial: Testimonial = testimonials[currentIndex];


  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-title"
      className="section-padding relative bg-black px-4 sm:px-6 text-white"
      role="region"
    >
      {/* Background logos (decorative) */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { top: "5%", left: "10%" },
          { top: "15%", right: "15%" },
          { bottom: "20%", left: "5%" },
          { bottom: "10%", right: "10%" },
          { top: "40%", left: "40%" },
        ].map((pos, i) => (
         <img
  key={i}
  src={logoImage}
  alt=""
  aria-hidden="true"
  ref={(el) => { logosRef.current[i] = el; }}
  className="absolute w-24 sm:w-36 md:w-48 lg:w-60 opacity-20 blur-[1px]"
  style={pos}
/>
        ))}
      </div>

      <div className="max-w-7xl mx-auto pt-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="testimonials-title"
            ref={titleRef}
            className="text-xl sm:text-4xl md:text-4xl font-black mb-2 oswald uppercase"
          >
            Clientes que já viveram essa experiência
          </h2>
          <p
            ref={textRef}
            className="text-xs text-white/70 max-w-2xl mx-auto mb-2 font-extralight uppercase"
          >
            O que nossos clientes dizem sobre nosso trabalho
          </p>
          <div className="flex gap-1 max-w-36 mx-auto" aria-hidden="true">
            {["bg-red-500", "bg-green-500", "bg-blue-500"].map((color, i) => (
              <div
                key={i}
                className={`w-16 sm:w-42 h-0.5 ${color} mx-auto rounded-full pulse-rgb`}
              />
            ))}
          </div>
        </div>

        {/* Main testimonial */}
        <div
          className="max-w-md sm:max-w-4xl mx-auto"
          ref={mainCardRef}
          role="group"
          aria-roledescription="carousel"
          aria-live="polite"
          aria-label={`Depoimento de ${currentTestimonial.name}`}
        >
          <Card

  className="bg-gradient-to-br from-card to-card/50 border-border h-[500px] sm:h-96 shadow-elegant transition-all duration-700 flex flex-col"
  onMouseEnter={() => setIsAutoPlaying(false)}
  onMouseLeave={() => setIsAutoPlaying(true)}
>
  {/* 3. Adicionei h-full para o conteúdo ocupar todo o card */}
  <CardContent className="flex justify-center items-center p-6 sm:p-6 backdrop-blur-4xl h-full w-full">
    <div className="text-center w-full flex flex-col h-full justify-center"> 
      
      {/* Cabeçalho (Ícone, Estrelas, Empresa) */}
      <div>
        <Quote className="h-10 sm:h-8 w-10 sm:w-8 mx-auto opacity-60 mb-4 sm:mb-6" />

        <div className="flex justify-center gap-1 mb-4 sm:mb-4">
          {[...Array(currentTestimonial.rating)].map((_, i) => (
            <Star
              key={i}
              color="yellow"
              className="h-4 sm:h-6 w-4 sm:w-6 fill-current"
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="font-bold text-[12px] mb-2 block uppercase sm:text-md text-gray-400">
          {currentTestimonial.company}
        </span>
      </div>

      
      <blockquote className="flex flex-col justify-start items-center text-center mt-2 text-sm leading-relaxed p-2 mb-4 h-[220px] sm:h-[110px] overflow-y-auto scrollbar-none shrink-0">
         <span className="my-auto block">
            “{currentTestimonial.content}”
         </span>
      </blockquote>

      <cite className="flex flex-col not-italic items-center justify-center gap-2 mt-auto sm:mt-0">
        <span className="font-bold text-sm sm:text-md text-amber-100">
          {currentTestimonial.name}
        </span>
        <span className="text-xs sm:text-sm">
          {currentTestimonial.role}
        </span>
      </cite>

    </div>
  </CardContent>
</Card>
        </div>


        <div className="flex items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-12">
          <button
            type="button"
            onClick={prevTestimonial}
            aria-label="Depoimento anterior"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border cursor-pointer border-white/50 hover:border-gold transition-colors flex items-center justify-center group"
          >
            <ChevronLeft
              className="h-4 sm:h-6 w-4 sm:w-6 text-muted-foreground group-hover:text-gold transition-colors"
              aria-hidden="true"
            />
          </button>

          {/* Dots */}
          <div className="flex gap-1 sm:gap-2 " aria-hidden="true">
            {testimonials.map((_, i) => (
              <div
                key={i}
                aria-selected={i === currentIndex}
                aria-label={`Ir para depoimento ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-gray-400 scale-125" : "bg-slate-700"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextTestimonial}
            aria-label="Próximo depoimento"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border cursor-pointer border-white/50 hover:border-gold transition-colors flex items-center justify-center group"
          >
            <ChevronRight
              className="h-4 sm:h-6 w-4 sm:w-6 text-muted-foreground group-hover:text-gold transition-colors"
              aria-hidden="true"
            />
          </button>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-16 pb-10">
          {testimonials
            .filter((_, i) => i !== currentIndex)
            .slice(0, 2)
            .map((testimonial) => (
              <Card
                key={testimonial.id}
                className="border-2 border-white/50 hover:border-yellow-200 transition-all duration-300 cursor-pointer backdrop-blur-md h-46 sm:mb-10"
                role="button"
                tabIndex={0}
                aria-label={`Ver depoimento completo de ${testimonial.name}`}
                onClick={() =>
                  goToIndex(
                    testimonials.findIndex((t) => t.id === testimonial.id)
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    goToIndex(
                      testimonials.findIndex((t) => t.id === testimonial.id)
                    );
                  }
                }}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex gap-1 mb-2 sm:mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        color="yellow"
                        className="h-3 w-3 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <p className="text-xs mb-2 sm:mb-4 line-clamp-3 h-16 overflow-y-auto scrollbar-none">
                    “{testimonial.content}”
                  </p>

                  <div className="flex items-center gap-2">
                    <div>
                      <div className="font-medium text-xs sm:text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

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
    name: "Aldinei Silva",
    role: "Produtor de Vídeo",
    company: "",
    rating: 5,
    content:
      "A B Leal superou todas as expectativas! A estrutura montada foi impecável e a iluminação criou uma atmosfera única. Profissionalismo total da equipe.",
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

const Testimonials: FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const mainCardRef = useRef<HTMLDivElement | null>(null);
  const logosRef = useRef<(HTMLImageElement | null)[]>([]);

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

      logosRef.current.forEach((logo, index) => {
        if (!logo) return;

        gsap.to(logo, {
          y: index % 2 === 0 ? 20 : -20,
          rotation: index % 2 === 0 ? 8 : -8,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
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

    const el = mainCardRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [currentIndex]);

  const currentTestimonial: Testimonial = testimonials[currentIndex];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-title"
      role="region"
      aria-roledescription="Carrossel de depoimentos"
      aria-live="polite"
      className="section-padding relative bg-black px-4 sm:px-6 text-white"
    >
      {/* Background logos decorativos */}
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
            ref={(el) => {
              logosRef.current[i] = el;
            }}
            className="
              absolute 
              w-24 sm:w-36 md:w-48 lg:w-60 
              opacity-20 
              blur-[1px] 
              transition-transform 
              duration-700 
              ease-in-out 
              hover:scale-105
            "
            style={pos}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            id="testimonials-title"
            ref={titleRef}
            className="text-2xl sm:text-4xl md:text-4xl font-black mb-2 oswald uppercase"
          >
            Clientes que já viveram essa experiência
          </h2>
          <p
            ref={textRef}
            className="text-xs text-white/70 max-w-2xl mx-auto mb-2 font-extralight uppercase"
          >
            O que nossos clientes dizem sobre nosso trabalho
          </p>

          {/* Linhas decorativas */}
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
        <div className="max-w-md sm:max-w-4xl mx-auto" ref={mainCardRef}>
          <Card
            className="bg-gradient-to-br from-card to-card/50 border-border shadow-elegant transition-all duration-700"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <CardContent className="flex justify-center items-center p-6 sm:p-6 backdrop-blur-4xl">
              <div className="text-center">
                <Quote aria-hidden="true" className="h-10 sm:h-8 w-10 sm:w-8 mx-auto opacity-60 mb-4 sm:mb-8" />

                <div className="flex justify-center gap-1 mb-4 sm:mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      aria-hidden="true"
                      color="yellow"
                      className="h-4 sm:h-6 w-4 sm:w-6 fill-current"
                    />
                  ))}
                </div>

                <blockquote
                  className="flex justify-center items-center text-sm leading-relaxed mb-4 h-[320px] sm:h-[100px] overflow-y-auto"
                  aria-label="Depoimento do cliente"
                >
                  "{currentTestimonial.content}"
                </blockquote>

                <footer
                  className="flex flex-col sm:flex-row items-center justify-center gap-2"
                  aria-label="Informações do autor do depoimento"
                >
                  <div className="text-center">
                    <div className="font-bold text-sm sm:text-md text-amber-100">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-xs sm:text-sm">{currentTestimonial.role}</div>
                  </div>
                </footer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-12">
          <button
            onClick={prevTestimonial}
            aria-label="Mostrar depoimento anterior"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border cursor-pointer border-white/50 hover:border-gold transition-colors flex items-center justify-center group"
          >
            <ChevronLeft aria-hidden="true" className="h-4 sm:h-6 w-4 sm:w-6 text-muted-foreground group-hover:text-gold transition-colors" />
          </button>

          <div className="flex gap-1 sm:gap-2" role="tablist">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToIndex(i)}
                aria-label={`Ir para o depoimento número ${i + 1}`}
                aria-pressed={i === currentIndex}
                role="tab"
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-gray-400 scale-125" : "bg-slate-700"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            aria-label="Mostrar próximo depoimento"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border cursor-pointer border-white/50 hover:border-gold transition-colors flex items-center justify-center group"
          >
            <ChevronRight aria-hidden="true" className="h-4 sm:h-6 w-4 sm:w-6 text-muted-foreground group-hover:text-gold transition-colors" />
          </button>
        </div>

        {/* Small testimonial cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-16">
          {testimonials
            .filter((_, i) => i !== currentIndex)
            .slice(0, 2)
            .map((testimonial) => (
              <button
                key={testimonial.id}
                onClick={() =>
                  goToIndex(testimonials.findIndex((t) => t.id === testimonial.id))
                }
                className="text-left w-full"
                aria-label={`Ler depoimento de ${testimonial.name}`}
              >
                <Card className="border-2 border-white/50 hover:border-yellow-200 transition-all duration-300 cursor-pointer backdrop-blur-md">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-1 mb-2 sm:mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          aria-hidden="true"
                          color="yellow"
                          className="h-3 w-3 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-xs mb-2 sm:mb-4 line-clamp-3 max-h-20">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="font-medium text-xs sm:text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

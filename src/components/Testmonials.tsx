import { useState, useEffect, useRef, useLayoutEffect, type FC } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import logoImage from "@/assets/img/logovermelha.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// =====================
// 🔹 Tipagens
// =====================
interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
  image: string;
}

// =====================
// 🔹 Dados
// =====================
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
    name: "Melque Pimentel",
    role: "Show Business",
    company: "",
    rating: 5,
    content:
      "Trabalho com a B Leal há anos e sempre entregam qualidade excepcional. O som ficou perfeito e a montagem foi realizada no prazo. Recomendo muito!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Carlos Mendes",
    role: "Produtor Musical",
    company: "",
    rating: 5,
    content:
      "Trabalho com a B Leal há mais de 3 anos e posso dizer que são os melhores do mercado. A sonorização é impecável e a equipe sempre entrega além do esperado. Parceria de sucesso garantido!",
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

  const logosRef = useRef<(HTMLImageElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const mainCardRef = useRef<HTMLDivElement | null>(null);
  const smallCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // =====================
  // 🔹 GSAP ScrollTrigger Animations
  // =====================
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title + Subtitle animation
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

      // Main card entrance
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

      // Background logos animation
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

        gsap.to(logo, {
          y: index % 2 === 0 ? 100 : -100,
          filter: "blur(2px)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // =====================
  // 🔹 Auto play testimonials
  // =====================
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // =====================
  // 🔹 Controls
  // =====================
  const nextTestimonial = (): void =>
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );

  const prevTestimonial = (): void =>
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  const currentTestimonial: Testimonial = testimonials[currentIndex];

  // =====================
  // 🔹 Render
  // =====================
  return (
    <section
      ref={sectionRef}
      className="section-padding relative bg-black px-4 sm:px-6"
    >
      {/* Background logos */}
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
      ref={(el) => {logosRef.current[i] = el;}}
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
            ref={titleRef}
            className="text-2xl sm:text-4xl md:text-4xl font-black mb-2 oswald"
          >
            DEPOIMENTOS
          </h2>
          <p
          
            className="text-xs text-white/70 max-w-2xl mx-auto mb-2 font-extralight uppercase"
          >
            O que nossos clientes dizem sobre nosso trabalho
          </p>
          <div className="flex gap-1 max-w-36 mx-auto">
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
            className="bg-gradient-to-br from-card to-card/50 border-border shadow-elegant"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <CardContent className="p-6 sm:p-12">
              <div className="text-center">
                <Quote className="h-10 sm:h-8 w-10 sm:w-8 mx-auto opacity-60 mb-4 sm:mb-8" />
                <div className="flex justify-center gap-1 mb-4 sm:mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      color="yellow"
                      className="h-4 sm:h-6 w-4 sm:w-6 fill-current"
                    />
                  ))}
                </div>
                <blockquote className="text-sm sm:text-lg  leading-relaxed max-h-36 sm:max-h-40 mb-4 sm:mb-8">
                  "{currentTestimonial.content}"
                </blockquote>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <div className="text-center ">
                    <div className="font-bold text-sm sm:text-md text-gold">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-xs sm:text-sm">
                      {currentTestimonial.role}
                    </div>
                   
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-12">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border cursor-pointer border-white/50 hover:border-gold transition-colors flex items-center justify-center group"
          >
            <ChevronLeft className="h-4 sm:h-6 w-4 sm:w-6 text-muted-foreground group-hover:text-gold transition-colors" />
          </button>
          <div className="flex gap-1 sm:gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2  h-2  rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-slate-200 shadow-glow-gold"
                    : "bg-slate-800 hover:bg-purple"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border cursor-pointer border-white/50 hover:border-gold transition-colors flex items-center justify-center group"
          >
            <ChevronRight className="h-4 sm:h-6 w-4 sm:w-6 text-muted-foreground group-hover:text-gold transition-colors" />
          </button>
        </div>

        {/* Small testimonial cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-16">
          {testimonials
            .filter((_, i) => i !== currentIndex)
            .slice(0, 2)
            .map((testimonial, index) => (
              <Card
                key={testimonial.id}
                ref={(el) => { smallCardsRef.current[index] = el; }}
                className="border-2 border-white/50 hover:border-yellow-200 transition-all duration-300 cursor-pointer backdrop-blur-md"
                onClick={() =>
                  setCurrentIndex(
                    testimonials.findIndex((t) => t.id === testimonial.id)
                  )
                }
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex gap-1 mb-2 sm:mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        color="yellow"
                        className="h-3 w-3 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-3 max-h-20">
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
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import { useState, useRef, useLayoutEffect } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { ExternalLink, X } from "lucide-react";
import gsap from "gsap";
import logoImage from "@/assets/img/logoverde.png";

const portfolioItems = [
  {
    id: 1,
    title: "Aniversário de 15 Anos",
    category: "Shows",
    description:
      "Produção completa para festival com 50.000 pessoas, incluindo 4 palcos simultâneos com iluminação LED sincronizada.",
    video: "https://res.cloudinary.com/ds5exijte/video/upload/v1761610053/15_anos_r98pfc.mov",
    featured: false,
  },
  {
    id: 2,
    title: "Bodega do Pablo",
    category: "Corporativo",
    description:
      "Uma noite inesquecível pede uma produção à altura. Na bodega do Pablo, a B Leal entregou estrutura grandiosa, iluminação cênica e telões impactantes, criando um espetáculo que uniu tecnologia e emoção. Porque não se trata apenas de montar um palco, e sim de criar experiências que marcam para sempre. 💡🎶",
    video: "https://res.cloudinary.com/ds5exijte/video/upload/v1761610022/BODEGA_DO_PABLO_ac7j2l.mov",
    featured: false,
  },
  {
    id: 3,
    title: "Bouvelard Fashion",
    category: "Teatro",
    description:
      "Mais uma edição do Boulevard Fashion com a assinatura da B Leal Produções! iluminação de ponta, estrutura completa, sonorização, geradores e painéis de LED que transformaram o evento em um verdadeiro espetáculo.",
    video: "https://res.cloudinary.com/ds5exijte/video/upload/v1761609994/EVENTO_COORPORATIVO_-_BOULEVAR_SHOPPING_ntei21.mov",
    featured: false,
  },
  {
    id: 4,
    title: "Lançamento Marca UNEF",
    category: "Social",
    description:
      "Um evento grandioso pede uma produção à altura! 💡 A B Leal Produções foi responsável por toda a estrutura e iluminação na celebração dos 24 anos da UNEF e da transição para Centro Universitário.",
    video: "https://res.cloudinary.com/ds5exijte/video/upload/v1761609978/EVENTO_COORPORATIVO_-_LANC%CC%A7AMENTO_MARCA_UNEF_pwbrpk.mp4",
    featured: false,
  },
  {
    id: 5,
    title: "EXPOFEIRA",
    category: "Corporativo",
    description:
      "Iluminação que transforma espaços! Na Expofeira, a B Leal assinou a iluminação de alguns stands, dando destaque especial para cada detalhe e valorizando a experiência de quem visitou o evento. ✨❤️",
    video: "https://res.cloudinary.com/ds5exijte/video/upload/v1761612824/EXPOFEIRA_1_au26gk.mp4",
    featured: true,
  },
  {
    id: 6,
    title: "São João",
    category: "Shows",
    description:
      "de um São João inesquecível! Estruturas que marcaram as principais cidades e levaram um brilho jamais visto antes. 💡🎶 A B Leal esteve presente transformando cada espaço em um verdadeiro espetáculo, unindo tradição e inovação em noites que vão ficar para sempre na memória. Porque quando o assunto é São João, nossa missão é clara: iluminar sonhos e criar experiências únicas.",
    video: "https://res.cloudinary.com/ds5exijte/video/upload/v1761613184/BLEAL_PRODU%C3%87%C3%95ES_4K_RENDER_FINAL_1_tbmpwc.mp4",
    featured: true,
  },
  {
    id: 7,
    title: "Vaquejada de Serrinha",
    category: "Shows",
    description:
      "Vaquejada de Serrinha em grande estilo! A B Leal esteve presente assinando a estrutura e iluminação que deram ainda mais força e brilho a esse evento que já é tradição.💡 Porque cada espetáculo merece a grandeza da luz certa e a segurança de uma estrutura impecável.",
    video: "https://res.cloudinary.com/ds5exijte/video/upload/v1761610027/VAQUEJADA_DE_SERRINHA_zh1ttq.mov",
    featured: false,
  },
];

const Portfolio = () => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<
    (typeof portfolioItems)[0] | null
  >(null);
  const logosRef = useRef<HTMLImageElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      logosRef.current.forEach((logo, index) => {
        if (!logo) return;
        gsap.to(logo, {
          y: index % 2 === 0 ? 20 : -20,
          rotation: index % 2 === 0 ? 8 : -8,
          filter: "blur(4px)",
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      className="relative section-padding bg-black px-4 sm:px-6"
    >
      {/* Logos de fundo */}
      <div className="inset-0 pointer-events-none absolute">
        {[...Array(5)].map((_, i) => (
          <img
            key={i}
            src={logoImage}
            alt=""
            ref={(el) => {
              if (el) logosRef.current[i] = el;
            }}
            className="absolute w-48 sm:w-72 opacity-20 blur-xs"
            style={{
              top: [80, 240, 400, 320, 560][i],
              left: [160, undefined, -80, undefined, undefined][i],
              right: [undefined, -40, undefined, 900, 64][i],
              bottom: [undefined, undefined, -100, undefined, 40][i],
            }}
          />
        ))}
      </div>

      <div className="container max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-black mb-2 oswald">
            EVENTOS REALIZADOS
          </h2>
          <p className="text-xs text-white/70 max-w-2xl mx-auto mb-2 font-extralight uppercase">
            Cada projeto é uma obra de arte. Confira alguns dos nossos trabalhos
            mais marcantes.
          </p>
          <div className="flex gap-1 max-w-36 mx-auto">
            {["bg-red-500", "bg-green-500", "bg-blue-500"].map((color, i) => (
              <div
                key={i}
                className={`w-16 sm:w-42 h-0.5 ${color} mx-auto rounded-full `}
              />
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {portfolioItems.map((item) => (
            <Card
              key={item.id}
              className={`group cursor-pointer overflow-hidden   ${
                item.featured ? "sm:col-span-2" : ""
              }`}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden">
                <div className="relative w-full h-80 sm:h-[450px] overflow-hidden">
                  <video
                    src={item.video}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
                      hoveredItem === item.id ? "scale-105" : "scale-100"
                    }`}
                    ref={(el) => {
                      if (!el) return;

                      el.onloadeddata = () => {
                        if (hoveredItem !== item.id) {
                          el.currentTime = 2;
                          el.pause();
                        }
                      };

                      if (hoveredItem === item.id) {
                        el.currentTime = 0;
                        el.play();
                      } else {
                        // Quando sai, pausa e mantém o frame atual
                        el.pause();
                      }
                    }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300 ${
                      hoveredItem === item.id ? "opacity-20" : "opacity-80"
                    }`}
                  />
                </div>

                <CardContent className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10">
                  <h3 className="text-sm sm:text-md font-bold uppercase">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-xs text-gray-300 leading-relaxed font-light line-clamp-2">
                    {item.description}
                  </p>
                  <div
                    className={`pt-2 sm:pt-4 transition-all duration-300 ${
                      hoveredItem === item.id
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 sm:translate-y-4 opacity-0"
                    }`}
                  >
                    <button className="flex items-center gap-2 text-gold font-medium text-xs sm:text-sm transition-colors">
                      Ver Detalhes{" "}
                      <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal */}
        {selectedItem && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center  z-50 p-4"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="relative bg-white/10 backdrop-blur-md text-white rounded-2xl max-w-3xl w-full overflow-hidden "
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 z-10 right-3 text-white/80 hover:text-white cursor-pointer"
                onClick={() => setSelectedItem(null)}
              >
                <X className="w-6 h-6" />
              </button>
              <video
                src={selectedItem.video}
                autoPlay
                controls
                className="w-full h-[400px] object-cover"
              />
              <div className="p-4 ">
                <h3 className="text-lg font-bold mb-2 uppercase oswald">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-white/70 mb-4 font-light">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-center mt-12 sm:mt-16 px-2 sm:px-0 text-zinc-300">
        <p className="text-xs sm:text-lg font-bold mb-4 sm:mb-6 uppercase">
          <span className="font-light">Quer ver seu evento aqui? </span> Vamos
          criar algo incrível juntos!
        </p>
        <a
          href="https://wa.me/5575999535995"
          target="_blank"
          rel="noopener noreferrer"
          className="
              relative inline-block px-6 sm:px-10 py-3 sm:py-4 font-bold text-white uppercase tracking-wide rounded-2xl overflow-hidden
              transition-all duration-500 ease-in-out bg-gradient-to-r from-green-500 via-emerald-600 to-green-700
              shadow-[0_0_20px_rgba(34,197,94,0.6)]
              hover:shadow-[0_0_40px_rgba(34,197,94,0.9)]
              hover:scale-105
              active:scale-95
              group
            "
        >
          <span className="relative z-5 text-xs sm:text-base">
            Solicitar meu orçamento
          </span>
          <span
            className="
                absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent
                translate-x-[-200%]
                group-hover:translate-x-[200%]
                transition-transform duration-[1200ms] ease-in-out
              "
          />
          <span
            className="
                absolute inset-0 rounded-2xl border-2 border-transparent
                group-hover:border-white/40
                transition-all duration-500 ease-in-out
              "
          />
        </a>
      </div>
    </section>
  );
};

export default Portfolio;

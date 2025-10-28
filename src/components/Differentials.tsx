import { Cpu, Users2, Trophy, Shield, Layers2, Calendar } from "lucide-react";

const differentials = [
  {
    icon: Cpu,
    title: "Tecnologia de Ponta",
    description:
      "Equipamentos de última geração e controladores profissionais para efeitos precisos e impactantes.",
  },
  {
    icon: Users2,
    title: "Equipe Especializada",
    description:
      "Profissionais certificados e com anos de experiência em eventos de pequeno e grande porte.",
  },
  {
    icon: Trophy,
    title: "Portfólio Comprovado",
    description:
      "Atuação em festivais, shows regionais, eventos corporativos e comemorativos.",
  },
  {
    icon: Shield,
    title: "Conformidade total com normas de segurança",
    description: "NR-10, NR-12 e NR-35",
  },
  {
    icon: Layers2,
    title: "Estrutura segura",
    description: "Montagem eficiente e confiável",
  },
];

const Differentials = () => {
  return (
    <section
      id="differentials"
      className="py-16 sm:py-24 bg-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-1/2 left-0 w-1/4 sm:w-1/3 h-72 sm:h-96 blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-1/4 sm:w-1/3 h-72 sm:h-96"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-black mb-2 oswald">
            NOSSOS DIFERENCIAIS
          </h2>
          <p className="text-xs text-white/70 max-w-2xl mx-auto mb-2 font-extralight uppercase">
            O que nos torna referência em produção de eventos e iluminação profissional
          </p>
          <div className="flex gap-1 max-w-36 mx-auto">
            {["bg-red-500", "bg-green-500", "bg-blue-500"].map((color, i) => (
              <div
                key={i}
                className={`w-24 sm:w-42 h-0.5 ${color} mx-auto rounded-full pulse-rgb`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left column - differentials list */}
          <div className="space-y-6 sm:space-y-8">
            {differentials.map((differential, index) => (
              <div
                key={index}
                className="flex gap-4 sm:gap-6 p-3 sm:p-4 rounded-xl items-center bg-gray-800/30 border border-white/40 hover:border-zinc-300 transition-all duration-300 hover:scale-[1.03] hover:translate-x-4 group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-lg bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <differential.icon className="w-5 h-5 sm:w-7 sm:h-7 text-zinc-500" />
                </div>
                <div>
                  <h3 className="uppercase text-[14px] sm:text-md font-light mb-1 text-white group-hover:text-zinc-300 transition-colors duration-300 oswald">
                    {differential.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light">{differential.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right column - visual element */}
          <div className="relative h-72 sm:h-[600px] py-5 sm:py-0 border-2 border-white/40 rounded-2xl overflow-hidden animate-fade-in mt-8 md:mt-0">

            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
              <div className="text-center space-y-6 sm:space-y-2 p-6 sm:p-8">
                <div className="oswald text-5xl sm:text-8xl font-medium bg-gradient-to-br text-white ">
                  +10.000
                </div>
                <p className="text-lg font-light sm:text-lg mt-4  text-slate-400 uppercase oswald">
                  Eventos Realizados
                </p>
                <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-white rounded-full p-2">
              <Calendar className="w-4 h-4 text-black" />
            </div>
          </div>
        </div>
                <div className="mt-10">
                  <div className="text-center border-2 border-white/50 bg-black rounded-2xl p-2">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1 oswald">
                      +12
                    </div>
                    <p className="text-xs  text-gray-400 uppercase ">Anos de Experiência</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentials;

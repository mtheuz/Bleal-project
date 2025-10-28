import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoImage from "@/assets/img/logo-second1.png";

const NAV_ITEMS = [
  { label: "Início", href: "#" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false); // Para efeito de slide ao carregar

  useEffect(() => {
    // Slide-down ao montar
    setShowHeader(true);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const target = href === "#" ? document.body : document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 text-white
        transition-all duration-500 ease-in-out overflow-hidden
        ${isScrolled ? "bg-black/25 backdrop-blur-md" : "bg-transparent"}
      `}
    >
      <div className="mx-10 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("#")}
          >
            <img src={logoImage} alt="B Leal Produções" className="h-8 md:h-10 w-auto" />
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {NAV_ITEMS.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollToSection(href)}
                className="relative font-medium uppercase text-xs group cursor-pointer"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            ))}

            <ButtonSolicitar onClick={() => scrollToSection("#contato")} />
          </div>

          {/* BOTÃO MOBILE */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MENU MOBILE COM EFEITO SLIDE */}
      <div
        className={`
          md:hidden bg-black/60 backdrop-blur-md border-t border-white/30
          transition-all duration-500 ease-in-out overflow-hidden
          ${isMenuOpen ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-10"}
        `}
      >
        <div className="container mx-auto px-6 py-6 flex flex-col gap-4 ">
          {NAV_ITEMS.map(({ label, href }) => (
            <button
              key={label}
              onClick={() => scrollToSection(href)}
              className="text-left text-xs text-white uppercase hover:text-white/50 transition-colors duration-300 font-medium py-2"
            >
              {label}
            </button>
          ))}

          <a
            href="https://wa.me/5575999535995"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block px-10 py-4 text-xs text-white uppercase text-center border-2 border-white/40 rounded-xl overflow-hidden transition-all duration-500 ease-in-out bg-gradient-to-r from-zinc-800/50 via-black/70 to-zinc-800/50 shadow-[10px_10px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_10px_rgba(0,0,0,0.9)] hover:scale-105 active:scale-95 group"
          >
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc to-white">
              Solicitar meu orçamento
            </span>
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[1200ms] ease-in-out" />
            <span className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-white/40 transition-all duration-500 ease-in-out" />
          </a>
        </div>
      </div>
    </nav>
  );
};

/* BOTÃO DE ORÇAMENTO (DESKTOP) */
const ButtonSolicitar = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group relative px-10 py-4 ml-4 font-bold text-white text-sm uppercase tracking-wide bg-transparent cursor-pointer overflow-hidden transition-all duration-500 ease-in-out"
  >
    <span className="relative z-10 inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-white/50 to-white bg-[length:200%_auto] animate-shine-text font-black">
      Solicitar orçamento
    </span>

    {/* Efeitos decorativos */}
    <span className="absolute top-0 right-0 h-1 w-10 group-hover:w-28 bg-white rounded-full transition-all duration-500 ease-in-out" />
    <span className="absolute top-0 right-0 w-1 h-11 group-hover:h-5 bg-white rounded-full transition-all duration-500 ease-in-out z-10" />
    <span className="absolute top-6 right-0 w-1 h-1 bg-red-500 rounded-full" />
    <span className="absolute top-8 right-0 w-1 h-1 bg-green-500 rounded-full" />
    <span className="absolute top-10 right-0 w-1 h-1 bg-blue-500 rounded-full" />
    <span className="absolute bottom-0 left-0 h-1 w-10 group-hover:w-28 bg-white rounded-full transition-all duration-500 ease-in-out" />
    <span className="absolute bottom-0 left-0 w-1 h-10 bg-white rounded-full" />
  </button>
);

export default Header;

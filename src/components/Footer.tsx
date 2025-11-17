import { Phone, Mail, MapPin } from "lucide-react";
import logoImg from "@/assets/img/logo-second1.png";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    "Iluminação Profissional",
    "Estrutura e Palcos",
    "Efeitos Visuais",
    "Eventos Corporativos",
  ];

  const quickLinks = [
    { label: "Início", href: "#" },
    { label: "Sobre Nós", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "Contato", href: "#contato" },
  ];

  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.querySelector(href);
      section?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

  
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          <section className="lg:col-span-2" aria-labelledby="footer-company">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logoImg}
                alt="Logo B Leal Produções"
                className="h-10 sm:h-14"
              />
            </div>

            <p id="footer-company" className="text-sm leading-relaxed mb-6 max-w-md">
              Transformamos eventos em espetáculos únicos e inesquecíveis.
              Especialistas em iluminação, estrutura e efeitos visuais
              para criar experiências extraordinárias.
            </p>


            <ul className="space-y-3 text-sm" aria-label="Informações de contato">
              <li className="flex items-center gap-3 cursor-pointer hover:text-gold transition-colors">
                <Phone color="#FA4523" className="h-5 w-5" aria-hidden="true" />
                <span>(75) 99953-5995</span>
              </li>

              <li className="flex items-center gap-3 cursor-pointer hover:text-gold transition-colors">
                <Mail color="#17E63D" className="h-5 w-5" aria-hidden="true" />
                <span>contato@blealproducoes.com.br</span>
              </li>

              <li className="flex items-center gap-3 cursor-pointer hover:text-gold transition-colors">
                <MapPin color="#176AE6" className="h-5 w-5" aria-hidden="true" />
                <span>Av. Centenário, 840 - Feira de Santana, BA</span>
              </li>
            </ul>
          </section>


          <nav aria-labelledby="footer-services">
            <h3 id="footer-services" className="text-xl font-bold text-purple mb-6">
              Nossos Serviços
            </h3>

            <ul className="space-y-3 text-sm">
              {services.map((service, i) => (
                <li key={i}>
                  <span className="text-muted-foreground transition-colors inline-block">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </nav>


          <nav aria-labelledby="footer-links">
            <h3 id="footer-links" className="text-xl font-bold text-purple mb-6">
              Links Rápidos
            </h3>

            <ul className="space-y-3 text-sm">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <a
              href="https://www.instagram.com/blealproducoes/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center sm:justify-start mt-6 gap-2 items-center hover:scale-105 transition-transform cursor-pointer hover:text-gold"
              aria-label="Acessar o Instagram da empresa"
            >
              <BsInstagram size={20} aria-hidden="true" />
              <span className="text-lg font-bold text-gold">Siga no Instagram</span>
            </a>
          </nav>

        </div>


        <div className="py-6 border-t border-white/10">
          <p className="text-center text-sm">
            © {currentYear} B Leal Produções. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

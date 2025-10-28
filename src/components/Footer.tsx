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
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoImg} alt="Logo B Leal Produções" className="h-10 sm:h-14" />
            </div>
            
            <p className="text-sm leading-relaxed mb-6 max-w-md">
              Transformamos eventos em espetáculos únicos e inesquecíveis. 
              Especialistas em iluminação, estrutura e efeitos visuais 
              para criar experiências extraordinárias.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors cursor-pointer">
                <Phone color="#FA4523" className="h-5 w-5" />
                <span>(75) 99953-5995</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors cursor-pointer">
                <Mail color="#17E63D" className="h-5 w-5" />
                <span>contato@blealproducoes.com.br</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors cursor-pointer">
                <MapPin color="#176AE6" className="h-5 w-5" />
                <span>Av. Centenário, 840 - Feira de Santana, BA</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold text-purple mb-6">Nossos Serviços</h3>
            <ul className="space-y-3 text-sm">
              {services.map((service, i) => (
                <li key={i}>
                  <span className="text-muted-foreground transition-colors  inline-block">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-purple mb-6">Links Rápidos</h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className=" transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            <a href="https://www.instagram.com/blealproducoes/" target="_blank" rel="noopener noreferrer" className="flex justify-center sm:justify-start mt-6 gap-2 items-center hover:scale-105 transition-transform cursor-pointer hover:text-gold">
              <BsInstagram size={20} className="transition-colors" />
              <h4 className="text-lg font-bold text-gold">Siga no Instagram</h4>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <p className="text-center text-sm ">
            © {currentYear} B Leal Produções. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

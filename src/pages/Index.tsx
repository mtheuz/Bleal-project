import { Helmet } from "react-helmet";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { lazy, Suspense } from "react";

const About = lazy(() => import("../components/About"));
const Services = lazy(() => import("../components/Services"));
const Differentials = lazy(() => import("../components/Differentials"));
const Portfolio = lazy(() => import("../components/Portfolio"));
const Testimonials = lazy(() => import("../components/Testmonials"));
const Footer = lazy(() => import("../components/Footer"));

const Index = () => {
  const canonicalUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://blealproducoes.com.br";

 const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BLeal Produções",
    url: "https://blealproducoes.com.br",
    logo: "https://blealproducoes.com.br/logo.png",
    description:
      "A BLeal Produções é referência em soluções técnicas para eventos em Feira de Santana e em toda a Bahia. Estrutura, iluminação e impacto visual com tecnologia e responsabilidade.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Feira de Santana",
      addressRegion: "BA",
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55 75 99999-9999",
      contactType: "Atendimento ao Cliente",
    },
    sameAs: [
      "https://www.instagram.com/blealproducoes",
      "https://www.facebook.com/blealproducoes"
    ]
  };

  return (
    <>
      <Helmet>
        {/* ----------- SEO BÁSICO ----------- */}
        <title>BLeal Produções | Soluções Técnicas para Eventos em Feira de Santana</title>
        <meta
          name="description"
          content="Referência em soluções técnicas para eventos na Bahia. Estrutura, iluminação, som e impacto visual com tecnologia, criatividade e responsabilidade."
        />
        <meta     
          name="keywords"
          content="BLeal Produções, eventos em Feira de Santana, soluções técnicas, estrutura de palco, iluminação profissional, som, produção de eventos, aluguel de equipamentos, eventos corporativos, produção técnica, eventos sociais, eventos culturais, tecnologia para eventos, impacto visual, eventos inesquecíveis, Estrutura para evento, Feira de Santana"
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />

        {/* ----------- OPEN GRAPH (Facebook / WhatsApp / LinkedIn) ----------- */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BLeal Produções | Soluções Técnicas para Eventos" />
        <meta
          property="og:description"
          content="Estrutura, iluminação e impacto visual para eventos inesquecíveis. Atuação em toda a Bahia com tecnologia e excelência."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://blealproducoes.com.br/images/og-banner.jpg" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="BLeal Produções" />

        {/* ----------- TWITTER CARD ----------- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BLeal Produções | Soluções Técnicas para Eventos" />
        <meta
          name="twitter:description"
          content="Soluções técnicas completas para eventos em Feira de Santana e em toda a Bahia. Estrutura, iluminação e som com excelência."
        />
        <meta name="twitter:image" content="https://blealproducoes.com.br/images/og-banner.jpg" />

        {/* ----------- SCHEMA.ORG JSON-LD ----------- */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="text-white overflow-x-hidden">
        <Header />
        <Hero />

        <Suspense fallback={<div />}>
          <About />
          <Services />
          <Differentials />
          <Portfolio />
          <Testimonials />
          <Footer />
        </Suspense>
      </main>
    </>
  );
};

export default Index;

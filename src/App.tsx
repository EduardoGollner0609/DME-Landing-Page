import React, { useState, useEffect } from 'react';
import './App.css';
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaBullseye, FaEye, FaHandsHelping } from 'react-icons/fa';
import { RiMenu3Line } from 'react-icons/ri';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [formData, setFormData] = useState({
    document: '',
    email: '',
    whatsapp: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections: NodeListOf<HTMLElement> = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      // Usando um serviço de formulário como Formspree para enviar e-mail
      const response = await fetch('https://formspree.io/f/xdoqbwzj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _replyto: formData.email,
          _subject: 'Novo pedido de orçamento do site DME',
          _cc: 'vendas@dmedistribuidora.com.br' // Garantindo que o e-mail correto receba a mensagem
        })
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({
          document: '',
          email: '',
          whatsapp: ''
        });
        setTimeout(() => setFormStatus(''), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus(''), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 5000);
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <div className="logo">
            <a href="#home">
              <img src="/images/dme-logo.svg" alt="DME Logo" />
            </a>
          </div>
          <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul>
              <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#quem-somos" className={activeSection === 'quem-somos' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Quem Somos</a></li>
              <li><a href="#parceiros" className={activeSection === 'parceiros' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Parceiros</a></li>
              <li><a href="#orcamento" className={activeSection === 'orcamento' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Orçamento</a></li>
              <li><a href="#contato" className={activeSection === 'contato' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Fale Conosco</a></li>
              <li><a href="#faq" className={activeSection === 'faq' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Dúvidas Frequentes</a></li>
            </ul>
          </nav>
          <div className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <RiMenu3Line />
          </div>
        </div>
      </header>

      {/* Home Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Soluções em saúde com eficiência e confiança.</h1>
            <p>Distribuímos materiais médico-hospitalares com agilidade, qualidade e segurança para todo o Brasil.</p>
            <div className="orcamento-btn-space">
              <a href="#orcamento" className="btn-orcamento">Solicitar Orçamento</a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/images/hero-image.jpg" alt="Materiais médico-hospitalares" />
          </div>
        </div>
      </section>

      {/* Quem Somos Section */}
      <section id="quem-somos" className="about-section">
        <div className="container">
          <h2 className="section-title">Quem <span>Somos</span></h2>
          <div className="about-content">
            <div className="about-text">
              <div className="introduction-about-us">
                <p>A DME é uma distribuidora especializada em materiais médico-hospitalares que atende clínicas, hospitais e profissionais da saúde em todo o Brasil. Atuamos com foco em qualidade, agilidade e segurança, oferecendo soluções eficientes para suprir as demandas do setor da saúde. Nosso compromisso é ser um elo confiável entre os fabricantes e os profissionais que cuidam de vidas.</p>
              </div>
              <div className="mission-vision-values">
                <div className="mission">
                  <div className="icon-space-card-mission-vision-values">
                    <FaBullseye />
                  </div>
                  <h3>Missão</h3>
                  <p>Garantir o fornecimento de materiais médico-hospitalares com excelência, segurança e agilidade, contribuindo para o cuidado à saúde em todo o Brasil.</p>
                </div>
                <div className="vision">
                  <div className="icon-space-card-mission-vision-values">
                    <FaEye />
                  </div>
                  <h3>Visão</h3>
                  <p>Ser referência nacional em distribuição hospitalar, reconhecida pela confiança, qualidade e compromisso com o cliente.</p>
                </div>
                <div className="values">
                  <div className="icon-space-card-mission-vision-values">
                    <FaHandsHelping />
                  </div>
                  <h3>Valores</h3>
                  <ul>
                    <li>Compromisso com a vida</li>
                    <li>Ética e transparência</li>
                    <li>Agilidade e eficiência</li>
                    <li>Qualidade e segurança</li>
                    <li>Respeito aos clientes e parceiros</li>
                  </ul>
                </div>
              </div>

              <div className="quality-focus-national-service">
                <h3>Foco em qualidade, agilidade e segurança</h3>
                <p>Nosso modelo de distribuição é pensado para garantir rapidez na entrega, integridade dos produtos e conformidade com as normas de saúde. Trabalhamos com marcas confiáveis e processos rigorosos de logística para levar até você o melhor em materiais médico-hospitalares.</p>
                <h3>Atendimento nacional e experiência no setor da saúde</h3>
                <p>Com atuação em todo o território nacional, a DME oferece suporte logístico inteligente e atendimento especializado. Nossa equipe possui experiência no segmento, pronta para entender as necessidades da sua clínica ou hospital.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parceiros Section */}
      <section id="parceiros" className="partners-section">
        <div className="container">
          <h2 className="section-title">Nossos Parceiros</h2>
          <p className="section-subtitle">Trabalhamos com as melhores marcas do mercado para garantir qualidade e confiabilidade.</p>
          <div className="partners-grid">
            <div className="partner-logo">
              <img src="/images/partner-descarpack.png" alt="Descarpack" />
            </div>
            <div className="partner-logo">
              <img src="/images/partner-cremer.png" alt="Cremer" />
            </div>
            <div className="partner-logo">
              <img src="/images/partner-medix.png" alt="Medix" />
            </div>
            {/* Espaço para mais logos de parceiros */}
          </div>
        </div>
      </section>

      {/* Orçamento Section */}
      <section id="orcamento" className="quote-section">
        <div className="container">
          <h2 className="section-title">Solicite seu Orçamento</h2>
          <p className="section-subtitle">Preencha o formulário abaixo e nossa equipe entrará em contato o mais breve possível.</p>
          <div className="quote-form-container">
            <form className="quote-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="document">CNPJ/CPF</label>
                <input
                  type="text"
                  id="document"
                  name="document"
                  placeholder="Digite seu CNPJ ou CPF"
                  required
                  value={formData.document}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Digite seu e-mail"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="whatsapp">WhatsApp</label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="Digite seu WhatsApp"
                  required
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-full"
                disabled={formStatus === 'sending'}
              >
                {formStatus === 'sending' ? 'Enviando...' : 'Solicitar Orçamento'}
              </button>

              {formStatus === 'success' && (
                <div className="form-message success">
                  Orçamento solicitado com sucesso! Em breve entraremos em contato.
                </div>
              )}

              {formStatus === 'error' && (
                <div className="form-message error">
                  Ocorreu um erro ao enviar o formulário. Por favor, tente novamente ou entre em contato por WhatsApp.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="contact-section">
        <div className="container">
          <h2 className="section-title">Fale Conosco</h2>
          <p className="section-subtitle">Contamos com um time totalmente preparado para atendê-lo com dedicação. Fale com a DME diretamente pelo WhatsApp e receba o suporte ideal para o que você precisa.</p>
          <div className="contact-talk-us">
            <a href="https://encurtador.com.br/k8K7O" target="_blank" rel="noopener noreferrer">
              <div className="contact-talk-us-space">
                <div className="contact-talk-us-content">
                  <div className="contact-icon">
                    <FaWhatsapp />
                  </div>
                  <p>+55 27 3093-4545</p>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="location-space container">
          <h3>Nossa localização</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.7795571899405!2d-40.319691299999995!3d-20.350723499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb83de3487e8401%3A0x1c6700186bc7dd02!2sR.%20Stefano%20Crivilin%2C%204%20-%20Nossa%20Sra.%20da%20Penha%2C%20Vila%20Velha%20-%20ES%2C%2029110-160!5e0!3m2!1spt-BR!2sbr!4v1747523641495!5m2!1spt-BR!2sbr" loading="lazy"></iframe>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="container">
          <h2 className="section-title">Dúvidas Frequentes</h2>
          <div className="faq-container">
            <div className="faq-item">
              <div className="faq-question">
                <h3>Como funciona o envio?</h3>
              </div>
              <div className="faq-answer">
                <p>Após a confirmação do pedido, iniciamos imediatamente o processo de separação, embalagem e despacho. Trabalhamos com transportadoras confiáveis e envio ágil para garantir que seu pedido chegue com segurança e no prazo.</p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                <h3>Quais regiões são atendidas?</h3>
              </div>
              <div className="faq-answer">
                <p>Atendemos todas as regiões do Brasil, com logística eficiente para capitais e interior.</p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                <h3>Quais formas de pagamento são aceitas?</h3>
              </div>
              <div className="faq-answer">
                <p>Aceitamos PIX, transferência bancária, boleto e condições especiais para compras recorrentes (sob consulta).</p>
              </div>
            </div>
            <div className="faq-item">
              <div className="faq-question">
                <h3>Qual o prazo médio de entrega?</h3>
              </div>
              <div className="faq-answer">
                <p>O prazo varia conforme a localidade, mas buscamos entregar em até 5 dias úteis para capitais. Regiões mais afastadas podem ter prazos de até 10 dias úteis.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
        <div className="container">

          <div className="footer-logo">
            <a href="#home">
              <img src="/images/dme-logo.svg" alt="DME Logo" />
            </a>
          </div>
          <div className="footer-content">
            <div className="footer-content-mobile-left">
              <div className="footer-list-contacts">
                <ul>
                  <li>
                    <a href="https://encurtador.com.br/k8K7O" target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp />
                      +55 27 3093-4545
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/dmeexpresso/" target="_blank" rel="noopener noreferrer">
                      <FaInstagram />
                      @dmeexpresso
                    </a>
                  </li>
                  <li>
                    <a href="tel:+552730934545">
                      <FaPhone />
                      +55 27 3093-4545
                    </a>
                  </li>
                  <li>
                    <a href="mailto:comercial@dmedistribuidora.com.br">
                      <FaEnvelope />
                      comercial@dmedistribuidora.com.br
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-links-mobile">
                <h3>Links Rápidos</h3>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#quem-somos">Quem Somos</a></li>
                  <li><a href="#parceiros">Parceiros</a></li>
                  <li><a href="#orcamento">Orçamento</a></li>
                  <li><a href="#faq">Dúvidas Frequentes</a></li>
                  <li><a href="#contato">Fale Conosco</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-info">
              <p>CNPJ: 56.987.699/0001-80</p>
              <p>Endereço: Rua Stefano Crivilin, 04 - Vila Velha/ES</p>
              <p>Telefone e WhatsApp: +55 27 3093-4545</p>
            </div>

            <div className="footer-links">
              <h3>Links Rápidos</h3>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#quem-somos">Quem Somos</a></li>
                <li><a href="#parceiros">Parceiros</a></li>
                <li><a href="#orcamento">Orçamento</a></li>
                <li><a href="#faq">Dúvidas Frequentes</a></li>
                <li><a href="#contato">Fale Conosco</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} DME - Distribuição de Materiais Médico-Hospitalares. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a href="https://encurtador.com.br/k8K7O" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp />
      </a>
    </div>
  );
}

export default App;

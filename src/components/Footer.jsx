import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiFacebook, 
  FiInstagram, 
  FiTwitter, 
  FiMapPin, 
  FiPhone, 
  FiClock,
  FiMail,
  FiHeart,
  FiArrowUp,
  FiMessageCircle
} from 'react-icons/fi';
 import'./Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Cardápio', href: '/cardapio' },
    { name: 'Bebidas', href: '/bebidas' },
    { name: 'Sobremesas', href: '/sobremesas' },
    { name: 'Combos', href: '/combos' },
    { name: 'Sobre Nós', href: '/sobre' },
    { name: 'Contato', href: '/contato' }
  ];

  const contactInfo = [
    {
      icon: <FiMapPin />,
      text: 'Rua dos Sabores, 123 - Centro',
      subtext: 'São Paulo - SP, 01234-567'
    },
    {
      icon: <FiPhone />,
      text: '(11) 9999-9999',
      subtext: 'WhatsApp disponível'
    },
    {
      icon: <FiMail />,
      text: 'contato@burgerdelicia.com',
      subtext: 'Respondemos em até 2h'
    },
    {
      icon: <FiClock />,
      text: 'Segunda a Domingo',
      subtext: '11:00 - 23:00'
    }
  ];

  const socialLinks = [
    {
      icon: <FiFacebook />,
      href: '#',
      color: '#1877F2',
      name: 'Facebook'
    },
    {
      icon: <FiInstagram />,
      href: '#',
      color: '#E4405F',
      name: 'Instagram'
    },
    {
      icon: <FiTwitter />,
      href: '#',
      color: '#1DA1F2',
      name: 'Twitter'
    },
    {
      icon: <FiMessageCircle />,
      href: '#',
      color: '#25D366',
      name: 'WhatsApp'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="footer">
      <div className="footer__background">
        <div className="footer__pattern"></div>
      </div>
      
      <div className="footer__container">
        <motion.div
          className="footer__content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Brand Section */}
          <motion.div
            className="footer__section footer__brand"
            variants={itemVariants}
          >
            <motion.h3 
              className="footer__brand-title"
              whileHover={{ scale: 1.05 }}
            >
              Burger<span className="text-gold">Delícia</span>
            </motion.h3>
            <p className="footer__brand-description">
              Há 10 anos servindo os melhores hambúrgueres artesanais da cidade. 
              Ingredientes selecionados, preparo especial e sabor inesquecível em cada mordida.
            </p>
            
            <div className="footer__social">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="footer__social-link"
                  aria-label={social.name}
                  whileHover={{ 
                    scale: 1.2,
                    y: -5,
                    color: social.color
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17 
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            className="footer__section"
            variants={itemVariants}
          >
            <h4 className="footer__section-title">Contato</h4>
            <div className="footer__contact-list">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  className="footer__contact-item"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="footer__contact-icon">
                    {contact.icon}
                  </div>
                  <div className="footer__contact-info">
                    <p className="footer__contact-text">{contact.text}</p>
                    <p className="footer__contact-subtext">{contact.subtext}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer__section"
            variants={itemVariants}
          >
            <h4 className="footer__section-title">Links Rápidos</h4>
            <div className="footer__links">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="footer__link"
                  whileHover={{ 
                    x: 10,
                    color: 'var(--gold-light)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="footer__section"
            variants={itemVariants}
          >
            <h4 className="footer__section-title">Newsletter</h4>
            <p className="footer__newsletter-text">
              Receba nossas promoções e novidades em primeira mão!
            </p>
            <motion.form 
              className="footer__newsletter-form"
              whileHover={{ scale: 1.02 }}
            >
              <div className="footer__input-group">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="footer__input"
                  required
                />
                <motion.button
                  type="submit"
                  className="footer__submit-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiMail />
                </motion.button>
              </div>
            </motion.form>
            
            <motion.div
              className="footer__payment-methods"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="footer__payment-title">Formas de Pagamento</p>
              <div className="footer__payment-icons">
                {['💳', '📱', '💰', '🏦'].map((icon, index) => (
                  <motion.span
                    key={index}
                    className="footer__payment-icon"
                    whileHover={{ scale: 1.2, y: -2 }}
                  >
                    {icon}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="footer__bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="footer__copyright">
            <p>
              &copy; 2024 BurgerDelícia. Todos os direitos reservados. 
              Feito com <FiHeart className="heart-icon" /> para amantes de hambúrguer.
            </p>
          </div>
          
          <motion.button
            className="footer__scroll-top"
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Voltar ao topo"
          >
            <FiArrowUp />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
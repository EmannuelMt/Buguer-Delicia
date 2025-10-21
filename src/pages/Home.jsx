import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiStar, 
  FiClock, 
  FiUser, 
  FiTruck,
  FiAward,
  FiHeart,
  FiMapPin,
  FiCheck,
  FiShield,
  FiCoffee,
  FiZap,
  FiTrendingUp,
  FiPlus,
  FiMinus,
  FiMessageCircle,
  FiMail,
  FiPhone,
  FiPlay,
  FiVideo,
  FiShoppingCart
} from 'react-icons/fi';

// Componente para ícones de comida customizados
const FoodIcon = ({ type, size = 24, className = "" }) => {
  const icons = {
    hamburger: '🍔',
    fries: '🍟',
    soda: '🥤',
    dessert: '🍰',
    meat: '🥩',
    bread: '🍞',
    spice: '🌶️',
    chocolate: '🍫'
  };

  return (
    <span 
      className={`food-icon ${className}`} 
      style={{ fontSize: size }}
    >
      {icons[type] || '🍕'}
    </span>
  );
};

// Componentes de placeholder para loading
const ProductCardPlaceholder = () => (
  <div className="product-card placeholder">
    <div className="placeholder-image"></div>
    <div className="placeholder-content">
      <div className="placeholder-title"></div>
      <div className="placeholder-text"></div>
      <div className="placeholder-button"></div>
    </div>
  </div>
);

const ImagePlaceholder = () => (
  <div className="image-placeholder">
    <div className="placeholder-spinner"></div>
  </div>
);

import './Home.css';

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState(0);

  // Carregamento otimizado de imagens
  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set(prev).add(imageId));
  };

  const features = [
    {
      icon: <FiTruck />,
      title: 'Entrega Express',
      description: 'Entregamos em até 25 minutos com garantia de temperatura'
    },
    {
      icon: <FiUser />,
      title: 'Chef Especializado',
      description: 'Receitas exclusivas criadas por chefs premiados'
    },
    {
      icon: <FoodIcon type="meat" size={24} />,
      title: 'Carnes Nobres',
      description: 'Utilizamos apenas cortes especiais Angus e Wagyu'
    },
    {
      icon: <FoodIcon type="spice" size={24} />,
      title: 'Temperos Artesanais',
      description: 'Blend exclusivo de especiarias e temperos frescos'
    }
  ];

  const guarantees = [
    {
      icon: <FiShield />,
      title: 'Garantia de Qualidade',
      description: 'Se não amar, devolvemos seu dinheiro'
    },
    {
      icon: <FiClock />,
      title: 'Pontualidade',
      description: 'Entregas no horário combinado ou é por nossa conta'
    },
    {
      icon: <FiHeart />,
      title: 'Frescor Garantido',
      description: 'Preparamos somente após a confirmação do pedido'
    }
  ];

  const stats = [
    { number: '2K+', label: 'Clientes Satisfeitos', icon: <FiUser /> },
    { number: '50+', label: 'Combos Exclusivos', icon: <FoodIcon type="hamburger" /> },
    { number: '25min', label: 'Entrega Média', icon: <FiTruck /> },
    { number: '4.9', label: 'Avaliação', icon: <FiStar /> }
  ];

  // Imagens do Unsplash para o cardápio
  const menuItems = [
    {
      category: "Hambúrgueres",
      icon: <FoodIcon type="hamburger" size={32} />,
      items: [
        {
          name: "Burger Clássico",
          description: "Pão brioche, carne 180g, queijo, alface, tomate e molho especial",
          price: "R$ 29,90",
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          name: "Burger Bacon",
          description: "Carne 180g, bacon crocante, cheddar, cebola caramelizada",
          price: "R$ 34,90",
          image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          name: "Burger Supreme",
          description: "Duas carnes, queijo prato, bacon, onion rings e molho barbecue",
          price: "R$ 39,90",
          image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      category: "Bebidas",
      icon: <FoodIcon type="soda" size={32} />,
      items: [
        {
          name: "Refrigerante Artesanal",
          description: "Refrigerante natural com sabores especiais",
          price: "R$ 12,90",
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          name: "Milkshake",
          description: "Shake cremoso de chocolate, morango ou baunilha",
          price: "R$ 18,90",
          image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          name: "Suco Natural",
          description: "Suco fresco de laranja, limão ou abacaxi com hortelã",
          price: "R$ 14,90",
          image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      category: "Sobremesas",
      icon: <FoodIcon type="dessert" size={32} />,
      items: [
        {
          name: "Brownie Supreme",
          description: "Brownie de chocolate com sorvete e calda",
          price: "R$ 22,90",
          image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          name: "Torta de Limão",
          description: "Torta gelada de limão com merengue",
          price: "R$ 19,90",
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        },
        {
          name: "Petit Gateau",
          description: "Bolo de chocolate com reino cremoso e sorvete",
          price: "R$ 24,90",
          image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
        }
      ]
    }
  ];

  const testimonials = [
    {
      name: "Carlos Silva",
      role: "Cliente Frequente",
      avatar: "👨‍💼",
      rating: 5,
      text: "Melhor hambúrguer da cidade! A carne é sempre suculenta e o pão é perfeito. Entrega sempre no prazo.",
      since: "Cliente há 2 anos"
    },
    {
      name: "Ana Rodrigues",
      role: "Food Blogger",
      avatar: "👩‍💻",
      rating: 5,
      text: "Como food blogger, já provei de tudo, mas o BurgerDelícia surpreende a cada visita. Ingredientes premium!",
      since: "Recomenda desde 2023"
    },
    {
      name: "Roberto Lima",
      role: "Chef de Cozinha",
      avatar: "👨‍🍳",
      rating: 5,
      text: "A qualidade dos ingredientes e o preparo impecável fazem toda diferença. Parabéns pela excelência!",
      since: "Colega de profissão"
    }
  ];

  const faqs = [
    {
      question: "Qual o tempo médio de entrega?",
      answer: "Nosso tempo médio de entrega é de 25-35 minutos. Trabalhamos com entrega express para garantir que seu pedido chegue quentinho e no ponto ideal."
    },
    {
      question: "Quais formas de pagamento aceitam?",
      answer: "Aceitamos cartão de crédito/débito, PIX, dinheiro e temos parceria com principais apps de delivery. Todas as transações são 100% seguras."
    },
    {
      question: "Posso personalizar meu hambúrguer?",
      answer: "Sim! Oferecemos completo sistema de personalização. Você pode escolher tipo de pão, carne, queijos, molhos e acompanhamentos conforme sua preferência."
    },
    {
      question: "Vocês têm opções vegetarianas?",
      answer: "Temos sim! Desenvolvemos hambúrgueres vegetais artesanais com ingredientes selecionados. Também oferecemos opções veganas sem nenhum derivado animal."
    },
    {
      question: "Como funciona o programa de fidelidade?",
      answer: "A cada R$1,00 gasto você ganha 1 ponto. Ao acumular 100 pontos, ganha um hambúrguer grátis! Também temos promoções exclusivas para clientes frequentes."
    }
  ];

  const contactInfo = [
    {
      icon: <FiMapPin />,
      title: "Endereço",
      info: "Rua dos Sabores, 123 - Centro",
      detail: "São Paulo - SP, 01234-567"
    },
    {
      icon: <FiPhone />,
      title: "Telefone",
      info: "(11) 9999-9999",
      detail: "WhatsApp disponível"
    },
    {
      icon: <FiMail />,
      title: "E-mail",
      info: "contato@burgerdelicia.com",
      detail: "Respondemos em até 2h"
    },
    {
      icon: <FiClock />,
      title: "Horário de Funcionamento",
      info: "Segunda a Domingo",
      detail: "11:00 - 23:00"
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  // Variantes de animação otimizadas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar 
        key={i} 
        className={i < rating ? "star filled" : "star"} 
      />
    ));
  };

  // URLs das imagens locais
  const restaurantImage = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  const interiorImage = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
  const processImage = "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80";

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__background">
          <div className="hero__pattern"></div>
          <div 
            className="hero__restaurant-image"
            style={{
              backgroundImage: `url('${restaurantImage}')`
            }}
          />
          <div className="hero__overlay"></div>
          
          <motion.div 
            className="hero__floating hero__floating--1"
            animate={floatingAnimation}
          >
            <FoodIcon type="hamburger" size={32} />
          </motion.div>
          <motion.div 
            className="hero__floating hero__floating--2"
            animate={{
              ...floatingAnimation,
              y: [0, 15, 0],
              transition: { duration: 3.5 }
            }}
          >
            <FoodIcon type="fries" size={28} />
          </motion.div>
          <motion.div 
            className="hero__floating hero__floating--3"
            animate={{
              ...floatingAnimation,
              y: [0, -25, 0],
              transition: { duration: 4 }
            }}
          >
            <FoodIcon type="soda" size={30} />
          </motion.div>
        </div>

        <div className="hero__container">
          <motion.div
            className="hero__content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="hero__badge"
              variants={itemVariants}
            >
              <FiAward />
              <span>Melhor Hamburgueria 2024</span>
            </motion.div>

            <motion.h1 
              className="hero__title"
              variants={itemVariants}
            >
              Burger
              <span className="hero__title-accent">Delícia</span>
            </motion.h1>

            <motion.p 
              className="hero__subtitle"
              variants={itemVariants}
            >
              Sabor autêntico em cada mordida. 
              <br />Há 10 anos servindo os melhores hambúrgueres artesanais.
            </motion.p>

            <motion.div
              className="hero__actions"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(184, 134, 11, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/cardapio" className="btn btn--primary btn--hero">
                  <FiShoppingCart />
                  <span>Ver Cardápio</span>
                  <FiArrowRight className="btn__icon" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/sobre" className="btn btn--secondary">
                  <FiMapPin />
                  <span>Visitar Loja</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="hero__stats"
              variants={staggerVariants}
              initial="hidden"
              animate="visible"
            >
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="stat"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stat__icon">{stat.icon}</div>
                  <div className="stat__number">{stat.number}</div>
                  <div className="stat__label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="hero__restaurant-showcase"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div 
              className="restaurant-card"
              variants={imageVariants}
              whileHover="hover"
            >
              <div className="restaurant-image-wrapper">
                <img 
                  src={interiorImage}
                  alt="Interior aconchegante da BurgerDelícia"
                  className="restaurant-image"
                  loading="lazy"
                />
                <div className="restaurant-overlay">
                  <div className="restaurant-info">
                    <h3>Ambiente Aconchegante</h3>
                    <p>Espaço climatizado com capacidade para 50 pessoas</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Características */}
      <section className="features">
        <div className="features__container">
          <motion.div
            className="features__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="features__badge"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <FiTrendingUp />
              Diferenciais Exclusivos
            </motion.div>
            <h2 className="features__title">
              Excelência em Cada
              <span className="text-gold"> Detalhe</span>
            </h2>
            <p className="features__subtitle">
              Comprometidos com a perfeição desde a seleção dos ingredientes 
              até o momento da entrega
            </p>
          </motion.div>

          <motion.div
            className="features__grid"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature__card"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="feature__icon-wrapper"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.5 }
                  }}
                >
                  <div className="feature__icon">
                    {feature.icon}
                  </div>
                  <div className="feature__icon-glow"></div>
                </motion.div>
                
                <h3 className="feature__title">{feature.title}</h3>
                <p className="feature__description">{feature.description}</p>
                
                <motion.div 
                  className="feature__line"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="guarantees"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="guarantees__grid">
              {guarantees.map((guarantee, index) => (
                <motion.div
                  key={index}
                  className="guarantee__card"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="guarantee__icon">{guarantee.icon}</div>
                  <h4 className="guarantee__title">{guarantee.title}</h4>
                  <p className="guarantee__description">{guarantee.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Cardápio com Unsplash */}
      <section className="menu-preview">
        <div className="menu-preview__container">
          <motion.div
            className="menu-preview__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="menu-preview__badge"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <FoodIcon type="hamburger" size={20} />
              Cardápio Premium
            </motion.div>
            <h2 className="menu-preview__title">
              Nossas
              <span className="text-gold"> Especialidades</span>
            </h2>
            <p className="menu-preview__subtitle">
              Conheça nossos produtos mais amados pelos clientes
            </p>
          </motion.div>

          <div className="menu-categories">
            {menuItems.map((category, index) => (
              <motion.button
                key={index}
                className={`menu-category-btn ${activeCategory === index ? 'active' : ''}`}
                onClick={() => setActiveCategory(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                {category.category}
              </motion.button>
            ))}
          </div>

          <motion.div
            className="menu-preview__content"
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="menu-category">
              <div className="menu-category__items">
                {menuItems[activeCategory].items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="menu-item"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover="hover"
                  >
                    <div className="menu-item__image">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        loading="lazy"
                      />
                      <div className="menu-item__overlay">
                        <motion.button
                          className="menu-item__button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiShoppingCart />
                          Adicionar
                        </motion.button>
                      </div>
                    </div>
                    <div className="menu-item__content">
                      <div className="menu-item__header">
                        <h4 className="menu-item__name">{item.name}</h4>
                        <span className="menu-item__price">{item.price}</span>
                      </div>
                      <p className="menu-item__description">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="menu-preview__actions"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(184, 134, 11, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/cardapio" className="btn btn--primary btn--large">
                <FiShoppingCart />
                <span>Ver Cardápio Completo</span>
                <FiArrowRight className="btn__icon" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

   {/* Seção de Vídeo com Processo Real */}
      <section className="video-showcase">
        <div className="video-showcase__container">
          <motion.div
            className="video-showcase__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="video-showcase__badge"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <FiVideo />
              Nosso Processo
            </motion.div>
            <h2 className="video-showcase__title">
              Arte na
              <span className="text-gold"> Preparação</span>
            </h2>
            <p className="video-showcase__subtitle">
              Cada hambúrguer é uma obra de arte preparada com técnica e paixão
            </p>
          </motion.div>

          <motion.div
            className="video-showcase__content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="video-container">
              <div className="video-wrapper">
                <motion.video
                  className="process-video"
                  src="/videos/processo-preparo.mp4"
                  poster={processImage}
                  controls={isVideoPlaying}
                  autoPlay={isVideoPlaying}
                  muted
                  loop
                  whileHover={{ scale: 1.02 }}
                >
                  Seu navegador não suporta o elemento de vídeo.
                </motion.video>
                {!isVideoPlaying && (
                  <div className="video-overlay">
                    <motion.button
                      className="play-button"
                      onClick={toggleVideo}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiPlay />
                    </motion.button>
                    <div className="video-info">
                      <h3>Processo Artesanal</h3>
                      <p>Da seleção da carne ao momento de servir</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="video-features">
              <motion.div 
                className="video-feature"
                whileHover={{ scale: 1.05 }}
              >
                <div className="feature-number">01</div>
                <FoodIcon type="meat" size={32} />
                <h4>Seleção da Carne</h4>
                <p>Cortes especiais Angus com marmoreio perfeito</p>
              </motion.div>
              <motion.div 
                className="video-feature"
                whileHover={{ scale: 1.05 }}
              >
                <div className="feature-number">02</div>
                <FoodIcon type="bread" size={32} />
                <h4>Pão Artesanal</h4>
                <p>Pão brioche fresco assado diariamente</p>
              </motion.div>
              <motion.div 
                className="video-feature"
                whileHover={{ scale: 1.05 }}
              >
                <div className="feature-number">03</div>
                <FiUser size={32} />
                <h4>Montagem</h4>
                <p>Combinação perfeita de sabores e texturas</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="testimonials">
        <div className="testimonials__container">
          <motion.div
            className="testimonials__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="testimonials__badge"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <FiMessageCircle />
              Depoimentos
            </motion.div>
            <h2 className="testimonials__title">
              O Que Dizem
              <span className="text-gold"> Nossos Clientes</span>
            </h2>
            <p className="testimonials__subtitle">
              A satisfação dos nossos clientes é nossa maior recompensa
            </p>
          </motion.div>

          <motion.div
            className="testimonials__grid"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial__card"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="testimonial__header">
                  <div className="testimonial__avatar">
                    {testimonial.avatar}
                  </div>
                  <div className="testimonial__info">
                    <h4 className="testimonial__name">{testimonial.name}</h4>
                    <p className="testimonial__role">{testimonial.role}</p>
                    <p className="testimonial__since">{testimonial.since}</p>
                  </div>
                </div>
                
                <div className="testimonial__rating">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="testimonial__text">"{testimonial.text}"</p>
                
                <div className="testimonial__quote">”</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção de Perguntas Frequentes */}
      <section className="faq">
        <div className="faq__container">
          <motion.div
            className="faq__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="faq__title">
              Dúvidas
              <span className="text-gold"> Frequentes</span>
            </h2>
            <p className="faq__subtitle">
              Tire suas dúvidas sobre nossos produtos e serviços
            </p>
          </motion.div>

          <motion.div
            className="faq__content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq__item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <button
                  className="faq__question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  {openFaq === index ? <FiMinus /> : <FiPlus />}
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      className="faq__answer"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Seção de Contato com Google Maps */}
      <section className="contact">
        <div className="contact__container">
          <motion.div
            className="contact__header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="contact__title">
              Fale
              <span className="text-gold"> Conosco</span>
            </h2>
            <p className="contact__subtitle">
              Estamos sempre prontos para atendê-lo da melhor forma
            </p>
          </motion.div>

          <div className="contact__content">
            <motion.div
              className="contact__info"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="contact__info-title">Nossos Contatos</h3>
              <div className="contact__grid">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={index}
                    className="contact__item"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="contact__icon">{contact.icon}</div>
                    <div className="contact__details">
                      <h4>{contact.title}</h4>
                      <p className="contact__main-info">{contact.info}</p>
                      <p className="contact__detail">{contact.detail}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="contact__map"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197584455224!2d-46.653905224687!3d-23.561347178787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1690000000000!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '16px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da BurgerDelícia no Google Maps"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Seção CTA Final */}
      <section className="cta">
        <div className="cta__background">
          <div className="cta__pattern"></div>
        </div>
        
        <div className="cta__container">
          <motion.div
            className="cta__content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="cta__badge"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <FiCheck />
              Satisfação Garantida
            </motion.div>

            <h2 className="cta__title">
              Pronto para uma Experiência
              <span className="text-gold"> Inesquecível</span>?
            </h2>
            
            <p className="cta__description">
              Faça seu pedido agora e descubra por que somos a hamburgueria 
              mais amada da cidade. Qualidade premium, sabor extraordinário.
            </p>
            
            <motion.div
              className="cta__actions"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(184, 134, 11, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/cardapio" className="btn btn--gold btn--large">
                  <FiShoppingCart />
                  <span>Fazer Pedido</span>
                  <FiArrowRight className="btn__icon" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="#contact" className="btn btn--outline">
                  <FiPhone />
                  <span>Fazer Reserva</span>
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="cta__guarantee"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <FiShield />
              <span>Compra segura · Entrega garantida · Satisfação total</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
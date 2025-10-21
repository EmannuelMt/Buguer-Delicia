import React from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiMapPin, FiPhone, FiHeart, FiAward, FiUsers, FiStar, FiCoffee } from 'react-icons/fi';
import'./About.css'


const About = () => {
  const values = [
    {
      icon: <FiAward />,
      title: 'Qualidade Premium',
      description: 'Ingredientes selecionados e técnicas de preparo que garantem sabor e frescor incomparáveis'
    },
    {
      icon: <FiCoffee />,
      title: 'Artesanal',
      description: 'Tudo feito na hora, desde o pão até os molhos especiais. Autenticidade em cada detalhe'
    },
    {
      icon: <FiHeart />,
      title: 'Paixão',
      description: 'Amamos o que fazemos e essa paixão se transforma em sabor em cada hambúrguer'
    },
    {
      icon: <FiUsers />,
      title: 'Comunidade',
      description: 'Mais que clientes, somos uma família. Crescemos juntos com nossa comunidade'
    }
  ];

  const stats = [
    { number: '5+', label: 'Anos de Experiência', icon: <FiStar /> },
    { number: '10K+', label: 'Clientes Satisfeitos', icon: <FiUsers /> },
    { number: '50+', label: 'Prêmios Conquistados', icon: <FiAward /> },
    { number: '98%', label: 'Avaliação Positiva', icon: <FiHeart /> }
  ];

  const storeInfo = [
    {
      icon: <FiMapPin />,
      title: 'Endereço',
      details: [
        'Rua dos Sabores, 123 - Centro',
        'São Paulo - SP',
        '01234-567'
      ]
    },
    {
      icon: <FiClock />,
      title: 'Horário de Funcionamento',
      details: [
        'Segunda a Sábado: 11:00 - 23:00',
        'Domingo: 11:00 - 22:00',
        'Delivery até 22:30'
      ]
    },
    {
      icon: <FiPhone />,
      title: 'Contato',
      details: [
        '(11) 9999-9999',
        'WhatsApp: (11) 8888-8888',
        'contato@burgerdelicia.com'
      ]
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
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about__hero">
        <div className="about__hero-background">
          <div className="about__hero-pattern"></div>
        </div>
        
        <div className="about__container">
          <motion.div
            className="about__hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="about__hero-badge"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FiAward />
              Desde 2018
            </motion.div>

            <h1 className="about__hero-title">
              Sobre a
              <span className="text-gold"> BurgerDelícia</span>
            </h1>
            
            <p className="about__hero-subtitle">
              Conheça a história por trás dos hambúrgueres mais saborosos da cidade. 
              Paixão, qualidade e tradição em cada mordida.
            </p>

            {/* Stats */}
            <motion.div
              className="about__stats"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="about__stat"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="about__stat-icon">{stat.icon}</div>
                  <div className="about__stat-number">{stat.number}</div>
                  <div className="about__stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about__story">
        <div className="about__container">
          <motion.div
            className="about__story-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="about__story-text"
              variants={itemVariants}
            >
              <motion.div
                className="about__story-badge"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Nossa Jornada
              </motion.div>

              <h2 className="about__story-title">
                Do Sonho à
                <span className="text-gold"> Realidade</span>
              </h2>

              <div className="about__story-description">
                <p>
                  Fundada em 2018, a <strong>BurgerDelícia</strong> nasceu de um simples 
                  sonho: trazer hambúrgueres artesanais de <strong>alta qualidade</strong> 
                  para o nosso bairro. Começamos como um pequeno food truck com apenas 
                  três receitas no cardápio.
                </p>
                
                <p>
                  A paixão pelo <strong>sabor autêntico</strong> e o compromisso com 
                  ingredientes selecionados conquistaram nossos primeiros clientes. 
                  Em menos de um ano, já éramos referência na região.
                </p>

                <p>
                  Hoje, temos nossa própria loja física, mas mantemos a mesma 
                  <strong> essência artesanal</strong>. Cada hambúrguer continua sendo 
                  preparado com a mesma dedicação do primeiro dia.
                </p>

                <blockquote className="about__quote">
                  "Acreditamos que um bom hambúrguer pode fazer seu dia melhor. 
                  Por isso, nos dedicamos a criar experiências gastronômicas 
                  memoráveis, uma mordida de cada vez."
                </blockquote>
              </div>
            </motion.div>

            <motion.div
              className="about__story-visual"
              variants={itemVariants}
            >
              <motion.div
                className="about__image-card"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&h=700&fit=crop&crop=center"
                  alt="Fundador da BurgerDelícia preparando hambúrgueres"
                  className="about__image"
                />
                <div className="about__image-overlay">
                  <div className="about__image-info">
                    <h3>João Silva</h3>
                    <p>Fundador & Chef Principal</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="about__floating about__floating--1"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                🍔
              </motion.div>
              
              <motion.div
                className="about__floating about__floating--2"
                animate={{ 
                  y: [0, 15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                🍟
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about__values">
        <div className="about__container">
          <motion.div
            className="about__values-header"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="about__values-badge"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <FiHeart />
              Nossa Essência
            </motion.div>

            <h2 className="about__values-title">
              Valores que
              <span className="text-gold"> Nos Guiam</span>
            </h2>
            
            <p className="about__values-subtitle">
              Princípios que definem quem somos e como entregamos a melhor 
              experiência gastronômica para você
            </p>
          </motion.div>

          <motion.div
            className="about__values-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="about__value-card"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div 
                  className="about__value-icon"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.6 }
                  }}
                >
                  {value.icon}
                </motion.div>
                
                <h3 className="about__value-title">{value.title}</h3>
                <p className="about__value-description">{value.description}</p>
                
                <motion.div 
                  className="about__value-line"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Store Info Section */}
      <section className="about__store">
        <div className="about__container">
          <motion.div
            className="about__store-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="about__store-badge"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <FiMapPin />
              Visite Nosso Espaço
            </motion.div>

            <h2 className="about__store-title">
              Nossa
              <span className="text-gold"> Hamburgueria</span>
            </h2>

            <div className="about__store-grid">
              {storeInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="about__store-card"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover="hover"
                >
                  <div className="about__store-icon">
                    {info.icon}
                  </div>
                  
                  <h3 className="about__store-card-title">{info.title}</h3>
                  
                  <div className="about__store-details">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="about__store-detail">
                        {detail}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about__cta">
        <div className="about__cta-background">
          <div className="about__cta-pattern"></div>
        </div>
        
        <div className="about__container">
          <motion.div
            className="about__cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="about__cta-icon"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FiHeart />
            </motion.div>

            <h2 className="about__cta-title">
              Obrigado por Fazer Parte da
              <span className="text-gold"> Nossa História</span>
            </h2>
            
            <p className="about__cta-description">
              Cada cliente, cada sorriso, cada elogio nos motiva a continuar 
              evoluindo e entregando o melhor. Você é a razão do nosso sucesso!
            </p>

            <motion.div
              className="about__cta-actions"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="btn btn--primary btn--large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMapPin />
                Visitar Nossa Loja
              </motion.button>
              
              <motion.button
                className="btn btn--outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPhone />
                Fazer Pedido
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
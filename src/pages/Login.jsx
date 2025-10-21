import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiMail, 
  FiLock, 
  FiUser, 
  FiPhone, 
  FiEye, 
  FiEyeOff, 
  FiCheck, 
  FiAward,
  FiStar,
  FiTruck,
  FiGift,
  FiClock,
  FiChevronDown,
  FiShield,
  FiHeart
} from 'react-icons/fi';

import'./Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [expandedBenefit, setExpandedBenefit] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Nome é obrigatório';
      } else if (formData.name.length < 2) {
        newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
      }

      if (!formData.phone.trim()) {
        newErrors.phone = 'Telefone é obrigatório';
      } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(formData.phone)) {
        newErrors.phone = 'Formato: (11) 99999-9999';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não conferem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length <= 2) {
        return numbers ? `(${numbers}` : '';
      } else if (numbers.length <= 7) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      } else {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
      }
    }
    return value;
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhone(e.target.value);
    handleChange({
      ...e,
      target: {
        ...e.target,
        value: formattedValue
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulação de API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (isLogin) {
        console.log('Login realizado:', formData);
        // Aqui você integraria com sua API de autenticação
        navigate('/');
      } else {
        console.log('Cadastro realizado:', formData);
        // Aqui você integraria com sua API de cadastro
        setIsLogin(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
        setErrors({});
      }
    } catch (error) {
      console.error('Erro:', error);
      setErrors({ submit: 'Erro ao processar solicitação. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const benefits = [
    { 
      icon: <FiTruck />, 
      text: 'Pedidos Express',
      description: 'Salve seus dados e finalize pedidos em 2 cliques',
      color: 'var(--gold)'
    },
    { 
      icon: <FiGift />, 
      text: 'Ofertas VIP',
      description: 'Descontos exclusivos e promoções antecipadas',
      color: 'var(--secondary)'
    },
    { 
      icon: <FiStar />, 
      text: 'Fidelidade Premium',
      description: 'Ganhe pontos em cada pedido e resgate prêmios',
      color: 'var(--gold)'
    },
    { 
      icon: <FiClock />, 
      text: 'Histórico Completo',
      description: 'Acesse todos seus pedidos e favoritos',
      color: 'var(--secondary)'
    },
    { 
      icon: <FiShield />, 
      text: 'Prioridade',
      description: 'Atendimento preferencial e suporte dedicado',
      color: 'var(--gold)'
    },
    { 
      icon: <FiHeart />, 
      text: 'Conteúdo Exclusivo',
      description: 'Receba novidades e dicas gastronômicas',
      color: 'var(--secondary)'
    }
  ];

  const stats = [
    { number: '15K+', label: 'Clientes Satisfeitos', icon: '😊' },
    { number: '4.9★', label: 'Avaliação Média', icon: '⭐' },
    { number: '12min', label: 'Entrega Recorde', icon: '⚡' },
    { number: '98%', label: 'Pedidos Perfeitos', icon: '🎯' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const benefitsVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="login">
      <div className="login__background">
        <div className="login__pattern"></div>
        <motion.div 
          className="login__floating login__floating--1"
          animate={floatingAnimation}
        >
          🍔
        </motion.div>
        <motion.div 
          className="login__floating login__floating--2"
          animate={{
            ...floatingAnimation,
            y: [0, 15, 0],
            transition: { duration: 7, delay: 1 }
          }}
        >
          🍟
        </motion.div>
        <motion.div 
          className="login__floating login__floating--3"
          animate={{
            ...floatingAnimation,
            y: [0, -25, 0],
            transition: { duration: 5, delay: 2 }
          }}
        >
          🥤
        </motion.div>
      </div>

      <div className="login__container">
        <motion.div
          className="login__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Form Section */}
          <motion.div
            className="login__form-section"
            variants={formVariants}
          >
            <motion.div
              className="login__card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="login__header">
                <motion.div
                  className="login__badge"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <FiAward />
                  {isLogin ? 'Bem-vindo de volta!' : 'Junte-se a nós!'}
                </motion.div>

                <h1 className="login__title">
                  {isLogin ? 'Entrar na' : 'Criar Conta na'}
                  <span className="text-gold"> BurgerDelícia</span>
                </h1>
                
                <p className="login__subtitle">
                  {isLogin 
                    ? 'Entre na sua conta para continuar sua jornada gastronômica' 
                    : 'Crie sua conta e descubra um mundo de sabores exclusivos'
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="login__form">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      className="login__fields-group"
                      key="register-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="login__input-group">
                        <div className={`login__input-wrapper ${errors.name ? 'error' : ''}`}>
                          <FiUser className="login__input-icon" />
                          <input
                            type="text"
                            name="name"
                            placeholder="Nome completo"
                            value={formData.name}
                            onChange={handleChange}
                            className="login__input"
                          />
                        </div>
                        {errors.name && <span className="login__error">{errors.name}</span>}
                      </div>

                      <div className="login__input-group">
                        <div className={`login__input-wrapper ${errors.phone ? 'error' : ''}`}>
                          <FiPhone className="login__input-icon" />
                          <input
                            type="tel"
                            name="phone"
                            placeholder="(11) 99999-9999"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            className="login__input"
                          />
                        </div>
                        {errors.phone && <span className="login__error">{errors.phone}</span>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="login__input-group">
                  <div className={`login__input-wrapper ${errors.email ? 'error' : ''}`}>
                    <FiMail className="login__input-icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Seu melhor e-mail"
                      value={formData.email}
                      onChange={handleChange}
                      className="login__input"
                    />
                  </div>
                  {errors.email && <span className="login__error">{errors.email}</span>}
                </div>

                <div className="login__input-group">
                  <div className={`login__input-wrapper ${errors.password ? 'error' : ''}`}>
                    <FiLock className="login__input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Sua senha"
                      value={formData.password}
                      onChange={handleChange}
                      className="login__input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="login__password-toggle"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && <span className="login__error">{errors.password}</span>}
                </div>

                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      className="login__input-group"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className={`login__input-wrapper ${errors.confirmPassword ? 'error' : ''}`}>
                        <FiLock className="login__input-icon" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirmar senha"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="login__input"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="login__password-toggle"
                        >
                          {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                      {errors.confirmPassword && <span className="login__error">{errors.confirmPassword}</span>}
                    </motion.div>
                  )}
                </AnimatePresence>

                {errors.submit && (
                  <motion.div
                    className="login__submit-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errors.submit}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  className={`login__submit-btn ${isLoading ? 'loading' : ''}`}
                  whileHover={{ scale: isLoading ? 1 : 1.02 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="login__spinner"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      {isLogin ? 'Entrar na Minha Conta' : 'Criar Minha Conta'}
                      <FiCheck />
                    </>
                  )}
                </motion.button>

                {isLogin && (
                  <div className="login__forgot-password">
                    <Link to="/recuperar-senha" className="login__forgot-link">
                      Esqueceu sua senha?
                    </Link>
                  </div>
                )}
              </form>

              <div className="login__footer">
                <div className="login__divider">
                  <span>ou</span>
                </div>

                <button
                  onClick={toggleMode}
                  className="login__toggle-mode"
                >
                  {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
                  <span className="text-gold">
                    {isLogin ? 'Cadastre-se gratuitamente' : 'Faça login aqui'}
                  </span>
                </button>

                <div className="login__terms">
                  <p>
                    Ao continuar, você concorda com nossos{' '}
                    <Link to="/termos" className="login__link">
                      Termos de Uso
                    </Link>{' '}
                    e{' '}
                    <Link to="/privacidade" className="login__link">
                      Política de Privacidade
                    </Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Benefits Section - MELHORADA */}
          <motion.div
            className="login__benefits-section"
            variants={benefitsVariants}
          >
            <div className="login__benefits-card">
              <motion.div
                className="login__benefits-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="login__benefits-badge">
                  <FiAward />
                  Vantagens Exclusivas
                </div>
                <h2 className="login__benefits-title">
                  Faça parte da nossa <span className="text-gold">Família</span>
                </h2>
                <p className="login__benefits-subtitle">
                  Descubra todos os benefícios de ser um membro BurgerDelícia
                </p>
              </motion.div>
              
              {/* Stats em Destaque */}
              <motion.div
                className="login__stats-preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="login__stats-grid-compact">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="login__stat-compact"
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="login__stat-icon">{stat.icon}</div>
                      <div className="login__stat-number">{stat.number}</div>
                      <div className="login__stat-label">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Grid de Benefícios Melhorado */}
              <div className="login__benefits-grid">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="login__benefit-card"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                    onHoverStart={() => setExpandedBenefit(index)}
                    onHoverEnd={() => setExpandedBenefit(null)}
                  >
                    <div 
                      className="login__benefit-icon-wrapper"
                      style={{ background: benefit.color }}
                    >
                      {benefit.icon}
                    </div>
                    <div className="login__benefit-content">
                      <h3 className="login__benefit-title">{benefit.text}</h3>
                      <p className="login__benefit-description">
                        {benefit.description}
                      </p>
                    </div>
                    <motion.div 
                      className="login__benefit-hover"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: expandedBenefit === index ? 1 : 0 
                      }}
                    >
                      <FiChevronDown />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Adicional */}
              <motion.div
                className="login__benefits-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="login__cta-content">
                  <h3>Pronto para começar?</h3>
                  <p>Junte-se a milhares de clientes satisfeitos</p>
                  <motion.button
                    onClick={toggleMode}
                    className="login__cta-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isLogin ? 'Criar Conta Gratuita' : 'Fazer Login'}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
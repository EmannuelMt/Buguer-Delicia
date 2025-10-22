import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiClock, 
  FiTag, 
  FiStar, 
  FiShoppingCart, 
  FiHeart, 
  FiShare2,
  FiZap,
  FiAlertCircle,
  FiCalendar,
  FiUsers,
  FiAward,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiGrid,
  FiList,
  FiX,
  FiDollarSign,
  FiTrendingUp
} from 'react-icons/fi';
import { 
  discountedProducts,
  featuredProducts,
  allProducts,
  getProductsByTag,
  products,
  restaurantInfo,
  filterProducts,
  sortProducts,
  getProductsStats
} from '../data/products';
import ProductCard from '../components/ProductCard';
import './Promocoes.css';

const Promocoes = () => {
  const [activeCategory, setActiveCategory] = useState('todas');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [sortBy, setSortBy] = useState('discount-high');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [discountRange, setDiscountRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('categorias');
  const navigate = useNavigate();

  // Stats com verificação de segurança
  const stats = useMemo(() => {
    try {
      return getProductsStats();
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      return {
        totalProducts: allProducts.length,
        availableProducts: allProducts.filter(p => p.available).length,
        featuredProducts: featuredProducts.length,
        discountedProducts: discountedProducts.length,
        categories: Object.keys(products).length,
        averagePrice: 0,
        totalCalories: 0,
        totalStock: 0,
        totalValue: 0
      };
    }
  }, []);

  // Dados das promoções
  const promocoesDestaque = useMemo(() => [
    {
      id: 1,
      title: "Sexta do Burger",
      description: "Todos os hambúrgueres com 25% de desconto",
      discount: 25,
      category: "lanches",
      validUntil: "2024-12-31",
      days: [5],
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop",
      color: "#FF6B35",
      featured: true,
      tag: "limited"
    },
    {
      id: 2,
      title: "Combo Família",
      description: "Combo família com 30% off + refrigerante grátis",
      discount: 30,
      category: "combos",
      validUntil: "2024-11-30",
      image: "https://images.unsplash.com/photo-1606755962773-d324e7452a1a?w=600&h=400&fit=crop",
      color: "#4ECDC4",
      featured: true,
      tag: "family"
    },
    {
      id: 3,
      title: "Happy Hour",
      description: "Bebidas com 40% de desconto das 18h às 20h",
      discount: 40,
      category: "bebidas",
      validUntil: "2024-12-31",
      time: "18:00-20:00",
      image: "https://images.unsplash.com/ico-1544145945-f90425340c7e?w=600&h=400&fit=crop",
      color: "#FFE66D",
      tag: "happy-hour"
    },
    {
      id: 4,
      title: "Lanche + Sobremesa",
      description: "Leve um lanche e ganhe 50% na sobremesa",
      discount: 50,
      category: "sobremesas",
      validUntil: "2024-10-31",
      image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&h=400&fit=crop",
      color: "#95E1D3",
      tag: "combo"
    }
  ], []);

  const categoriasPromocao = useMemo(() => [
    { id: 'todas', name: 'Todas as Promoções', count: discountedProducts.length, icon: '🎯', color: '#666' },
    { id: 'lanches', name: 'Lanches', count: discountedProducts.filter(p => p.category === 'lanches').length, icon: '🍔', color: '#FF6B35' },
    { id: 'bebidas', name: 'Bebidas', count: discountedProducts.filter(p => p.category === 'bebidas').length, icon: '🥤', color: '#4ECDC4' },
    { id: 'sobremesas', name: 'Sobremesas', count: discountedProducts.filter(p => p.category === 'sobremesas').length, icon: '🍰', color: '#FFE66D' },
    { id: 'combos', name: 'Combos', count: discountedProducts.filter(p => p.category === 'combos').length, icon: '📦', color: '#95E1D3' },
    { id: 'acompanhamentos', name: 'Acompanhamentos', count: discountedProducts.filter(p => p.category === 'acompanhamentos').length, icon: '🍟', color: '#FF8E53' }
  ], []);

  const sortOptions = [
    { value: 'discount-high', label: 'Maior Desconto', icon: '💰' },
    { value: 'price-low', label: 'Menor Preço', icon: '💎' },
    { value: 'price-high', label: 'Maior Preço', icon: '💸' },
    { value: 'name', label: 'Nome A-Z', icon: '🔤' },
    { value: 'popular', label: 'Mais Populares', icon: '👑' }
  ];

  const filterTabs = [
    { id: 'categorias', label: 'Categorias', icon: '📁' },
    { id: 'preco', label: 'Preço', icon: '💰' },
    { id: 'desconto', label: 'Desconto', icon: '🏷️' }
  ];

  // Produtos filtrados e ordenados
  const produtosFiltrados = useMemo(() => {
    const filters = {};
    
    if (activeCategory !== 'todas') filters.category = activeCategory;
    filters.maxPrice = priceRange[1];
    filters.onSale = true;

    let filtered = filterProducts(filters);
    
    // Filtro adicional por desconto
    filtered = filtered.filter(product => {
      if (!product.originalPrice) return false;
      const discount = ((product.originalPrice - product.price) / product.originalPrice) * 100;
      return discount >= discountRange[0] && discount <= discountRange[1];
    });

    // Ordenação
    switch (sortBy) {
      case 'discount-high':
        filtered.sort((a, b) => {
          const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
          const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
          return discountB - discountA;
        });
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popular':
        // Ordenar por produtos mais populares (mock)
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [activeCategory, sortBy, priceRange, discountRange]);

  // Maiores descontos (top 3)
  const maioresDescontos = useMemo(() => {
    return produtosFiltrados
      .filter(p => p.originalPrice)
      .sort((a, b) => {
        const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
        const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
        return discountB - discountA;
      })
      .slice(0, 3);
  }, [produtosFiltrados]);

  // Promoções que acabam em breve
  const promocoesAcabando = useMemo(() => {
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
    
    return promocoesDestaque
      .filter(promo => new Date(promo.validUntil) <= oneWeekFromNow)
      .slice(0, 2);
  }, [promocoesDestaque]);

  const toggleLike = useCallback((productId) => {
    setLikedProducts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
      } else {
        newLiked.add(productId);
      }
      return newLiked;
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % promocoesDestaque.length);
  }, [promocoesDestaque.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + promocoesDestaque.length) % promocoesDestaque.length);
  }, [promocoesDestaque.length]);

  const resetFilters = useCallback(() => {
    setActiveCategory('todas');
    setPriceRange([0, 100]);
    setDiscountRange([0, 100]);
    setSortBy('discount-high');
  }, []);

  const hasActiveFilters = useMemo(() => {
    return activeCategory !== 'todas' || priceRange[1] < 100 || discountRange[1] < 100;
  }, [activeCategory, priceRange, discountRange]);

  const getDaysRemaining = useCallback((validUntil) => {
    const today = new Date();
    const endDate = new Date(validUntil);
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, []);

  const calculateDiscount = useCallback((product) => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }, []);

  // Variantes de animação
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const quickFilters = [
    {
      id: 'maior-desconto',
      label: 'Maior Desconto',
      icon: <FiTrendingUp />,
      count: maioresDescontos.length,
      color: '#FF6B6B',
      action: () => setSortBy('discount-high')
    },
    {
      id: 'acabando',
      label: 'Acabando',
      icon: <FiClock />,
      count: promocoesAcabando.length,
      color: '#4ECDC4',
      action: () => {
        // Filtro especial para promoções que acabam
        const endingIds = promocoesAcabando.map(p => p.id);
        // Lógica de filtro seria implementada
      }
    },
    {
      id: 'combos',
      label: 'Combos',
      icon: <FiTag />,
      count: discountedProducts.filter(p => p.category === 'combos').length,
      color: '#FFE66D',
      action: () => setActiveCategory('combos')
    },
    {
      id: 'bebidas',
      label: 'Bebidas',
      icon: <FiAward />,
      count: discountedProducts.filter(p => p.category === 'bebidas').length,
      color: '#95E1D3',
      action: () => setActiveCategory('bebidas')
    }
  ];

  return (
    <div className="promocoes-page">
      {/* Hero Section */}
      <section className="promocoes-hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <motion.div 
            className="floating-tag"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🏷️
          </motion.div>
          <motion.div 
            className="floating-sale"
            animate={{ 
              y: [0, 15, 0],
              rotate: [0, -3, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            💰
          </motion.div>
        </div>
        
        <div className="container">
          <motion.div
            className="promocoes-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="hero-badge"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            >
              <FiTag />
              Ofertas Exclusivas
            </motion.div>

            <h1 className="promocoes-title">
              Economize com Nossas <span className="text-gradient">Promoções</span>
            </h1>
            <p className="promocoes-subtitle">
              {discountedProducts.length} produtos com descontos especiais para você saborear o melhor da BurgerDelícia pagando menos
            </p>
            
            {/* Stats */}
            <motion.div 
              className="promocoes-stats"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { number: discountedProducts.length, label: 'Produtos em Oferta', icon: '🏷️' },
                { number: promocoesDestaque.length, label: 'Promoções Ativas', icon: '⚡' },
                { number: `${Math.max(...discountedProducts.map(p => calculateDiscount(p)))}%`, label: 'Maior Desconto', icon: '💰' },
                { number: 'R$ ' + discountedProducts.reduce((sum, p) => sum + (p.originalPrice - p.price), 0).toFixed(0), label: 'Economia Total', icon: '💎' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-item"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Filters */}
      <section className="quick-filters-section">
        <div className="container">
          <motion.div 
            className="quick-filters"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {quickFilters.map((filter, index) => (
              <motion.button
                key={filter.id}
                className="quick-filter-btn"
                onClick={filter.action}
                whileHover={{ 
                  scale: 1.05,
                  y: -3,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                style={{ '--filter-color': filter.color }}
              >
                <span className="filter-icon">{filter.icon}</span>
                <span className="filter-label">{filter.label}</span>
                <span className="filter-count">{filter.count}</span>
                <div className="filter-glow"></div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Destaques em Carrossel */}
      <section className="destaques-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="section-title">
              <FiZap />
              Destaques da Semana
            </h2>
            <p className="section-subtitle">Promoções especiais por tempo limitado</p>
          </motion.div>

          <div className="carousel-container">
            <button className="carousel-btn carousel-btn--prev" onClick={prevSlide}>
              <FiChevronLeft />
            </button>
            
            <div className="carousel-wrapper">
              <AnimatePresence mode="wait" custom={currentSlide}>
                <motion.div
                  key={currentSlide}
                  className="carousel-slide"
                  custom={currentSlide}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                  <div 
                    className="destaque-card"
                    style={{ '--accent-color': promocoesDestaque[currentSlide].color }}
                  >
                    <div className="destaque-content">
                      <div className="destaque-badge">
                        <FiStar />
                        {promocoesDestaque[currentSlide].discount}% OFF
                      </div>
                      <h3 className="destaque-title">{promocoesDestaque[currentSlide].title}</h3>
                      <p className="destaque-description">{promocoesDestaque[currentSlide].description}</p>
                      
                      <div className="destaque-meta">
                        <div className="meta-item">
                          <FiClock />
                          <span>{getDaysRemaining(promocoesDestaque[currentSlide].validUntil)} dias restantes</span>
                        </div>
                        {promocoesDestaque[currentSlide].time && (
                          <div className="meta-item">
                            <FiCalendar />
                            <span>{promocoesDestaque[currentSlide].time}</span>
                          </div>
                        )}
                      </div>

                      <div className="destaque-actions">
                        <button 
                          className="btn btn--primary"
                          onClick={() => navigate('/cardapio')}
                        >
                          <FiShoppingCart />
                          Aproveitar Oferta
                        </button>
                        <button className="btn btn--secondary">
                          <FiShare2 />
                          Compartilhar
                        </button>
                      </div>
                    </div>
                    <div className="destaque-image">
                      <img 
                        src={promocoesDestaque[currentSlide].image} 
                        alt={promocoesDestaque[currentSlide].title}
                      />
                      <div className="image-overlay"></div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button className="carousel-btn carousel-btn--next" onClick={nextSlide}>
              <FiChevronRight />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="carousel-indicators">
            {promocoesDestaque.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Alertas de Promoções que Acabam */}
      {promocoesAcabando.length > 0 && (
        <section className="alertas-section">
          <div className="container">
            <motion.div
              className="alerta-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="alerta-header">
                <FiAlertCircle />
                <h3>Corre que está acabando! 🏃‍♂️</h3>
              </div>
              <div className="alerta-content">
                {promocoesAcabando.map(promo => (
                  <div key={promo.id} className="alerta-item">
                    <span className="alerta-title">{promo.title}</span>
                    <span className="alerta-days">
                      {getDaysRemaining(promo.validUntil)} dias restantes
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="promocoes-main">
        <div className="container">
          <div className="promocoes-layout">
            {/* Sidebar Filters */}
            <motion.aside 
              className={`filters-sidebar ${showFilters ? 'active' : ''}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <div className="filters-header">
                <div className="filters-title">
                  <FiFilter />
                  <h3>Filtrar Promoções</h3>
                </div>
                <div className="filters-actions">
                  {hasActiveFilters && (
                    <button 
                      className="clear-filters-btn"
                      onClick={resetFilters}
                    >
                      Limpar
                    </button>
                  )}
                  <button 
                    className="close-filters"
                    onClick={() => setShowFilters(false)}
                    aria-label="Fechar filtros"
                  >
                    <FiX />
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="filter-tabs">
                {filterTabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`filter-tab ${activeFilterTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveFilterTab(tab.id)}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-label">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Conteúdo das Tabs */}
              <div className="filter-content">
                {/* Tab Categorias */}
                {activeFilterTab === 'categorias' && (
                  <motion.div
                    className="tab-panel"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="category-filters">
                      {categoriasPromocao.map(category => (
                        <motion.button
                          key={category.id}
                          className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
                          onClick={() => setActiveCategory(category.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          style={{ '--category-color': category.color }}
                        >
                          <span className="category-icon">{category.icon}</span>
                          <div className="category-info">
                            <span className="category-name">{category.name}</span>
                          </div>
                          <span className="category-count">{category.count}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Tab Preço */}
                {activeFilterTab === 'preco' && (
                  <motion.div
                    className="tab-panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="range-filter">
                      <label className="range-label">
                        <FiDollarSign />
                        Preço máximo: <strong>R$ {priceRange[1]}</strong>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="range-slider"
                      />
                      <div className="range-labels">
                        <span>R$ 0</span>
                        <span>R$ 100</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab Desconto */}
                {activeFilterTab === 'desconto' && (
                  <motion.div
                    className="tab-panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="range-filter">
                      <label className="range-label">
                        <FiTag />
                        Desconto mínimo: <strong>{discountRange[0]}%</strong>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={discountRange[0]}
                        onChange={(e) => setDiscountRange([parseInt(e.target.value), discountRange[1]])}
                        className="range-slider"
                      />
                      <div className="range-labels">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Active Filters Summary */}
              {hasActiveFilters && (
                <motion.div 
                  className="active-filters"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <div className="active-filters-header">
                    <span>Filtros Ativos:</span>
                  </div>
                  <div className="active-filters-list">
                    {activeCategory !== 'todas' && (
                      <span className="active-filter">
                        {categoriasPromocao.find(c => c.id === activeCategory)?.name}
                        <button onClick={() => setActiveCategory('todas')}>×</button>
                      </span>
                    )}
                    {priceRange[1] < 100 && (
                      <span className="active-filter">
                        Até R$ {priceRange[1]}
                        <button onClick={() => setPriceRange([0, 100])}>×</button>
                      </span>
                    )}
                    {discountRange[0] > 0 && (
                      <span className="active-filter">
                        Mín. {discountRange[0]}% desc
                        <button onClick={() => setDiscountRange([0, 100])}>×</button>
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.aside>

            {/* Main Content */}
            <main className="promocoes-content">
              {/* Toolbar */}
              <motion.div 
                className="promocoes-toolbar"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="toolbar-left">
                  <button 
                    className="filter-toggle"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <FiFilter />
                    Filtros
                    {hasActiveFilters && <span className="filter-dot"></span>}
                  </button>
                  
                  <div className="results-info">
                    <span className="results-count">
                      <strong>{produtosFiltrados.length}</strong> produto{produtosFiltrados.length !== 1 ? 's' : ''} em promoção
                    </span>
                    {hasActiveFilters && (
                      <button 
                        className="quick-clear"
                        onClick={resetFilters}
                      >
                        Limpar tudo
                      </button>
                    )}
                  </div>
                </div>

                <div className="toolbar-right">
                  {/* View Mode Toggle */}
                  <div className="view-mode-toggle">
                    <button
                      className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      aria-label="Visualização em grade"
                    >
                      <FiGrid />
                    </button>
                    <button
                      className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                      aria-label="Visualização em lista"
                    >
                      <FiList />
                    </button>
                  </div>

                  {/* Sort */}
                  <div className="sort-container">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-select"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.icon} {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Maiores Descontos */}
              {maioresDescontos.length > 0 && (
                <motion.div 
                  className="maiores-descontos-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="descontos-grid">
                    {maioresDescontos.map((product, index) => {
                      const discount = calculateDiscount(product);
                      return (
                        <motion.div
                          key={product.id}
                          className="desconto-card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ y: -5, scale: 1.02 }}
                        >
                          <div className="desconto-badge">
                            {discount}% OFF
                          </div>
                          <div className="desconto-image">
                            <img src={product.image} alt={product.name} />
                            <button 
                              className={`like-btn ${likedProducts.has(product.id) ? 'liked' : ''}`}
                              onClick={() => toggleLike(product.id)}
                            >
                              <FiHeart />
                            </button>
                          </div>
                          <div className="desconto-content">
                            <h4 className="desconto-product-name">{product.name}</h4>
                            <p className="desconto-product-description">{product.description}</p>
                            <div className="desconto-prices">
                              <span className="original-price">R$ {product.originalPrice}</span>
                              <span className="current-price">R$ {product.price}</span>
                            </div>
                            <div className="desconto-savings">
                              Você economiza R$ {(product.originalPrice - product.price).toFixed(2)}
                            </div>
                            <button className="btn btn--primary btn--small">
                              <FiShoppingCart />
                              Adicionar
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Grid de Produtos em Promoção */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${viewMode}-${produtosFiltrados.length}-${activeCategory}`}
                  className={`produtos-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {produtosFiltrados.map((product, index) => (
                    <motion.div
                      key={product.id}
                      className="product-item"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.03,
                        type: "spring",
                        stiffness: 80
                      }}
                      whileHover={{ 
                        y: -8,
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <ProductCard 
                        product={product} 
                        viewMode={viewMode}
                        showDiscount={true}
                        onLikeToggle={toggleLike}
                        isLiked={likedProducts.has(product.id)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Empty State */}
              {produtosFiltrados.length === 0 && (
                <motion.div
                  className="empty-state"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <div className="empty-illustration">
                    <div className="empty-icon">🏷️</div>
                    <div className="empty-sad">😔</div>
                  </div>
                  <h3>Nenhuma promoção encontrada</h3>
                  <p>Não há produtos em promoção com os filtros selecionados.</p>
                  <motion.button 
                    className="reset-filters-btn"
                    onClick={resetFilters}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiX />
                    Limpar Filtros
                  </motion.button>
                </motion.div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="cta-content">
              <h2 className="cta-title">Não perca nenhuma promoção! 📧</h2>
              <p className="cta-description">
                Cadastre-se e receba as melhores ofertas diretamente no seu email
              </p>
              <div className="cta-form">
                <input 
                  type="email" 
                  placeholder="Seu melhor email..."
                  className="cta-input"
                />
                <button className="btn btn--primary">
                  Quero Receber Ofertas
                </button>
              </div>
              <p className="cta-note">
                📞 Precisa de ajuda? Ligue {restaurantInfo.phone}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            className="filter-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFilters(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Promocoes;
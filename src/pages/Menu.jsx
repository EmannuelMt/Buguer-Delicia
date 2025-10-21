import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiFilter, 
  FiGrid, 
  FiList,
  FiStar,
  FiClock,
  FiZap,
  FiTag,
  FiX,
  FiDollarSign,
  FiHeart,
  FiTrendingUp,
  FiAward
} from 'react-icons/fi';
import { 
  allProducts, 
  categories, 
  productTags,
  filterProducts, 
  sortProducts,
  getProductsByCategory,
  featuredProducts,
  discountedProducts,
  getProductsStats,
  getBestSellers,
  searchProducts
} from '../data/products';
import ProductCard from '../components/ProductCard';
import'./Menu.css';

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedTag, setSelectedTag] = useState('todos');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 150]);
  const [calorieRange, setCalorieRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState('categorias');

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
        categories: Object.keys(categories).length,
        averagePrice: 0,
        totalCalories: 0,
        totalStock: 0,
        totalValue: 0
      };
    }
  }, []);

  const bestSellers = useMemo(() => getBestSellers(), []);

  const categoryOptions = useMemo(() => [
    { value: 'todos', label: 'Todos os Produtos', count: stats.totalProducts, icon: '📦', color: '#666' },
    ...Object.entries(categories).map(([key, category]) => ({
      value: key,
      label: category.name,
      count: getProductsByCategory(key)?.length || 0,
      icon: category.icon,
      color: category.color,
      description: category.description
    }))
  ], [stats.totalProducts]);

  const tagOptions = useMemo(() => [
    { value: 'todos', label: 'Todas as Tags', count: stats.totalProducts, icon: '🏷️', color: '#666' },
    ...Object.entries(productTags).map(([key, tag]) => ({
      value: key,
      label: tag.name,
      count: allProducts.filter(p => p.tags?.includes(key)).length,
      color: tag.color,
      icon: tag.icon
    }))
  ], [stats.totalProducts]);

  const sortOptions = [
    { value: 'name', label: 'Nome A-Z', icon: '🔤' },
    { value: 'price-low', label: 'Preço: Menor', icon: '💰' },
    { value: 'price-high', label: 'Preço: Maior', icon: '💎' },
    { value: 'calories-low', label: 'Menos Calorias', icon: '🥗' },
    { value: 'calories-high', label: 'Mais Calorias', icon: '🔥' },
    { value: 'preparation-time', label: 'Mais Rápido', icon: '⏱️' },
    { value: 'popular', label: 'Mais Populares', icon: '👑' }
  ];

  const filteredProducts = useMemo(() => {
    const filters = {};
    
    if (selectedCategory !== 'todos') filters.category = selectedCategory;
    if (selectedTag !== 'todos') filters.tags = [selectedTag];
    if (searchTerm) filters.search = searchTerm;
    filters.maxPrice = priceRange[1];
    filters.maxCalories = calorieRange[1];

    let filtered = filterProducts(filters);
    
    // Filtro especial para "populares"
    if (sortBy === 'popular') {
      const popularIds = bestSellers.map(p => p.id);
      filtered = filtered.filter(p => popularIds.includes(p.id));
    } else {
      filtered = sortProducts(filtered, sortBy);
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedTag, sortBy, priceRange, calorieRange, bestSellers]);

  const quickFilters = [
    {
      id: 'destaques',
      label: 'Em Destaque',
      icon: <FiStar />,
      count: featuredProducts.length,
      color: 'var(--gold)',
      action: () => {
        setSelectedCategory('todos');
        setSelectedTag('todos');
        setSearchTerm('');
        setSortBy('name');
      }
    },
    {
      id: 'promocoes',
      label: 'Promoções',
      icon: <FiTag />,
      count: discountedProducts.length,
      color: 'var(--secondary)',
      action: () => {
        setSelectedCategory('todos');
        setSelectedTag('todos');
        setSearchTerm('');
        // Filtra produtos com desconto
        const discountedIds = discountedProducts.map(p => p.id);
        // Esta lógica seria implementada no filterProducts
      }
    },
    {
      id: 'rapidos',
      label: 'Preparo Rápido',
      icon: <FiZap />,
      count: allProducts.filter(p => p.preparationTime <= 10).length,
      color: '#4ECDC4',
      action: () => {
        setSelectedCategory('todos');
        setSelectedTag('todos');
        setSearchTerm('');
        setSortBy('preparation-time');
      }
    },
    {
      id: 'mais-vendidos',
      label: 'Mais Vendidos',
      icon: <FiTrendingUp />,
      count: bestSellers.length,
      color: '#FF6B6B',
      action: () => {
        setSelectedCategory('todos');
        setSelectedTag('todos');
        setSearchTerm('');
        setSortBy('popular');
      }
    }
  ];

  const filterTabs = [
    { id: 'categorias', label: 'Categorias', icon: '📁' },
    { id: 'tags', label: 'Tags', icon: '🏷️' },
    { id: 'preco', label: 'Preço', icon: '💰' },
    { id: 'nutricao', label: 'Nutrição', icon: '🥗' }
  ];

  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCategory('todos');
    setSelectedTag('todos');
    setPriceRange([0, 150]);
    setCalorieRange([0, 1000]);
    setSortBy('name');
    setActiveFilterTab('categorias');
  }, []);

  const hasActiveFilters = useMemo(() => {
    return searchTerm || 
           selectedCategory !== 'todos' || 
           selectedTag !== 'todos' || 
           priceRange[1] < 150 || 
           calorieRange[1] < 1000;
  }, [searchTerm, selectedCategory, selectedTag, priceRange, calorieRange]);

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

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <section className="menu-hero">
        <div className="hero-background">
          <div className="hero-pattern"></div>
          <motion.div 
            className="floating-burger"
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
            🍔
          </motion.div>
          <motion.div 
            className="floating-fries"
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
            🍟
          </motion.div>
        </div>
        
        <div className="container">
          <motion.div
            className="menu-hero-content"
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
              <FiStar />
              Cardápio Premium
            </motion.div>

            <h1 className="menu-title">
              Descubra o Sabor <span className="text-gradient">Autêntico</span>
            </h1>
            <p className="menu-subtitle">
              {stats.totalProducts} produtos artesanais preparados com ingredientes selecionados 
              e muito amor pela gastronomia
            </p>
            
            {/* Stats */}
            <motion.div 
              className="menu-stats"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { number: stats.totalProducts, label: 'Produtos', icon: '🍔' },
                { number: stats.categories, label: 'Categorias', icon: '📁' },
                { number: stats.featuredProducts, label: 'Destaques', icon: '⭐' },
                { number: `${Math.round(stats.averagePrice)}`, label: 'Preço Médio', icon: '💰' }
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
            transition={{ duration: 0.6, delay: 0.4 }}
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

      {/* Main Content */}
      <section className="menu-main">
        <div className="container">
          <div className="menu-layout">
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
                  <h3>Filtros Avançados</h3>
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

              {/* Search - Sempre visível */}
              <div className="filter-group">
                <div className="search-container">
                  <FiSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Buscar produtos, ingredientes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  {searchTerm && (
                    <button 
                      className="clear-search"
                      onClick={() => setSearchTerm('')}
                    >
                      <FiX />
                    </button>
                  )}
                </div>
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
                      {categoryOptions.map(category => (
                        <motion.button
                          key={category.value}
                          className={`category-filter ${selectedCategory === category.value ? 'active' : ''}`}
                          onClick={() => setSelectedCategory(category.value)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          style={{ '--category-color': category.color }}
                        >
                          <span className="category-icon">{category.icon}</span>
                          <div className="category-info">
                            <span className="category-name">{category.label}</span>
                            {category.description && (
                              <span className="category-description">{category.description}</span>
                            )}
                          </div>
                          <span className="category-count">{category.count}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Tab Tags */}
                {activeFilterTab === 'tags' && (
                  <motion.div
                    className="tab-panel"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="tag-filters-grid">
                      {tagOptions.map(tag => (
                        <motion.button
                          key={tag.value}
                          className={`tag-filter ${selectedTag === tag.value ? 'active' : ''}`}
                          onClick={() => setSelectedTag(tag.value)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ '--tag-color': tag.color }}
                        >
                          <span className="tag-icon">{tag.icon}</span>
                          <span className="tag-name">{tag.label}</span>
                          <span className="tag-count">{tag.count}</span>
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
                        max="150"
                        step="5"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="range-slider"
                      />
                      <div className="range-labels">
                        <span>R$ 0</span>
                        <span>R$ 150</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab Nutrição */}
                {activeFilterTab === 'nutricao' && (
                  <motion.div
                    className="tab-panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="range-filter">
                      <label className="range-label">
                        <FiAward />
                        Calorias máximas: <strong>{calorieRange[1]}kcal</strong>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="50"
                        value={calorieRange[1]}
                        onChange={(e) => setCalorieRange([0, parseInt(e.target.value)])}
                        className="range-slider"
                      />
                      <div className="range-labels">
                        <span>0kcal</span>
                        <span>1000kcal</span>
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
                    {selectedCategory !== 'todos' && (
                      <span className="active-filter">
                        {categories[selectedCategory]?.name}
                        <button onClick={() => setSelectedCategory('todos')}>×</button>
                      </span>
                    )}
                    {selectedTag !== 'todos' && (
                      <span className="active-filter">
                        {productTags[selectedTag]?.name}
                        <button onClick={() => setSelectedTag('todos')}>×</button>
                      </span>
                    )}
                    {priceRange[1] < 150 && (
                      <span className="active-filter">
                        Até R$ {priceRange[1]}
                        <button onClick={() => setPriceRange([0, 150])}>×</button>
                      </span>
                    )}
                    {calorieRange[1] < 1000 && (
                      <span className="active-filter">
                        Até {calorieRange[1]}kcal
                        <button onClick={() => setCalorieRange([0, 1000])}>×</button>
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.aside>

            {/* Main Content */}
            <main className="menu-content">
              {/* Toolbar */}
              <motion.div 
                className="menu-toolbar"
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
                      <strong>{filteredProducts.length}</strong> produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
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

              {/* Products Grid/List */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${viewMode}-${filteredProducts.length}-${selectedCategory}-${selectedTag}`}
                  className={`products-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {filteredProducts.map((product, index) => (
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
                        index={index}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <motion.div
                  className="empty-state"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <div className="empty-illustration">
                    <div className="empty-icon">🔍</div>
                    <div className="empty-sad">😔</div>
                  </div>
                  <h3>Nenhum produto encontrado</h3>
                  <p>Não encontramos produtos com os filtros selecionados. Tente ajustar sua busca.</p>
                  <motion.button 
                    className="reset-filters-btn"
                    onClick={resetFilters}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiX />
                    Limpar Todos os Filtros
                  </motion.button>
                </motion.div>
              )}

              {/* Load More */}
              {filteredProducts.length > 0 && filteredProducts.length >= 8 && (
                <motion.div 
                  className="load-more-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button 
                    className="load-more-btn"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiZap />
                    Carregar Mais Produtos
                    <span className="load-count">+{Math.max(0, allProducts.length - filteredProducts.length)}</span>
                  </motion.button>
                </motion.div>
              )}
            </main>
          </div>
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

export default Menu;
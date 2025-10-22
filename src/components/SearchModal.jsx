import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiClock, FiTrendingUp, FiStar, FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { allProducts, products, filterProducts, getProductsByTag } from '../data/products';
import './SearchModal.css'

const SearchModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Buscas populares baseadas nos produtos mais vendidos/featured
  const popularSearches = useMemo(() => [
    { id: 1, term: 'Hambúrguer Artesanal', category: 'Lanches', count: allProducts.filter(p => p.category === 'lanches').length },
    { id: 2, term: 'Batata Frita', category: 'Acompanhamentos', count: allProducts.filter(p => p.category === 'acompanhamentos').length },
    { id: 3, term: 'Refrigerante', category: 'Bebidas', count: allProducts.filter(p => p.category === 'bebidas').length },
    { id: 4, term: 'Milkshake', category: 'Sobremesas', count: allProducts.filter(p => p.category === 'sobremesas').length },
    { id: 5, term: 'Combo Família', category: 'Combos', count: allProducts.filter(p => p.category === 'combos').length },
  ], []);

  // Buscas recentes (mock - em app real viria do localStorage)
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  // Produtos em destaque para sugestões
  const featuredProducts = useMemo(() => {
    return allProducts
      .filter(product => product.featured)
      .slice(0, 5)
      .map(product => ({
        id: product.id,
        term: product.name,
        category: product.category,
        product: product
      }));
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  // Efeito para pesquisar em tempo real
  useEffect(() => {
    if (searchTerm.trim()) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        performSearch(searchTerm);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const performSearch = (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }

    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(term.toLowerCase()) ||
      product.description.toLowerCase().includes(term.toLowerCase()) ||
      product.category.toLowerCase().includes(term.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
    );

    setSearchResults(results);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsLoading(true);
      
      // Salvar busca recente
      const newRecentSearch = {
        id: Date.now(),
        term: searchTerm,
        category: 'Busca',
        timestamp: new Date().toISOString()
      };
      
      const updatedRecentSearches = [
        newRecentSearch,
        ...recentSearches.filter(item => item.term !== searchTerm).slice(0, 4)
      ];
      
      setRecentSearches(updatedRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));

      setTimeout(() => {
        setIsLoading(false);
        onClose();
        navigate(`/cardapio?search=${encodeURIComponent(searchTerm)}`);
      }, 500);
    }
  };

  const handleQuickSearch = (term, product = null) => {
    setSearchTerm(term);
    
    // Salvar busca recente para termos de busca
    if (!product) {
      const newRecentSearch = {
        id: Date.now(),
        term: term,
        category: 'Busca',
        timestamp: new Date().toISOString()
      };
      
      const updatedRecentSearches = [
        newRecentSearch,
        ...recentSearches.filter(item => item.term !== term).slice(0, 4)
      ];
      
      setRecentSearches(updatedRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
    }

    setTimeout(() => {
      onClose();
      if (product) {
        // Navegar diretamente para o produto se clicou em um produto específico
        navigate(`/cardapio?product=${product.id}`);
      } else {
        navigate(`/cardapio?search=${encodeURIComponent(term)}`);
      }
    }, 300);
  };

  const handleProductClick = (product) => {
    onClose();
    navigate(`/cardapio?product=${product.id}`);
  };

  const handleCategorySearch = (category) => {
    onClose();
    navigate(`/cardapio?category=${category}`);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    inputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Agrupar resultados por categoria
  const groupedResults = useMemo(() => {
    const groups = {};
    searchResults.forEach(product => {
      if (!groups[product.category]) {
        groups[product.category] = [];
      }
      groups[product.category].push(product);
    });
    return groups;
  }, [searchResults]);

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="search-modal"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Backdrop */}
        <div className="search-modal__backdrop" onClick={onClose} />
        
        {/* Modal Content */}
        <motion.div
          className="search-modal__content"
          variants={contentVariants}
        >
          {/* Header */}
          <div className="search-modal__header">
            <form onSubmit={handleSearch} className="search-modal__form">
              <div className="search-modal__input-wrapper">
                <FiSearch className="search-modal__search-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Pesquisar hambúrgueres, bebidas, combos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-modal__input"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="search-modal__clear-btn"
                  >
                    <FiX />
                  </button>
                )}
              </div>
              
              <button
                type="button"
                onClick={onClose}
                className="search-modal__close-btn"
              >
                <FiX />
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="search-modal__body">
            {isLoading ? (
              <div className="search-modal__loading">
                <motion.div
                  className="search-modal__spinner"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Procurando...</span>
              </div>
            ) : searchTerm ? (
              // Search Results
              <div className="search-modal__results">
                {searchResults.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="search-modal__section"
                  >
                    <h3 className="search-modal__section-title">
                      {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} para "{searchTerm}"
                    </h3>
                    
                    {Object.entries(groupedResults).map(([category, products]) => (
                      <div key={category} className="search-modal__category-group">
                        <h4 className="search-modal__category-title">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h4>
                        <div className="search-modal__products-list">
                          {products.map((product) => (
                            <motion.button
                              key={product.id}
                              onClick={() => handleProductClick(product)}
                              className="search-modal__product-item"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="search-modal__product-image">
                                <img src={product.image} alt={product.name} />
                                {product.featured && (
                                  <div className="search-modal__product-badge">
                                    <FiStar />
                                  </div>
                                )}
                              </div>
                              <div className="search-modal__product-info">
                                <h4 className="search-modal__product-name">
                                  {product.name}
                                </h4>
                                <p className="search-modal__product-description">
                                  {product.description}
                                </p>
                                <div className="search-modal__product-price">
                                  R$ {product.price}
                                  {product.originalPrice && (
                                    <span className="search-modal__product-original-price">
                                      R$ {product.originalPrice}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <button
                      onClick={() => handleQuickSearch(searchTerm)}
                      className="search-modal__view-all-btn"
                    >
                      <FiSearch />
                      <span>Ver todos os {searchResults.length} resultados para "{searchTerm}"</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="search-modal__no-results"
                  >
                    <div className="search-modal__no-results-icon">🔍</div>
                    <h3>Nenhum resultado encontrado</h3>
                    <p>Não encontramos produtos para "{searchTerm}"</p>
                    <div className="search-modal__suggestions">
                      <span>Tente pesquisar por:</span>
                      <div className="search-modal__suggestion-tags">
                        {['hambúrguer', 'bebida', 'combo', 'sobremesa', 'batata'].map(tag => (
                          <button
                            key={tag}
                            onClick={() => handleQuickSearch(tag)}
                            className="search-modal__suggestion-tag"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              // Suggestions when no search term
              <div className="search-modal__suggestions">
                {/* Produtos em Destaque */}
                {featuredProducts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="search-modal__section"
                  >
                    <h3 className="search-modal__section-title">
                      <FiStar />
                      Em Destaque
                    </h3>
                    <div className="search-modal__featured-products">
                      {featuredProducts.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleQuickSearch(item.term, item.product)}
                          className="search-modal__featured-item"
                        >
                          <div className="search-modal__featured-image">
                            <img src={item.product.image} alt={item.term} />
                          </div>
                          <div className="search-modal__featured-info">
                            <span className="search-modal__featured-term">
                              {item.term}
                            </span>
                            <span className="search-modal__featured-category">
                              {item.category}
                            </span>
                            <div className="search-modal__featured-price">
                              R$ {item.product.price}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="search-modal__section"
                  >
                    <div className="search-modal__section-header">
                      <h3 className="search-modal__section-title">
                        <FiClock />
                        Buscas Recentes
                      </h3>
                      <button
                        onClick={clearRecentSearches}
                        className="search-modal__clear-recent"
                      >
                        Limpar
                      </button>
                    </div>
                    <div className="search-modal__suggestions-list">
                      {recentSearches.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleQuickSearch(item.term)}
                          className="search-modal__suggestion-item"
                        >
                          <span className="search-modal__suggestion-term">
                            {item.term}
                          </span>
                          <span className="search-modal__suggestion-category">
                            {item.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Popular Searches */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="search-modal__section"
                >
                  <h3 className="search-modal__section-title">
                    <FiTrendingUp />
                    Populares
                  </h3>
                  <div className="search-modal__suggestions-list">
                    {popularSearches.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleQuickSearch(item.term)}
                        className="search-modal__suggestion-item"
                      >
                        <span className="search-modal__suggestion-term">
                          {item.term}
                        </span>
                        <span className="search-modal__suggestion-category">
                          {item.category}
                          <span className="search-modal__suggestion-count">
                            ({item.count})
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Categorias */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="search-modal__section"
                >
                  <h3 className="search-modal__section-title">
                    📁 Categorias
                  </h3>
                  <div className="search-modal__categories-list">
                    {Object.keys(products).map(category => (
                      <button
                        key={category}
                        onClick={() => handleCategorySearch(category)}
                        className="search-modal__category-item"
                      >
                        <span className="search-modal__category-name">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                        <span className="search-modal__category-count">
                          {products[category].length} itens
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="search-modal__footer">
            <div className="search-modal__tips">
              <span>💡 Dica: Pesquise por nome, ingredientes ou categorias</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;
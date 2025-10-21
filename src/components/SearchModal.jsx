import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiClock, FiTrendingUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Popular searches and recent searches mock data
  const popularSearches = [
    { id: 1, term: 'Hambúrguer Artesanal', category: 'Cardápio' },
    { id: 2, term: 'Batata Frita', category: 'Acompanhamentos' },
    { id: 3, term: 'Milkshake', category: 'Bebidas' },
    { id: 4, term: 'Combo Família', category: 'Combos' },
  ];

  const recentSearches = [
    { id: 1, term: 'X-Bacon', category: 'Cardápio' },
    { id: 2, term: 'Sobremesas', category: 'Sobremesas' },
    { id: 3, term: 'Refrigerante', category: 'Bebidas' },
  ];

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsLoading(true);
      // Simulate search API call
      setTimeout(() => {
        setIsLoading(false);
        onClose();
        navigate(`/cardapio?search=${encodeURIComponent(searchTerm)}`);
      }, 800);
    }
  };

  const handleQuickSearch = (term) => {
    setSearchTerm(term);
    // Auto-search when clicking quick search items
    setTimeout(() => {
      onClose();
      navigate(`/cardapio?search=${encodeURIComponent(term)}`);
    }, 300);
  };

  const clearSearch = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

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
                  placeholder="Pesquisar produtos, categorias..."
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="search-modal__section"
                >
                  <h3 className="search-modal__section-title">
                    Resultados para "{searchTerm}"
                  </h3>
                  <div className="search-modal__results-list">
                    {/* Mock results - in real app, these would come from API */}
                    <button
                      onClick={() => handleQuickSearch(searchTerm)}
                      className="search-modal__result-item"
                    >
                      <FiSearch />
                      <span>Ver todos os resultados para "{searchTerm}"</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            ) : (
              // Suggestions when no search term
              <div className="search-modal__suggestions">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="search-modal__section"
                  >
                    <h3 className="search-modal__section-title">
                      <FiClock />
                      Buscas Recentes
                    </h3>
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
                  transition={{ delay: 0.2 }}
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
              <span>💡 Dica: Use palavras-chave como "hambúrguer", "bebida", "combo"</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;
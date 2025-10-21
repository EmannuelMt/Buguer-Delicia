import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiSun, 
  FiMoon, 
  FiMenu, 
  FiX, 
  FiUser, 
  FiLogIn, 
  FiLogOut, 
  FiHome,
  FiStar,
  FiHeart,
  FiSearch,
  FiCoffee,
  FiInfo,
  FiPackage,
  FiChevronDown,
  FiBell,
  FiAward,
  FiTrendingUp,
  FiClock
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import Cart from './Cart';
import SearchModal from './SearchModal';
import './Navbar.css';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const { getTotalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Detect scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply theme
  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [darkMode]);

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar')) {
        setIsMobileMenuOpen(false);
      }
      if (isUserMenuOpen && !event.target.closest('.user__menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen, isUserMenuOpen]);

  // Mock user data
  const toggleLogin = useCallback(() => {
    if (user) {
      setUser(null);
      setIsUserMenuOpen(false);
    } else {
      setUser({
        name: 'João Silva',
        email: 'joao@email.com',
        avatar: null,
        points: 1250,
        tier: 'Gold'
      });
      setIsMobileMenuOpen(false);
      navigate('/login');
    }
  }, [user, navigate]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode);
  }, [darkMode]);

  const toggleCart = useCallback(() => {
    setIsCartOpen(!isCartOpen);
  }, [isCartOpen]);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen(!isSearchOpen);
  }, [isSearchOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const toggleUserMenu = useCallback(() => {
    setIsUserMenuOpen(!isUserMenuOpen);
  }, [isUserMenuOpen]);

  const closeAllModals = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsCartOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
  }, []);

  const handleProfileClick = useCallback(() => {
    if (user) {
      navigate('/perfil');
    } else {
      navigate('/login');
    }
    closeAllModals();
  }, [user, navigate, closeAllModals]);

  const handleQuickOrder = useCallback(() => {
    navigate('/cardapio?quick-order=true');
    closeAllModals();
  }, [navigate, closeAllModals]);

  const navItems = [
    { path: '/', label: 'Início', icon: FiHome, description: 'Página inicial' },
    { path: '/cardapio', label: 'Cardápio', icon: FiCoffee, featured: true, description: 'Ver todos os produtos' },
    { path: '/promocoes', label: 'Promoções', icon: FiTrendingUp, hot: true, description: 'Ofertas especiais' },
    { path: '/sobre', label: 'Sobre Nós', icon: FiInfo, description: 'Conheça nossa história' },
  ];

  const userMenuItems = user ? [
    { label: 'Meu Perfil', icon: FiUser, action: () => navigate('/perfil') },
    { label: 'Meus Pedidos', icon: FiPackage, action: () => navigate('/pedidos') },
    { label: 'Favoritos', icon: FiHeart, action: () => navigate('/favoritos') },
    { label: 'Pontos', icon: FiAward, action: () => navigate('/pontos') },
    { label: 'Sair', icon: FiLogOut, action: toggleLogin, danger: true }
  ] : [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  };

  const userMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.8,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, 0],
      transition: {
        rotate: {
          duration: 0.5,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <>
      <motion.nav 
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="navbar__container">
          <div className="navbar__content">
            
            {/* Premium Logo */}
            <motion.div className="navbar__brand" variants={itemVariants}>
              <Link to="/" className="navbar__logo-link" onClick={closeAllModals}>
                <motion.div 
                  className="navbar__logo"
                  variants={logoVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="navbar__logo-icon">
                    <div className="logo-burger">
                      <div className="logo-bun-top"></div>
                      <div className="logo-lettuce"></div>
                      <div className="logo-patty"></div>
                      <div className="logo-cheese"></div>
                      <div className="logo-patty"></div>
                      <div className="logo-bun-bottom"></div>
                    </div>
                    <div className="logo-glow"></div>
                  </div>
                  <div className="navbar__logo-text">
                    <span className="logo-text-primary">Burger</span>
                    <span className="logo-text-delicia">Delícia</span>
                  </div>
                  <motion.div 
                    className="logo-sparkle"
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      rotate: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    ✨
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div className="navbar__nav-desktop" variants={containerVariants}>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.div key={item.path} variants={itemVariants}>
                    <Link
                      to={item.path}
                      className={`nav__link ${location.pathname === item.path ? 'nav__link--active' : ''} ${item.featured ? 'nav__link--featured' : ''} ${item.hot ? 'nav__link--hot' : ''}`}
                      onClick={closeAllModals}
                    >
                      <IconComponent className="nav__icon" />
                      <span className="nav__text">{item.label}</span>
                      {item.featured && (
                        <motion.span 
                          className="nav__badge"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <FiStar />
                          Popular
                        </motion.span>
                      )}
                      {item.hot && (
                        <motion.span 
                          className="nav__badge nav__badge--hot"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <FiTrendingUp />
                          Hot
                        </motion.span>
                      )}
                      {location.pathname === item.path && (
                        <motion.div 
                          className="nav__underline"
                          layoutId="nav-underline"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Desktop Actions */}
            <motion.div className="navbar__actions-desktop" variants={containerVariants}>
              
              {/* Quick Order */}
              <motion.button
                className="action__btn action__btn--primary"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickOrder}
                aria-label="Pedido Rápido"
              >
                <FiClock />
                <span className="action__text">Rápido</span>
              </motion.button>

              {/* Search */}
              <motion.button
                className="action__btn"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSearch}
                aria-label="Pesquisar"
              >
                <FiSearch />
              </motion.button>

              {/* Favorites */}
              <motion.button
                className="action__btn"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Favoritos"
              >
                <FiHeart />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleDarkMode}
                className="action__btn"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Alternar tema"
              >
                <AnimatePresence mode="wait">
                  {darkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <FiSun />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <FiMoon />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Notifications */}
              <motion.button
                className="action__btn"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Notificações"
              >
                <FiBell />
                {notifications > 0 && (
                  <motion.span
                    className="notification__badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {notifications}
                  </motion.span>
                )}
              </motion.button>
             
              {/* User Account */}
              <motion.div
                className="user__menu"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                {user ? (
                  <motion.button 
                    className="user__btn"
                    onClick={toggleUserMenu}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="user__avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <FiUser />
                      )}
                      <div className="user__status"></div>
                    </div>
                    <div className="user__info">
                      <span className="user__name">{user.name.split(' ')[0]}</span>
                      <span className="user__tier">{user.tier}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiChevronDown />
                    </motion.div>
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleProfileClick}
                    className="login__btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiLogIn />
                    <span>Entrar</span>
                  </motion.button>
                )}

                {/* User Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && user && (
                    <motion.div
                      className="user__dropdown"
                      variants={userMenuVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                    >
                      <div className="user__header">
                        <div className="user__avatar-large">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} />
                          ) : (
                            <FiUser />
                          )}
                        </div>
                        <div className="user__details">
                          <h4>{user.name}</h4>
                          <p>{user.email}</p>
                          <div className="user__points">
                            <FiAward />
                            <span>{user.points} pontos</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="user__menu-items">
                        {userMenuItems.map((item, index) => (
                          <motion.button
                            key={item.label}
                            className={`user__menu-item ${item.danger ? 'user__menu-item--danger' : ''}`}
                            onClick={() => {
                              item.action();
                              setIsUserMenuOpen(false);
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <item.icon />
                            <span>{item.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Cart */}
              <motion.button
                onClick={toggleCart}
                className="cart__btn"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Carrinho de compras"
              >
                <FiShoppingCart />
                {getTotalItems() > 0 && (
                  <motion.span
                    className="cart__badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
                <div className="cart__pulse" />
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMobileMenu}
              className="navbar__mobile-toggle"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Menu mobile"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <FiX />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <FiMenu />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="navbar__mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="navbar__mobile-content">
                {/* User Info Mobile */}
                {user && (
                  <motion.div 
                    className="mobile-user__info"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="mobile-user__avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <FiUser />
                      )}
                    </div>
                    <div className="mobile-user__details">
                      <h4>{user.name}</h4>
                      <p>{user.email}</p>
                      <div className="mobile-user__points">
                        <FiAward />
                        <span>{user.points} pontos • {user.tier}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Links */}
                {navItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (user ? 0.2 : 0.1) + index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className={`mobile-nav__link ${location.pathname === item.path ? 'mobile-nav__link--active' : ''} ${item.featured ? 'mobile-nav__link--featured' : ''}`}
                        onClick={closeAllModals}
                      >
                        <IconComponent className="mobile-nav__icon" />
                        <div className="mobile-nav__text-content">
                          <span className="mobile-nav__text">{item.label}</span>
                          {item.description && (
                            <span className="mobile-nav__description">{item.description}</span>
                          )}
                        </div>
                        {item.featured && (
                          <span className="mobile-nav__badge">
                            <FiStar />
                            Popular
                          </span>
                        )}
                        {item.hot && (
                          <span className="mobile-nav__badge mobile-nav__badge--hot">
                            <FiTrendingUp />
                            Hot
                          </span>
                        )}
                        {location.pathname === item.path && (
                          <div className="mobile-nav__indicator" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                
                {/* Mobile Actions */}
                <div className="navbar__mobile-actions">
                  <motion.button 
                    className="mobile-action mobile-action--primary"
                    onClick={handleQuickOrder}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <FiClock />
                    <span>Pedido Rápido</span>
                  </motion.button>
                  
                  <motion.button 
                    className="mobile-action"
                    onClick={toggleSearch}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <FiSearch />
                    <span>Pesquisar</span>
                  </motion.button>
                  
                  <motion.button 
                    className="mobile-action"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <FiHeart />
                    <span>Favoritos</span>
                  </motion.button>

                  <motion.button 
                    onClick={toggleCart}
                    className="mobile-action mobile-action--cart"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <FiShoppingCart />
                    <span>Carrinho</span>
                    {getTotalItems() > 0 && (
                      <span className="mobile-cart__badge">
                        {getTotalItems()}
                      </span>
                    )}
                  </motion.button>
                  
                  {user ? (
                    <motion.button 
                      onClick={toggleLogin}
                      className="mobile-action mobile-action--logout"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <FiLogOut />
                      <span>Sair da Conta</span>
                    </motion.button>
                  ) : (
                    <motion.button 
                      onClick={handleProfileClick}
                      className="mobile-action mobile-action--login"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <FiLogIn />
                      <span>Fazer Login</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && <Cart onClose={toggleCart} />}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && <SearchModal onClose={toggleSearch} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
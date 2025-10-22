import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ onClose }) => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalPrice, 
    getTotalItems,
    clearCart 
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    onClose();
    navigate('/cardapio');
  };

  const handleIncrement = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };

  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  // Variantes de animação
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const panelVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: {
        type: 'spring',
        damping: 30,
        stiffness: 300
      }
    },
    exit: { 
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };

  const emptyVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="cart-backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="cart-panel"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="cart-header">
            <div className="cart-title">
              <FiShoppingBag />
              <h2>Seu Carrinho</h2>
              {items.length > 0 && (
                <span className="cart-count">{getTotalItems()}</span>
              )}
            </div>
            <motion.button
              className="cart-close-btn"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX />
            </motion.button>
          </div>

          {/* Cart Content */}
          <div className="cart-content">
            <AnimatePresence mode="wait">
              {items.length === 0 ? (
                <motion.div
                  className="cart-empty"
                  variants={emptyVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="empty-illustration">
                    <div className="empty-bag">🛒</div>
                    <div className="empty-sad">😔</div>
                  </div>
                  <h3>Carrinho Vazio</h3>
                  <p>Adicione alguns itens deliciosos ao seu carrinho</p>
                  <motion.button
                    className="btn btn--primary"
                    onClick={handleContinueShopping}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiArrowRight />
                    <span>Ver Cardápio</span>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  className="cart-items"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${index}`}
                      className="cart-item"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ y: -2 }}
                      layout
                    >
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                        {item.featured && (
                          <div className="item-badge">
                            <FiShoppingBag />
                          </div>
                        )}
                      </div>
                      
                      <div className="item-details">
                        <h4 className="item-name">{item.name}</h4>
                        <p className="item-description">{item.description}</p>
                        <div className="item-price">R$ {item.price.toFixed(2)}</div>
                      </div>

                      <div className="item-controls">
                        <div className="quantity-controls">
                          <motion.button
                            className="quantity-btn"
                            onClick={() => handleDecrement(item)}
                            whileHover={{ scale: 1.1, backgroundColor: 'var(--gray-light)' }}
                            whileTap={{ scale: 0.9 }}
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus />
                          </motion.button>
                          
                          <span className="quantity-display">{item.quantity}</span>
                          
                          <motion.button
                            className="quantity-btn"
                            onClick={() => handleIncrement(item)}
                            whileHover={{ scale: 1.1, backgroundColor: 'var(--gray-light)' }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiPlus />
                          </motion.button>
                        </div>

                        <div className="item-total">
                          R$ {calculateItemTotal(item).toFixed(2)}
                        </div>

                        <motion.button
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                          whileHover={{ scale: 1.1, color: 'var(--danger)' }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiTrash2 />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <motion.div
              className="cart-footer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>R$ {getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Entrega:</span>
                  <span className="delivery-free">Grátis</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-total">
                  <span>Total:</span>
                  <span className="total-price">R$ {getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <motion.button
                  className="btn btn--secondary btn--clear"
                  onClick={clearCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiTrash2 />
                  <span>Limpar Carrinho</span>
                </motion.button>
                
                <motion.button
                  className="btn btn--primary btn--checkout"
                  onClick={handleCheckout}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 8px 25px rgba(184, 134, 11, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Finalizar Pedido</span>
                  <FiArrowRight />
                </motion.button>
              </div>

              <div className="cart-security">
                <div className="security-badge">
                  <FiShoppingBag />
                  <span>Compra 100% segura</span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart;
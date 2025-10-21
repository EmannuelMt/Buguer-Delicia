import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ onClose }) => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalPrice, 
    clearCart 
  } = useCart();
  const navigate = useNavigate();

  console.log('Cart component loaded'); // Debug

  const handleCheckout = () => {
    console.log('Finalizar Pedido clicked'); // Debug
    onClose(); // Fecha o carrinho sidebar
    setTimeout(() => {
      navigate('/carrinho'); // Navega para a página de finalização
    }, 300);
  };

  const handleGoToMenu = () => {
    onClose();
    setTimeout(() => {
      navigate('/cardapio');
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30 }}
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '100%',
          backgroundColor: 'var(--white)',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--light-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ 
            margin: 0, 
            color: 'var(--text-dark)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <FiShoppingBag />
            Seu Carrinho ({items.length})
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: 'var(--text-light)',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '4px',
              transition: 'var(--transition)',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--light-color)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <FiX />
          </button>
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1rem',
        }}>
          <AnimatePresence>
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center',
                  color: 'var(--text-light)',
                  padding: '3rem 1rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1rem',
                  color: 'var(--light-color)'
                }}>
                  <FiShoppingBag />
                </div>
                <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                  Seu carrinho está vazio
                </p>
                <motion.button
                  onClick={handleGoToMenu}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  Ver Cardápio
                </motion.button>
              </motion.div>
            ) : (
              items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    border: '1px solid var(--light-color)',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    backgroundColor: 'var(--white)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ 
                      margin: '0 0 0.5rem 0', 
                      color: 'var(--text-dark)',
                      fontSize: '0.9rem',
                      lineHeight: '1.3'
                    }}>
                      {item.name}
                    </h4>
                    <p style={{ 
                      margin: 0, 
                      color: 'var(--primary-color)', 
                      fontWeight: 'bold',
                      fontSize: '1rem'
                    }}>
                      R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.5rem',
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary-color)',
                          cursor: 'pointer',
                          padding: '0.25rem',
                          borderRadius: '4px',
                          transition: 'var(--transition)',
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        <FiMinus />
                      </button>
                      <span style={{
                        minWidth: '30px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'var(--text-dark)'
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary-color)',
                          cursor: 'pointer',
                          padding: '0.25rem',
                          borderRadius: '4px',
                          transition: 'var(--transition)',
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--danger-color)',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        borderRadius: '4px',
                        transition: 'var(--transition)',
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--danger-color)'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer - Mostrar apenas se tiver items */}
        {items.length > 0 && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid var(--light-color)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}>
              <span style={{ color: 'var(--text-dark)' }}>Total:</span>
              <span style={{ color: 'var(--primary-color)' }}>
                R$ {getTotalPrice().toFixed(2)}
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button
                onClick={clearCart}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '2px solid var(--danger-color)',
                  backgroundColor: 'transparent',
                  color: 'var(--danger-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'var(--transition)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'var(--danger-color)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'var(--danger-color)';
                }}
              >
                Limpar
              </button>
              <motion.button
                onClick={handleCheckout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  flex: 2,
                  padding: '0.75rem',
                  border: 'none',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'var(--transition)',
                }}
              >
                Finalizar Pedido
              </motion.button>
            </div>
            
            {/* Continue Shopping */}
            <motion.button
              onClick={handleGoToMenu}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid var(--light-color)',
                backgroundColor: 'transparent',
                color: 'var(--text-dark)',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--light-color)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              + Adicionar Mais Itens
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cart;
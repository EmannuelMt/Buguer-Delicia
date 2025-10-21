import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
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

  const handleCheckout = () => {
    onClose();
    navigate('/carrinho');
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
          <h2 style={{ margin: 0, color: 'var(--text-dark)' }}>
            Seu Carrinho
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: 'var(--text-light)',
              cursor: 'pointer',
            }}
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
                  padding: '2rem',
                }}
              >
                <p>Seu carrinho está vazio</p>
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
                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>
                      {item.name}
                    </h4>
                    <p style={{ 
                      margin: 0, 
                      color: 'var(--primary-color)', 
                      fontWeight: 'bold',
                      fontSize: '1.1rem'
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
                        }}
                      >
                        <FiMinus />
                      </button>
                      <span style={{
                        minWidth: '30px',
                        textAlign: 'center',
                        fontWeight: 'bold',
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
                        }}
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
                      }}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
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
              <span>Total:</span>
              <span style={{ color: 'var(--primary-color)' }}>
                R$ {getTotalPrice().toFixed(2)}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={clearCart}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid var(--danger-color)',
                  backgroundColor: 'transparent',
                  color: 'var(--danger-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Limpar
              </button>
              <button
                onClick={handleCheckout}
                style={{
                  flex: 2,
                  padding: '0.75rem',
                  border: 'none',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cart;
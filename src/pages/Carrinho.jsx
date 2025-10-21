// src/pages/Carrinho.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiMessageSquare, FiCreditCard, FiShoppingBag, FiHome, FiArrowLeft } from 'react-icons/fi';
import { QRCodeSVG } from 'qrcode.react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import WhatsAppOrder from '../components/WhatsAppOrder';

const Carrinho = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    getTotalPrice, 
    clearCart,
    observations,
    setObservations,
    paymentMethod,
    setPaymentMethod
  } = useCart();

  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [orderType, setOrderType] = useState('delivery');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Página Carrinho carregada!');
  }, []);

  const paymentMethods = [
    { value: 'pix', label: 'PIX', description: 'Pagamento instantâneo' },
    { value: 'credit', label: 'Cartão de Crédito', description: 'Parcelamento em até 3x' },
    { value: 'debit', label: 'Cartão de Débito', description: 'Pagamento à vista' },
    { value: 'money', label: 'Dinheiro', description: 'Pagamento na entrega' },
  ];

  const deliveryFee = orderType === 'delivery' ? 5.00 : 0.00;
  const totalWithFee = getTotalPrice() + deliveryFee;

  const handleContinueShopping = () => {
    navigate('/cardapio');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div style={{ padding: '4rem 0', minHeight: '60vh' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center' }}
          >
            <div style={{
              fontSize: '6rem',
              marginBottom: '1rem',
              color: 'var(--light-color)'
            }}>
              <FiShoppingBag />
            </div>
            <h1 style={{ 
              fontSize: '2.5rem', 
              marginBottom: '1rem',
              color: 'var(--text-dark)'
            }}>
              Carrinho Vazio
            </h1>
            <p style={{ 
              color: 'var(--text-light)',
              fontSize: '1.1rem',
              marginBottom: '3rem'
            }}>
              Adicione alguns itens deliciosos ao seu carrinho!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.button
                onClick={handleContinueShopping}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <FiShoppingBag />
                Explorar Cardápio
              </motion.button>
              
              <motion.button
                onClick={handleGoHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-dark)',
                  border: '2px solid var(--light-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <FiHome />
                Página Inicial
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <div className="container">
        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-dark)',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                transition: 'var(--transition)',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--light-color)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <FiArrowLeft />
              Voltar
            </motion.button>
          </div>
          
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '0.5rem',
            color: 'var(--text-dark)',
          }}>
            Finalizar Pedido
          </h1>
          <p style={{ 
            color: 'var(--text-light)',
            fontSize: '1.1rem',
            margin: 0
          }}>
            Revise seu pedido e escolha a forma de pagamento
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* Left Column - Items and Options */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Order Type Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                backgroundColor: 'var(--white)',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: 'var(--shadow)',
                marginBottom: '2rem',
              }}
            >
              <h2 style={{ 
                marginBottom: '1.5rem',
                color: 'var(--text-dark)'
              }}>
                Tipo de Pedido
              </h2>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <label
                  style={{
                    flex: 1,
                    padding: '1.5rem',
                    border: `2px solid ${orderType === 'delivery' ? 'var(--primary-color)' : 'var(--light-color)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    backgroundColor: orderType === 'delivery' ? 'var(--light-color)' : 'transparent',
                    textAlign: 'center',
                  }}
                >
                  <input
                    type="radio"
                    name="orderType"
                    value="delivery"
                    checked={orderType === 'delivery'}
                    onChange={(e) => setOrderType(e.target.value)}
                    style={{ display: 'none' }}
                  />
                  <div style={{ fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
                    🛵 Delivery
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                    Entregamos no seu endereço
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 'bold', marginTop: '0.5rem' }}>
                    + R$ 5,00
                  </div>
                </label>

                <label
                  style={{
                    flex: 1,
                    padding: '1.5rem',
                    border: `2px solid ${orderType === 'pickup' ? 'var(--primary-color)' : 'var(--light-color)'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    backgroundColor: orderType === 'pickup' ? 'var(--light-color)' : 'transparent',
                    textAlign: 'center',
                  }}
                >
                  <input
                    type="radio"
                    name="orderType"
                    value="pickup"
                    checked={orderType === 'pickup'}
                    onChange={(e) => setOrderType(e.target.value)}
                    style={{ display: 'none' }}
                  />
                  <div style={{ fontWeight: 'bold', color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
                    🏪 Retirar na Loja
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                    Você busca no estabelecimento
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--success-color)', fontWeight: 'bold', marginTop: '0.5rem' }}>
                    Sem taxa
                  </div>
                </label>
              </div>
            </motion.div>

            {/* Cart Items */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ 
                marginBottom: '1.5rem', 
                color: 'var(--text-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FiShoppingBag />
                Itens do Pedido ({items.length})
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1.5rem',
                      backgroundColor: 'var(--white)',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow)',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                      }}
                    />
                    
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        margin: '0 0 0.5rem 0', 
                        color: 'var(--text-dark)',
                        fontSize: '1.1rem'
                      }}>
                        {item.name}
                      </h3>
                      <p style={{ 
                        margin: '0 0 0.5rem 0', 
                        color: 'var(--text-light)',
                        fontSize: '0.9rem'
                      }}>
                        {item.description}
                      </p>
                      <p style={{ 
                        margin: 0, 
                        color: 'var(--primary-color)', 
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                      }}>
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'var(--light-color)',
                        padding: '0.5rem',
                        borderRadius: '8px',
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary-color)',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            fontSize: '1.2rem',
                            borderRadius: '4px',
                            transition: 'var(--transition)',
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          <FiMinus />
                        </button>
                        <span style={{
                          minWidth: '40px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
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
                            fontSize: '1.2rem',
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
                          padding: '0.5rem',
                          fontSize: '1.2rem',
                          borderRadius: '4px',
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
                        <FiTrash2 />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Observations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                backgroundColor: 'var(--white)',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: 'var(--shadow)',
              }}
            >
              <h2 style={{ 
                marginBottom: '1rem', 
                color: 'var(--text-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FiMessageSquare />
                Observações do Pedido
              </h2>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Alguma observação especial? Ex: sem cebola, ponto da carne, molho extra, etc."
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '1rem',
                  border: '1px solid var(--light-color)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: 'var(--white)',
                  color: 'var(--text-dark)',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'var(--transition)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary-color)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--light-color)'}
              />
              <p style={{ 
                margin: '0.5rem 0 0 0', 
                color: 'var(--text-light)', 
                fontSize: '0.9rem' 
              }}>
                Estas informações serão enviadas junto com seu pedido.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Summary and Payment */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              position: 'sticky',
              top: '2rem',
            }}
          >
            {/* Order Summary */}
            <div style={{
              backgroundColor: 'var(--white)',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: 'var(--shadow)',
              marginBottom: '2rem',
            }}>
              <h2 style={{ 
                marginBottom: '1.5rem', 
                color: 'var(--text-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FiCreditCard />
                Resumo do Pedido
              </h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                {items.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--light-color)',
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500', color: 'var(--text-dark)' }}>
                        {item.quantity}x {item.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                        R$ {item.price.toFixed(2)} cada
                      </div>
                    </div>
                    <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div style={{
                borderTop: '2px solid var(--light-color)',
                paddingTop: '1rem',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}>
                  <span style={{ color: 'var(--text-dark)' }}>Subtotal:</span>
                  <span style={{ fontWeight: 'bold' }}>R$ {getTotalPrice().toFixed(2)}</span>
                </div>
                
                {orderType === 'delivery' && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}>
                    <span style={{ color: 'var(--text-dark)' }}>Taxa de Entrega:</span>
                    <span style={{ fontWeight: 'bold' }}>R$ {deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: 'var(--primary-color)',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '2px solid var(--primary-color)',
                }}>
                  <span>Total:</span>
                  <span>R$ {totalWithFee.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div style={{
              backgroundColor: 'var(--white)',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: 'var(--shadow)',
              marginBottom: '2rem',
            }}>
              <h3 style={{ 
                marginBottom: '1rem', 
                color: 'var(--text-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FiCreditCard />
                Forma de Pagamento
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {paymentMethods.map(method => (
                  <label
                    key={method.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      border: `2px solid ${paymentMethod === method.value ? 'var(--primary-color)' : 'var(--light-color)'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'var(--transition)',
                      backgroundColor: paymentMethod === method.value ? 'var(--light-color)' : 'transparent',
                    }}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.value}
                      checked={paymentMethod === method.value}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ display: 'none' }}
                    />
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: `2px solid ${paymentMethod === method.value ? 'var(--primary-color)' : 'var(--text-light)'}`,
                      backgroundColor: paymentMethod === method.value ? 'var(--primary-color)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', color: 'var(--text-dark)' }}>
                        {method.label}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                        {method.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* PIX QR Code */}
              {paymentMethod === 'pix' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{
                    marginTop: '1rem',
                    padding: '1.5rem',
                    backgroundColor: 'var(--light-color)',
                    borderRadius: '8px',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ 
                    marginBottom: '1rem', 
                    fontWeight: 'bold',
                    color: 'var(--text-dark)'
                  }}>
                    💰 Pagamento via PIX
                  </p>
                  <QRCodeSVG 
                    value={`PIX: BurgerDelícia - R$ ${totalWithFee.toFixed(2)}`}
                    size={180}
                    style={{ 
                      margin: '0 auto 1rem',
                      backgroundColor: 'white',
                      padding: '1rem',
                      borderRadius: '8px',
                    }}
                  />
                  <p style={{ 
                    margin: 0, 
                    fontSize: '0.9rem', 
                    color: 'var(--text-light)',
                    lineHeight: '1.4'
                  }}>
                    Escaneie o QR Code para pagar via PIX
                    <br />
                    ou copie o código para transferência
                  </p>
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <motion.button
                onClick={() => setShowWhatsApp(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  backgroundColor: '#25D366',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                📱 Enviar Pedido via WhatsApp
              </motion.button>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <motion.button
                  onClick={handleContinueShopping}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    color: 'var(--text-dark)',
                    border: '2px solid var(--light-color)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <FiShoppingBag />
                  Continuar Comprando
                </motion.button>

                <motion.button
                  onClick={clearCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    flex: 1,
                    padding: '1rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                    color: 'var(--danger-color)',
                    border: '2px solid var(--danger-color)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                  }}
                >
                  🗑️ Limpar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp Order Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {showWhatsApp && (
          <WhatsAppOrder 
            onClose={() => {
              setShowWhatsApp(false);
              clearCart();
            }} 
          />
        )}
      </motion.div>
    </div>
  );
};

export default Carrinho;
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMessageCircle, FiCheck, FiCopy, FiShoppingBag, FiTruck, FiCreditCard } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { QRCodeSVG } from 'qrcode.react';
import './WhatsAppOrder.css';

const WhatsAppOrder = ({ onClose }) => {
  const { 
    items, 
    getTotalPrice, 
    observations, 
    paymentMethod,
    clearCart 
  } = useCart();

  const [isCopied, setIsCopied] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const paymentMethods = useMemo(() => ({
    pix: { label: 'PIX', icon: '🏷️', color: '#32BCAD' },
    credit: { label: 'Cartão de Crédito', icon: '💳', color: '#667eea' },
    debit: { label: 'Cartão de Débito', icon: '💳', color: '#764ba2' },
    money: { label: 'Dinheiro', icon: '💵', color: '#FFD700' }
  }), []);

  const deliveryFee = 5.00;
  const totalWithDelivery = getTotalPrice() + deliveryFee;

  const generateOrderMessage = useMemo(() => {
    const phoneNumber = '5511999999999'; // Substitua pelo número da loja
    
    let message = `*🛵 PEDIDO - BURGERDELÍCIA*%0A%0A`;
    message += `*📋 ITENS DO PEDIDO:*%0A%0A`;
    
    items.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}*%0A`;
      message += `Quantidade: ${item.quantity}x%0A`;
      message += `Preço: R$ ${item.price.toFixed(2)}%0A`;
      message += `Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}%0A%0A`;
    });
    
    message += `*💰 VALORES:*%0A`;
    message += `Subtotal: R$ ${getTotalPrice().toFixed(2)}%0A`;
    message += `Taxa de Entrega: R$ ${deliveryFee.toFixed(2)}%0A`;
    message += `*Total: R$ ${totalWithDelivery.toFixed(2)}*%0A%0A`;
    
    message += `*💳 FORMA DE PAGAMENTO:*%0A`;
    message += `${paymentMethods[paymentMethod].label}%0A%0A`;
    
    if (observations) {
      message += `*📝 OBSERVAÇÕES:*%0A`;
      message += `${observations}%0A%0A`;
    }
    
    message += `*📍 INFORMAÇÕES IMPORTANTES:*%0A`;
    message += `• Entregamos em até 30 minutos%0A`;
    message += `• Aceitamos troco para até R$ 50,00%0A`;
    message += `• Pedido mínimo: R$ 20,00%0A%0A`;
    
    message += `_*Por favor, confirme seu endereço de entrega no chat*_`;
    
    return `https://wa.me/${phoneNumber}?text=${message}`;
  }, [items, getTotalPrice, observations, paymentMethod, paymentMethods, totalWithDelivery]);

  const copyToClipboard = async () => {
    const message = decodeURIComponent(generateOrderMessage.replace('https://wa.me/5511999999999?text=', ''));
    try {
      await navigator.clipboard.writeText(message);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar: ', err);
    }
  };

  const handleSendOrder = () => {
    setIsSent(true);
    setTimeout(() => {
      window.open(generateOrderMessage, '_blank');
      clearCart();
      setTimeout(() => {
        onClose();
      }, 1000);
    }, 1500);
  };

  // Variantes de animação
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0, 
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  const successVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 200
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  };

  return (
    <AnimatePresence>
      <motion.div
        className="whatsapp-modal-backdrop"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="whatsapp-modal"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <motion.button
            className="modal-close-btn"
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX />
          </motion.button>

          <AnimatePresence mode="wait">
            {!isSent ? (
              <motion.div
                key="order-confirmation"
                className="modal-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header */}
                <div className="modal-header">
                  <motion.div 
                    className="whatsapp-icon"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                  >
                    <FiMessageCircle />
                  </motion.div>
                  <h2 className="modal-title">
                    Enviar Pedido via WhatsApp
                  </h2>
                  <p className="modal-subtitle">
                    Seu pedido será enviado para nosso WhatsApp
                  </p>
                </div>

                {/* Order Summary */}
                <div className="order-summary">
                  <div className="summary-header">
                    <FiShoppingBag />
                    <h3>Resumo do Pedido</h3>
                  </div>
                  
                  <div className="order-items">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="order-item"
                        custom={index}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <div className="item-info">
                          <div className="item-image">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="item-details">
                            <h4 className="item-name">{item.name}</h4>
                            <p className="item-quantity">{item.quantity}x</p>
                          </div>
                        </div>
                        <div className="item-prices">
                          <span className="item-unit-price">
                            R$ {item.price.toFixed(2)}
                          </span>
                          <span className="item-total-price">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="order-totals">
                    <div className="total-row">
                      <span>Subtotal:</span>
                      <span>R$ {getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                      <span>Taxa de Entrega:</span>
                      <span>R$ {deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="total-divider"></div>
                    <div className="total-final">
                      <span>Total:</span>
                      <span className="final-price">R$ {totalWithDelivery.toFixed(2)}</span>
                    </div>
                  </div>

                  {observations && (
                    <motion.div 
                      className="order-observations"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <div className="observations-header">
                        <span>📝</span>
                        <h4>Observações</h4>
                      </div>
                      <p>{observations}</p>
                    </motion.div>
                  )}

                  <motion.div 
                    className="payment-method"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="payment-header">
                      <span style={{ color: paymentMethods[paymentMethod].color }}>
                        {paymentMethods[paymentMethod].icon}
                      </span>
                      <h4>Forma de Pagamento</h4>
                    </div>
                    <p style={{ color: paymentMethods[paymentMethod].color }}>
                      {paymentMethods[paymentMethod].label}
                    </p>
                  </motion.div>
                </div>

                {/* QR Code for PIX */}
                {paymentMethod === 'pix' && (
                  <motion.div
                    className="pix-section"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="pix-header">
                      <FiCreditCard />
                      <h4>Pagamento via PIX</h4>
                    </div>
                    <div className="qrcode-container">
                      <QRCodeSVG 
                        value={`00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540${totalWithDelivery.toFixed(2)}5802BR5913BURGERDELICIA6010SAO PAULO62070503***6304`}
                        size={180}
                        className="qrcode"
                      />
                    </div>
                    <p className="pix-instruction">
                      Escaneie o QR Code para pagar via PIX
                    </p>
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="action-buttons">
                  <motion.button
                    className="btn btn--whatsapp"
                    onClick={handleSendOrder}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 8px 25px rgba(37, 211, 102, 0.3)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiMessageCircle />
                    <span>Abrir WhatsApp</span>
                  </motion.button>

                  <motion.button
                    className="btn btn--copy"
                    onClick={copyToClipboard}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isCopied ? (
                      <>
                        <FiCheck />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <FiCopy />
                        <span>Copiar Pedido</span>
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Security Badge */}
                <motion.div 
                  className="security-badge"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <FiTruck />
                  <span>Entrega em até 30 minutos • Compra 100% segura</span>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="success-message"
                className="success-content"
                variants={successVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="success-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.2,
                    type: 'spring',
                    stiffness: 200
                  }}
                >
                  <FiCheck />
                </motion.div>
                
                <h2 className="success-title">
                  Pedido Enviado!
                </h2>
                
                <p className="success-message">
                  Seu pedido foi enviado para nosso WhatsApp. 
                  Em breve entraremos em contato para confirmar os detalhes da entrega.
                </p>

                <motion.button
                  className="btn btn--primary"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Fechar
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WhatsAppOrder;
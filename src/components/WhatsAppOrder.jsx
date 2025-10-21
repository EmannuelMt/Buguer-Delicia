import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMessageCircle, FiCheck, FiCopy } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { QRCodeSVG } from 'qrcode.react';

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

  const paymentMethods = {
    pix: 'PIX',
    credit: 'Cartão de Crédito',
    debit: 'Cartão de Débito',
    money: 'Dinheiro'
  };

  const generateOrderMessage = () => {
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
    message += `Taxa de Entrega: R$ 5.00%0A`;
    message += `*Total: R$ ${(getTotalPrice() + 5).toFixed(2)}*%0A%0A`;
    
    message += `*💳 FORMA DE PAGAMENTO:*%0A`;
    message += `${paymentMethods[paymentMethod]}%0A%0A`;
    
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
  };

  const copyToClipboard = async () => {
    const message = decodeURIComponent(generateOrderMessage().replace('https://wa.me/5511999999999?text=', ''));
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
      window.open(generateOrderMessage(), '_blank');
      clearCart();
      setTimeout(() => {
        onClose();
      }, 1000);
    }, 1500);
  };

  const getOrderSummary = () => {
    return items.map(item => 
      `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        style={{
          backgroundColor: 'var(--white)',
          borderRadius: '16px',
          padding: '2rem',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            color: 'var(--text-light)',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
        >
          <FiX />
        </button>

        <AnimatePresence mode="wait">
          {!isSent ? (
            <motion.div
              key="order-confirmation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#25D366',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                }}>
                  <FiMessageCircle style={{ fontSize: '2rem', color: 'white' }} />
                </div>
                <h2 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>
                  Enviar Pedido via WhatsApp
                </h2>
                <p style={{ margin: 0, color: 'var(--text-light)' }}>
                  Seu pedido será enviado para nosso WhatsApp
                </p>
              </div>

              {/* Order Summary */}
              <div style={{
                backgroundColor: 'var(--light-color)',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '2rem',
              }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-dark)' }}>
                  Resumo do Pedido
                </h3>
                
                <div style={{ marginBottom: '1rem' }}>
                  {items.map((item, index) => (
                    <div key={item.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0',
                      borderBottom: index < items.length - 1 ? '1px solid var(--light-color)' : 'none',
                    }}>
                      <div>
                        <div style={{ fontWeight: 'bold', color: 'var(--text-dark)' }}>
                          {item.quantity}x {item.name}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
                          R$ {item.price.toFixed(2)} cada
                        </div>
                      </div>
                      <div style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: '2px solid var(--primary-color)',
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
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}>
                    <span style={{ color: 'var(--text-dark)' }}>Taxa de Entrega:</span>
                    <span style={{ fontWeight: 'bold' }}>R$ 5.00</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-color)',
                  }}>
                    <span>Total:</span>
                    <span>R$ {(getTotalPrice() + 5).toFixed(2)}</span>
                  </div>
                </div>

                {observations && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--light-color)' }}>
                    <strong style={{ color: 'var(--text-dark)' }}>Observações:</strong>
                    <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-light)' }}>
                      {observations}
                    </p>
                  </div>
                )}

                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--light-color)' }}>
                  <strong style={{ color: 'var(--text-dark)' }}>Pagamento:</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-light)' }}>
                    {paymentMethods[paymentMethod]}
                  </p>
                </div>
              </div>

              {/* QR Code for PIX */}
              {paymentMethod === 'pix' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{
                    backgroundColor: 'var(--light-color)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    marginBottom: '2rem',
                    textAlign: 'center',
                  }}
                >
                  <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-dark)' }}>
                    Pagamento via PIX
                  </h4>
                  <QRCodeSVG 
                    value={`00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426614174000520400005303986540${(getTotalPrice() + 5).toFixed(2)}5802BR5913BURGERDELICIA6010SAO PAULO62070503***6304`}
                    size={150}
                    style={{ margin: '0 auto 1rem' }}
                  />
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-light)' }}>
                    Escaneie o QR Code para pagar via PIX
                  </p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <motion.button
                  onClick={handleSendOrder}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: '#25D366',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <FiMessageCircle />
                  Abrir WhatsApp
                </motion.button>

                <motion.button
                  onClick={copyToClipboard}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: 'transparent',
                    color: 'var(--text-dark)',
                    border: '2px solid var(--light-color)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {isCopied ? <FiCheck style={{ color: 'var(--success-color)' }} /> : <FiCopy />}
                  {isCopied ? 'Copiado!' : 'Copiar Pedido'}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ textAlign: 'center', padding: '2rem 0' }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'var(--success-color)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
              }}>
                <FiCheck style={{ fontSize: '2.5rem', color: 'white' }} />
              </div>
              
              <h2 style={{ margin: '0 0 1rem 0', color: 'var(--text-dark)' }}>
                Pedido Enviado!
              </h2>
              
              <p style={{ margin: '0 0 2rem 0', color: 'var(--text-light)', lineHeight: '1.6' }}>
                Seu pedido foi enviado para nosso WhatsApp. 
                Em breve entraremos em contato para confirmar os detalhes da entrega.
              </p>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Fechar
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default WhatsAppOrder;
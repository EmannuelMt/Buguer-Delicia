import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiShoppingBag, FiHome, FiClock } from 'react-icons/fi';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, total } = location.state || {};

  useEffect(() => {
    if (!orderNumber) {
      navigate('/');
    }
  }, [orderNumber, navigate]);

  if (!orderNumber) {
    return null;
  }

  const estimatedTime = 30; // minutos

  return (
    <div style={{ 
      padding: '2rem 0', 
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'var(--success-color)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
            }}
          >
            <FiCheckCircle style={{ fontSize: '3rem', color: 'white' }} />
          </motion.div>

          {/* Success Message */}
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            color: 'var(--text-dark)'
          }}>
            Pedido Confirmado!
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem',
            color: 'var(--text-light)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Seu pedido foi recebido e está sendo preparado com carinho.
          </p>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              backgroundColor: 'var(--white)',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: 'var(--shadow)',
              marginBottom: '2rem',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
            }}>
              <FiShoppingBag style={{ color: 'var(--primary-color)' }} />
              <h2 style={{ margin: 0, color: 'var(--text-dark)' }}>
                Detalhes do Pedido
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              textAlign: 'left',
              marginBottom: '1.5rem',
            }}>
              <div>
                <strong style={{ color: 'var(--text-light)' }}>Número do Pedido:</strong>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-dark)', fontSize: '1.1rem' }}>
                  #{orderNumber}
                </p>
              </div>
              
              <div>
                <strong style={{ color: 'var(--text-light)' }}>Valor Total:</strong>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--primary-color)', fontSize: '1.1rem', fontWeight: 'bold' }}>
                  R$ {total?.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>

            {/* Delivery Time */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                padding: '1rem',
                backgroundColor: 'var(--light-color)',
                borderRadius: '8px',
                marginTop: '1rem',
              }}
            >
              <FiClock style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }} />
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold', color: 'var(--text-dark)' }}>
                  Tempo Estimado
                </p>
                <p style={{ margin: 0, color: 'var(--text-light)' }}>
                  Seu pedido chegará em aproximadamente {estimatedTime} minutos
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            style={{
              backgroundColor: 'var(--white)',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: 'var(--shadow)',
              marginBottom: '2rem',
            }}
          >
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>
              O que acontece agora?
            </h3>
            
            <div style={{ textAlign: 'left', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
                <strong>1.</strong> Seu pedido foi enviado para nossa cozinha
              </p>
              <p style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
                <strong>2.</strong> Você receberá atualizações por WhatsApp
              </p>
              <p style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
                <strong>3.</strong> Nosso entregador sairá em breve para a entrega
              </p>
              <p style={{ color: 'var(--text-light)' }}>
                <strong>4.</strong> Acompanhe o status pelo seu perfil
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  backgroundColor: 'var(--light-color)',
                  color: 'var(--text-dark)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
              >
                <FiHome />
                Página Inicial
              </motion.button>
            </Link>

            <Link to="/cardapio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
              >
                <FiShoppingBag />
                Fazer Novo Pedido
              </motion.button>
            </Link>
          </motion.div>

          {/* Support Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            style={{
              marginTop: '2rem',
              padding: '1rem',
              backgroundColor: 'var(--light-color)',
              borderRadius: '8px',
            }}
          >
            <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '0.9rem' }}>
              📞 Precisa de ajuda? Ligue para (11) 9999-9999
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;
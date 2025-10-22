import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiDollarSign, FiSmartphone, FiCheck } from 'react-icons/fi';
import './PaymentMethod.css';

const PaymentMethod = ({ onSelect, selectedMethod, onClose }) => {
  const [activeStep, setActiveStep] = useState('selection');

  const paymentMethods = [
    {
      id: 'pix',
      name: 'PIX',
      icon: <FiSmartphone />,
      description: 'Pagamento instantâneo',
      color: '#32BCAD',
      features: ['Pagamento instantâneo', 'Sem taxas', 'QR Code disponível'],
      instructions: 'Escaneie o QR Code ou use a chave PIX'
    },
    {
      id: 'credit',
      name: 'Cartão de Crédito',
      icon: <FiCreditCard />,
      description: 'Até 12x sem juros',
      color: '#667eea',
      features: ['Até 12x sem juros', 'Pagamento seguro', 'Aprovação rápida'],
      instructions: 'Informe os dados do cartão'
    },
    {
      id: 'debit',
      name: 'Cartão de Débito',
      icon: <FiCreditCard />,
      description: 'Pagamento à vista',
      color: '#764ba2',
      features: ['Pagamento à vista', 'Sem juros', 'Débito em conta'],
      instructions: 'Informe os dados do cartão'
    },
    {
      id: 'money',
      name: 'Dinheiro',
      icon: <FiDollarSign />,
      description: 'Pagamento na entrega',
      color: '#FFD700',
      features: ['Pagamento na entrega', 'Aceitamos troco', 'Sem taxas'],
      instructions: 'Prepare o valor em dinheiro'
    }
  ];

  const handleMethodSelect = (method) => {
    onSelect(method.id);
    setActiveStep('confirmation');
  };

  const handleConfirm = () => {
    onClose();
  };

  const selectedMethodData = paymentMethods.find(method => method.id === selectedMethod);

  return (
    <div className="payment-modal">
      <div className="payment-container">
        {/* Header */}
        <div className="payment-header">
          <h2>Forma de Pagamento</h2>
          <p>Selecione como deseja pagar seu pedido</p>
        </div>

        <AnimatePresence mode="wait">
          {activeStep === 'selection' && (
            <motion.div
              className="payment-selection"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="payment-methods-grid">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    className={`payment-method-card ${selectedMethod === method.id ? 'selected' : ''}`}
                    onClick={() => handleMethodSelect(method)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ '--method-color': method.color }}
                  >
                    <div className="method-icon" style={{ backgroundColor: method.color }}>
                      {method.icon}
                    </div>
                    <div className="method-info">
                      <h3>{method.name}</h3>
                      <p>{method.description}</p>
                    </div>
                    <div className="method-features">
                      {method.features.map((feature, index) => (
                        <span key={index} className="feature-tag">✓ {feature}</span>
                      ))}
                    </div>
                    {selectedMethod === method.id && (
                      <motion.div
                        className="selection-indicator"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <FiCheck />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {activeStep === 'confirmation' && selectedMethodData && (
            <motion.div
              className="payment-confirmation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <motion.div
                className="confirmation-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                style={{ backgroundColor: selectedMethodData.color }}
              >
                {selectedMethodData.icon}
              </motion.div>

              <h3>Pagamento selecionado</h3>
              <p className="selected-method-name">{selectedMethodData.name}</p>
              <p className="method-instruction">{selectedMethodData.instructions}</p>

              <div className="confirmation-features">
                <h4>Vantagens:</h4>
                {selectedMethodData.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="feature-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FiCheck />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>

              <div className="confirmation-actions">
                <motion.button
                  className="btn btn--secondary"
                  onClick={() => setActiveStep('selection')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Alterar Método
                </motion.button>
                <motion.button
                  className="btn btn--primary"
                  onClick={handleConfirm}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ backgroundColor: selectedMethodData.color }}
                >
                  Confirmar Pagamento
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PaymentMethod;
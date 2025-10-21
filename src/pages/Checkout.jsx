import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiCreditCard, FiMapPin, FiUser, FiLock } from 'react-icons/fi';

const Checkout = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Dados de entrega
    name: '',
    email: '',
    phone: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Dados de pagamento
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    installments: '1'
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      // Simulação de processamento do pedido
      console.log('Pedido finalizado:', { items, formData });
      
      // Limpar carrinho e redirecionar para sucesso
      clearCart();
      navigate('/order-success', { 
        state: { 
          orderNumber: Math.random().toString(36).substr(2, 9).toUpperCase(),
          total: getTotalPrice()
        }
      });
    }
  };

  const formatCardNumber = (value) => {
    return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').substring(0, 19);
  };

  const formatExpiry = (value) => {
    return value.replace(/\W/gi, '').replace(/(.{2})/g, '$1/').substring(0, 5);
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
              marginBottom: '2rem'
            }}>
              Adicione alguns itens deliciosos ao seu carrinho!
            </p>
            <motion.button
              onClick={() => navigate('/cardapio')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              style={{
                fontSize: '1.1rem',
                padding: '1rem 2rem',
              }}
            >
              Ver Cardápio
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '2rem',
            color: 'var(--text-dark)',
            textAlign: 'center'
          }}>
            Finalizar Compra
          </h1>

          {/* Progress Steps */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '3rem',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
            }}>
              {/* Step 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: currentStep >= 1 ? 'var(--primary-color)' : 'var(--light-color)',
                  color: currentStep >= 1 ? 'white' : 'var(--text-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}>
                  1
                </div>
                <span style={{
                  color: currentStep >= 1 ? 'var(--primary-color)' : 'var(--text-light)',
                  fontWeight: currentStep >= 1 ? 'bold' : 'normal'
                }}>
                  Entrega
                </span>
              </div>

              <div style={{
                width: '50px',
                height: '2px',
                backgroundColor: currentStep >= 2 ? 'var(--primary-color)' : 'var(--light-color)',
              }} />

              {/* Step 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: currentStep >= 2 ? 'var(--primary-color)' : 'var(--light-color)',
                  color: currentStep >= 2 ? 'white' : 'var(--text-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}>
                  2
                </div>
                <span style={{
                  color: currentStep >= 2 ? 'var(--primary-color)' : 'var(--text-light)',
                  fontWeight: currentStep >= 2 ? 'bold' : 'normal'
                }}>
                  Pagamento
                </span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 400px',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit}>
                {currentStep === 1 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
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
                        <FiUser />
                        Dados Pessoais
                      </h2>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                            Nome completo *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid var(--light-color)',
                              borderRadius: '8px',
                              fontSize: '1rem',
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                            Telefone *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid var(--light-color)',
                              borderRadius: '8px',
                              fontSize: '1rem',
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                          E-mail *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid var(--light-color)',
                            borderRadius: '8px',
                            fontSize: '1rem',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: 'var(--white)',
                      padding: '2rem',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow)',
                    }}>
                      <h2 style={{ 
                        marginBottom: '1.5rem',
                        color: 'var(--text-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <FiMapPin />
                        Endereço de Entrega
                      </h2>

                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                            Rua *
                          </label>
                          <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid var(--light-color)',
                              borderRadius: '8px',
                              fontSize: '1rem',
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                            Número *
                          </label>
                          <input
                            type="text"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            required
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid var(--light-color)',
                              borderRadius: '8px',
                              fontSize: '1rem',
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                          Complemento
                        </label>
                        <input
                          type="text"
                          name="complement"
                          value={formData.complement}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid var(--light-color)',
                            borderRadius: '8px',
                            fontSize: '1rem',
                          }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                            Bairro *
                          </label>
                          <input
                            type="text"
                            name="neighborhood"
                            value={formData.neighborhood}
                            onChange={handleChange}
                            required
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid var(--light-color)',
                              borderRadius: '8px',
                              fontSize: '1rem',
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                            Cidade *
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid var(--light-color)',
                              borderRadius: '8px',
                              fontSize: '1rem',
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                            Estado *
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                            style={{
                              width: '100%',
                              padding: '0.75rem',
                              border: '1px solid var(--light-color)',
                              borderRadius: '8px',
                              fontSize: '1rem',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      backgroundColor: 'var(--white)',
                      padding: '2rem',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow)',
                    }}
                  >
                    <h2 style={{ 
                      marginBottom: '1.5rem',
                      color: 'var(--text-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <FiCreditCard />
                      Pagamento com Cartão
                    </h2>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                        Número do Cartão *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <FiCreditCard style={{
                          position: 'absolute',
                          left: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'var(--text-light)',
                        }} />
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({...formData, cardNumber: formatCardNumber(e.target.value)})}
                          placeholder="0000 0000 0000 0000"
                          required
                          maxLength="19"
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 2.5rem',
                            border: '1px solid var(--light-color)',
                            borderRadius: '8px',
                            fontSize: '1rem',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                        Nome no Cartão *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid var(--light-color)',
                          borderRadius: '8px',
                          fontSize: '1rem',
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                          Validade *
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          value={formData.expiry}
                          onChange={(e) => setFormData({...formData, expiry: formatExpiry(e.target.value)})}
                          placeholder="MM/AA"
                          required
                          maxLength="5"
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid var(--light-color)',
                            borderRadius: '8px',
                            fontSize: '1rem',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                          CVV *
                        </label>
                        <div style={{ position: 'relative' }}>
                          <FiLock style={{
                            position: 'absolute',
                            left: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-light)',
                          }} />
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="000"
                            required
                            maxLength="3"
                            style={{
                              width: '100%',
                              padding: '0.75rem 1rem 0.75rem 2.5rem',
                              border: '1px solid var(--light-color)',
                              borderRadius: '8px',
                              fontSize: '1rem',
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                          Parcelas *
                        </label>
                        <select
                          name="installments"
                          value={formData.installments}
                          onChange={handleChange}
                          required
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid var(--light-color)',
                            borderRadius: '8px',
                            fontSize: '1rem',
                          }}
                        >
                          {[1,2,3,4,5,6].map(num => (
                            <option key={num} value={num}>
                              {num}x de R$ {(getTotalPrice() / num).toFixed(2)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  {currentStep === 2 && (
                    <motion.button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        flex: 1,
                        padding: '1rem',
                        backgroundColor: 'transparent',
                        color: 'var(--text-dark)',
                        border: '2px solid var(--light-color)',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                      }}
                    >
                      Voltar
                    </motion.button>
                  )}
                  
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    {currentStep === 1 ? 'Continuar para Pagamento' : 'Finalizar Pedido'}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                position: 'sticky',
                top: '2rem',
              }}
            >
              <div style={{
                backgroundColor: 'var(--white)',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: 'var(--shadow)',
              }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
                  Resumo do Pedido
                </h3>

                <div style={{ marginBottom: '1.5rem' }}>
                  {items.map(item => (
                    <div key={item.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.5rem 0',
                      borderBottom: '1px solid var(--light-color)',
                    }}>
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span style={{ fontWeight: 'bold' }}>
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
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
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-color)',
                  }}>
                    <span>Total:</span>
                    <span>R$ {getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
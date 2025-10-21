import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit, FiSave, FiX } from 'react-icons/fi';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    address: {
      street: 'Rua das Flores, 123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    }
  });

  const [editData, setEditData] = useState({ ...userData });

  const handleEdit = () => {
    setEditData({ ...userData });
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData({ ...editData });
    setIsEditing(false);
    // Aqui você integraria com a API para salvar os dados
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditData({
        ...editData,
        [parent]: {
          ...editData[parent],
          [child]: value
        }
      });
    } else {
      setEditData({
        ...editData,
        [name]: value
      });
    }
  };

  const orders = [
    {
      id: '12345',
      date: '2024-01-15',
      items: ['Hambúrguer Clássico', 'Coca-Cola 350ml'],
      total: 24.90,
      status: 'Entregue'
    },
    {
      id: '12346',
      date: '2024-01-10',
      items: ['Cheeseburger Especial', 'Brownie com Sorvete'],
      total: 40.80,
      status: 'Entregue'
    }
  ];

  return (
    <div style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h1 style={{ 
              fontSize: '2.5rem',
              color: 'var(--text-dark)',
              margin: 0
            }}>
              Meu Perfil
            </h1>
            
            {!isEditing ? (
              <motion.button
                onClick={handleEdit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                }}
              >
                <FiEdit />
                Editar Perfil
              </motion.button>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <motion.button
                  onClick={handleCancel}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--danger-color)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  }}
                >
                  <FiX />
                  Cancelar
                </motion.button>
                <motion.button
                  onClick={handleSave}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: 'var(--secondary-color)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                  }}
                >
                  <FiSave />
                  Salvar
                </motion.button>
              </div>
            )}
          </div>

          {/* User Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            marginBottom: '3rem'
          }}>
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                backgroundColor: 'var(--white)',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: 'var(--shadow)'
              }}
            >
              <h2 style={{ 
                marginBottom: '1.5rem',
                color: 'var(--text-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FiUser />
                Informações Pessoais
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    color: 'var(--text-light)',
                    fontWeight: 'bold'
                  }}>
                    Nome
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--light-color)',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        backgroundColor: 'var(--white)',
                        color: 'var(--text-dark)',
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, color: 'var(--text-dark)' }}>{userData.name}</p>
                  )}
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    color: 'var(--text-light)',
                    fontWeight: 'bold'
                  }}>
                    E-mail
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--light-color)',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        backgroundColor: 'var(--white)',
                        color: 'var(--text-dark)',
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, color: 'var(--text-dark)' }}>{userData.email}</p>
                  )}
                </div>

                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    color: 'var(--text-light)',
                    fontWeight: 'bold'
                  }}>
                    Telefone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--light-color)',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        backgroundColor: 'var(--white)',
                        color: 'var(--text-dark)',
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, color: 'var(--text-dark)' }}>{userData.phone}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Address Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                backgroundColor: 'var(--white)',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: 'var(--shadow)'
              }}
            >
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

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    color: 'var(--text-light)',
                    fontWeight: 'bold'
                  }}>
                    Endereço
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address.street"
                      value={editData.address.street}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid var(--light-color)',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        backgroundColor: 'var(--white)',
                        color: 'var(--text-dark)',
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, color: 'var(--text-dark)' }}>{userData.address.street}</p>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      color: 'var(--text-light)',
                      fontWeight: 'bold'
                    }}>
                      Cidade
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address.city"
                        value={editData.address.city}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid var(--light-color)',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: 'var(--white)',
                          color: 'var(--text-dark)',
                        }}
                      />
                    ) : (
                      <p style={{ margin: 0, color: 'var(--text-dark)' }}>{userData.address.city}</p>
                    )}
                  </div>

                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      color: 'var(--text-light)',
                      fontWeight: 'bold'
                    }}>
                      Estado
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address.state"
                        value={editData.address.state}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid var(--light-color)',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          backgroundColor: 'var(--white)',
                          color: 'var(--text-dark)',
                        }}
                      />
                    ) : (
                      <p style={{ margin: 0, color: 'var(--text-dark)' }}>{userData.address.state}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order History */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              backgroundColor: 'var(--white)',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: 'var(--shadow)'
            }}
          >
            <h2 style={{ 
              marginBottom: '1.5rem',
              color: 'var(--text-dark)'
            }}>
              Histórico de Pedidos
            </h2>

            {orders.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.5rem',
                      border: '1px solid var(--light-color)',
                      borderRadius: '8px',
                      backgroundColor: 'var(--light-color)',
                    }}
                  >
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>
                        Pedido #{order.id}
                      </h4>
                      <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-light)' }}>
                        {order.items.join(', ')}
                      </p>
                      <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '0.9rem' }}>
                        {new Date(order.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ 
                        margin: '0 0 0.5rem 0', 
                        color: 'var(--primary-color)',
                        fontWeight: 'bold',
                        fontSize: '1.1rem'
                      }}>
                        R$ {order.total.toFixed(2)}
                      </p>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: order.status === 'Entregue' ? 'var(--success-color)' : 'var(--primary-color)',
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                      }}>
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '2rem' }}>
                Nenhum pedido realizado ainda.
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
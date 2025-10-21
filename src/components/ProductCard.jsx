import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      style={{
        backgroundColor: 'var(--white)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)',
        transition: 'var(--transition)',
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
          }}
        />
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--shadow)',
          }}
        >
          <FiPlus />
        </motion.button>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ 
          margin: '0 0 0.5rem 0', 
          color: 'var(--text-dark)',
          fontSize: '1.2rem'
        }}>
          {product.name}
        </h3>
        <p style={{ 
          margin: '0 0 1rem 0', 
          color: 'var(--text-light)',
          fontSize: '0.9rem',
          lineHeight: '1.4'
        }}>
          {product.description}
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            color: 'var(--primary-color)',
            fontSize: '1.3rem',
            fontWeight: 'bold',
          }}>
            R$ {product.price.toFixed(2)}
          </span>
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'var(--secondary-color)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
            }}
          >
            Adicionar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
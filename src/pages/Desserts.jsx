import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiStar } from 'react-icons/fi';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Desserts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredDesserts = useMemo(() => {
    let filtered = products.sobremesas;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(dessert =>
        dessert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dessert.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort desserts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, sortBy]);

  const featuredDesserts = filteredDesserts.filter(dessert => dessert.featured);

  return (
    <div style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            color: 'var(--text-dark)'
          }}>
            Sobremesas
          </h1>
          <p style={{ 
            color: 'var(--text-light)',
            fontSize: '1.1rem'
          }}>
            Finalize sua refeição com uma doce surpresa
          </p>
        </motion.div>

        {/* Featured Desserts */}
        {featuredDesserts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginBottom: '3rem' }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem',
              justifyContent: 'center'
            }}>
              <FiStar style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }} />
              <h2 style={{ 
                margin: 0,
                color: 'var(--text-dark)',
                fontSize: '2rem'
              }}>
                Destaques
              </h2>
              <FiStar style={{ color: 'var(--primary-color)', fontSize: '1.5rem' }} />
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              {featuredDesserts.map((dessert, index) => (
                <motion.div
                  key={dessert.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <ProductCard product={dessert} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <FiSearch style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-light)',
            }} />
            <input
              type="text"
              placeholder="Buscar sobremesas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                border: '1px solid var(--light-color)',
                borderRadius: '8px',
                fontSize: '1rem',
                minWidth: '250px',
                backgroundColor: 'var(--white)',
                color: 'var(--text-dark)',
              }}
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--light-color)',
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: 'var(--white)',
              color: 'var(--text-dark)',
              cursor: 'pointer',
            }}
          >
            <option value="name">Ordenar por Nome</option>
            <option value="price-low">Preço: Menor para Maior</option>
            <option value="price-high">Preço: Maior para Menor</option>
          </select>
        </motion.div>

        {/* All Desserts */}
        <AnimatePresence>
          <motion.div
            key={`${searchTerm}-${sortBy}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {filteredDesserts
              .filter(dessert => !dessert.featured)
              .map((dessert, index) => (
              <motion.div
                key={dessert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={dessert} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredDesserts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: 'var(--text-light)',
            }}
          >
            <h3>Nenhuma sobremesa encontrada</h3>
            <p>Tente ajustar a busca</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Desserts;
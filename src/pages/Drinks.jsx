import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Drinks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredDrinks = useMemo(() => {
    let filtered = products.bebidas;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(drink =>
        drink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drink.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort drinks
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

  const drinkCategories = [
    { type: 'refrigerantes', label: 'Refrigerantes' },
    { type: 'sucos', label: 'Sucos Naturais' },
    { type: 'aguas', label: 'Águas' },
    { type: 'cervejas', label: 'Cervejas' }
  ];

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
            Bebidas
          </h1>
          <p style={{ 
            color: 'var(--text-light)',
            fontSize: '1.1rem'
          }}>
            Refresque-se com nossas bebidas geladas
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '3rem',
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
              placeholder="Buscar bebidas..."
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

        {/* Drink Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
          }}
        >
          {drinkCategories.map((category, index) => (
            <motion.div
              key={category.type}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: '1.5rem',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                borderRadius: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                {category.label}
              </h3>
              <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
                {filteredDrinks.filter(drink => 
                  drink.name.toLowerCase().includes(category.type.slice(0, 3))
                ).length} opções
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Products Grid */}
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
            {filteredDrinks.map((drink, index) => (
              <motion.div
                key={drink.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={drink} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredDrinks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: 'var(--text-light)',
            }}
          >
            <h3>Nenhuma bebida encontrada</h3>
            <p>Tente ajustar a busca</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Drinks;
// components/ImageWithFallback.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackSrc = '/images/placeholder-food.jpg',
  className = '',
  onLoad,
  onError,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleError = (e) => {
    setImageError(true);
    onError?.(e);
  };

  const handleLoad = (e) => {
    setImageLoaded(true);
    onLoad?.(e);
  };

  // Placeholder enquanto carrega
  const ImagePlaceholder = () => (
    <div className={`image-placeholder ${className}`}>
      <div className="placeholder-spinner"></div>
      <div className="placeholder-text">Carregando...</div>
    </div>
  );

  // Fallback quando há erro
  const FallbackImage = () => (
    <div className={`fallback-image ${className}`}>
      <div className="fallback-icon">🍔</div>
      <div className="fallback-text">Imagem não disponível</div>
    </div>
  );

  return (
    <div className="image-with-fallback">
      {!imageLoaded && !imageError && <ImagePlaceholder />}
      
      {(imageLoaded || imageError) && imageError ? (
        <FallbackImage />
      ) : (
        <motion.img
          src={imageError ? fallbackSrc : src}
          alt={alt}
          className={`${className} ${imageLoaded ? 'image-loaded' : 'image-loading'}`}
          onError={handleError}
          onLoad={handleLoad}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: imageLoaded ? 1 : 0, 
            scale: imageLoaded ? 1 : 0.9 
          }}
          transition={{ duration: 0.5 }}
          {...props}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;
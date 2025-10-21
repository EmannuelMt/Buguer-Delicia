// products.js - Sistema Completo de Produtos BurgerDelícia

export const restaurantInfo = {
  name: "BurgerDelícia",
  slogan: "Sabor que Conquista, Qualidade que Encanta!",
  description: "Hamburgueria artesanal premium com ingredientes selecionados",
  address: "Rua dos Sabores, 123 - Centro, São Paulo - SP",
  phone: "(11) 99999-9999",
  whatsapp: "+5511999999999",
  email: "contato@burgerdelicia.com.br",
  hours: {
    weekdays: "11:00 - 23:00",
    weekends: "11:00 - 00:00",
    delivery: "11:00 - 22:30"
  },
  delivery: {
    minOrder: 25.00,
    fee: 5.90,
    freeDeliveryThreshold: 45.00,
    estimatedTime: "30-45min",
    radius: 8 // km
  },
  social: {
    instagram: "@burgerdelicia",
    facebook: "burgerdeliciaoficial",
    ifood: "burgerdelicia"
  },
  paymentMethods: [
    "Cartão de Crédito",
    "Cartão de Débito",
    "PIX",
    "Dinheiro",
    "Ifood",
    "Rappi"
  ]
};

export const categories = {
  lanches: {
    name: "Lanches Artesanais",
    description: "Hambúrgueres premium com blends exclusivos",
    icon: "🍔",
    banner: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop",
    color: "#FF6B35",
    featured: true
  },
  bebidas: {
    name: "Bebidas",
    description: "Refrigerantes, sucos naturais e cervejas especiais",
    icon: "🥤",
    banner: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&h=400&fit=crop",
    color: "#4ECDC4",
    featured: false
  },
  sobremesas: {
    name: "Sobremesas",
    description: "Doces irresistíveis para finalizar com chave de ouro",
    icon: "🍰",
    banner: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=400&fit=crop",
    color: "#FFE66D",
    featured: true
  },
  acompanhamentos: {
    name: "Acompanhamentos",
    description: "Porções para compartilhar momentos especiais",
    icon: "🍟",
    banner: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&h=400&fit=crop",
    color: "#95E1D3",
    featured: false
  },
  combos: {
    name: "Combos Exclusivos",
    description: "Combinações perfeitas com economia garantida",
    icon: "🎯",
    banner: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop",
    color: "#FF8E53",
    featured: true
  },
  vegetarianos: {
    name: "Opções Vegetarianas",
    description: "Sabor e qualidade para todos os paladares",
    icon: "🌱",
    banner: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop",
    color: "#7BC950",
    featured: false
  },
  kids: {
    name: "Menu Kids",
    description: "Divertido e saboroso para os pequenos",
    icon: "👶",
    banner: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=400&fit=crop",
    color: "#FF9A8B",
    featured: false
  }
};

export const productTags = {
  popular: { name: "Popular", color: "#FF6B6B", icon: "🔥" },
  novo: { name: "Novo", color: "#4ECDC4", icon: "🆕" },
  vegano: { name: "Vegano", color: "#7BC950", icon: "🌱" },
  saudavel: { name: "Saudável", color: "#45B7D1", icon: "💪" },
  picante: { name: "Picante", color: "#FF8E53", icon: "🌶️" },
  premium: { name: "Premium", color: "#C44569", icon: "⭐" },
  artesanal: { name: "Artesanal", color: "#778BEB", icon: "👨‍🍳" },
  economico: { name: "Econômico", color: "#F19066", icon: "💰" },
  limitado: { name: "Edição Limitada", color: "#786FA6", icon: "⏳" },
  glutenFree: { name: "Sem Glúten", color: "#63CDDA", icon: "🌾" },
  lactoseFree: { name: "Sem Lactose", color: "#CF6A87", icon: "🥛" }
};

export const spiceLevels = {
  0: { level: "Suave", icon: "🌱", color: "#7BC950" },
  1: { level: "Leve", icon: "🌶️", color: "#FFB142" },
  2: { level: "Médio", icon: "🌶️🌶️", color: "#FF793F" },
  3: { level: "Picante", icon: "🌶️🌶️🌶️", color: "#FF5252" },
  4: { level: "Extremo", icon: "🌶️🌶️🌶️🌶️", color: "#B33939" }
};

// Produtos base com estrutura completa
const baseProducts = {
  lanches: [
    {
      id: 1,
      name: "Classic Burger",
      description: "Nosso carro-chefe! Pão brioche artesanal, blend 180g de carne Angus, queijo cheddar derretido, alface americana, tomate fresco e molho especial da casa",
      detailedDescription: "Um clássico atemporal que conquista pelo sabor autêntico. Nosso blend exclusivo de carne Angus é grelhado no ponto perfeito, garantindo suculência e sabor inigualáveis.",
      price: 24.90,
      originalPrice: 28.90,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=450&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=450&fit=crop",
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&h=450&fit=crop"
      ],
      category: "lanches",
      featured: true,
      tags: ["popular", "artesanal", "premium"],
      ingredients: [
        { name: "Pão Brioche Artesanal", allergen: true },
        { name: "Blend Angus 180g", allergen: false },
        { name: "Queijo Cheddar", allergen: true },
        { name: "Alface Americana", allergen: false },
        { name: "Tomate Fresco", allergen: false },
        { name: "Molho Especial", allergen: true }
      ],
      allergens: ["Glúten", "Lactose"],
      nutrition: {
        calories: 520,
        protein: 32,
        carbs: 45,
        fat: 22,
        sodium: 890
      },
      preparationTime: 12,
      spiceLevel: 0,
      available: true,
      stock: 25,
      maxQuantity: 5
    },
    {
      id: 2,
      name: "Double Cheese Bacon",
      description: "Para os famintos! Dois blends 180g de carne, double cheddar, bacon crocante, cebola caramelizada e molho barbecue artesanal",
      price: 34.90,
      originalPrice: 39.90,
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&h=450&fit=crop",
      category: "lanches",
      featured: true,
      tags: ["popular", "premium"],
      ingredients: [
        { name: "Pão Australiano", allergen: true },
        { name: "2 Blends Angus 180g", allergen: false },
        { name: "Duplo Cheddar", allergen: true },
        { name: "Bacon Crocante", allergen: false },
        { name: "Cebola Caramelizada", allergen: false }
      ],
      allergens: ["Glúten", "Lactose"],
      nutrition: {
        calories: 780,
        protein: 48,
        carbs: 52,
        fat: 38,
        sodium: 1250
      },
      preparationTime: 15,
      spiceLevel: 1,
      available: true,
      stock: 18,
      maxQuantity: 3
    },
    {
      id: 3,
      name: "Veggie Garden",
      description: "Hambúrguer de grão de bico e quinoa, abobrinha grelhada, berinjela, rúcula e molho de iogurte com ervas",
      price: 26.90,
      image: "https://images.unsplash.com/photo-1525059696034-4967a729004e?w=600&h=450&fit=crop",
      category: "lanches",
      featured: false,
      tags: ["vegano", "saudavel"],
      allergens: [],
      nutrition: {
        calories: 320,
        protein: 18,
        carbs: 42,
        fat: 8,
        sodium: 420
      },
      preparationTime: 14,
      spiceLevel: 0,
      available: true,
      stock: 15
    }
  ],

  bebidas: [
    {
      id: 4,
      name: "Coca-Cola 350ml",
      description: "Refrigerante gelado na temperatura perfeita para acompanhar seu lanche",
      price: 6.90,
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop",
      category: "bebidas",
      featured: false,
      tags: ["popular"],
      nutrition: {
        calories: 140,
        protein: 0,
        carbs: 35,
        fat: 0,
        sodium: 15
      },
      preparationTime: 1,
      spiceLevel: 0,
      available: true,
      stock: 50
    },
    {
      id: 5,
      name: "Suco Natural Laranja 500ml",
      description: "Suco fresco de laranja espremido na hora",
      price: 12.50,
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
      category: "bebidas",
      featured: true,
      tags: ["natural", "saudavel"],
      nutrition: {
        calories: 90,
        protein: 1,
        carbs: 20,
        fat: 0,
        sodium: 5
      },
      preparationTime: 3,
      spiceLevel: 0,
      available: true,
      stock: 30
    }
  ],

  sobremesas: [
    {
      id: 6,
      name: "Brownie com Sorvete",
      description: "Brownie quente de chocolate 70% cacau com sorvete de baunilha belga e calda de chocolate",
      price: 18.90,
      originalPrice: 22.90,
      image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=600&h=450&fit=crop",
      category: "sobremesas",
      featured: true,
      tags: ["popular", "premium"],
      nutrition: {
        calories: 420,
        protein: 8,
        carbs: 58,
        fat: 18,
        sodium: 120
      },
      preparationTime: 8,
      spiceLevel: 0,
      available: true,
      stock: 20
    }
  ],

  acompanhamentos: [
    {
      id: 7,
      name: "Batata Frita Crocante",
      description: "Porção generosa de batata frita crocante temperada com sal marinho e ervas finas",
      price: 14.90,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=450&fit=crop",
      category: "acompanhamentos",
      featured: true,
      tags: ["popular"],
      nutrition: {
        calories: 320,
        protein: 4,
        carbs: 45,
        fat: 14,
        sodium: 480
      },
      preparationTime: 10,
      spiceLevel: 0,
      available: true,
      stock: 40
    }
  ],

  combos: [
    {
      id: 8,
      name: "Combo Família BurgerDelícia",
      description: "4 Classic Burgers + 2 Batatas Grandes + 4 Refrigerantes 500ml + 1 Brownie Surpresa",
      price: 119.90,
      originalPrice: 149.90,
      image: "https://images.unsplash.com/photo-1606755962773-d324e7452a1a?w=600&h=450&fit=crop",
      category: "combos",
      featured: true,
      tags: ["popular", "economico"],
      nutrition: {
        calories: 2200,
        protein: 140,
        carbs: 280,
        fat: 90,
        sodium: 3200
      },
      preparationTime: 25,
      spiceLevel: 0,
      available: true,
      stock: 10
    }
  ],

  vegetarianos: [
    {
      id: 9,
      name: "Veggie Supreme",
      description: "Hambúrguer de lentilha, abacate, tomate seco e maionese de castanha",
      price: 28.90,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=450&fit=crop",
      category: "vegetarianos",
      featured: true,
      tags: ["vegano", "saudavel"],
      nutrition: {
        calories: 380,
        protein: 22,
        carbs: 48,
        fat: 12,
        sodium: 380
      },
      preparationTime: 16,
      spiceLevel: 0,
      available: true,
      stock: 12
    }
  ],

  kids: [
    {
      id: 10,
      name: "Hamburguinho Kids",
      description: "Mini hambúrguer com queijo, alface e tomate + batata pequena + suquinho",
      price: 19.90,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=450&fit=crop",
      category: "kids",
      featured: true,
      tags: ["kids"],
      nutrition: {
        calories: 380,
        protein: 16,
        carbs: 48,
        fat: 12,
        sodium: 520
      },
      preparationTime: 10,
      spiceLevel: 0,
      available: true,
      stock: 20
    }
  ]
};

// Função para garantir que todos os produtos tenham estrutura completa
const ensureProductStructure = (products) => {
  return Object.entries(products).reduce((acc, [category, categoryProducts]) => {
    acc[category] = categoryProducts.map(product => ({
      // Valores padrão para garantir que todas as propriedades existam
      nutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        sodium: 0,
        ...product.nutrition
      },
      tags: [],
      allergens: [],
      ingredients: [],
      available: true,
      stock: 10,
      preparationTime: 10,
      spiceLevel: 0,
      maxQuantity: 10,
      // Sobrescreve com os valores do produto
      ...product
    }));
    return acc;
  }, {});
};

export const products = ensureProductStructure(baseProducts);

// Array com todos os produtos
export const allProducts = Object.values(products).flat();

// Produtos em destaque
export const featuredProducts = allProducts.filter(product => product.featured);

// Produtos com desconto
export const discountedProducts = allProducts.filter(product => product.originalPrice);

// Funções utilitárias com verificações de segurança
export const getProductById = (id) => {
  return allProducts.find(product => product.id === id) || null;
};

export const getProductsByCategory = (category) => {
  return products[category] || [];
};

export const getProductsByTag = (tag) => {
  return allProducts.filter(product => 
    product.tags && product.tags.includes(tag)
  );
};

export const searchProducts = (query) => {
  if (!query) return allProducts;
  
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) ||
    (product.ingredients && product.ingredients.some(ing => ing.name.toLowerCase().includes(lowerQuery)))
  );
};

export const filterProducts = (filters = {}) => {
  let filtered = [...allProducts];
  
  if (filters.category && filters.category !== 'todos') {
    filtered = filtered.filter(product => product.category === filters.category);
  }
  
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(product => 
      product.tags && filters.tags.some(tag => product.tags.includes(tag))
    );
  }
  
  if (filters.maxPrice) {
    filtered = filtered.filter(product => product.price <= filters.maxPrice);
  }
  
  if (filters.spiceLevel !== undefined) {
    filtered = filtered.filter(product => product.spiceLevel <= filters.spiceLevel);
  }
  
  if (filters.available !== undefined) {
    filtered = filtered.filter(product => product.available === filters.available);
  }
  
  if (filters.allergens && filters.allergens.length > 0) {
    filtered = filtered.filter(product => 
      !product.allergens || !filters.allergens.some(allergen => product.allergens.includes(allergen))
    );
  }
  
  if (filters.maxCalories) {
    filtered = filtered.filter(product => 
      product.nutrition && product.nutrition.calories <= filters.maxCalories
    );
  }
  
  if (filters.search) {
    filtered = searchProducts(filters.search);
  }
  
  return filtered;
};

export const sortProducts = (products, sortBy = 'name') => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'calories-low':
      return sorted.sort((a, b) => (a.nutrition?.calories || 0) - (b.nutrition?.calories || 0));
    case 'calories-high':
      return sorted.sort((a, b) => (b.nutrition?.calories || 0) - (a.nutrition?.calories || 0));
    case 'preparation-time':
      return sorted.sort((a, b) => (a.preparationTime || 0) - (b.preparationTime || 0));
    case 'rating':
      return sorted.sort((a, b) => (b.reviews?.average || 0) - (a.reviews?.average || 0));
    case 'popularity':
      return sorted.sort((a, b) => (b.reviews?.count || 0) - (a.reviews?.count || 0));
    case 'name':
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
  }
};

export const getRecommendedProducts = (productId, limit = 4) => {
  const product = getProductById(productId);
  if (!product) return [];
  
  return allProducts
    .filter(p => 
      p.id !== productId && 
      p.category === product.category &&
      p.available
    )
    .slice(0, limit);
};

// Função getProductsStats CORRIGIDA
export const getProductsStats = () => {
  const availableProducts = allProducts.filter(p => p.available);
  const featuredProducts = allProducts.filter(p => p.featured);
  const discountedProducts = allProducts.filter(p => p.originalPrice);
  
  // Calcular totais com verificação de segurança
  const totalCalories = allProducts.reduce((sum, p) => {
    const calories = p.nutrition?.calories || 0;
    return sum + calories;
  }, 0);
  
  const totalValue = allProducts.reduce((sum, p) => {
    return sum + (p.price * (p.stock || 0));
  }, 0);
  
  const averagePrice = allProducts.length > 0 
    ? allProducts.reduce((sum, p) => sum + p.price, 0) / allProducts.length 
    : 0;

  const stats = {
    totalProducts: allProducts.length,
    availableProducts: availableProducts.length,
    featuredProducts: featuredProducts.length,
    discountedProducts: discountedProducts.length,
    categories: Object.keys(categories).length,
    averagePrice: Math.round(averagePrice * 100) / 100,
    totalCalories: totalCalories,
    totalStock: allProducts.reduce((sum, p) => sum + (p.stock || 0), 0),
    totalValue: Math.round(totalValue * 100) / 100
  };
  
  return stats;
};

export const getCategoryStats = () => {
  return Object.entries(categories).map(([key, category]) => {
    const categoryProducts = products[key] || [];
    return {
      ...category,
      key,
      productCount: categoryProducts.length,
      totalStock: categoryProducts.reduce((sum, p) => sum + (p.stock || 0), 0),
      averagePrice: categoryProducts.length > 0 
        ? categoryProducts.reduce((sum, p) => sum + p.price, 0) / categoryProducts.length 
        : 0
    };
  });
};

export const getLowStockProducts = (threshold = 10) => {
  return allProducts.filter(p => (p.stock || 0) <= threshold && (p.stock || 0) > 0);
};

export const getOutOfStockProducts = () => {
  return allProducts.filter(p => !p.available || (p.stock || 0) === 0);
};

export const getBestSellers = () => {
  // Mock data - em produção viria do backend
  const bestSellerIds = [1, 2, 6, 7, 8];
  return bestSellerIds.map(id => getProductById(id)).filter(Boolean);
};

export const validateProductOrder = (items) => {
  const errors = [];
  
  items.forEach(item => {
    const product = getProductById(item.productId);
    if (!product) {
      errors.push(`Produto ${item.productId} não encontrado`);
      return;
    }
    
    if (!product.available) {
      errors.push(`${product.name}: Produto indisponível`);
    }
    
    if ((product.stock || 0) < (item.quantity || 1)) {
      errors.push(`${product.name}: Estoque insuficiente`);
    }
    
    if ((item.quantity || 1) > (product.maxQuantity || 10)) {
      errors.push(`${product.name}: Quantidade máxima excedida`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Dados para dashboard administrativo
export const getAdminDashboard = () => {
  return {
    summary: getProductsStats(),
    categories: getCategoryStats(),
    bestSellers: getBestSellers(),
    lowStock: getLowStockProducts(),
    outOfStock: getOutOfStockProducts()
  };
};

export default {
  restaurantInfo,
  categories,
  products,
  allProducts,
  featuredProducts,
  getProductById,
  searchProducts,
  filterProducts,
  sortProducts,
  getProductsStats,
  getAdminDashboard
};
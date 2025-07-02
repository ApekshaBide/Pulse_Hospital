// src/utils/pharmacy.js
// Pharmacy API Service Layer

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Mock API responses for development
const mockApiResponses = {
  pharmacy_categories: [
    {
      id: 1,
      name: "Pain Relief",
      description: "Medications for pain management and relief",
      icon: "https://via.placeholder.com/64x64/FF6B6B/FFFFFF?text=Pain",
      is_featured: true,
      sort_order: 1,
      subcategory_count: 5,
      product_count: 30,
      min_price: "20.00",
      max_price: "550.00",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    },
    {
      id: 2,
      name: "Vitamins & Supplements",
      description: "Essential vitamins and dietary supplements",
      icon: "https://via.placeholder.com/64x64/4CAF50/FFFFFF?text=Vit",
      is_featured: true,
      sort_order: 2,
      subcategory_count: 4,
      product_count: 25,
      min_price: "150.00",
      max_price: "800.00",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    },
    {
      id: 3,
      name: "Cold & Flu",
      description: "Medications for cold and flu symptoms",
      icon: "https://via.placeholder.com/64x64/2196F3/FFFFFF?text=Cold",
      is_featured: false,
      sort_order: 3,
      subcategory_count: 3,
      product_count: 18,
      min_price: "15.00",
      max_price: "200.00",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    },
    {
      id: 4,
      name: "Digestive Health",
      description: "Medications for digestive problems",
      icon: "https://via.placeholder.com/64x64/FF9800/FFFFFF?text=Digest",
      is_featured: false,
      sort_order: 4,
      subcategory_count: 6,
      product_count: 22,
      min_price: "25.00",
      max_price: "300.00",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    },
    {
      id: 5,
      name: "Heart Care",
      description: "Cardiovascular health medications",
      icon: "https://via.placeholder.com/64x64/E91E63/FFFFFF?text=Heart",
      is_featured: true,
      sort_order: 5,
      subcategory_count: 4,
      product_count: 16,
      min_price: "50.00",
      max_price: "1200.00",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    },
    {
      id: 6,
      name: "Skincare",
      description: "Dermatological and skincare products",
      icon: "https://via.placeholder.com/64x64/9C27B0/FFFFFF?text=Skin",
      is_featured: false,
      sort_order: 6,
      subcategory_count: 5,
      product_count: 35,
      min_price: "30.00",
      max_price: "450.00",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    }
  ],

  pharmacy_config: {
    id: 1,
    name: 'HealthCare Plus Pharmacy',
    description: 'Your trusted neighborhood pharmacy providing quality medicines and healthcare services 24/7.',
    address: '123 Main Street, Downtown, City 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@healthcarepharmacy.com',
    operating_hours: '24/7 - Always Open',
    emergency_contact: '+1 (555) 999-HELP',
    license_number: 'PH-2024-001',
    website: 'https://healthcarepharmacy.com',
    special_services: 'Home delivery, Prescription consultation, Health checkups',
    is_active: true,
    last_updated: '2024-06-01',
  },

  pharmacy_products: {
    count: 50,
    next: "http://localhost:8000/api/pharmacy/products/?page=2",
    previous: null,
    results: [
      {
        id: 1,
        name: "Paracetamol 500mg Tablets",
        description: "Effective pain relief and fever reducer",
        brand: "Crocin",
        unit: "10 tablets",
        price: "25.00",
        original_price: "30.00",
        effective_price: "25.00",
        discount_percentage: 17,
        savings_amount: "5.00",
        image_url: "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=Para",
        rating: "4.20",
        review_count: 1250,
        delivery_info: "Get by 10pm, Tomorrow",
        is_bestseller: true,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 100,
        category_name: "Pain Relief",
        subcategory_name: "Headache Relief",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },
      {
        id: 2,
        name: "Ibuprofen 400mg Tablets",
        description: "Anti-inflammatory pain relief for joints",
        brand: "Brufen",
        unit: "15 tablets",
        price: "45.00",
        original_price: "55.00",
        effective_price: "45.00",
        discount_percentage: 18,
        savings_amount: "10.00",
        image_url: "https://via.placeholder.com/150x150/FF4444/FFFFFF?text=Ibu",
        rating: "4.10",
        review_count: 890,
        delivery_info: "Get by 10pm, Tomorrow",
        is_bestseller: false,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 75,
        category_name: "Pain Relief",
        subcategory_name: "Joint Pain",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      }
    ]
  },

  pharmacy_cart: {
    id: 1,
    user: 1,
    items: [
      {
        id: 1,
        product: {
          id: 1,
          name: "Paracetamol 500mg Tablets",
          description: "Effective pain relief and fever reducer",
          brand: "Crocin",
          unit: "10 tablets",
          price: "25.00",
          original_price: "30.00",
          effective_price: "25.00",
          discount_percentage: 17,
          savings_amount: "5.00",
          image_url: "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=Para",
          rating: "4.20",
          review_count: 1250,
          delivery_info: "Get by 10pm, Tomorrow",
          is_bestseller: true,
          is_prescription_required: false,
          is_available: true,
          is_in_stock: true,
          stock_quantity: 100,
          category_name: "Pain Relief",
          subcategory_name: "Headache Relief"
        },
        quantity: 2,
        unit_price: "25.00",
        original_unit_price: "30.00",
        total_price: "50.00",
        total_original_price: "60.00",
        savings_amount: "10.00",
        discount_percentage: 17,
        added_at: "2024-01-15T10:30:00Z"
      }
    ],
    total_items: 2,
    unique_items_count: 1,
    subtotal: "50.00",
    total_savings: "10.00",
    delivery_charge: "0.00",
    total_amount: "50.00",
    prescription_required: false,
    is_active: true,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T11:15:00Z"
  }
};

// Utility function to simulate API delay
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// API Request helper
const apiRequest = async (endpoint, options = {}) => {
  try {
    const url = `${process.env.REACT_APP_API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// Pharmacy API Service
export const pharmacyApi = {
  // Configuration APIs
  config: {
    async get() {
      await simulateDelay(800);
      return mockApiResponses.pharmacy_config;
    },

    async update(data) {
      await simulateDelay(1200);
      return { ...mockApiResponses.pharmacy_config, ...data, last_updated: new Date().toISOString().split('T')[0] };
    },

    async create(data) {
      await simulateDelay(1200);
      return { ...data, id: Date.now(), is_active: true, last_updated: new Date().toISOString().split('T')[0] };
    }
  },

  // Categories APIs
  categories: {
    async getAll(params = {}) {
      await simulateDelay(600);
      let categories = [...mockApiResponses.pharmacy_categories];

      // Apply filters
      if (params.is_featured !== undefined) {
        categories = categories.filter(cat => cat.is_featured === params.is_featured);
      }

      if (params.search) {
        const search = params.search.toLowerCase();
        categories = categories.filter(cat =>
          cat.name.toLowerCase().includes(search) ||
          cat.description.toLowerCase().includes(search)
        );
      }

      // Apply sorting
      if (params.ordering) {
        const field = params.ordering.replace('-', '');
        const desc = params.ordering.startsWith('-');
        categories.sort((a, b) => {
          const aVal = a[field];
          const bVal = b[field];
          return desc ? bVal - aVal : aVal - bVal;
        });
      }

      return categories;
    },

    async getById(id) {
      await simulateDelay(500);
      const category = mockApiResponses.pharmacy_categories.find(cat => cat.id === parseInt(id, 10));
      if (!category) throw new Error('Category not found');

      return {
        ...category,
        subcategories: [
          {
            id: 1,
            name: "Headache Relief",
            description: "Medications for headache and migraine",
            icon: "https://via.placeholder.com/48x48/FF6B6B/FFFFFF?text=Head",
            sort_order: 1,
            product_count: 6,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-15T00:00:00Z"
          },
          {
            id: 2,
            name: "Joint Pain",
            description: "Relief for arthritis and joint problems",
            icon: "https://via.placeholder.com/48x48/FF7043/FFFFFF?text=Joint",
            sort_order: 2,
            product_count: 6,
            created_at: "2024-01-01T00:00:00Z",
            updated_at: "2024-01-15T00:00:00Z"
          }
        ]
      };
    },

    async getFeatured() {
      await simulateDelay(400);
      return mockApiResponses.pharmacy_categories.filter(cat => cat.is_featured);
    }
  },

  // Products APIs
  products: {
    async getAll(params = {}) {
      await simulateDelay(800);
      let products = [...mockApiResponses.pharmacy_products.results];

      // Apply filters
      if (params.category) {
        products = products.filter(product => product.category_name === params.category);
      }

      if (params.subcategory) {
        products = products.filter(product => product.subcategory_name === params.subcategory);
      }

      if (params.brand) {
        products = products.filter(product =>
          product.brand.toLowerCase().includes(params.brand.toLowerCase())
        );
      }

      if (params.is_bestseller !== undefined) {
        products = products.filter(product => product.is_bestseller === params.is_bestseller);
      }

      if (params.min_price) {
        products = products.filter(product => parseFloat(product.price) >= parseFloat(params.min_price));
      }

      if (params.max_price) {
        products = products.filter(product => parseFloat(product.price) <= parseFloat(params.max_price));
      }

      if (params.search) {
        const search = params.search.toLowerCase();
        products = products.filter(product =>
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search) ||
          product.brand.toLowerCase().includes(search)
        );
      }

      // Pagination
      const page = parseInt(params.page, 10) || 1;
      const limit = parseInt(params.limit,10) || 10;
      const start = (page - 1) * limit;
      const end = start + limit;

      return {
        count: products.length,
        next: end < products.length ? `?page=${page + 1}` : null,
        previous: page > 1 ? `?page=${page - 1}` : null,
        results: products.slice(start, end)
      };
    },

    async getById(id) {
      await simulateDelay(500);
      const product = mockApiResponses.pharmacy_products.results.find(p => p.id === parseInt(id, 10));
      if (!product) throw new Error('Product not found');

      return {
        ...product,
        images: [
          "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Para1",
          "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Para2"
        ],
        dosage: "1-2 tablets every 4-6 hours",
        benefits: ["Fast relief", "Fever reducer", "Safe for adults"]
      };
    },

    async getBestsellers() {
      await simulateDelay(600);
      return mockApiResponses.pharmacy_products.results.filter(p => p.is_bestseller);
    },

    async getByCategory(categoryId) {
      await simulateDelay(700);
      // This would filter by actual category ID in real implementation
      return mockApiResponses.pharmacy_products.results;
    },

    async getBySubcategory(subcategoryId) {
      await simulateDelay(700);
      // This would filter by actual subcategory ID in real implementation
      return mockApiResponses.pharmacy_products.results;
    }
  },

  // Cart APIs
  cart: {
    async get() {
      await simulateDelay(500);
      return mockApiResponses.pharmacy_cart;
    },

    async addItem(productId, quantity = 1) {
      await simulateDelay(800);
      const product = mockApiResponses.pharmacy_products.results.find(p => p.id === parseInt(productId, 10));
      if (!product) throw new Error('Product not found');

      const existingCart = mockApiResponses.pharmacy_cart;
      const existingItem = existingCart.items.find(item => item.product.id === parseInt(productId, 10));

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.total_price = (parseFloat(existingItem.unit_price) * existingItem.quantity).toFixed(2);
        existingItem.total_original_price = (parseFloat(existingItem.original_unit_price) * existingItem.quantity).toFixed(2);
        existingItem.savings_amount = (parseFloat(existingItem.total_original_price) - parseFloat(existingItem.total_price)).toFixed(2);
      } else {
        const newItem = {
          id: Date.now(),
          product,
          quantity,
          unit_price: product.price,
          original_unit_price: product.original_price,
          total_price: (parseFloat(product.price) * quantity).toFixed(2),
          total_original_price: (parseFloat(product.original_price) * quantity).toFixed(2),
          savings_amount: ((parseFloat(product.original_price) - parseFloat(product.price)) * quantity).toFixed(2),
          discount_percentage: product.discount_percentage,
          added_at: new Date().toISOString()
        };
        existingCart.items.push(newItem);
      }

      // Recalculate totals
      existingCart.total_items = existingCart.items.reduce((sum, item) => sum + item.quantity, 0);
      existingCart.unique_items_count = existingCart.items.length;
      existingCart.subtotal = existingCart.items.reduce((sum, item) => sum + parseFloat(item.total_price), 0).toFixed(2);
      existingCart.total_savings = existingCart.items.reduce((sum, item) => sum + parseFloat(item.savings_amount), 0).toFixed(2);
      existingCart.total_amount = existingCart.subtotal;

      return existingCart;
    },

    async updateQuantity(productId, quantity) {
      await simulateDelay(600);
      const existingCart = mockApiResponses.pharmacy_cart;
      const item = existingCart.items.find(cartItem => cartItem.product.id === parseInt(productId, 10));

      if (!item) throw new Error('Item not found in cart');

      if (quantity <= 0) {
        return this.removeItem(productId);
      }

      item.quantity = quantity;
      item.total_price = (parseFloat(item.unit_price) * quantity).toFixed(2);
      item.total_original_price = (parseFloat(item.original_unit_price) * quantity).toFixed(2);
      item.savings_amount = (parseFloat(item.total_original_price) - parseFloat(item.total_price)).toFixed(2);

      // Recalculate totals
      existingCart.total_items = existingCart.items.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
     existingCart.subtotal = existingCart.items.reduce((sum, cartItem) => sum + parseFloat(cartItem.total_price), 0).toFixed(2);
      existingCart.total_savings = existingCart.items.reduce((sum, cartItem) => sum + parseFloat(cartItem.savings_amount), 0).toFixed(2);
      existingCart.total_amount = existingCart.subtotal;

      return existingCart;
    },

    async removeItem(productId) {
      await simulateDelay(500);
      const existingCart = mockApiResponses.pharmacy_cart;
      existingCart.items = existingCart.items.filter(item => item.product.id !== parseInt(productId, 10));

      // Recalculate totals
      existingCart.total_items = existingCart.items.reduce((sum, item) => sum + item.quantity, 0);
      existingCart.unique_items_count = existingCart.items.length;
      existingCart.subtotal = existingCart.items.reduce((sum, item) => sum + parseFloat(item.total_price), 0).toFixed(2);
      existingCart.total_savings = existingCart.items.reduce((sum, item) => sum + parseFloat(item.savings_amount), 0).toFixed(2);
      existingCart.total_amount = existingCart.subtotal;

      return existingCart;
    },

    async clear() {
      await simulateDelay(400);
      return {
        ...mockApiResponses.pharmacy_cart,
        items: [],
        total_items: 0,
        unique_items_count: 0,
        subtotal: "0.00",
        total_savings: "0.00",
        total_amount: "0.00"
      };
    },

    async getSummary() {
      await simulateDelay(300);
      const cart = mockApiResponses.pharmacy_cart;
      return {
        total_items: cart.total_items,
        unique_items_count: cart.unique_items_count,
        subtotal: cart.subtotal,
        total_savings: cart.total_savings,
        delivery_charge: cart.delivery_charge,
        total_amount: cart.total_amount,
        prescription_required: cart.prescription_required,
        prescription_items_count: cart.items.filter(item => item.product.is_prescription_required).length,
        free_delivery_eligible: parseFloat(cart.subtotal) >= 500
      };
    }
  }
};

// Export individual API groups for convenience
export const { config: configApi, categories: categoriesApi, products: productsApi, cart: cartApi } = pharmacyApi;

// Export default
export default pharmacyApi;

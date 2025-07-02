// src/api/pharmacy.js
import axios from 'axios';

// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const pharmacyAPI = axios.create({
  baseURL: `${API_BASE_URL}/pharmacy`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
pharmacyAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
pharmacyAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Pharmacy API Error:', error);
    return Promise.reject(error);
  }
);

// Mock data based on your API structure
export const mockPharmacyData = {
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

  pharmacy_category_detail: {
    id: 1,
    name: "Pain Relief",
    description: "Medications for pain management and relief",
    icon: "https://via.placeholder.com/64x64/FF6B6B/FFFFFF?text=Pain",
    is_featured: true,
    sort_order: 1,
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
    ],
    subcategory_count: 5,
    product_count: 30,
    min_price: "20.00",
    max_price: "550.00",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z"
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

  pharmacy_product_detail: {
    id: 1,
    name: "Paracetamol 500mg Tablets",
    description: "Effective pain relief and fever reducer. Safe for adults and suitable for regular use.",
    brand: "Crocin",
    unit: "10 tablets",
    price: "25.00",
    original_price: "30.00",
    effective_price: "25.00",
    discount_percentage: 17,
    savings_amount: "5.00",
    image_url: "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=Para",
    images: [
      "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Para1",
      "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Para2"
    ],
    dosage: "1-2 tablets every 4-6 hours",
    benefits: [
      "Fast relief",
      "Fever reducer",
      "Safe for adults"
    ],
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
    category_id: 1,
    subcategory_id: 1,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z"
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
    total_items: 3,
    unique_items_count: 2,
    subtotal: "95.00",
    total_savings: "20.00",
    delivery_charge: "0.00",
    total_amount: "95.00",
    prescription_required: false,
    is_active: true,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T11:15:00Z"
  },

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
  }
};

// Development mode helper
const isDevelopment = process.env.NODE_ENV === 'development';
const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true' || isDevelopment;

// Simulate network delay for mock responses
const simulateNetworkDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Generic API call wrapper with fallback to mock data
const apiCallWithFallback = async (apiCall, mockData, delay = 1000) => {
  if (USE_MOCK_DATA) {
    await simulateNetworkDelay(delay);
    return mockData;
  }

  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.warn('API call failed, falling back to mock data:', error);
    await simulateNetworkDelay(500);
    return mockData;
  }
};

// ----------------------------------------------------------------------
// PHARMACY CATEGORIES API
// ----------------------------------------------------------------------

export const categoryAPI = {
  // Get all categories
  getCategories: async (params = {}) => {
    const apiCall = () => pharmacyAPI.get('/categories/', { params });
    return apiCallWithFallback(apiCall, mockPharmacyData.pharmacy_categories, 800);
  },

  // Get featured categories
  getFeaturedCategories: async () => {
    const apiCall = () => pharmacyAPI.get('/categories/featured/');
    const mockFeatured = mockPharmacyData.pharmacy_categories.filter(cat => cat.is_featured);
    return apiCallWithFallback(apiCall, mockFeatured, 600);
  },

  // Get category by ID
  getCategoryById: async (id) => {
    const apiCall = () => pharmacyAPI.get(`/categories/${id}/`);
    const mockCategory = mockPharmacyData.pharmacy_categories.find(cat => cat.id === parseInt(id, 10));
    return apiCallWithFallback(apiCall, mockCategory || mockPharmacyData.pharmacy_category_detail, 500);
  },

  // Create new category
  createCategory: async (data) => {
    const apiCall = () => pharmacyAPI.post('/categories/', data);
    const mockResponse = { ...data, id: Date.now(), created_at: new Date().toISOString() };
    return apiCallWithFallback(apiCall, mockResponse, 1200);
  },

  // Update category
  updateCategory: async (id, data) => {
    const apiCall = () => pharmacyAPI.put(`/categories/${id}/`, data);
    const mockResponse = { ...data, id: parseInt(id, 10), updated_at: new Date().toISOString() };
    return apiCallWithFallback(apiCall, mockResponse, 1000);
  },

  // Delete category
  deleteCategory: async (id) => {
    const apiCall = () => pharmacyAPI.delete(`/categories/${id}/`);
    return apiCallWithFallback(apiCall, { success: true }, 800);
  },
};

// ----------------------------------------------------------------------
// PHARMACY SUBCATEGORIES API
// ----------------------------------------------------------------------

export const subcategoryAPI = {
  // Get all subcategories
  getSubcategories: async (params = {}) => {
    const apiCall = () => pharmacyAPI.get('/subcategories/', { params });
    return apiCallWithFallback(apiCall, mockPharmacyData.pharmacy_category_detail.subcategories, 600);
  },

  // Get subcategories by category
  getSubcategoriesByCategory: async (categoryId) => {
    const apiCall = () => pharmacyAPI.get(`/subcategories/category/${categoryId}/`);
    return apiCallWithFallback(apiCall, mockPharmacyData.pharmacy_category_detail.subcategories, 700);
  },

  // Get subcategory by ID
  getSubcategoryById: async (id) => {
    const apiCall = () => pharmacyAPI.get(`/subcategories/${id}/`);
    const mockSubcategory = mockPharmacyData.pharmacy_category_detail.subcategories.find(sub => sub.id === parseInt(id, 10));
    return apiCallWithFallback(apiCall, mockSubcategory, 500);
  },
};

// ----------------------------------------------------------------------
// PHARMACY PRODUCTS API
// ----------------------------------------------------------------------

export const productAPI = {
  // Get all products with filtering
  getProducts: async (params = {}) => {
    const apiCall = () => pharmacyAPI.get('/products/', { params });
    return apiCallWithFallback(apiCall, mockPharmacyData.pharmacy_products, 900);
  },

  // Get product by ID
  getProductById: async (id) => {
    const apiCall = () => pharmacyAPI.get(`/products/${id}/`);
    const mockProduct = mockPharmacyData.pharmacy_products.results.find(prod => prod.id === parseInt(id, 10));
    return apiCallWithFallback(apiCall, mockProduct || mockPharmacyData.pharmacy_product_detail, 600);
  },

  // Get products by category
  getProductsByCategory: async (categoryId, params = {}) => {
    const apiCall = () => pharmacyAPI.get(`/products/category/${categoryId}/`, { params });
    const mockProducts = {
      ...mockPharmacyData.pharmacy_products,
      results: mockPharmacyData.pharmacy_products.results.filter(prod => prod.category_id === parseInt(categoryId,10))
    };
    return apiCallWithFallback(apiCall, mockProducts, 800);
  },

  // Get products by subcategory
  getProductsBySubcategory: async (subcategoryId, params = {}) => {
    const apiCall = () => pharmacyAPI.get(`/products/subcategory/${subcategoryId}/`, { params });
    const mockProducts = {
      ...mockPharmacyData.pharmacy_products,
      results: mockPharmacyData.pharmacy_products.results.filter(prod => prod.subcategory_id === parseInt(subcategoryId,10))
    };
    return apiCallWithFallback(apiCall, mockProducts, 800);
  },

  // Get bestseller products
  getBestsellerProducts: async (params = {}) => {
    const apiCall = () => pharmacyAPI.get('/products/bestsellers/', { params });
    const mockBestsellers = {
      ...mockPharmacyData.pharmacy_products,
      results: mockPharmacyData.pharmacy_products.results.filter(prod => prod.is_bestseller)
    };
    return apiCallWithFallback(apiCall, mockBestsellers, 700);
  },

  // Get products by brand
  getProductsByBrand: async (brandName, params = {}) => {
    const apiCall = () => pharmacyAPI.get(`/products/brand/${brandName}/`, { params });
    const mockProducts = {
      ...mockPharmacyData.pharmacy_products,
      results: mockPharmacyData.pharmacy_products.results.filter(prod =>
        prod.brand.toLowerCase().includes(brandName.toLowerCase())
      )
    };
    return apiCallWithFallback(apiCall, mockProducts, 800);
  },

  // Search products
  searchProducts: async (query, params = {}) => {
    const apiCall = () => pharmacyAPI.get('/products/', {
      params: { search: query, ...params }
    });
    const mockProducts = {
      ...mockPharmacyData.pharmacy_products,
      results: mockPharmacyData.pharmacy_products.results.filter(prod =>
        prod.name.toLowerCase().includes(query.toLowerCase()) ||
        prod.description.toLowerCase().includes(query.toLowerCase()) ||
        prod.brand.toLowerCase().includes(query.toLowerCase())
      )
    };
    return apiCallWithFallback(apiCall, mockProducts, 900);
  },
};

// ----------------------------------------------------------------------
// PHARMACY CART API
// ----------------------------------------------------------------------

export const cartAPI = {
  // Get cart
  getCart: async () => {
    const apiCall = () => pharmacyAPI.get('/cart/');
    return apiCallWithFallback(apiCall, mockPharmacyData.pharmacy_cart, 600);
  },

  // Create cart
  createCart: async (data) => {
    const apiCall = () => pharmacyAPI.post('/cart/', data);
    const mockResponse = { ...mockPharmacyData.pharmacy_cart, ...data, id: Date.now() };
    return apiCallWithFallback(apiCall, mockResponse, 800);
  },

  // Get cart by ID
  getCartById: async (id) => {
    const apiCall = () => pharmacyAPI.get(`/cart/${id}/`);
    return apiCallWithFallback(apiCall, mockPharmacyData.pharmacy_cart, 500);
  },

  // Add item to cart
  addToCart: async (cartId, data) => {
    const apiCall = () => pharmacyAPI.post(`/cart/${cartId}/add_item/`, data);
    const mockResponse = { success: true, message: 'Item added to cart', cart_id: cartId };
    return apiCallWithFallback(apiCall, mockResponse, 700);
  },

  // Remove item from cart
  removeFromCart: async (cartId, productId) => {
    const apiCall = () => pharmacyAPI.delete(`/cart/${cartId}/remove_item/?product_id=${productId}`);
    const mockResponse = { success: true, message: 'Item removed from cart' };
    return apiCallWithFallback(apiCall, mockResponse, 600);
  },

  // Update quantity in cart
  updateCartQuantity: async (cartId, data) => {
    const apiCall = () => pharmacyAPI.patch(`/cart/${cartId}/update_quantity/`, data);
    const mockResponse = { success: true, message: 'Quantity updated' };
    return apiCallWithFallback(apiCall, mockResponse, 700);
  },

  // Clear cart
  clearCart: async (cartId) => {
    const apiCall = () => pharmacyAPI.delete(`/cart/${cartId}/clear/`);
    const mockResponse = { success: true, message: 'Cart cleared' };
    return apiCallWithFallback(apiCall, mockResponse, 800);
  },

  // Get cart summary
  getCartSummary: async (cartId) => {
    const apiCall = () => pharmacyAPI.get(`/cart/${cartId}/summary/`);
    const mockSummary = {
      total_items: 3,
      unique_items_count: 2,
      subtotal: "95.00",
      total_savings: "20.00",
      delivery_charge: "0.00",
      total_amount: "95.00",
      prescription_required: false,
      prescription_items_count: 0,
      free_delivery_eligible: true
    };
    return apiCallWithFallback(apiCall, mockSummary, 500);
  },
};

// ----------------------------------------------------------------------
// PHARMACY CONFIGURATION API
// ----------------------------------------------------------------------

export const pharmacyConfigAPI = {
  // Get pharmacy configuration
  getConfig: async () => {
    const apiCall = () => pharmacyAPI.get('/config/');
    return apiCallWithFallback(apiCall, mockPharmacyData.pharmacy_config, 1000);
  },

  // Create pharmacy configuration
  createConfig: async (data) => {
    const apiCall = () => pharmacyAPI.post('/config/', data);
    const mockResponse = {
      ...data,
      id: Date.now(),
      created_at: new Date().toISOString(),
      is_active: true
    };
    return apiCallWithFallback(apiCall, mockResponse, 1500);
  },

  // Update pharmacy configuration
  updateConfig: async (id, data) => {
    const apiCall = () => pharmacyAPI.put(`/config/${id}/`, data);
    const mockResponse = {
      ...data,
      id: parseInt(id, 10),
      updated_at: new Date().toISOString()
    };
    return apiCallWithFallback(apiCall, mockResponse, 1200);
  },

  // Delete pharmacy configuration
  deleteConfig: async (id) => {
    const apiCall = () => pharmacyAPI.delete(`/config/${id}/`);
    const mockResponse = { success: true, message: 'Configuration deleted' };
    return apiCallWithFallback(apiCall, mockResponse, 800);
  },
};

// ----------------------------------------------------------------------
// UTILITY FUNCTIONS
// ----------------------------------------------------------------------

// Helper function to handle API calls with loading states
export const withLoading = async (apiCall, setLoading) => {
  try {
    if (setLoading) setLoading(true);
    const result = await apiCall();
    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  } finally {
    if (setLoading) setLoading(false);
  }
};

// Helper function for error handling
export const handleAPIError = (error, showToast = true) => {
 let message;

if (error.response?.data?.message) {
  ({ message } = error.response.data);
} else if (error.response?.data?.error) {
  ({ error: message } = error.response.data);
} else if (error.response?.data?.detail) {
  ({ detail: message } = error.response.data);
}
  console.error('Pharmacy API Error:', message);

  if (showToast) {
    try {
      // Import toast dynamically to avoid circular dependencies
      import('../components/snackbar').then(({ toast }) => {
        toast.error(message);
      }).catch(() => {
        console.error('Toast notification failed:', message);
      });
    } catch {
      console.error('Could not show toast:', message);
    }
  }

  return message;
};

// Function to use mock data in development or when API is unavailable
export const getDataWithFallback = async (apiCall, mockData, useMock = USE_MOCK_DATA) => {
  if (useMock) {
    // Simulate network delay
    await simulateNetworkDelay(Math.random() * 1000 + 500);
    return mockData;
  }

  try {
    const response = await apiCall();
    return response.data || response;
  } catch (error) {
    console.warn('API call failed, falling back to mock data:', error.message);
    // Simulate network delay for fallback
    await simulateNetworkDelay(500);
    return mockData;
  }
};

// Filter and sort utilities for mock data
export const filterProducts = (products, filters = {}) => {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter(product => product.category_id === parseInt(filters.category, 10));
  }

  if (filters.subcategory) {
    filtered = filtered.filter(product => product.subcategory_id === parseInt(filters.subcategory,10));
  }

  if (filters.brand) {
    filtered = filtered.filter(product =>
      product.brand.toLowerCase().includes(filters.brand.toLowerCase())
    );
  }

  if (filters.is_bestseller !== undefined) {
    filtered = filtered.filter(product => product.is_bestseller === filters.is_bestseller);
  }

  if (filters.is_prescription_required !== undefined) {
    filtered = filtered.filter(product =>
      product.is_prescription_required === filters.is_prescription_required
    );
  }

  if (filters.min_price) {
    filtered = filtered.filter(product => parseFloat(product.price) >= parseFloat(filters.min_price));
  }

  if (filters.max_price) {
    filtered = filtered.filter(product => parseFloat(product.price) <= parseFloat(filters.max_price));
  }

  if (filters.min_rating) {
    filtered = filtered.filter(product => parseFloat(product.rating) >= parseFloat(filters.min_rating));
  }

  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.toLowerCase().includes(searchTerm)
    );
  }

  // Apply ordering
  if (filters.ordering) {
    const [field, direction] = filters.ordering.startsWith('-')
      ? [filters.ordering.slice(1), 'desc']
      : [filters.ordering, 'asc'];

    filtered.sort((a, b) => {
      let aVal = a[field];
      let bVal = b[field];

      // Handle numeric fields
      if (['price', 'rating'].includes(field)) {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }

      // Handle date fields
      if (['created_at', 'updated_at'].includes(field)) {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      if (direction === 'desc') {
        return bVal > aVal ? 1 : -1;
      }
      return aVal > bVal ? 1 : -1;
    });
  }

  return filtered;
};

// Pagination utility for mock data
export const paginateResults = (results, page = 1, pageSize = 20) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = results.slice(startIndex, endIndex);

  return {
    count: results.length,
    next: endIndex < results.length ? `?page=${page + 1}` : null,
    previous: page > 1 ? `?page=${page - 1}` : null,
    results: paginatedResults,
  };
};

// API endpoints reference (for documentation)
export const API_ENDPOINTS = {
  categories: {
    list: "GET /api/pharmacy/categories/",
    detail: "GET /api/pharmacy/categories/{id}/",
    featured: "GET /api/pharmacy/categories/featured/"
  },
  subcategories: {
    list: "GET /api/pharmacy/subcategories/",
    detail: "GET /api/pharmacy/subcategories/{id}/",
    by_category: "GET /api/pharmacy/subcategories/category/{category_id}/"
  },
  products: {
    list: "GET /api/pharmacy/products/",
    detail: "GET /api/pharmacy/products/{id}/",
    bestsellers: "GET /api/pharmacy/products/bestsellers/",
    by_subcategory: "GET /api/pharmacy/products/subcategory/{subcategory_id}/",
    by_category: "GET /api/pharmacy/products/category/{category_id}/",
    by_brand: "GET /api/pharmacy/products/brand/{brand_name}/"
  },
  cart: {
    list: "GET /api/pharmacy/cart/",
    create: "POST /api/pharmacy/cart/",
    detail: "GET /api/pharmacy/cart/{id}/",
    add_item: "POST /api/pharmacy/cart/{id}/add_item/",
    remove_item: "DELETE /api/pharmacy/cart/{id}/remove_item/?product_id={product_id}",
    update_quantity: "PATCH /api/pharmacy/cart/{id}/update_quantity/",
    clear: "DELETE /api/pharmacy/cart/{id}/clear/",
    summary: "GET /api/pharmacy/cart/{id}/summary/"
  }
};

// Filter parameters reference
export const FILTER_PARAMETERS = {
  products: {
    category: "Filter by category ID",
    subcategory: "Filter by subcategory ID",
    brand: "Filter by brand name",
    is_bestseller: "Filter by bestseller status (true/false)",
    is_prescription_required: "Filter by prescription requirement (true/false)",
    min_price: "Minimum price filter",
    max_price: "Maximum price filter",
    min_rating: "Minimum rating filter",
    search: "Search in name, description, brand",
    ordering: "Sort by: name, price, rating, created_at (add '-' for descending)"
  },
  categories: {
    is_featured: "Filter by featured status (true/false)",
    search: "Search in name, description"
  },
  subcategories: {
    category: "Filter by category ID",
    search: "Search in name, description"
  }
};

export default pharmacyAPI;

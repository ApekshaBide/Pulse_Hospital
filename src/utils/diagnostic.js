// src/utils/diagnostic.js

// import { endpoints } from 'src/utils/axios';

// Mock data for diagnostics configuration
export const mockDiagnosticsConfig = {
  id: '1',
  centerName: 'Advanced Diagnostic Center',
  description: 'State-of-the-art diagnostic facility providing comprehensive medical testing and health screening services.',
  address: '456 Healthcare Avenue, Medical District, City 67890',
  phone: '+1 (555) 234-5678',
  email: 'info@advanceddiagnostics.com',
  operatingHours: 'Mon-Sat: 6AM-10PM, Sun: 8AM-6PM',
  emergencyContact: '+1 (555) 888-HELP',
  licenseNumber: 'DX-2024-002',
  website: 'https://advanceddiagnostics.com',
  specializations: 'Blood tests, Imaging, Cardiac screening, Genetic testing, Cancer screening',
  isActive: true,
  lastUpdated: '2024-06-01',
};

// Mock response for diagnostic categories
const mockCategoriesResponse = {
  categories: [
    {
      id: 1,
      name: "Blood Tests",
      description: "Complete blood analysis and screening including CBC, biochemistry, serology, and specialized blood markers",
      icon: "https://api.hms.com/media/diagnostic_icons/blood-test.png",
      test_count: 45,
      min_price: "150.00",
      max_price: "2500.00",
      is_featured: true,
    },
    {
      id: 2,
      name: "Imaging",
      description: "X-Ray, MRI, CT Scan and Ultrasound",
      icon: "https://api.hms.com/media/diagnostic_icons/imaging.png",
      test_count: 25,
      min_price: "800.00",
      max_price: "8000.00",
      is_featured: true,
    },
    {
      id: 3,
      name: "Cardiac",
      description: "Heart health monitoring and tests",
      icon: "https://api.hms.com/media/diagnostic_icons/cardiac.png",
      test_count: 18,
      min_price: "500.00",
      max_price: "3500.00",
      is_featured: true,
    },
    {
      id: 4,
      name: "Hormonal",
      description: "Hormone levels and endocrine function",
      icon: "https://api.hms.com/media/diagnostic_icons/hormonal.png",
      test_count: 22,
      min_price: "300.00",
      max_price: "2000.00",
      is_featured: false,
    },
    {
      id: 5,
      name: "Genetic",
      description: "DNA analysis and genetic disorders",
      icon: "https://api.hms.com/media/diagnostic_icons/genetic.png",
      test_count: 15,
      min_price: "5000.00",
      max_price: "15000.00",
      is_featured: false,
    },
    {
      id: 6,
      name: "Allergy",
      description: "Allergy testing and immunology",
      icon: "https://api.hms.com/media/diagnostic_icons/allergy.png",
      test_count: 30,
      min_price: "200.00",
      max_price: "1800.00",
      is_featured: false,
    },
    {
      id: 7,
      name: "Cancer Screening",
      description: "Early detection and screening tests",
      icon: "https://api.hms.com/media/diagnostic_icons/cancer.png",
      test_count: 12,
      min_price: "1500.00",
      max_price: "8000.00",
      is_featured: false,
    },
    {
      id: 8,
      name: "Diabetes",
      description: "Blood sugar monitoring and management",
      icon: "https://api.hms.com/media/diagnostic_icons/diabetes.png",
      test_count: 10,
      min_price: "150.00",
      max_price: "800.00",
      is_featured: false,
    },
    {
      id: 9,
      name: "Liver Function",
      description: "Comprehensive liver health assessment",
      icon: "https://api.hms.com/media/diagnostic_icons/liver.png",
      test_count: 8,
      min_price: "250.00",
      max_price: "1200.00",
      is_featured: false,
    },
    {
      id: 10,
      name: "Kidney Function",
      description: "Renal health and function tests",
      icon: "https://api.hms.com/media/diagnostic_icons/kidney.png",
      test_count: 6,
      min_price: "200.00",
      max_price: "1000.00",
      is_featured: false,
    },
    {
      id: 11,
      name: "Lipid Profile",
      description: "Cholesterol and fat metabolism",
      icon: "https://api.hms.com/media/diagnostic_icons/lipid.png",
      test_count: 5,
      min_price: "300.00",
      max_price: "600.00",
      is_featured: false,
    },
    {
      id: 12,
      name: "Vitamin Profile",
      description: "Essential vitamins and minerals",
      icon: "https://api.hms.com/media/diagnostic_icons/vitamin.png",
      test_count: 14,
      min_price: "500.00",
      max_price: "2200.00",
      is_featured: false,
    },
  ],
};

// Mock category details with tests
const mockCategoryDetails = {
  1: { // Blood Tests
    id: 1,
    name: "Blood Tests",
    description: "Complete blood analysis and screening including CBC, biochemistry, serology, and specialized blood markers",
    icon: "https://api.hms.com/media/diagnostic_icons/blood-test.png",
    is_featured: true,
    test_count: 45,
    min_price: "150.00",
    max_price: "2500.00",
    tests: [
      {
        id: 101,
        name: "Complete Blood Count (CBC)",
        code: "CBC001",
        price: "300.00",
        discounted_price: "250.00",
        effective_price: "250.00",
        discount_percentage: 16.67,
        sample_type: "blood",
        duration_hours: 6,
        is_home_collection: true,
        is_popular: true
      },
      {
        id: 102,
        name: "Lipid Profile",
        code: "LIP001",
        price: "400.00",
        discounted_price: null,
        effective_price: "400.00",
        discount_percentage: 0,
        sample_type: "blood",
        duration_hours: 12,
        is_home_collection: true,
        is_popular: true
      },
      {
        id: 103,
        name: "Liver Function Test",
        code: "LFT001",
        price: "450.00",
        discounted_price: "380.00",
        effective_price: "380.00",
        discount_percentage: 15.56,
        sample_type: "blood",
        duration_hours: 8,
        is_home_collection: true,
        is_popular: false
      },
      {
        id: 104,
        name: "Kidney Function Test",
        code: "KFT001",
        price: "350.00",
        discounted_price: "300.00",
        effective_price: "300.00",
        discount_percentage: 14.29,
        sample_type: "blood",
        duration_hours: 6,
        is_home_collection: true,
        is_popular: true
      },
      {
        id: 105,
        name: "Thyroid Profile",
        code: "THY001",
        price: "600.00",
        discounted_price: "500.00",
        effective_price: "500.00",
        discount_percentage: 16.67,
        sample_type: "blood",
        duration_hours: 24,
        is_home_collection: true,
        is_popular: true
      },
      {
        id: 106,
        name: "Diabetes Profile",
        code: "DIA001",
        price: "250.00",
        discounted_price: "200.00",
        effective_price: "200.00",
        discount_percentage: 20.0,
        sample_type: "blood",
        duration_hours: 4,
        is_home_collection: true,
        is_popular: true
      },
      {
        id: 107,
        name: "Vitamin D",
        code: "VTD001",
        price: "800.00",
        discounted_price: "650.00",
        effective_price: "650.00",
        discount_percentage: 18.75,
        sample_type: "blood",
        duration_hours: 12,
        is_home_collection: true,
        is_popular: false
      },
      {
        id: 108,
        name: "Vitamin B12",
        code: "VTB001",
        price: "700.00",
        discounted_price: null,
        effective_price: "700.00",
        discount_percentage: 0,
        sample_type: "blood",
        duration_hours: 12,
        is_home_collection: true,
        is_popular: false
      }
    ]
  },
  2: { // Imaging
    id: 2,
    name: "Imaging",
    description: "X-Ray, MRI, CT Scan and Ultrasound",
    icon: "https://api.hms.com/media/diagnostic_icons/imaging.png",
    is_featured: true,
    test_count: 25,
    min_price: "800.00",
    max_price: "8000.00",
    tests: [
      {
        id: 201,
        name: "Chest X-Ray",
        code: "XRY001",
        price: "800.00",
        discounted_price: null,
        effective_price: "800.00",
        discount_percentage: 0,
        sample_type: "imaging",
        duration_hours: 2,
        is_home_collection: false,
        is_popular: true
      },
      {
        id: 202,
        name: "Abdominal Ultrasound",
        code: "USG001",
        price: "1200.00",
        discounted_price: "1000.00",
        effective_price: "1000.00",
        discount_percentage: 16.67,
        sample_type: "imaging",
        duration_hours: 1,
        is_home_collection: false,
        is_popular: true
      },
      {
        id: 203,
        name: "CT Scan Head",
        code: "CTS001",
        price: "3500.00",
        discounted_price: "3000.00",
        effective_price: "3000.00",
        discount_percentage: 14.29,
        sample_type: "imaging",
        duration_hours: 2,
        is_home_collection: false,
        is_popular: false
      }
    ]
  },
  3: { // Cardiac
    id: 3,
    name: "Cardiac",
    description: "Heart health monitoring and tests",
    icon: "https://api.hms.com/media/diagnostic_icons/cardiac.png",
    is_featured: true,
    test_count: 18,
    min_price: "500.00",
    max_price: "3500.00",
    tests: [
      {
        id: 301,
        name: "ECG (Electrocardiogram)",
        code: "ECG001",
        price: "500.00",
        discounted_price: "450.00",
        effective_price: "450.00",
        discount_percentage: 10.0,
        sample_type: "imaging",
        duration_hours: 1,
        is_home_collection: true,
        is_popular: true
      },
      {
        id: 302,
        name: "Echocardiogram",
        code: "ECHO001",
        price: "2500.00",
        discounted_price: "2200.00",
        effective_price: "2200.00",
        discount_percentage: 12.0,
        sample_type: "imaging",
        duration_hours: 1,
        is_home_collection: false,
        is_popular: true
      },
      {
        id: 303,
        name: "Stress Test",
        code: "STR001",
        price: "3500.00",
        discounted_price: null,
        effective_price: "3500.00",
        discount_percentage: 0,
        sample_type: "imaging",
        duration_hours: 3,
        is_home_collection: false,
        is_popular: false
      }
    ]
  }
};

// Mock test details
const mockTestDetails = {
  101: {
    id: 101,
    category: 1,
    category_name: "Blood Tests",
    name: "Complete Blood Count (CBC)",
    code: "CBC001",
    description: "A complete blood count (CBC) is a blood test used to evaluate your overall health and detect a wide range of disorders, including anemia, infection and leukemia. Measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.",
    price: "300.00",
    discounted_price: "250.00",
    effective_price: "250.00",
    discount_percentage: 16.67,
    sample_type: "blood",
    preparation_required: "no_fasting",
    preparation_instructions: "No special preparation required. You can eat and drink normally before this test.",
    duration_hours: 6,
    is_home_collection: true,
    home_collection_charge: "50.00",
    is_popular: true,
    is_active: true,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-02-20T14:45:00Z"
  },
  102: {
    id: 102,
    category: 1,
    category_name: "Blood Tests",
    name: "Lipid Profile",
    code: "LIP001",
    description: "Lipid profile measures cholesterol levels including total cholesterol, LDL (bad cholesterol), HDL (good cholesterol), and triglycerides to assess cardiovascular risk.",
    price: "400.00",
    discounted_price: null,
    effective_price: "400.00",
    discount_percentage: 0,
    sample_type: "blood",
    preparation_required: "fasting_12_hours",
    preparation_instructions: "Fasting for 12 hours required. Only water is allowed during fasting period.",
    duration_hours: 12,
    is_home_collection: true,
    home_collection_charge: "50.00",
    is_popular: true,
    is_active: true,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-02-20T14:45:00Z"
  }
};

// Mock popular tests
const mockPopularTests = [
  {
    id: 101,
    name: "Complete Blood Count (CBC)",
    code: "CBC001",
    price: "300.00",
    discounted_price: "250.00",
    effective_price: "250.00",
    discount_percentage: 16.67,
    sample_type: "blood",
    duration_hours: 6,
    is_home_collection: true,
    is_popular: true
  },
  {
    id: 102,
    name: "Lipid Profile",
    code: "LIP001",
    price: "400.00",
    discounted_price: null,
    effective_price: "400.00",
    discount_percentage: 0,
    sample_type: "blood",
    duration_hours: 12,
    is_home_collection: true,
    is_popular: true
  },
  {
    id: 201,
    name: "Chest X-Ray",
    code: "XRY001",
    price: "800.00",
    discounted_price: null,
    effective_price: "800.00",
    discount_percentage: 0,
    sample_type: "imaging",
    duration_hours: 2,
    is_home_collection: false,
    is_popular: true
  }
];

// Health packages mock data
export const mockHealthPackages = [
  {
    id: 1,
    name: 'Full Body Checkup',
    description: 'Comprehensive health screening package',
    tests: '50 Tests',
    price: '₹4.5K',
    icon: '👤',
    color: '#2196F3',
    bgColor: '#E3F2FD',
  },
  {
    id: 2,
    name: "Women's Health Package",
    description: "Specialized tests for women's health",
    tests: '25 Tests',
    price: '₹3.2K',
    icon: '👩',
    color: '#4CAF50',
    bgColor: '#E8F5E8',
  },
  {
    id: 3,
    name: "Men's Health Package",
    description: "Specialized tests for men's health",
    tests: '20 Tests',
    price: '₹2.8K',
    icon: '👨',
    color: '#FF9800',
    bgColor: '#FFF3E0',
  },
  {
    id: 4,
    name: 'Senior Citizens Package',
    description: 'Comprehensive care for seniors',
    tests: '30 Tests',
    price: '₹3.8K',
    icon: '👴',
    color: '#9C27B0',
    bgColor: '#F3E5F5',
  },
];

// Mock cart data
const mockCartData = {
  id: 1,
  user: 123,
  items: [],
  total_items: 0,
  subtotal: "0.00",
  home_collection_charge: "0.00",
  total_amount: "0.00",
  is_active: true,
  created_at: "2024-06-29T10:30:00Z",
  updated_at: "2024-06-29T10:30:00Z"
};

// ----------------------------------------------------------------------

// API Functions (currently using mock data)

export const fetchDiagnosticsConfig = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.get(endpoints.diagnostics.details);
    // return response.data;

    return mockDiagnosticsConfig;
  } catch (error) {
    console.error('Error fetching diagnostics config:', error);
    throw error;
  }
};

export const createDiagnosticsConfig = async (data) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.post(endpoints.diagnostics.create, data);
    // return response.data;

    const newConfig = {
      ...data,
      id: Date.now().toString(),
      isActive: true,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    return newConfig;
  } catch (error) {
    console.error('Error creating diagnostics config:', error);
    throw error;
  }
};

export const updateDiagnosticsConfig = async (id, data) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.put(`${endpoints.diagnostics.update}/${id}`, data);
    // return response.data;

    const updatedConfig = {
      ...data,
      id,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    return updatedConfig;
  } catch (error) {
    console.error('Error updating diagnostics config:', error);
    throw error;
  }
};

export const fetchDiagnosticsCategories = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.get(endpoints.diagnostics.categories);
    // return response.data;

    return mockCategoriesResponse;
  } catch (error) {
    console.error('Error fetching diagnostics categories:', error);
    throw error;
  }
};

export const fetchCategoryDetail = async (categoryId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.get(`${endpoints.diagnostics.categories}/${categoryId}/`);
    // return response.data;

    const categoryDetail = mockCategoryDetails[categoryId];
    if (!categoryDetail) {
      throw new Error('Category not found');
    }

    return categoryDetail;
  } catch (error) {
    console.error('Error fetching category detail:', error);
    throw error;
  }
};

export const fetchTestDetail = async (testId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.get(`${endpoints.diagnostics.tests}/${testId}/`);
    // return response.data;

    const testDetail = mockTestDetails[testId];
    if (!testDetail) {
      throw new Error('Test not found');
    }

    return testDetail;
  } catch (error) {
    console.error('Error fetching test detail:', error);
    throw error;
  }
};

export const fetchPopularTests = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.get(endpoints.diagnostics.tests.popular);
    // return response.data;

    return mockPopularTests;
  } catch (error) {
    console.error('Error fetching popular tests:', error);
    throw error;
  }
};

export const fetchTestsByCategory = async (categoryId, params = {}) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.get(`${endpoints.diagnostics.tests}/category/${categoryId}/`, { params });
    // return response.data;

    const categoryDetail = mockCategoryDetails[categoryId];
    if (!categoryDetail) {
      throw new Error('Category not found');
    }

    const { search, min_price, max_price, sample_type, is_popular } = params;
    let { tests } = categoryDetail;

    // Apply filters
    if (search) {
      tests = tests.filter(test =>
        test.name.toLowerCase().includes(search.toLowerCase()) ||
        test.code.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (min_price) {
      tests = tests.filter(test => parseFloat(test.effective_price) >= parseFloat(min_price));
    }

    if (max_price) {
      tests = tests.filter(test => parseFloat(test.effective_price) <= parseFloat(max_price));
    }

    if (sample_type) {
      tests = tests.filter(test => test.sample_type === sample_type);
    }

    if (is_popular !== undefined) {
      tests = tests.filter(test => test.is_popular === is_popular);
    }

    return {
      count: tests.length,
      next: null,
      previous: null,
      results: tests
    };
  } catch (error) {
    console.error('Error fetching tests by category:', error);
    throw error;
  }
};

export const fetchHealthPackages = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.get(endpoints.diagnostics.packages);
    // return response.data;

    return { packages: mockHealthPackages };
  } catch (error) {
    console.error('Error fetching health packages:', error);
    throw error;
  }
};

// Cart API Functions
export const fetchCart = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.get(endpoints.diagnostics.cart);
    // return response.data;

    return {
      count: 1,
      next: null,
      previous: null,
      results: [mockCartData]
    };
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (cartId, testId, quantity = 1) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.post(`${endpoints.diagnostics.cart}/${cartId}/add_item/`, {
    //   test_id: testId,
    //   quantity: quantity
    // });
    // return response.data;

    // Mock implementation - add item to cart
    console.log(`Added test ${testId} to cart ${cartId} with quantity ${quantity}`);
    return mockCartData;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartQuantity = async (cartId, testId, quantity) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.patch(`${endpoints.diagnostics.cart}/${cartId}/update_quantity/`, {
    //   test_id: testId,
    //   quantity: quantity
    // });
    // return response.data;

    console.log(`Updated test ${testId} quantity to ${quantity} in cart ${cartId}`);
    return mockCartData;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    throw error;
  }
};

export const removeFromCart = async (cartId, testId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.delete(`${endpoints.diagnostics.cart}/${cartId}/remove_item/?test_id=${testId}`);
    // return response.data;

    console.log(`Removed test ${testId} from cart ${cartId}`);
    return mockCartData;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

export const clearCart = async (cartId) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    // TODO: Replace with actual API call
    // const response = await axiosInstance.delete(`${endpoints.diagnostics.cart}/${cartId}/clear/`);
    // return response.data;

    console.log(`Cleared cart ${cartId}`);
    return mockCartData;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};

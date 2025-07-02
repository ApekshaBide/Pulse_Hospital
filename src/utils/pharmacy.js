// src/utils/pharmacy.js
// Pharmacy API Service Layer with Realistic Pharmaceutical Products

// Realistic Mock API responses for pharmacy system
const mockApiResponses = {
  pharmacy_categories: [
    {
      id: 1,
      name: "Pain Relief",
      description: "Medications for pain management and fever reduction",
      icon: "https://img.icons8.com/fluency/64/pills.png",
      is_featured: true,
      sort_order: 1,
      subcategory_count: 4,
      product_count: 15,
      min_price: "25.00",
      max_price: "450.00",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    },
    {
      id: 2,
      name: "Cold & Flu",
      description: "Treatment for cold, flu, and respiratory symptoms",
      icon: "https://img.icons8.com/fluency/64/thermometer.png",
      is_featured: true,
      sort_order: 2,
      subcategory_count: 3,
      product_count: 12,
      min_price: "45.00",
      max_price: "280.00",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    },
    {
      id: 3,
      name: "Vitamins & Supplements",
      description: "Essential vitamins and dietary supplements for health",
      icon: "https://img.icons8.com/fluency/64/capsule.png",
      is_featured: true,
      sort_order: 3,
      subcategory_count: 5,
      product_count: 18,
      min_price: "120.00",
      max_price: "850.00",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    },
    {
      id: 4,
      name: "Digestive Health",
      description: "Medications for stomach, acidity, and digestive issues",
      icon: "https://img.icons8.com/fluency/64/stomach.png",
      is_featured: false,
      sort_order: 4,
      subcategory_count: 4,
      product_count: 14,
      min_price: "35.00",
      max_price: "320.00",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    },
    {
      id: 5,
      name: "Heart Care",
      description: "Cardiovascular medications and heart health products",
      icon: "https://img.icons8.com/fluency/64/heart-health.png",
      is_featured: true,
      sort_order: 5,
      subcategory_count: 3,
      product_count: 10,
      min_price: "85.00",
      max_price: "950.00",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    },
    {
      id: 6,
      name: "Skincare & Dermatology",
      description: "Skin care products and dermatological treatments",
      icon: "https://img.icons8.com/fluency/64/natural-skincare.png",
      is_featured: false,
      sort_order: 6,
      subcategory_count: 4,
      product_count: 16,
      min_price: "95.00",
      max_price: "580.00",
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-15T00:00:00Z"
    }
  ],

  pharmacy_products: {
    count: 85,
    next: "http://localhost:8000/api/pharmacy/products/?page=2",
    previous: null,
    results: [
      // PAIN RELIEF PRODUCTS
      {
        id: 1,
        name: "Crocin Advance 500mg Tablets",
        description: "Fast-acting paracetamol tablets for fever and pain relief. Safe for adults and children above 12 years.",
        brand: "GSK",
        unit: "Strip of 15 tablets",
        price: "28.50",
        original_price: "32.00",
        effective_price: "28.50",
        discount_percentage: 11,
        savings_amount: "3.50",
        image_url: "https://images.unsplash.com/photo-1550572017-edd951aa8f96?w=300&h=300&fit=crop",
        rating: "4.3",
        review_count: 2847,
        delivery_info: "Get by 6pm today",
        is_bestseller: true,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 150,
        category_name: "Pain Relief",
        subcategory_name: "Fever & Pain",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },
      {
        id: 2,
        name: "Brufen 400mg Anti-inflammatory Tablets",
        description: "Ibuprofen tablets for inflammation, joint pain, and muscle pain relief.",
        brand: "Abbott",
        unit: "Strip of 10 tablets",
        price: "42.00",
        original_price: "48.00",
        effective_price: "42.00",
        discount_percentage: 13,
        savings_amount: "6.00",
        image_url: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=300&h=300&fit=crop",
        rating: "4.1",
        review_count: 1523,
        delivery_info: "Get by 6pm today",
        is_bestseller: false,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 85,
        category_name: "Pain Relief",
        subcategory_name: "Anti-inflammatory",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },
      {
        id: 3,
        name: "Disprin Regular 325mg Tablets",
        description: "Aspirin tablets for headache, body pain, and fever. Dispersible formulation for quick relief.",
        brand: "Reckitt Benckiser",
        unit: "Strip of 10 tablets",
        price: "25.00",
        original_price: "28.00",
        effective_price: "25.00",
        discount_percentage: 11,
        savings_amount: "3.00",
        image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
        rating: "4.0",
        review_count: 967,
        delivery_info: "Get by 6pm today",
        is_bestseller: false,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 120,
        category_name: "Pain Relief",
        subcategory_name: "Headache Relief",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },
      {
        id: 4,
        name: "Voltaren Emulgel 1% Diclofenac Gel",
        description: "Topical anti-inflammatory gel for muscle pain, joint pain, and sports injuries.",
        brand: "Novartis",
        unit: "30g tube",
        price: "165.00",
        original_price: "185.00",
        effective_price: "165.00",
        discount_percentage: 11,
        savings_amount: "20.00",
        image_url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
        rating: "4.4",
        review_count: 734,
        delivery_info: "Get by 6pm today",
        is_bestseller: true,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 45,
        category_name: "Pain Relief",
        subcategory_name: "Topical Pain Relief",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },
      {
        id: 5,
        name: "Combiflam Tablet (Ibuprofen + Paracetamol)",
        description: "Combination of Ibuprofen and Paracetamol for effective pain and fever relief.",
        brand: "Sanofi",
        unit: "Strip of 20 tablets",
        price: "35.50",
        original_price: "42.00",
        effective_price: "35.50",
        discount_percentage: 15,
        savings_amount: "6.50",
        image_url: "https://images.unsplash.com/photo-1550572017-edd951aa8f96?w=300&h=300&fit=crop",
        rating: "4.2",
        review_count: 1256,
        delivery_info: "Get by 6pm today",
        is_bestseller: true,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 95,
        category_name: "Pain Relief",
        subcategory_name: "Combination Therapy",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },

      // COLD & FLU PRODUCTS
      {
        id: 6,
        name: "Zyrtec Cetirizine 10mg Tablets",
        description: "Antihistamine for allergic rhinitis, urticaria, and seasonal allergies.",
        brand: "Johnson & Johnson",
        unit: "Strip of 10 tablets",
        price: "78.00",
        original_price: "85.00",
        effective_price: "78.00",
        discount_percentage: 8,
        savings_amount: "7.00",
        image_url: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=300&h=300&fit=crop",
        rating: "4.3",
        review_count: 1847,
        delivery_info: "Get by 6pm today",
        is_bestseller: true,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 75,
        category_name: "Cold & Flu",
        subcategory_name: "Antihistamines",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },
      {
        id: 7,
        name: "Benadryl Cough Formula 100ml",
        description: "Effective cough syrup for dry and productive cough with diphenhydramine.",
        brand: "Johnson & Johnson",
        unit: "100ml bottle",
        price: "95.00",
        original_price: "105.00",
        effective_price: "95.00",
        discount_percentage: 10,
        savings_amount: "10.00",
        image_url: "https://images.unsplash.com/photo-1627224012372-dec8f7c43c6b?w=300&h=300&fit=crop",
        rating: "4.1",
        review_count: 923,
        delivery_info: "Get by 6pm today",
        is_bestseller: false,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 60,
        category_name: "Cold & Flu",
        subcategory_name: "Cough Syrup",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },
      {
        id: 8,
        name: "Otrivin Nasal Spray 0.1%",
        description: "Xylometazoline nasal decongestant spray for blocked nose and sinusitis.",
        brand: "Novartis",
        unit: "10ml nasal spray",
        price: "125.00",
        original_price: "135.00",
        effective_price: "125.00",
        discount_percentage: 7,
        savings_amount: "10.00",
        image_url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
        rating: "4.4",
        review_count: 645,
        delivery_info: "Get by 6pm today",
        is_bestseller: true,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 40,
        category_name: "Cold & Flu",
        subcategory_name: "Nasal Decongestants",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },
      {
        id: 9,
        name: "Strepsils Honey & Lemon Lozenges",
        description: "Antibacterial throat lozenges for sore throat relief with honey and lemon flavor.",
        brand: "Reckitt Benckiser",
        unit: "Pack of 8 lozenges",
        price: "45.00",
        original_price: "50.00",
        effective_price: "45.00",
        discount_percentage: 10,
        savings_amount: "5.00",
        image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
        rating: "4.2",
        review_count: 1234,
        delivery_info: "Get by 6pm today",
        is_bestseller: false,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 85,
        category_name: "Cold & Flu",
        subcategory_name: "Throat Care",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },

      // VITAMINS & SUPPLEMENTS
      {
        id: 10,
        name: "Calcirol Vitamin D3 60K Granules",
        description: "High-potency Vitamin D3 supplement for bone health and immunity.",
        brand: "Cadila Pharmaceuticals",
        unit: "4 sachets",
        price: "156.00",
        original_price: "175.00",
        effective_price: "156.00",
        discount_percentage: 11,
        savings_amount: "19.00",
        image_url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
        rating: "4.5",
        review_count: 2156,
        delivery_info: "Get by 6pm today",
        is_bestseller: true,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 95,
        category_name: "Vitamins & Supplements",
        subcategory_name: "Vitamin D",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },
      {
        id: 11,
        name: "Centrum Multivitamin Tablets",
        description: "Complete daily multivitamin with 24 essential vitamins and minerals.",
        brand: "Pfizer",
        unit: "Bottle of 30 tablets",
        price: "485.00",
        original_price: "525.00",
        effective_price: "485.00",
        discount_percentage: 8,
        savings_amount: "40.00",
        image_url: "https://images.unsplash.com/photo-1550572017-edd951aa8f96?w=300&h=300&fit=crop",
        rating: "4.3",
        review_count: 1678,
        delivery_info: "Get by 6pm today",
        is_bestseller: true,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 55,
        category_name: "Vitamins & Supplements",
        subcategory_name: "Multivitamins",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },
      {
        id: 12,
        name: "Celin Vitamin C 500mg Tablets",
        description: "Ascorbic acid tablets for immunity boost and antioxidant protection.",
        brand: "Abbott",
        unit: "Strip of 10 tablets",
        price: "32.50",
        original_price: "38.00",
        effective_price: "32.50",
        discount_percentage: 14,
        savings_amount: "5.50",
        image_url: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=300&h=300&fit=crop",
        rating: "4.2",
        review_count: 945,
        delivery_info: "Get by 6pm today",
        is_bestseller: false,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 120,
        category_name: "Vitamins & Supplements",
        subcategory_name: "Vitamin C",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },

      // DIGESTIVE HEALTH
      {
        id: 13,
        name: "ENO Fruit Salt Regular",
        description: "Instant relief from acidity, gas, and indigestion. Fast-acting antacid.",
        brand: "GSK",
        unit: "100g bottle",
        price: "85.00",
        original_price: "95.00",
        effective_price: "85.00",
        discount_percentage: 11,
        savings_amount: "10.00",
        image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
        rating: "4.4",
        review_count: 2367,
        delivery_info: "Get by 6pm today",
        is_bestseller: true,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 75,
        category_name: "Digestive Health",
        subcategory_name: "Antacids",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },
      {
        id: 14,
        name: "Pantop 40mg Tablets (Pantoprazole)",
        description: "Proton pump inhibitor for GERD, peptic ulcers, and acid-related disorders.",
        brand: "Aristo Pharmaceuticals",
        unit: "Strip of 15 tablets",
        price: "89.50",
        original_price: "98.00",
        effective_price: "89.50",
        discount_percentage: 9,
        savings_amount: "8.50",
        image_url: "https://images.unsplash.com/photo-1550572017-edd951aa8f96?w=300&h=300&fit=crop",
        rating: "4.1",
        review_count: 834,
        delivery_info: "Get by 6pm today",
        is_bestseller: false,
        is_prescription_required: true,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 45,
        category_name: "Digestive Health",
        subcategory_name: "Acid Blockers",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },

      // HEART CARE
      {
        id: 15,
        name: "Ecosprin AV 75mg Capsules",
        description: "Low-dose aspirin with atorvastatin for cardiovascular protection.",
        brand: "USV",
        unit: "Strip of 15 capsules",
        price: "125.00",
        original_price: "142.00",
        effective_price: "125.00",
        discount_percentage: 12,
        savings_amount: "17.00",
        image_url: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=300&h=300&fit=crop",
        rating: "4.3",
        review_count: 1456,
        delivery_info: "Get by 6pm today",
        is_bestseller: true,
        is_prescription_required: true,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 65,
        category_name: "Heart Care",
        subcategory_name: "Cardioprotective",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },

      // SKINCARE & DERMATOLOGY
      {
        id: 16,
        name: "Cetaphil Daily Facial Moisturizer",
        description: "Non-comedogenic daily moisturizer with SPF 15 for sensitive skin.",
        brand: "Galderma",
        unit: "118ml bottle",
        price: "565.00",
        original_price: "625.00",
        effective_price: "565.00",
        discount_percentage: 10,
        savings_amount: "60.00",
        image_url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
        rating: "4.6",
        review_count: 1834,
        delivery_info: "Get by 6pm today",
        is_bestseller: true,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 35,
        category_name: "Skincare & Dermatology",
        subcategory_name: "Moisturizers",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },
      {
        id: 17,
        name: "Candid Powder (Clotrimazole)",
        description: "Antifungal dusting powder for fungal infections of skin and feet.",
        brand: "Glenmark",
        unit: "100g bottle",
        price: "95.00",
        original_price: "108.00",
        effective_price: "95.00",
        discount_percentage: 12,
        savings_amount: "13.00",
        image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop",
        rating: "4.2",
        review_count: 567,
        delivery_info: "Get by 6pm today",
        is_bestseller: false,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 45,
        category_name: "Skincare & Dermatology",
        subcategory_name: "Antifungal",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      },
      {
        id: 18,
        name: "Neutrogena Ultra Sheer Sunblock SPF 50+",
        description: "Broad spectrum sunscreen with Helioplex technology. Water resistant.",
        brand: "Johnson & Johnson",
        unit: "88ml tube",
        price: "485.00",
        original_price: "535.00",
        effective_price: "485.00",
        discount_percentage: 9,
        savings_amount: "50.00",
        image_url: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
        rating: "4.5",
        review_count: 1289,
        delivery_info: "Get by 6pm today",
        is_bestseller: true,
        is_prescription_required: false,
        is_available: true,
        is_in_stock: true,
        stock_quantity: 28,
        category_name: "Skincare & Dermatology",
        subcategory_name: "Sunscreen",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-15T00:00:00Z"
      }
    ]
  },

  pharmacy_config: {
    id: 1,
    name: 'MediCare Plus Pharmacy',
    description: 'Your trusted neighborhood pharmacy providing authentic medicines and healthcare services with 24/7 availability.',
    address: '123 Health Street, Medical District, Mumbai 400001, Maharashtra',
    phone: '+91 98765 43210',
    email: 'info@medicareplus.com',
    operating_hours: '24/7 - Always Available',
    emergency_contact: '+91 98765 43999',
    license_number: 'MH-PHARM-2024-001',
    website: 'https://medicareplus.com',
    special_services: 'Home delivery, Online consultation, Health checkups, Medicine reminders',
    is_active: true,
    last_updated: '2024-06-01',
  },

  pharmacy_cart: {
    id: 1,
    user: 1,
    items: [],
    total_items: 0,
    unique_items_count: 0,
    subtotal: "0.00",
    total_savings: "0.00",
    delivery_charge: "0.00",
    total_amount: "0.00",
    prescription_required: false,
    is_active: true,
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T11:15:00Z"
  }
};

// Utility function to simulate API delay
const simulateDelay = (ms = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Pharmacy API Service
export const pharmacyApi = {
  // Configuration APIs
  config: {
    async get() {
      await simulateDelay(600);
      return mockApiResponses.pharmacy_config;
    },

    async update(data) {
      await simulateDelay(1000);
      return {
        ...mockApiResponses.pharmacy_config,
        ...data,
        last_updated: new Date().toISOString().split('T')[0]
      };
    },

    async create(data) {
      await simulateDelay(1000);
      return {
        ...data,
        id: Date.now(),
        is_active: true,
        last_updated: new Date().toISOString().split('T')[0]
      };
    }
  },

  // Categories APIs
  categories: {
    async getAll(params = {}) {
      await simulateDelay(500);
      let categories = [...mockApiResponses.pharmacy_categories];

      if (params.is_featured !== undefined) {
        categories = categories.filter(cat => cat.is_featured === (params.is_featured === 'true' || params.is_featured === true));
      }

      if (params.search) {
        const search = params.search.toLowerCase();
        categories = categories.filter(cat =>
          cat.name.toLowerCase().includes(search) ||
          cat.description.toLowerCase().includes(search)
        );
      }

      if (params.ordering) {
        const field = params.ordering.replace('-', '');
        const desc = params.ordering.startsWith('-');
        categories.sort((a, b) => {
          const aVal = a[field];
          const bVal = b[field];
          if (typeof aVal === 'string') {
            return desc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
          }
          return desc ? bVal - aVal : aVal - bVal;
        });
      }

      return categories;
    },

    async getById(id) {
      await simulateDelay(400);
      const category = mockApiResponses.pharmacy_categories.find(cat => cat.id === parseInt(id, 10));
      if (!category) throw new Error('Category not found');

      const subcategoriesMap = {
        1: [
          { id: 1, name: "Fever & Pain", product_count: 8 },
          { id: 2, name: "Anti-inflammatory", product_count: 4 },
          { id: 3, name: "Topical Pain Relief", product_count: 2 },
          { id: 4, name: "Combination Therapy", product_count: 1 }
        ],
        2: [
          { id: 5, name: "Antihistamines", product_count: 3 },
          { id: 6, name: "Cough Syrup", product_count: 4 },
          { id: 7, name: "Nasal Decongestants", product_count: 5 }
        ],
        3: [
          { id: 8, name: "Vitamin D", product_count: 6 },
          { id: 9, name: "Multivitamins", product_count: 5 },
          { id: 10, name: "Vitamin C", product_count: 4 },
          { id: 11, name: "Minerals", product_count: 2 },
          { id: 12, name: "Specialty Supplements", product_count: 1 }
        ],
        4: [
          { id: 13, name: "Antacids", product_count: 6 },
          { id: 14, name: "Acid Blockers", product_count: 4 },
          { id: 15, name: "Probiotics", product_count: 2 },
          { id: 16, name: "Digestive Enzymes", product_count: 2 }
        ],
        5: [
          { id: 17, name: "Cardioprotective", product_count: 4 },
          { id: 18, name: "Cholesterol Management", product_count: 3 },
          { id: 19, name: "Blood Pressure", product_count: 3 }
        ],
        6: [
          { id: 20, name: "Moisturizers", product_count: 5 },
          { id: 21, name: "Antifungal", product_count: 4 },
          { id: 22, name: "Sunscreen", product_count: 4 },
          { id: 23, name: "Antiseptic", product_count: 3 }
        ]
      };

      return {
        ...category,
        subcategories: subcategoriesMap[category.id] || []
      };
    },

    async getFeatured() {
      await simulateDelay(300);
      return mockApiResponses.pharmacy_categories.filter(cat => cat.is_featured);
    }
  },

  // Products APIs
  products: {
    async getAll(params = {}) {
      await simulateDelay(600);
      let products = [...mockApiResponses.pharmacy_products.results];

      if (params.category) {
        const categoryId = parseInt(params.category, 10);
        const categoryName = mockApiResponses.pharmacy_categories.find(cat => cat.id === categoryId)?.name;
        if (categoryName) {
          products = products.filter(product => product.category_name === categoryName);
        }
      }

      if (params.brand) {
        products = products.filter(product =>
          product.brand.toLowerCase().includes(params.brand.toLowerCase())
        );
      }

      if (params.is_bestseller !== undefined) {
        const isBestseller = params.is_bestseller === 'true' || params.is_bestseller === true;
        products = products.filter(product => product.is_bestseller === isBestseller);
      }

      if (params.min_price) {
        products = products.filter(product => parseFloat(product.price) >= parseFloat(params.min_price));
      }

      if (params.max_price) {
        products = products.filter(product => parseFloat(product.price) <= parseFloat(params.max_price));
      }

      if (params.min_rating) {
        products = products.filter(product => parseFloat(product.rating) >= parseFloat(params.min_rating));
      }

      if (params.search) {
        const search = params.search.toLowerCase();
        products = products.filter(product =>
          product.name.toLowerCase().includes(search) ||
          product.description.toLowerCase().includes(search) ||
          product.brand.toLowerCase().includes(search) ||
          product.category_name.toLowerCase().includes(search)
        );
      }

      if (params.ordering) {
        const field = params.ordering.replace('-', '');
        const desc = params.ordering.startsWith('-');

        products.sort((a, b) => {
          let aVal = a[field];
          let bVal = b[field];

          if (field === 'price' || field === 'rating') {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
          }

          if (field === 'created_at') {
            aVal = new Date(aVal);
            bVal = new Date(bVal);
          }

          if (typeof aVal === 'string' && typeof bVal === 'string') {
            return desc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
          }

          if (desc) {
            return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
          }
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        });
      }

      const page = parseInt(params.page, 10) || 1;
      const limit = parseInt(params.limit, 10) || 12;
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
      await simulateDelay(400);
      const product = mockApiResponses.pharmacy_products.results.find(p => p.id === parseInt(id, 10));
      if (!product) throw new Error('Product not found');

      return {
        ...product,
        images: [
          product.image_url,
          product.image_url.replace('300x300', '400x400'),
          product.image_url.replace('300x300', '500x500')
        ],
        composition: "As per manufacturer specification",
        dosage: "Take as directed by physician or as per package instructions",
        benefits: [
          "Clinically proven effectiveness",
          "Fast-acting relief",
          "Trusted brand quality",
          "Safe for regular use"
        ],
        side_effects: [
          "Mild stomach upset (rare)",
          "Drowsiness (if applicable)",
          "Consult doctor if symptoms persist"
        ],
        storage_instructions: "Store in a cool, dry place away from sunlight",
        expiry_info: "Check package for expiry date",
        manufacturer_info: `Manufactured by ${product.brand}`,
        warnings: [
          "Keep out of reach of children",
          "Do not exceed recommended dose",
          "Consult doctor if pregnant or breastfeeding"
        ]
      };
    },

    async getBestsellers() {
      await simulateDelay(500);
      return mockApiResponses.pharmacy_products.results.filter(p => p.is_bestseller);
    },

    async getByCategory(categoryId) {
      await simulateDelay(550);
      const categoryName = mockApiResponses.pharmacy_categories.find(cat => cat.id === parseInt(categoryId, 10))?.name;
      if (!categoryName) return [];

      return mockApiResponses.pharmacy_products.results.filter(product =>
        product.category_name === categoryName
      );
    }
  },

  // Cart APIs
  cart: {
    async get() {
      await simulateDelay(400);
      return mockApiResponses.pharmacy_cart;
    },

    async addItem(productId, quantity = 1) {
      await simulateDelay(600);
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

      existingCart.total_items = existingCart.items.reduce((sum, item) => sum + item.quantity, 0);
      existingCart.unique_items_count = existingCart.items.length;
      existingCart.subtotal = existingCart.items.reduce((sum, item) => sum + parseFloat(item.total_price), 0).toFixed(2);
      existingCart.total_savings = existingCart.items.reduce((sum, item) => sum + parseFloat(item.savings_amount), 0).toFixed(2);

      const subtotalAmount = parseFloat(existingCart.subtotal);
      existingCart.delivery_charge = subtotalAmount >= 500 ? "0.00" : "50.00";
      existingCart.total_amount = (subtotalAmount + parseFloat(existingCart.delivery_charge)).toFixed(2);

      existingCart.prescription_required = existingCart.items.some(item => item.product.is_prescription_required);

      return existingCart;
    },

    async updateQuantity(productId, quantity) {
      await simulateDelay(500);
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

      existingCart.total_items = existingCart.items.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
      existingCart.subtotal = existingCart.items.reduce((sum, cartItem) => sum + parseFloat(cartItem.total_price), 0).toFixed(2);
      existingCart.total_savings = existingCart.items.reduce((sum, cartItem) => sum + parseFloat(cartItem.savings_amount), 0).toFixed(2);

      const subtotalAmount = parseFloat(existingCart.subtotal);
      existingCart.delivery_charge = subtotalAmount >= 500 ? "0.00" : "50.00";
      existingCart.total_amount = (subtotalAmount + parseFloat(existingCart.delivery_charge)).toFixed(2);

     existingCart.prescription_required = existingCart.items.some(cartItem => cartItem.product.is_prescription_required);
      return existingCart;
    },

    async removeItem(productId) {
      await simulateDelay(400);
      const existingCart = mockApiResponses.pharmacy_cart;
      existingCart.items = existingCart.items.filter(item => item.product.id !== parseInt(productId, 10));

      existingCart.total_items = existingCart.items.reduce((sum, item) => sum + item.quantity, 0);
      existingCart.unique_items_count = existingCart.items.length;
      existingCart.subtotal = existingCart.items.reduce((sum, item) => sum + parseFloat(item.total_price), 0).toFixed(2);
      existingCart.total_savings = existingCart.items.reduce((sum, item) => sum + parseFloat(item.savings_amount), 0).toFixed(2);

      const subtotalAmount = parseFloat(existingCart.subtotal);
      existingCart.delivery_charge = subtotalAmount >= 500 ? "0.00" : "50.00";
      existingCart.total_amount = (subtotalAmount + parseFloat(existingCart.delivery_charge)).toFixed(2);

      existingCart.prescription_required = existingCart.items.some(item => item.product.is_prescription_required);

      return existingCart;
    },

    async clear() {
      await simulateDelay(350);
      return {
        ...mockApiResponses.pharmacy_cart,
        items: [],
        total_items: 0,
        unique_items_count: 0,
        subtotal: "0.00",
        total_savings: "0.00",
        delivery_charge: "0.00",
        total_amount: "0.00",
        prescription_required: false
      };
    },

    async getSummary() {
      await simulateDelay(250);
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

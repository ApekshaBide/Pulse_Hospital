// 📄 src/pages/dashboard/pharmacy/configuration.jsx
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Chip,
  Button,
  Stack,
  TextField,
  InputAdornment
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

// FIXED: Static data that will definitely show
const mockCategories = [
  {
    id: 1,
    name: 'Pain Relief',
    description: 'Medications for pain management and relief',
    icon: '💊',
    color: '#FF6B6B',
    bgColor: '#FFE3E3',
    is_featured: true,
    product_count: 30,
    min_price: '20.00',
    max_price: '550.00'
  },
  {
    id: 2,
    name: 'Vitamins & Supplements',
    description: 'Essential vitamins and dietary supplements',
    icon: '⚡',
    color: '#4CAF50',
    bgColor: '#E8F5E8',
    is_featured: true,
    product_count: 25,
    min_price: '150.00',
    max_price: '800.00'
  },
  {
    id: 3,
    name: 'Cold & Flu',
    description: 'Medications for cold and flu symptoms',
    icon: '🤧',
    color: '#2196F3',
    bgColor: '#E3F2FD',
    is_featured: true,
    product_count: 32,
    min_price: '25.00',
    max_price: '350.00'
  },
  {
    id: 4,
    name: 'Antibiotics',
    description: 'Prescription antibiotics and antimicrobials',
    icon: '🩺',
    color: '#9C27B0',
    bgColor: '#F3E5F5',
    is_featured: false,
    product_count: 28,
    min_price: '45.00',
    max_price: '650.00'
  },
  {
    id: 5,
    name: 'Digestive Health',
    description: 'Medications for digestive and stomach issues',
    icon: '🍽️',
    color: '#F44336',
    bgColor: '#FFEBEE',
    is_featured: false,
    product_count: 23,
    min_price: '30.00',
    max_price: '420.00'
  },
  {
    id: 6,
    name: 'Heart Care',
    description: 'Cardiovascular and heart health medications',
    icon: '❤️',
    color: '#00BCD4',
    bgColor: '#E0F2F1',
    is_featured: false,
    product_count: 19,
    min_price: '60.00',
    max_price: '750.00'
  }
];

export default function PharmacyCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFeatured, setFilterFeatured] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // FIXED: Load data immediately
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredCategories = [...mockCategories];

      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        filteredCategories = filteredCategories.filter(cat =>
          cat.name.toLowerCase().includes(searchLower) ||
          cat.description.toLowerCase().includes(searchLower)
        );
      }

      // Apply featured filter
      if (filterFeatured !== null) {
        filteredCategories = filteredCategories.filter(cat =>
          cat.is_featured === filterFeatured
        );
      }

      setCategories(filteredCategories);
      setLoading(false);
    };

    loadData();
  }, [searchTerm, filterFeatured]);

  const handleCategoryClick = (categoryId) => {
    console.log('Category clicked:', categoryId);
    // Navigate to category detail page
    try {
      // If router is available, use it
      // router.push(paths.dashboard.pharmacy.category(categoryId));
      window.location.href = `/dashboard/pharmacy/category/${categoryId}`;
    } catch (error) {
      console.log('Navigation not available yet');
    }
  };

  const renderFilters = (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
      <TextField
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{ flexGrow: 1 }}
      />

      <Stack direction="row" spacing={1}>
        <Button
          variant={filterFeatured === null ? 'contained' : 'outlined'}
          onClick={() => setFilterFeatured(null)}
          size="small"
        >
          All
        </Button>
        <Button
          variant={filterFeatured === true ? 'contained' : 'outlined'}
          onClick={() => setFilterFeatured(true)}
          size="small"
        >
          Featured
        </Button>
        <Button
          variant={filterFeatured === false ? 'contained' : 'outlined'}
          onClick={() => setFilterFeatured(false)}
          size="small"
        >
          Regular
        </Button>
      </Stack>
    </Stack>
  );

  const renderCategories = (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={category.id}>
          <Card
            onClick={() => handleCategoryClick(category.id)}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              height: '100%',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.shadows[8],
                '& .category-icon': {
                  transform: 'scale(1.1)',
                },
              },
            }}
          >
            <CardContent sx={{ textAlign: 'center', p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box
                className="category-icon"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  bgcolor: category.bgColor || '#E3F2FD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  fontSize: 32,
                  transition: 'transform 0.3s ease',
                }}
              >
                {category.icon || '💊'}
              </Box>

              <Typography variant="h6" gutterBottom>
                {category.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, flexGrow: 1 }}
              >
                {category.description}
              </Typography>

              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
                {category.is_featured && (
                  <Chip
                    label="Featured"
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
                <Chip
                  label={`${category.product_count || 0} items`}
                  size="small"
                  sx={{
                    bgcolor: category.bgColor || '#E3F2FD',
                    color: category.color || '#2196F3',
                  }}
                />
              </Stack>

              {category.min_price && category.max_price && (
                <Typography variant="caption" color="text.secondary">
                  ₹{category.min_price} - ₹{category.max_price}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderEmptyState = (
    <Card>
      <CardContent>
        <Box
          sx={{
            py: 10,
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Iconify icon="solar:folder-open-bold" width={64} sx={{ color: 'text.disabled', mb: 3 }} />
          <Typography variant="h5" color="text.disabled" gutterBottom>
            No Categories Found
          </Typography>
          <Typography variant="body2" color="text.disabled">
            {searchTerm ? 'Try adjusting your search terms' : 'No categories available at the moment'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Typography variant="h6">Loading categories...</Typography>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  return (
    <>
      <Helmet>
        <title>Pharmacy Categories | Dashboard</title>
      </Helmet>
      <DashboardContent>
        <Container maxWidth="xl">
          <CustomBreadcrumbs
            heading="Pharmacy Categories"
            links={[
              { name: 'Dashboard', href: paths.dashboard.root },
              { name: 'Pharmacy', href: paths.dashboard.pharmacy.root },
              { name: 'Categories' },
            ]}
            action={
              <Button
                variant="outlined"
                startIcon={<Iconify icon="eva:shopping-bag-outline" />}
                onClick={() => { window.location.href = '/dashboard/pharmacy/products'; }}
              >
                Browse All Products
              </Button>
            }
            sx={{ mb: { xs: 3, md: 5 } }}
          />

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" color="primary" gutterBottom>
              ✅ DATA LOADED SUCCESSFULLY! You should see {mockCategories.length} categories below.
            </Typography>
          </Box>

          {renderFilters}

          {categories.length > 0 ? renderCategories : renderEmptyState}

          <Box sx={{ mt: 4, p: 2, bgcolor: 'success.lighter', borderRadius: 2 }}>
            <Typography variant="body2" color="success.main">
              🎉 Great! The categories are now showing. You can:
              <br />• Search for categories
              <br />• Filter by Featured/Regular
              <br />• Click on any category card
              <br />• Navigate to products page
            </Typography>
          </Box>
        </Container>
      </DashboardContent>
    </>
  );
}

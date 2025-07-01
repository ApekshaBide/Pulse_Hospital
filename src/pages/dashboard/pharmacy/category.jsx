// src/pages/dashboard/pharmacy/category.jsx
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRouter } from 'src/routes/hooks';
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
  Paper,
  Divider,
  Fab
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { usePharmacy } from 'src/hooks/use-pharmacy';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

export default function PharmacyCategoryPage() {
  const router = useRouter();
  const { categoryId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [products, setProducts] = useState([]);

  const {
    loading,
    error,
    fetchCategoryDetails,
    getProductsByCategory,
    addToCart
  } = usePharmacy();

  useEffect(() => {
    const loadCategoryData = async () => {
      try {
        // Fetch category details
        const details = await fetchCategoryDetails(categoryId);
        setCategoryDetails(details);

        // Fetch products in this category
        const categoryProducts = await getProductsByCategory(categoryId);
        setProducts(categoryProducts.results || categoryProducts);
      } catch (err) {
        console.error('Error loading category data:', err);
      }
    };

    if (categoryId) {
      loadCategoryData();
    }
  }, [categoryId, fetchCategoryDetails, getProductsByCategory]);

  const handleSubcategoryClick = (subcategoryId) => {
    console.log('Navigate to subcategory:', subcategoryId);
    // You can implement subcategory navigation here
  };

  const handleProductClick = (productId) => {
    router.push(paths.dashboard.pharmacy.product(productId));
  };

  const handleAddToCart = async (productId, event) => {
    event.stopPropagation();
    try {
      await addToCart(productId, 1);
      console.log('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const renderCategoryHeader = categoryDetails && (
    <Paper
      sx={{
        background: `linear-gradient(135deg, ${categoryDetails.color || '#1976d2'} 0%, ${categoryDetails.color || '#42a5f5'} 100%)`,
        color: 'white',
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        mb: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        },
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="flex-start" spacing={3}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
          }}
        >
          {categoryDetails.icon || '💊'}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {categoryDetails.name}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
            {categoryDetails.description}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {categoryDetails.is_featured && (
              <Chip
                label="Featured Category"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
            )}
            <Chip
              label={`${categoryDetails.product_count || 0} Products`}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
            <Chip
              label={`${categoryDetails.subcategory_count || 0} Subcategories`}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
          </Stack>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Iconify icon="eva:shopping-bag-outline" />}
          onClick={() => router.push(paths.dashboard.pharmacy.products)}
          sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
        >
          Browse All
        </Button>
      </Stack>
    </Paper>
  );

  const renderSubcategories = categoryDetails?.subcategories && (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Subcategories
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          {categoryDetails.subcategories.map((subcategory) => (
            <Grid item xs={12} sm={6} md={4} key={subcategory.id}>
              <Card
                onClick={() => handleSubcategoryClick(subcategory.id)}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) => theme.shadows[4],
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1.5,
                      bgcolor: categoryDetails.bgColor || '#E3F2FD',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 1,
                      fontSize: 20,
                    }}
                  >
                    {subcategory.icon || '🏥'}
                  </Box>
                  <Typography variant="subtitle2" gutterBottom>
                    {subcategory.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {subcategory.description}
                  </Typography>
                  <Chip
                    label={`${subcategory.product_count || 0} items`}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  const renderProducts = products.length > 0 && (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Products in {categoryDetails?.name}
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card
                onClick={() => handleProductClick(product.id)}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.shadows[8],
                  },
                }}
              >
                <Box
                  sx={{
                    height: 200,
                    background: `url(${product.image_url}) center/cover`,
                    backgroundColor: '#f5f5f5',
                    position: 'relative',
                  }}
                >
                  {product.is_bestseller && (
                    <Chip
                      label="Bestseller"
                      color="error"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                      }}
                    />
                  )}
                  {product.discount_percentage > 0 && (
                    <Chip
                      label={`${product.discount_percentage}% OFF`}
                      color="success"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                      }}
                    />
                  )}
                  {product.is_prescription_required && (
                    <Chip
                      label="Rx"
                      color="warning"
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                      }}
                    />
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="subtitle1" gutterBottom noWrap>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {product.brand} • {product.unit}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Typography variant="h6" color="primary">
                      ₹{product.price}
                    </Typography>
                    {product.original_price !== product.price && (
                      <Typography
                        variant="body2"
                        color="text.disabled"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        ₹{product.original_price}
                      </Typography>
                    )}
                  </Stack>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                    <Box display="flex" alignItems="center">
                      <Iconify icon="eva:star-fill" sx={{ color: 'warning.main', mr: 0.5 }} />
                      <Typography variant="body2">
                        {product.rating} ({product.review_count})
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="success.main">
                      {product.delivery_info}
                    </Typography>
                  </Stack>
                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    onClick={(e) => handleAddToCart(product.id, e)}
                    disabled={!product.is_available || !product.is_in_stock}
                    startIcon={<Iconify icon="eva:shopping-cart-fill" />}
                    sx={{ mt: 'auto' }}
                  >
                    {!product.is_available ? 'Unavailable' :
                     !product.is_in_stock ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
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
            Category Not Found
          </Typography>
          <Typography variant="body2" color="text.disabled">
            The requested category could not be found.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  const renderFloatingAction = (
    <Fab
      color="primary"
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
      }}
      onClick={() => router.push(paths.dashboard.pharmacy.cart)}
    >
      <Iconify icon="eva:shopping-cart-outline" />
    </Fab>
  );

  if (loading) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Typography>Loading category details...</Typography>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  return (
    <>
      <Helmet>
        <title>{categoryDetails?.name || 'Category'} | Pharmacy</title>
      </Helmet>
      <DashboardContent>
        <Container maxWidth="xl">
          <CustomBreadcrumbs
            heading={categoryDetails?.name || 'Category Details'}
            links={[
              { name: 'Dashboard', href: paths.dashboard.root },
              { name: 'Pharmacy', href: paths.dashboard.pharmacy.root },
              { name: 'Categories', href: paths.dashboard.pharmacy.categories },
              { name: categoryDetails?.name || 'Category' },
            ]}
            sx={{ mb: { xs: 3, md: 5 } }}
          />

          {error && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography color="error">Error: {error}</Typography>
              </CardContent>
            </Card>
          )}

          {categoryDetails ? (
            <>
              {renderCategoryHeader}
              {renderSubcategories}
              {renderProducts}
            </>
          ) : (
            renderEmptyState
          )}

          {renderFloatingAction}
        </Container>
      </DashboardContent>
    </>
  );
}

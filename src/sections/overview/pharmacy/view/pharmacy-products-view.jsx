// src/sections/overview/pharmacy/view/pharmacy-products-view.jsx
import { useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import Fab from '@mui/material/Fab';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePharmacyProducts, usePharmacyCart, useCategoryDetails } from 'src/hooks/use-pharmacy';

// Product Card Component
function ProductCard({ product, onAddToCart, onViewDetails, cartLoading, isInCart, cartQuantity }) {
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await onAddToCart(product.id, 1);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleViewDetails = () => {
    onViewDetails(product);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* Product Image */}
      <Box sx={{ position: 'relative', p: 2 }}>
        <Box
          component="img"
          src={product.image_url}
          alt={product.name}
          sx={{
            width: '100%',
            height: 180,
            objectFit: 'cover',
            borderRadius: 1,
            bgcolor: 'background.neutral',
          }}
        />

        {/* Badges */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            flexWrap: 'wrap',
          }}
        >
          {product.discount_percentage > 0 && (
            <Chip
              label={`${product.discount_percentage}% off`}
              size="small"
              sx={{
                bgcolor: 'error.main',
                color: 'error.contrastText',
                fontSize: '0.7rem',
                height: 24,
              }}
            />
          )}
          {product.is_bestseller && (
            <Chip
              label="Bestseller"
              size="small"
              sx={{
                bgcolor: 'warning.main',
                color: 'warning.contrastText',
                fontSize: '0.7rem',
                height: 24,
              }}
            />
          )}
        </Stack>

        {/* Cart Status */}
        {isInCart && (
          <Chip
            label={`In Cart (${cartQuantity})`}
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: 'success.main',
              color: 'success.contrastText',
              fontSize: '0.7rem',
              height: 24,
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        {/* Brand */}
        <Typography variant="caption" color="primary.main" fontWeight="bold" gutterBottom>
          {product.brand}
        </Typography>

        {/* Product Name */}
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            mb: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 48,
          }}
        >
          {product.name}
        </Typography>

        {/* Unit */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.unit}
        </Typography>

        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Rating value={parseFloat(product.rating)} precision={0.1} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">
            {product.rating} ({product.review_count})
          </Typography>
        </Stack>

        {/* Delivery Info */}
        <Typography variant="caption" color="success.main" gutterBottom>
          {product.delivery_info}
        </Typography>

        {/* Price Section */}
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              ₹{product.price}
            </Typography>
            {product.original_price !== product.price && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                ₹{product.original_price}
              </Typography>
            )}
          </Stack>

          {product.savings_amount > 0 && (
            <Typography variant="caption" color="success.main" gutterBottom>
              Save ₹{product.savings_amount}
            </Typography>
          )}

          {/* Action Buttons */}
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleViewDetails}
              sx={{ flex: 1 }}
            >
              View Details
            </Button>
            <LoadingButton
              variant="contained"
              size="small"
              loading={addingToCart || cartLoading}
              onClick={handleAddToCart}
              startIcon={<Iconify icon="solar:cart-plus-bold" />}
              sx={{ flex: 1 }}
            >
              {isInCart ? 'Add More' : 'Add to Cart'}
            </LoadingButton>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}

// Main Products View Component
export function PharmacyProductsView() {
  const router = useRouter();
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();

  // State management
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filters, setFilters] = useState({
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    min_rating: searchParams.get('min_rating') || '',
    brand: searchParams.get('brand') || '',
    is_bestseller: searchParams.get('is_bestseller') || '',
    ordering: searchParams.get('ordering') || '',
  });

  // Boolean states for UI
  const productDetails = useBoolean();
  const filterSidebar = useBoolean();
  const cartSummary = useBoolean();

  // Hooks
  const { categoryDetails, loading: categoryLoading } = useCategoryDetails(categoryId);
  const {
    products,
    loading: productsLoading,
    updateFilters,
    pagination,
    totalPages
  } = usePharmacyProducts({
    category: categoryId,
    ...filters
  });

  const {
    cart,
    loading: cartLoading,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    isInCart,
    getItemQuantity
  } = usePharmacyCart();

  // Handlers
  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    updateFilters(newFilters);
  }, [updateFilters]);

  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product);
    productDetails.onTrue();
  }, [productDetails]);

  const handleAddToCart = useCallback(async (productId, quantity = 1) => {
    await addToCart(productId, quantity);
  }, [addToCart]);

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <CustomBreadcrumbs
          heading={categoryDetails?.name || 'Products'}
          links={[
            { name: 'Dashboard', href: paths.dashboard?.root || '/dashboard' },
            { name: 'Pharmacy', href: `${paths.dashboard?.root || '/dashboard'}/pharmacy` },
            { name: categoryDetails?.name || 'Products' },
          ]}
          action={
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:filter-bold" />}
                onClick={filterSidebar.onTrue}
              >
                Filters
              </Button>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="solar:cart-bold" />}
                onClick={cartSummary.onTrue}
              >
                Cart ({cart?.itemCount || 0})
              </Button>
            </Stack>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {/* Category Header */}
        {categoryDetails && !categoryLoading && (
          <Paper
            sx={{
              p: 3,
              mb: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 2,
            }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={3}>
              <Box
                component="img"
                src={categoryDetails.icon}
                alt={categoryDetails.name}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  p: 1,
                }}
              />
              <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {categoryDetails.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                  {categoryDetails.description}
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={{ xs: 'center', sm: 'flex-start' }}
                  flexWrap="wrap"
                >
                  <Chip
                    label={`${categoryDetails.product_count} Products`}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'inherit' }}
                  />
                  <Chip
                    label={`₹${categoryDetails.min_price} - ₹${categoryDetails.max_price}`}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'inherit' }}
                  />
                  {categoryDetails.is_featured && (
                    <Chip
                      label="Featured Category"
                      sx={{ bgcolor: 'warning.main', color: 'warning.contrastText' }}
                    />
                  )}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        )}

        {/* Search and Sort Bar */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <TextField
              placeholder="Search products..."
              size="small"
              sx={{ flex: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.ordering}
                label="Sort By"
                onChange={(e) => handleFiltersChange({ ...filters, ordering: e.target.value })}
              >
                <MenuItem value="">Default</MenuItem>
                <MenuItem value="price">Price: Low to High</MenuItem>
                <MenuItem value="-price">Price: High to Low</MenuItem>
                <MenuItem value="-rating">Customer Rating</MenuItem>
                <MenuItem value="-created_at">Newest First</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
              {products.length} products found
            </Typography>
          </Stack>
        </Paper>

        {/* Products Grid */}
        {productsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={40} />
          </Box>
        ) : products.length === 0 ? (
          <Paper sx={{ p: 8, textAlign: 'center' }}>
            <Iconify icon="solar:inbox-bold" width={64} sx={{ color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No products found
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Try adjusting your filters or search terms
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleProductClick}
                  cartLoading={cartLoading}
                  isInCart={isInCart(product.id)}
                  cartQuantity={getItemQuantity(product.id)}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Floating Cart Button */}
        {cart && !cart.isEmpty && (
          <Fab
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 1000,
            }}
            onClick={cartSummary.onTrue}
          >
            <Badge badgeContent={cart.itemCount} color="error">
              <Iconify icon="solar:cart-bold" />
            </Badge>
          </Fab>
        )}
      </Container>
    </DashboardContent>
  );
}

// Default export for easier importing
export default PharmacyProductsView;

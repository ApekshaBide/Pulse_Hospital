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

// Product Details Dialog
function ProductDetailsDialog({ product, open, onClose, onAddToCart, cartLoading, isInCart, cartQuantity }) {
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await onAddToCart(product.id, quantity);
      toast.success(`${product.name} added to cart!`);
      onClose();
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{product.name}</Typography>
          <IconButton onClick={onClose}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.image_url}
              alt={product.name}
              sx={{
                width: '100%',
                height: 300,
                objectFit: 'cover',
                borderRadius: 2,
                bgcolor: 'background.neutral',
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="overline" color="primary.main" fontWeight="bold">
                  {product.brand}
                </Typography>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {product.description}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Unit: {product.unit}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                  <Rating value={parseFloat(product.rating)} precision={0.1} size="small" readOnly />
                  <Typography variant="body2" color="text.secondary">
                    {product.rating} ({product.review_count} reviews)
                  </Typography>
                </Stack>
              </Box>

              <Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h4" color="primary.main" fontWeight="bold">
                    ₹{product.price}
                  </Typography>
                  {product.original_price !== product.price && (
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through' }}
                    >
                      ₹{product.original_price}
                    </Typography>
                  )}
                  {product.discount_percentage > 0 && (
                    <Chip
                      label={`${product.discount_percentage}% OFF`}
                      color="error"
                      size="small"
                    />
                  )}
                </Stack>
                {product.savings_amount > 0 && (
                  <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                    You save ₹{product.savings_amount}
                  </Typography>
                )}
              </Box>

              <Box>
                <Typography variant="body2" color="success.main" gutterBottom>
                  📦 {product.delivery_info}
                </Typography>
                <Typography variant="body2" color="success.main">
                  ✅ In Stock ({product.stock_quantity} available)
                </Typography>
              </Box>

              {isInCart && (
                <Box>
                  <Typography variant="body2" color="info.main">
                    Currently in cart: {cartQuantity} items
                  </Typography>
                </Box>
              )}

              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Quantity:
                </Typography>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                    {quantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
        <LoadingButton
          variant="contained"
          loading={addingToCart || cartLoading}
          onClick={handleAddToCart}
          startIcon={<Iconify icon="solar:cart-plus-bold" />}
        >
          Add {quantity} to Cart
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

// Filter Sidebar
function FilterSidebar({ open, onClose, filters, onFiltersChange, category }) {
  const [tempFilters, setTempFilters] = useState(filters);

  const handleApplyFilters = () => {
    onFiltersChange(tempFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      min_price: '',
      max_price: '',
      min_rating: '',
      brand: '',
      is_bestseller: '',
      ordering: '',
    };
    setTempFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 320, p: 3 },
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={onClose}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Stack>
      </Box>

      <Stack spacing={3}>
        {/* Category Info */}
        {category && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Category
            </Typography>
            <Chip label={category.name} color="primary" />
          </Box>
        )}

        {/* Price Range */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Price Range
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <TextField
              label="Min Price"
              type="number"
              size="small"
              value={tempFilters.min_price}
              onChange={(e) => setTempFilters({ ...tempFilters, min_price: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
            <TextField
              label="Max Price"
              type="number"
              size="small"
              value={tempFilters.max_price}
              onChange={(e) => setTempFilters({ ...tempFilters, max_price: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Stack>
        </Box>

        {/* Rating */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Minimum Rating
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={tempFilters.min_rating}
              onChange={(e) => setTempFilters({ ...tempFilters, min_rating: e.target.value })}
            >
              <MenuItem value="">Any Rating</MenuItem>
              <MenuItem value="4">4+ Stars</MenuItem>
              <MenuItem value="3.5">3.5+ Stars</MenuItem>
              <MenuItem value="3">3+ Stars</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Brand */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Brand
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Search brands..."
            value={tempFilters.brand}
            onChange={(e) => setTempFilters({ ...tempFilters, brand: e.target.value })}
          />
        </Box>

        {/* Bestseller */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Product Type
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={tempFilters.is_bestseller}
              onChange={(e) => setTempFilters({ ...tempFilters, is_bestseller: e.target.value })}
            >
              <MenuItem value="">All Products</MenuItem>
              <MenuItem value="true">Bestsellers Only</MenuItem>
              <MenuItem value="false">Regular Products</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Sort By */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Sort By
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={tempFilters.ordering}
              onChange={(e) => setTempFilters({ ...tempFilters, ordering: e.target.value })}
            >
              <MenuItem value="">Default</MenuItem>
              <MenuItem value="price">Price: Low to High</MenuItem>
              <MenuItem value="-price">Price: High to Low</MenuItem>
              <MenuItem value="-rating">Customer Rating</MenuItem>
              <MenuItem value="-created_at">Newest First</MenuItem>
              <MenuItem value="name">Name: A to Z</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Action Buttons */}
        <Stack spacing={2}>
          <Button variant="contained" onClick={handleApplyFilters} fullWidth>
            Apply Filters
          </Button>
          <Button variant="outlined" onClick={handleResetFilters} fullWidth>
            Reset Filters
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
}

// Cart Summary Drawer
function CartSummaryDrawer({ open, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout, loading }) {
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    router.push(`${paths.dashboard.root}/pharmacy/checkout`);
  };

  const handleViewCart = () => {
    onClose();
    router.push(`${paths.dashboard.root}/pharmacy/cart`);
  };

  if (!cart) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h6">Cart Summary</Typography>
          <IconButton onClick={onClose}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Stack>

        {cart.isEmpty ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Iconify icon="solar:cart-large-minimalistic-bold" width={64} sx={{ color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.disabled">
              Add some products to get started
            </Typography>
          </Box>
        ) : (
          <>
            {/* Cart Items */}
            <Stack spacing={2} sx={{ mb: 3, maxHeight: 400, overflow: 'auto' }}>
              {cart.items.map((item) => (
                <Card key={item.id} variant="outlined">
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" spacing={2}>
                      <Box
                        component="img"
                        src={item.product.image_url}
                        alt={item.product.name}
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 1,
                          objectFit: 'cover',
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" noWrap>
                          {item.product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.product.brand} • {item.product.unit}
                        </Typography>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
                          <Typography variant="subtitle2" color="primary.main">
                            ₹{item.total_price}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <IconButton
                              size="small"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              disabled={loading}
                            >
                              <Iconify icon="mingcute:minus-line" />
                            </IconButton>
                            <Typography variant="body2" sx={{ minWidth: 24, textAlign: 'center' }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              disabled={loading}
                            >
                              <Iconify icon="mingcute:add-line" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => onRemoveItem(item.product.id)}
                              disabled={loading}
                            >
                              <Iconify icon="mingcute:delete-2-line" />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            {/* Cart Summary */}
            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Items ({cart.total_items})</Typography>
                  <Typography variant="body2">₹{cart.subtotal}</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2">Delivery</Typography>
                  <Typography variant="body2" color="success.main">
                    {parseFloat(cart.delivery_charge) === 0 ? 'FREE' : `₹${cart.delivery_charge}`}
                  </Typography>
                </Stack>
                {parseFloat(cart.total_savings) > 0 && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="success.main">Total Savings</Typography>
                    <Typography variant="body2" color="success.main">-₹{cart.total_savings}</Typography>
                  </Stack>
                )}
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
                  <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                    ₹{cart.total_amount}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>

            {/* Action Buttons */}
            <Stack spacing={2}>
              <Button variant="outlined" onClick={handleViewCart} fullWidth>
                View Cart Details
              </Button>
              <Button variant="contained" onClick={handleCheckout} fullWidth size="large">
                Proceed to Checkout
              </Button>
            </Stack>
          </>
        )}
      </Box>
    </Drawer>
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

        {/* Filter Sidebar */}
        <FilterSidebar
          open={filterSidebar.value}
          onClose={filterSidebar.onFalse}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          category={categoryDetails}
        />

        {/* Product Details Dialog */}
        <ProductDetailsDialog
          product={selectedProduct}
          open={productDetails.value}
          onClose={productDetails.onFalse}
          onAddToCart={handleAddToCart}
          cartLoading={cartLoading}
          isInCart={selectedProduct ? isInCart(selectedProduct.id) : false}
          cartQuantity={selectedProduct ? getItemQuantity(selectedProduct.id) : 0}
        />

        {/* Cart Summary Drawer */}
        <CartSummaryDrawer
          open={cartSummary.value}
          onClose={cartSummary.onFalse}
          cart={cart}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          loading={cartLoading}
        />
      </Container>
    </DashboardContent>
  );
}

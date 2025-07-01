// src/sections/overview/pharmacy/view/pharmacy-products-view.jsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import Badge from '@mui/material/Badge';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import {
  pharmacyApi,
  usePharmacyProducts,
  usePharmacyCart,
  formatPrice,
  calculateDiscount
} from 'src/utils/pharmacy';

// ----------------------------------------------------------------------

// Product Card Component
function ProductCard({ product, onAddToCart, cartLoading }) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await onAddToCart(product.id, quantity);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock_quantity) {
      setQuantity(newQuantity);
    }
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
      <Box sx={{ position: 'relative', pt: 2, px: 2 }}>
        <CardMedia
          component="img"
          image={product.image_url}
          alt={product.name}
          sx={{
            height: 140,
            objectFit: 'contain',
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
            top: 8,
            left: 8,
            flexWrap: 'wrap',
          }}
        >
          {product.is_bestseller && (
            <Chip
              label="Bestseller"
              size="small"
              color="primary"
              sx={{ height: 20, fontSize: '0.6rem' }}
            />
          )}
          {product.discount_percentage > 0 && (
            <Chip
              label={`${product.discount_percentage}% OFF`}
              size="small"
              color="error"
              sx={{ height: 20, fontSize: '0.6rem' }}
            />
          )}
        </Stack>

        {/* Prescription Required Badge */}
        {product.is_prescription_required && (
          <Chip
            label="Rx"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              height: 20,
              fontSize: '0.6rem',
              bgcolor: 'warning.lighter',
              color: 'warning.main',
              border: '1px solid',
              borderColor: 'warning.light',
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        {/* Product Info */}
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 'bold',
              lineHeight: 1.3,
              mb: 0.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 1, display: 'block' }}
          >
            {product.brand} • {product.unit}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 32,
            }}
          >
            {product.description}
          </Typography>

          {/* Rating */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Rating
              value={parseFloat(product.rating)}
              precision={0.1}
              size="small"
              readOnly
            />
            <Typography variant="caption" color="text.secondary">
              ({product.review_count})
            </Typography>
          </Stack>
        </Box>

        {/* Price Section */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" color="primary.main" fontWeight="bold">
              ₹{formatPrice(product.effective_price)}
            </Typography>
            {product.original_price !== product.effective_price && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.disabled',
                }}
              >
                ₹{formatPrice(product.original_price)}
              </Typography>
            )}
          </Stack>
          {product.savings_amount > 0 && (
            <Typography variant="caption" color="success.main">
              You save ₹{formatPrice(product.savings_amount)}
            </Typography>
          )}
        </Box>

        {/* Delivery Info */}
        <Typography
          variant="caption"
          color="success.main"
          sx={{ mb: 2, fontWeight: 'medium' }}
        >
          📦 {product.delivery_info}
        </Typography>

        {/* Stock Status */}
        {product.stock_quantity <= 10 && product.stock_quantity > 0 && (
          <Typography variant="caption" color="warning.main" sx={{ mb: 2 }}>
            Only {product.stock_quantity} left in stock
          </Typography>
        )}

        {/* Add to Cart Section */}
        <Box>
          {product.is_available && product.is_in_stock ? (
            <>
              <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Typography variant="body2">Qty:</Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    sx={{
                      width: 28,
                      height: 28,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Iconify icon="solar:minus-bold" width={12} />
                  </IconButton>
                  <Typography
                    variant="body2"
                    sx={{
                      minWidth: 32,
                      textAlign: 'center',
                      fontWeight: 'medium',
                    }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock_quantity}
                    sx={{
                      width: 28,
                      height: 28,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Iconify icon="solar:add-bold" width={12} />
                  </IconButton>
                </Stack>
              </Stack>

              <Button
                fullWidth
                variant="contained"
                startIcon={<Iconify icon="solar:cart-plus-bold" />}
                onClick={handleAddToCart}
                disabled={isAdding || cartLoading}
                sx={{ py: 1 }}
              >
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </Button>
            </>
          ) : (
            <Button
              fullWidth
              variant="outlined"
              disabled
              sx={{ py: 1 }}
            >
              Out of Stock
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

// Main Pharmacy Products View Component
export function PharmacyProductsView() {
  const router = useRouter();
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // State management
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    brand: searchParams.get('brand') || '',
    subcategory: searchParams.get('subcategory') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    is_bestseller: searchParams.get('is_bestseller') === 'true',
    is_prescription_required: searchParams.get('is_prescription_required') === 'true',
    ordering: searchParams.get('ordering') || 'name',
  });

  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);

  // Custom hooks
  const {
    products,
    loading: productsLoading,
    error: productsError,
    pagination,
    category,
    subcategories,
    brands,
    priceRange,
    updateFilters,
    updatePage
  } = usePharmacyProducts(categoryId, filters, currentPage);

  const { addToCart, loading: cartLoading } = usePharmacyCart();

  // Handlers
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
    updateFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    Object.entries({ ...filters, ...newFilters }).forEach(([key, value]) => {
      if (value && value !== '' && value !== false) {
        params.set(key, value.toString());
      }
    });
    params.set('page', '1');
    setSearchParams(params);
  }, [filters, updateFilters, setSearchParams]);

  const handlePageChange = useCallback((event, page) => {
    setCurrentPage(page);
    updatePage(page);

    // Update URL params
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    setSearchParams(params);
  }, [updatePage, searchParams, setSearchParams]);

  const handleAddToCart = useCallback(async (productId, quantity) => {
    return await addToCart(productId, quantity);
  }, [addToCart]);

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      brand: '',
      subcategory: '',
      min_price: '',
      max_price: '',
      is_bestseller: false,
      is_prescription_required: false,
      ordering: 'name',
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
    updateFilters(clearedFilters);
    setSearchParams({ page: '1' });
  };

  // Computed values
  const hasActiveFilters = useMemo(() => {
    return filters.search ||
           filters.brand ||
           filters.subcategory ||
           filters.min_price ||
           filters.max_price ||
           filters.is_bestseller ||
           filters.is_prescription_required ||
           filters.ordering !== 'name';
  }, [filters]);

  const totalPages = Math.ceil((pagination?.count || 0) / 12);

  // Render filters section
  const renderFilters = (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Stack spacing={3}>
          {/* Search and Sort */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange({ search: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="solar:magnifer-bold" />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={filters.ordering}
                label="Sort By"
                onChange={(e) => handleFilterChange({ ordering: e.target.value })}
              >
                <MenuItem value="name">Name (A-Z)</MenuItem>
                <MenuItem value="-name">Name (Z-A)</MenuItem>
                <MenuItem value="price">Price (Low to High)</MenuItem>
                <MenuItem value="-price">Price (High to Low)</MenuItem>
                <MenuItem value="-rating">Highest Rated</MenuItem>
                <MenuItem value="-created_at">Newest First</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Category Filters */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            {subcategories.length > 0 && (
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={filters.subcategory}
                  label="Subcategory"
                  onChange={(e) => handleFilterChange({ subcategory: e.target.value })}
                >
                  <MenuItem value="">All Subcategories</MenuItem>
                  {subcategories.map((subcategory) => (
                    <MenuItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name} ({subcategory.product_count})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {brands.length > 0 && (
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Brand</InputLabel>
                <Select
                  value={filters.brand}
                  label="Brand"
                  onChange={(e) => handleFilterChange({ brand: e.target.value })}
                >
                  <MenuItem value="">All Brands</MenuItem>
                  {brands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <Stack direction="row" spacing={1}>
              <TextField
                label="Min Price"
                type="number"
                value={filters.min_price}
                onChange={(e) => handleFilterChange({ min_price: e.target.value })}
                sx={{ width: 120 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
              <TextField
                label="Max Price"
                type="number"
                value={filters.max_price}
                onChange={(e) => handleFilterChange({ max_price: e.target.value })}
                sx={{ width: 120 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Stack>
          </Stack>

          {/* Filter Chips */}
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip
              label="Bestsellers Only"
              variant={filters.is_bestseller ? 'filled' : 'outlined'}
              color={filters.is_bestseller ? 'primary' : 'default'}
              onClick={() => handleFilterChange({ is_bestseller: !filters.is_bestseller })}
              clickable
            />
            <Chip
              label="Prescription Required"
              variant={filters.is_prescription_required ? 'filled' : 'outlined'}
              color={filters.is_prescription_required ? 'warning' : 'default'}
              onClick={() => handleFilterChange({ is_prescription_required: !filters.is_prescription_required })}
              clickable
            />

            {hasActiveFilters && (
              <Chip
                label="Clear Filters"
                variant="outlined"
                color="error"
                onClick={handleClearFilters}
                onDelete={handleClearFilters}
                deleteIcon={<Iconify icon="solar:close-circle-bold" />}
              />
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  // Loading state
  if (productsLoading && !products.length) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Stack spacing={3} alignItems="center">
              <CircularProgress size={40} />
              <Typography variant="h6" color="text.secondary">
                Loading products...
              </Typography>
            </Stack>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  // Error state
  if (productsError) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Card sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
              <Iconify icon="solar:wifi-router-minimalistic-bold" width={64} sx={{ color: 'error.main', mb: 2 }} />
              <Typography variant="h6" color="error" gutterBottom>
                Failed to Load Products
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {productsError}
              </Typography>
              <Button
                variant="contained"
                onClick={() => window.location.reload()}
                startIcon={<Iconify icon="solar:refresh-bold" />}
              >
                Retry
              </Button>
            </Card>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading={category ? `${category.name} Products` : 'Products'}
          links={[
            { name: 'Dashboard', href: paths.dashboard?.root || '/dashboard' },
            { name: 'Pharmacy', href: `${paths.dashboard?.root}/pharmacy` || '/dashboard/pharmacy' },
            { name: category?.name || 'Products' },
          ]}
          action={
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:arrow-left-bold" />}
              onClick={() => router.back()}
            >
              Back
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {/* Category Header */}
        {category && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={3}>
                <Box
                  component="img"
                  src={category.icon}
                  alt={category.name}
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    bgcolor: 'background.neutral',
                    p: 1,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    {category.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" gutterBottom>
                    {category.description}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Chip label={`${pagination?.count || 0} Products`} size="small" />
                    <Chip label={`Price Range: ₹${category.min_price} - ₹${category.max_price}`} size="small" variant="outlined" />
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        {renderFilters}

        {/* Results Summary */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Typography variant="h6">
            {pagination?.count || 0} Products Found
            {hasActiveFilters && ' (Filtered)'}
          </Typography>

          {priceRange && (
            <Typography variant="body2" color="text.secondary">
              Price range: ₹{priceRange.min} - ₹{priceRange.max}
            </Typography>
          )}
        </Stack>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    cartLoading={cartLoading}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        ) : (
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
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 3,
                    bgcolor: 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Iconify icon="solar:box-bold" width={64} sx={{ color: 'text.disabled' }} />
                </Box>
                <Typography variant="h5" gutterBottom>
                  No Products Found
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 480 }}>
                  {hasActiveFilters
                    ? 'Try adjusting your filters to find more products.'
                    : 'There are no products available in this category.'
                  }
                </Typography>
                {hasActiveFilters && (
                  <Button
                    variant="contained"
                    onClick={handleClearFilters}
                    startIcon={<Iconify icon="solar:refresh-bold" />}
                  >
                    Clear All Filters
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </DashboardContent>
  );
}

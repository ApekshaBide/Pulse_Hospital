// src/pages/dashboard/pharmacy/cart.jsx
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
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
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonGroup,
  Alert,
  Fab
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { usePharmacy } from 'src/hooks/use-pharmacy';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';

export default function PharmacyCartPage() {
  const router = useRouter();
  const [cartSummary, setCartSummary] = useState(null);

  const {
    cart,
    loading,
    error,
    fetchCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    fetchCartSummary,
    calculateCartTotals
  } = usePharmacy();

  useEffect(() => {
    fetchCart();
    loadCartSummary();
  }, [fetchCart]);

  const loadCartSummary = async () => {
    try {
      const summary = await fetchCartSummary();
      setCartSummary(summary);
    } catch (err) {
      console.error('Error loading cart summary:', err);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await handleRemoveItem(productId);
      return;
    }

    try {
      await updateCartQuantity(productId, newQuantity);
      await loadCartSummary();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      await loadCartSummary();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      await loadCartSummary();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleCheckout = () => {
    console.log('Proceed to checkout');
    // Navigate to checkout page or implement checkout logic
  };

  const totals = cart?.items ? calculateCartTotals(cart.items) : null;

  const renderCartItems = cart?.items && cart.items.length > 0 && (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h6">
            Shopping Cart ({cart.total_items} items)
          </Typography>
          <Button
            color="error"
            size="small"
            onClick={handleClearCart}
            startIcon={<Iconify icon="eva:trash-2-outline" />}
          >
            Clear Cart
          </Button>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right">Unit Price</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cart.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 1,
                          background: `url(${item.product.image_url}) center/cover`,
                          backgroundColor: '#f5f5f5',
                          flexShrink: 0
                        }}
                      />
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          {item.product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.product.brand} • {item.product.unit}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                          {item.product.is_prescription_required && (
                            <Chip label="Rx" color="warning" size="small" />
                          )}
                          {item.product.is_bestseller && (
                            <Chip label="Bestseller" color="error" size="small" />
                          )}
                        </Stack>
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell align="center">
                    <ButtonGroup size="small">
                      <IconButton
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Iconify icon="eva:minus-fill" />
                      </IconButton>
                      <Button disabled sx={{ minWidth: 50 }}>
                        {item.quantity}
                      </Button>
                      <IconButton
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock_quantity}
                      >
                        <Iconify icon="eva:plus-fill" />
                      </IconButton>
                    </ButtonGroup>
                  </TableCell>

                  <TableCell align="right">
                    <Stack alignItems="flex-end">
                      <Typography variant="body2" color="primary" fontWeight="bold">
                        ₹{item.unit_price}
                      </Typography>
                      {item.original_unit_price !== item.unit_price && (
                        <Typography
                          variant="caption"
                          color="text.disabled"
                          sx={{ textDecoration: 'line-through' }}
                        >
                          ₹{item.original_unit_price}
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell align="right">
                    <Stack alignItems="flex-end">
                      <Typography variant="body1" fontWeight="bold">
                        ₹{item.total_price}
                      </Typography>
                      {item.savings_amount > 0 && (
                        <Typography variant="caption" color="success.main">
                          Save ₹{item.savings_amount}
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>

                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(item.product.id)}
                      size="small"
                    >
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  const renderCartSummary = (cart?.items?.length > 0 || cartSummary) && (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">
              Subtotal ({cartSummary?.total_items || totals?.totalItems} items)
            </Typography>
            <Typography variant="body2">
              ₹{cartSummary?.subtotal || totals?.subtotal}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" color="success.main">
              Total Savings
            </Typography>
            <Typography variant="body2" color="success.main">
              -₹{cartSummary?.total_savings || totals?.totalSavings}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">
              Delivery Charges
            </Typography>
            <Typography variant="body2" color="success.main">
              {cartSummary?.delivery_charge === '0.00' || cartSummary?.free_delivery_eligible
                ? 'FREE'
                : `₹${cartSummary?.delivery_charge || '0.00'}`}
            </Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6">
              Total Amount
            </Typography>
            <Typography variant="h6" color="primary">
              ₹{cartSummary?.total_amount || totals?.totalAmount}
            </Typography>
          </Stack>

          {cartSummary?.prescription_required && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2">
                This order contains prescription items. You'll need to upload a valid prescription before checkout.
              </Typography>
            </Alert>
          )}

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleCheckout}
            startIcon={<Iconify icon="eva:shopping-bag-outline" />}
            sx={{ mt: 3 }}
          >
            Proceed to Checkout
          </Button>

          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mt: 2 }}>
            <Iconify icon="eva:shield-checkmark-fill" sx={{ color: 'success.main' }} />
            <Typography variant="caption" color="text.secondary">
              100% Safe & Secure Payments
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  const renderDeliveryInfo = (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Delivery Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Iconify icon="eva:clock-outline" sx={{ color: 'primary.main' }} />
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Express Delivery
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Get your medicines within 2-4 hours
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Iconify icon="eva:car-outline" sx={{ color: 'primary.main' }} />
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Free Delivery
              </Typography>
              <Typography variant="caption" color="text.secondary">
                On orders above ₹500
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Iconify icon="eva:shield-checkmark-outline" sx={{ color: 'primary.main' }} />
            <Box>
              <Typography variant="body2" fontWeight="bold">
                Authentic Products
              </Typography>
              <Typography variant="caption" color="text.secondary">
                100% genuine medicines from licensed vendors
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  const renderEmptyCart = (
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
          <Iconify icon="eva:shopping-cart-outline" width={64} sx={{ color: 'text.disabled', mb: 3 }} />
          <Typography variant="h5" color="text.disabled" gutterBottom>
            Your Cart is Empty
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Add some medicines to your cart to continue shopping
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push(paths.dashboard.pharmacy.products)}
            startIcon={<Iconify icon="eva:shopping-bag-outline" />}
          >
            Continue Shopping
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  const renderContinueShopping = (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        mb: 3,
        background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Need more items?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Continue shopping and add more products to your cart
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={() => router.push(paths.dashboard.pharmacy.products)}
          startIcon={<Iconify icon="eva:arrow-back-fill" />}
        >
          Continue Shopping
        </Button>
      </Stack>
    </Paper>
  );

  const renderFloatingAction = (
    <Fab
      color="secondary"
      sx={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 1000,
      }}
      onClick={() => router.push(paths.dashboard.pharmacy.products)}
    >
      <Iconify icon="eva:shopping-bag-outline" />
    </Fab>
  );

  if (loading) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Typography>Loading cart...</Typography>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  const hasItems = cart?.items && cart.items.length > 0;

  return (
    <>
      <Helmet>
        <title>Shopping Cart | Pharmacy</title>
      </Helmet>
      <DashboardContent>
        <Container maxWidth="xl">
          <CustomBreadcrumbs
            heading="Shopping Cart"
            links={[
              { name: 'Dashboard', href: paths.dashboard.root },
              { name: 'Pharmacy', href: paths.dashboard.pharmacy.root },
              { name: 'Cart' },
            ]}
            action={
              <Button
                variant="outlined"
                startIcon={<Iconify icon="eva:shopping-bag-outline" />}
                onClick={() => router.push(paths.dashboard.pharmacy.products)}
              >
                Continue Shopping
              </Button>
            }
            sx={{ mb: { xs: 3, md: 5 } }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              Error: {error}
            </Alert>
          )}

          {hasItems && renderContinueShopping}

          {hasItems ? (
            <Grid container spacing={3}>
              <Grid item xs={12} lg={8}>
                {renderCartItems}
              </Grid>
              <Grid item xs={12} lg={4}>
                <Stack spacing={3}>
                  {renderCartSummary}
                  {renderDeliveryInfo}
                </Stack>
              </Grid>
            </Grid>
          ) : (
            renderEmptyCart
          )}

          {hasItems && renderFloatingAction}
        </Container>
      </DashboardContent>
    </>
  );
}

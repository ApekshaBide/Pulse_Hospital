// src/components/cart-drawer/cart-drawer.jsx

import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { useDiagnosticsActions } from 'src/hooks/use-diagnostics';

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function CartDrawer({ open, onClose, cart, cartLoading }) {
  const router = useRouter();
  const [updatingQuantity, setUpdatingQuantity] = useState({});
  const [removingItem, setRemovingItem] = useState({});

  const { updateCartItemQuantity, removeItemFromCart } = useDiagnosticsActions();

  const handleQuantityChange = useCallback(async (itemId, newQuantity) => {
    if (newQuantity < 1 || !cart?.id) return;

    setUpdatingQuantity(prev => ({ ...prev, [itemId]: true }));

    try {
      await updateCartItemQuantity(cart.id, itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdatingQuantity(prev => ({ ...prev, [itemId]: false }));
    }
  }, [cart?.id, updateCartItemQuantity]);

  const handleRemoveItem = useCallback(async (itemId) => {
    if (!cart?.id) return;

    setRemovingItem(prev => ({ ...prev, [itemId]: true }));

    try {
      await removeItemFromCart(cart.id, itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setRemovingItem(prev => ({ ...prev, [itemId]: false }));
    }
  }, [cart?.id, removeItemFromCart]);

  const handleProceedToCheckout = useCallback(() => {
    onClose();
    router.push(paths.dashboard.diagnostics.checkout);
  }, [onClose, router]);

  const handleViewFullCart = useCallback(() => {
    onClose();
    router.push(paths.dashboard.diagnostics.cart);
  }, [onClose, router]);

  // Calculate totals
  const subtotal = cart?.items?.reduce((total, item) => total + (item.effective_price * item.quantity), 0) || 0;
  const totalItems = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  const totalSavings = cart?.items?.reduce((total, item) => {
    const savings = (item.price - item.effective_price) * item.quantity;
    return total + savings;
  }, 0) || 0;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 420 } }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">
              Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </Typography>
            <IconButton onClick={onClose} size="small">
              <Iconify icon="solar:close-circle-bold" />
            </IconButton>
          </Stack>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {cartLoading ? (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : !cart?.items?.length ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Iconify icon="solar:cart-bold" width={64} sx={{ color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Your cart is empty
              </Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mb: 2 }}>
                Add some tests to get started
              </Typography>
              <Button variant="outlined" onClick={onClose}>
                Continue Shopping
              </Button>
            </Box>
          ) : (
            <Stack spacing={1} sx={{ p: 2 }}>
              {cart.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  updatingQuantity={updatingQuantity[item.id]}
                  removingItem={removingItem[item.id]}
                />
              ))}
            </Stack>
          )}
        </Box>

        {/* Footer with Order Summary */}
        {cart?.items?.length > 0 && (
          <Box sx={{ borderTop: 1, borderColor: 'divider', p: 2 }}>
            <Stack spacing={2}>
              {/* Order Summary */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Order Summary
                </Typography>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Subtotal ({totalItems} items)
                    </Typography>
                    <Typography variant="body2">
                      ₹{subtotal.toFixed(2)}
                    </Typography>
                  </Stack>
                  {totalSavings > 0 && (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="success.main">
                        Total Savings
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        -₹{totalSavings.toFixed(2)}
                      </Typography>
                    </Stack>
                  )}
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle2">
                      Total
                    </Typography>
                    <Typography variant="subtitle2" color="primary.main">
                      ₹{subtotal.toFixed(2)}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>

              {/* Home Collection Info */}
              <Alert severity="info" icon={<Iconify icon="solar:home-bold" />}>
                <Typography variant="body2">
                  Free home collection available for orders above ₹500
                </Typography>
              </Alert>

              {/* Action Buttons */}
              <Stack spacing={1}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleProceedToCheckout}
                  startIcon={<Iconify icon="solar:card-bold" />}
                >
                  Book Now - ₹{subtotal.toFixed(2)}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={handleViewFullCart}
                >
                  View Full Cart
                </Button>
              </Stack>
            </Stack>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

CartDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  cart: PropTypes.shape({
    id: PropTypes.string,
    total: PropTypes.number,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number
      })
    )
  }),
  cartLoading: PropTypes.bool,
};


// ----------------------------------------------------------------------

function CartItem({ item, onQuantityChange, onRemove, updatingQuantity, removingItem }) {
  const handleQuantityDecrease = useCallback(() => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  }, [item.id, item.quantity, onQuantityChange]);

  const handleQuantityIncrease = useCallback(() => {
    onQuantityChange(item.id, item.quantity + 1);
  }, [item.id, item.quantity, onQuantityChange]);

  const handleRemove = useCallback(() => {
    onRemove(item.id);
  }, [item.id, onRemove]);

  return (
    <Card variant="outlined" sx={{ position: 'relative' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack spacing={2}>
          {/* Item Header */}
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar
              variant="rounded"
              sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}
            >
              <Iconify icon="solar:test-tube-bold" />
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap>
                {item.test?.name || item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Code: {item.test?.code || item.code}
              </Typography>

              {/* Test Features */}
              <Stack direction="row" spacing={0.5} sx={{ mt: 1 }} flexWrap="wrap">
                <Chip
                  size="small"
                  label={item.test?.sample_type || 'Blood'}
                  variant="outlined"
                />
                {item.test?.is_home_collection && (
                  <Chip
                    size="small"
                    label="Home Collection"
                    color="success"
                    variant="outlined"
                  />
                )}
              </Stack>
            </Box>

            {/* Remove Button */}
            <IconButton
              size="small"
              onClick={handleRemove}
              disabled={removingItem}
              sx={{ color: 'error.main' }}
            >
              {removingItem ? (
                <CircularProgress size={16} />
              ) : (
                <Iconify icon="solar:trash-bin-trash-bold" />
              )}
            </IconButton>
          </Stack>

          {/* Price and Quantity */}
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* Price */}
            <Stack direction="row" alignItems="center" spacing={1}>
              {item.price !== item.effective_price ? (
                <>
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
                  >
                    ₹{item.price}
                  </Typography>
                  <Typography variant="subtitle2" color="primary.main">
                    ₹{item.effective_price}
                  </Typography>
                  <Label color="error" variant="soft" size="small">
                    {(((item.price - item.effective_price) / item.price) * 100).toFixed(0)}% OFF
                  </Label>
                </>
              ) : (
                <Typography variant="subtitle2" color="primary.main">
                  ₹{item.effective_price}
                </Typography>
              )}
            </Stack>

            {/* Quantity Controls */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                size="small"
                onClick={handleQuantityDecrease}
                disabled={item.quantity <= 1 || updatingQuantity}
                sx={{ border: 1, borderColor: 'divider' }}
              >
                <Iconify icon="solar:minus-bold" width={16} />
              </IconButton>

              <Typography
                variant="body2"
                sx={{
                  minWidth: 24,
                  textAlign: 'center',
                  fontWeight: 600,
                }}
              >
                {updatingQuantity ? '...' : item.quantity}
              </Typography>

              <IconButton
                size="small"
                onClick={handleQuantityIncrease}
                disabled={updatingQuantity}
                sx={{ border: 1, borderColor: 'divider' }}
              >
                <Iconify icon="solar:plus-bold" width={16} />
              </IconButton>
            </Stack>
          </Stack>

          {/* Item Total */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Item Total:
            </Typography>
            <Typography variant="subtitle2" color="primary.main">
              ₹{(item.effective_price * item.quantity).toFixed(2)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string, quantity: PropTypes.number, price: PropTypes.number }),
  onQuantityChange: PropTypes.func,
  onRemove: PropTypes.func,
  updatingQuantity: PropTypes.bool,
  removingItem: PropTypes.bool,
};

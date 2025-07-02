// src/sections/overview/diagnostics/view/diagnostics-test-detail-view.jsx

import { useParams } from 'react-router-dom';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useCart, useTestDetail, useDiagnosticsActions } from 'src/hooks/use-diagnostics';

import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
// ----------------------------------------------------------------------
export function DiagnosticsTestDetailView() {
  const router = useRouter();
  const { testId } = useParams();
  const [addingToCart, setAddingToCart] = useState(false);

  const {
    testDetail,
    testDetailLoading,
    testDetailError,
    testDetailEmpty,
  } = useTestDetail(testId);

  const { cart, cartLoading } = useCart();
  const { addItemToCart } = useDiagnosticsActions();

  const handleAddToCart = useCallback(async () => {
    if (!cart?.id || !testDetail) return;

    setAddingToCart(true);

    try {
      await addItemToCart(cart.id, testDetail.id, 1);
      // Show success message or notification here
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Show error message here
    } finally {
      setAddingToCart(false);
    }
  }, [cart?.id, testDetail, addItemToCart]);

  const handleBackToCategory = useCallback(() => {
    if (testDetail?.category) {
      router.push(paths.dashboard.diagnostics.category(testDetail.category));
    } else {
      router.push(paths.dashboard.diagnostics.root);
    }
  }, [router, testDetail]);

  // Loading state
  if (testDetailLoading) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <TestDetailSkeleton />
        </Container>
      </DashboardContent>
    );
  }

  // Error state
  if (testDetailError) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Alert severity="error" sx={{ mb: 3 }}>
            {testDetailError.message || 'Failed to load test details'}
          </Alert>
          <Button
            variant="outlined"
            onClick={handleBackToCategory}
            startIcon={<Iconify icon="solar:arrow-left-bold" />}
          >
            Back to Category
          </Button>
        </Container>
      </DashboardContent>
    );
  }

  // Empty state
  if (testDetailEmpty || !testDetail) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Alert severity="info" sx={{ mb: 3 }}>
            Test not found
          </Alert>
          <Button
            variant="outlined"
            onClick={handleBackToCategory}
            startIcon={<Iconify icon="solar:arrow-left-bold" />}
          >
            Back to Category
          </Button>
        </Container>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading={testDetail.name}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Diagnostics', href: paths.dashboard.diagnostics.root },
            { name: testDetail.category_name, href: paths.dashboard.diagnostics.category(testDetail.category) },
            { name: testDetail.name },
          ]}
          action={
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:arrow-left-bold" />}
              onClick={handleBackToCategory}
            >
              Back to {testDetail.category_name}
            </Button>
          }
          sx={{ mb: { xs: 2, md: 3 } }}
        />

        <Grid container spacing={3}>
          {/* Test Information */}
          <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
              {/* Test Header */}
              <Card>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    <Typography variant="h4">{testDetail.name}</Typography>
                    <Stack direction="row" spacing={1}>
                      {testDetail.is_popular && (
                        <Label color="warning" variant="soft">Popular</Label>
                      )}
                      {testDetail.is_active && (
                        <Label color="success" variant="soft">Active</Label>
                      )}
                    </Stack>
                  </Stack>

                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {testDetail.description}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Iconify icon="solar:test-tube-bold" width={24} sx={{ mb: 1, color: 'primary.main' }} />
                        <Typography variant="caption" display="block" color="text.secondary">
                          Test Code
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {testDetail.code}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Iconify icon="solar:drop-bold" width={24} sx={{ mb: 1, color: 'info.main' }} />
                        <Typography variant="caption" display="block" color="text.secondary">
                          Sample Type
                        </Typography>
                        <Typography variant="body2" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
                          {testDetail.sample_type}
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Iconify icon="solar:clock-circle-bold" width={24} sx={{ mb: 1, color: 'warning.main' }} />
                        <Typography variant="caption" display="block" color="text.secondary">
                          Duration
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {testDetail.duration_hours} hours
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Iconify
                          icon={testDetail.is_home_collection ? "solar:home-bold" : "solar:hospital-bold"}
                          width={24}
                          sx={{ mb: 1, color: testDetail.is_home_collection ? 'success.main' : 'grey.500' }}
                        />
                        <Typography variant="caption" display="block" color="text.secondary">
                          Collection
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {testDetail.is_home_collection ? 'Home' : 'Lab'}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Preparation Instructions */}
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    <Iconify icon="solar:document-text-bold" sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Test Preparation
                  </Typography>

                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Preparation Required:
                      </Typography>
                      <Chip
                        label={testDetail.preparation_required === 'fasting_12_hours' ? 'Fasting Required' : 'No Fasting Required'}
                        color={testDetail.preparation_required === 'fasting_12_hours' ? 'warning' : 'success'}
                        variant="soft"
                      />
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Instructions:
                      </Typography>
                      <Typography variant="body2">
                        {testDetail.preparation_instructions}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>

              {/* Additional Information */}
              {testDetail.is_home_collection && (
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      <Iconify icon="solar:home-bold" sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Home Collection Service
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Our trained professionals will collect your sample from the comfort of your home.
                    </Typography>
                    <Alert severity="info">
                      Home collection charge: ₹{testDetail.home_collection_charge}
                    </Alert>
                  </CardContent>
                </Card>
              )}
            </Stack>
          </Grid>

          {/* Pricing and Actions */}
          <Grid item xs={12} lg={4}>
            <Card sx={{ position: 'sticky', top: 24 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>Pricing & Booking</Typography>

                {/* Price Section */}
                <Box sx={{ mb: 3 }}>
                  {testDetail.discounted_price ? (
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="h4" color="primary.main">
                          ₹{testDetail.effective_price}
                        </Typography>
                        <Label color="error" variant="soft">
                          {testDetail.discount_percentage.toFixed(0)}% OFF
                        </Label>
                      </Stack>
                      <Typography
                        variant="h6"
                        sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
                      >
                        ₹{testDetail.price}
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        You save ₹{(parseFloat(testDetail.price) - parseFloat(testDetail.effective_price)).toFixed(2)}
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography variant="h4" color="primary.main">
                      ₹{testDetail.effective_price}
                    </Typography>
                  )}
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Quick Info */}
                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Report Time:</Typography>
                    <Typography variant="body2">{testDetail.duration_hours} hours</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">Sample:</Typography>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {testDetail.sample_type}
                    </Typography>
                  </Stack>
                  {testDetail.is_home_collection && (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">Collection:</Typography>
                      <Typography variant="body2" color="success.main">Home Available</Typography>
                    </Stack>
                  )}
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Action Buttons */}
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleAddToCart}
                    disabled={addingToCart || cartLoading}
                    startIcon={
                      addingToCart ? (
                        <CircularProgress size={20} />
                      ) : (
                        <Iconify icon="solar:cart-plus-bold" />
                      )
                    }
                    fullWidth
                  >
                    {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Iconify icon="solar:calendar-bold" />}
                    fullWidth
                  >
                    Book Now
                  </Button>
                </Stack>

                {/* Additional Info */}
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="caption">
                    Free home collection for orders above ₹500
                  </Typography>
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function TestDetailSkeleton() {
  return (
    <Stack spacing={3}>
      {/* Breadcrumb Skeleton */}
      <Skeleton variant="text" width={400} height={40} />

      <Grid container spacing={3}>
        {/* Main Content Skeleton */}
        <Grid item xs={12} lg={8}>
          <Stack spacing={3}>
            {/* Header Card Skeleton */}
            <Card>
              <CardContent>
                <Skeleton variant="text" width={300} height={32} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="100%" height={20} sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                  {[...Array(4)].map((_, index) => (
                    <Grid item xs={6} sm={3} key={index}>
                      <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                        <Skeleton variant="circular" width={24} height={24} sx={{ mx: 'auto', mb: 1 }} />
                        <Skeleton variant="text" width={60} height={16} sx={{ mx: 'auto', mb: 0.5 }} />
                        <Skeleton variant="text" width={40} height={20} sx={{ mx: 'auto' }} />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Preparation Card Skeleton */}
            <Card>
              <CardContent>
                <Skeleton variant="text" width={200} height={24} sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  <Box>
                    <Skeleton variant="text" width={150} height={16} sx={{ mb: 1 }} />
                    <Skeleton variant="rounded" width={120} height={24} />
                  </Box>
                  <Box>
                    <Skeleton variant="text" width={100} height={16} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="100%" height={20} />
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {/* Home Collection Card Skeleton */}
            <Card>
              <CardContent>
                <Skeleton variant="text" width={250} height={24} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="100%" height={20} sx={{ mb: 2 }} />
                <Skeleton variant="rounded" width="100%" height={48} />
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Sidebar Skeleton */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Skeleton variant="text" width={180} height={24} sx={{ mb: 3 }} />

              {/* Price Skeleton */}
              <Box sx={{ mb: 3 }}>
                <Skeleton variant="text" width={120} height={40} sx={{ mb: 1 }} />
                <Skeleton variant="text" width={80} height={24} sx={{ mb: 1 }} />
                <Skeleton variant="text" width={100} height={16} />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Quick Info Skeleton */}
              <Stack spacing={2} sx={{ mb: 3 }}>
                {[...Array(3)].map((_, index) => (
                  <Stack direction="row" justifyContent="space-between" key={index}>
                    <Skeleton variant="text" width={80} height={16} />
                    <Skeleton variant="text" width={60} height={16} />
                  </Stack>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Buttons Skeleton */}
              <Stack spacing={2}>
                <Skeleton variant="rounded" width="100%" height={48} />
                <Skeleton variant="rounded" width="100%" height={48} />
              </Stack>

              <Skeleton variant="rounded" width="100%" height={56} sx={{ mt: 2 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}

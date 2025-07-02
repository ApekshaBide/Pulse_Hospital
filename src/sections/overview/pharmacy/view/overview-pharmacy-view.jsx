// src/sections/overview/pharmacy/view/overview-pharmacy-view.jsx
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field} from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePharmacyManager, useCategoryDetails } from 'src/hooks/use-pharmacy';
// Schema for Pharmacy Configuration
const PharmacyConfigSchema = zod.object({
  name: zod.string().min(1, { message: 'Pharmacy name is required!' }),
  description: zod.string().min(10, { message: 'Description must be at least 10 characters' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  phone: zod.string().min(1, { message: 'Phone number is required!' }),
  email: zod.string().email({ message: 'Invalid email address!' }),
  operating_hours: zod.string().min(1, { message: 'Operating hours are required!' }),
  emergency_contact: zod.string().min(1, { message: 'Emergency contact is required!' }),
  license_number: zod.string().min(1, { message: 'License number is required!' }),
  website: zod.string().optional(),
  special_services: zod.string().optional(),
});

// ----------------------------------------------------------------------

// Category Detail Dialog Component
function CategoryDetailDialog({ category, open, onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { categoryDetails, loading: detailsLoading } = useCategoryDetails(category?.id);

  const handleViewProducts = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const categoryPath = `${paths.dashboard.root}/pharmacy/category/${category.id}/products`;

      if (router?.push) {
        router.push(categoryPath);
      } else {
        // Show mock navigation
        toast.success(`Navigating to ${category.name} products...`);
        console.log('Navigate to:', categoryPath);
      }
      onClose();
    } catch (error) {
      toast.error('Navigation failed');
    } finally {
      setLoading(false);
    }
  }, [category, router, onClose]);

  const handleViewSubcategories = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const subcategoryPath = `${paths.dashboard.root}/pharmacy/category/${category.id}/subcategories`;

      if (router?.push) {
        router.push(subcategoryPath);
      } else {
        toast.success(`Viewing ${category.name} subcategories...`);
        console.log('Navigate to:', subcategoryPath);
      }
      onClose();
    } catch (error) {
      toast.error('Navigation failed');
    } finally {
      setLoading(false);
    }
  }, [category, router, onClose]);

  if (!category) return null;

  const displayCategory = categoryDetails || category;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {detailsLoading ? (
          <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Box sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
              <Box
                component="img"
                src={displayCategory.icon}
                alt={displayCategory.name}
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: 'background.neutral',
                  p: 1,
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                  <Typography variant="h5" fontWeight="bold">
                    {displayCategory.name}
                  </Typography>
                  {displayCategory.is_featured && (
                    <Chip
                      label="Featured"
                      size="small"
                      color="primary"
                      sx={{ height: 20, fontSize: '0.6rem' }}
                    />
                  )}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {displayCategory.description}
                </Typography>
              </Box>
            </Stack>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={4}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'primary.lighter',
                    border: '1px solid',
                    borderColor: 'primary.light'
                  }}
                >
                  <Typography variant="h4" color="primary.main" fontWeight="bold">
                    {displayCategory.product_count}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Products
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'secondary.lighter',
                    border: '1px solid',
                    borderColor: 'secondary.light'
                  }}
                >
                  <Typography variant="h4" color="secondary.main" fontWeight="bold">
                    {displayCategory.subcategory_count}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Categories
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'success.lighter',
                    border: '1px solid',
                    borderColor: 'success.light'
                  }}
                >
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    ₹{displayCategory.min_price}
                  </Typography>
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    ₹{displayCategory.max_price}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Price Range
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {categoryDetails?.subcategories && categoryDetails.subcategories.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Subcategories ({categoryDetails.subcategories.length})
                </Typography>
                <Grid container spacing={1}>
                  {categoryDetails.subcategories.map((subcategory) => (
                    <Grid item key={subcategory.id}>
                      <Chip
                        label={`${subcategory.name} (${subcategory.product_count})`}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip
                label={`Sort Order: ${displayCategory.sort_order}`}
                size="small"
                variant="outlined"
              />
              <Chip
                label={`Updated: ${new Date(displayCategory.updated_at).toLocaleDateString()}`}
                size="small"
                variant="outlined"
              />
            </Stack>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button
          onClick={onClose}
          color="inherit"
          disabled={loading}
        >
          Close
        </Button>
        <Button
          onClick={handleViewSubcategories}
          variant="outlined"
          startIcon={<Iconify icon="solar:folder-bold" />}
          disabled={loading}
        >
          Subcategories
        </Button>
        <LoadingButton
          onClick={handleViewProducts}
          variant="contained"
          startIcon={<Iconify icon="solar:pill-bold" />}
          loading={loading}
        >
          View Products
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

// Pharmacy Configuration Form Component
function PharmacyConfigForm({ currentConfig, onSuccess, loading: formLoading }) {
  const preview = useBoolean();
  const { config } = usePharmacyManager();

  const defaultValues = useMemo(
    () => ({
      name: currentConfig?.name || '',
      description: currentConfig?.description || '',
      address: currentConfig?.address || '',
      phone: currentConfig?.phone || '',
      email: currentConfig?.email || '',
      operating_hours: currentConfig?.operating_hours || '24/7',
      emergency_contact: currentConfig?.emergency_contact || '',
      license_number: currentConfig?.license_number || '',
      website: currentConfig?.website || '',
      special_services: currentConfig?.special_services || '',
    }),
    [currentConfig]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(PharmacyConfigSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const submitData = {
        ...data,
        last_updated: new Date().toISOString().split('T')[0],
        is_active: true,
      };

      if (currentConfig) {
        await config.updateConfig(submitData);
      } else {
        await config.createConfig(submitData);
      }

      reset();
      preview.onFalse();

      toast.success(currentConfig ? 'Pharmacy updated successfully!' : 'Pharmacy created successfully!');

      if (onSuccess) {
        onSuccess(submitData);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  const renderBasicInfo = (
    <Card>
      <CardHeader
        title="Basic Information"
        subheader="Essential pharmacy details and identification"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="name"
          label="Pharmacy Name"
          placeholder="e.g., HealthCare Plus Pharmacy"
        />

        <Field.Text
          name="description"
          label="Description"
          multiline
          rows={3}
          placeholder="Brief description of your pharmacy and services..."
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Field.Text
            name="license_number"
            label="License Number"
            placeholder="e.g., PH-2024-001"
          />
          <Field.Text
            name="operating_hours"
            label="Operating Hours"
            placeholder="e.g., 24/7, Mon-Fri 9AM-6PM"
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderContactInfo = (
    <Card>
      <CardHeader
        title="Contact Information"
        subheader="How customers can reach your pharmacy"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="address"
          label="Address"
          multiline
          rows={2}
          placeholder="Complete pharmacy address with city and postal code..."
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Field.Text
            name="phone"
            label="Phone Number"
            placeholder="e.g., +1 (555) 123-4567"
          />
          <Field.Text
            name="emergency_contact"
            label="Emergency Contact"
            placeholder="e.g., +1 (555) 999-HELP"
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Field.Text
            name="email"
            label="Email Address"
            placeholder="e.g., info@pharmacy.com"
          />
          <Field.Text
            name="website"
            label="Website (Optional)"
            placeholder="e.g., https://pharmacy.com"
          />
        </Stack>

        <Field.Text
          name="special_services"
          label="Special Services (Optional)"
          multiline
          rows={2}
          placeholder="e.g., Home delivery, Prescription consultation, Health checkups..."
        />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="space-between">
      <FormControlLabel
        control={<Switch defaultChecked />}
        label="Set as Active Configuration"
        sx={{ flexGrow: 1 }}
      />

      <Box display="flex" gap={2}>
        <Button
          color="inherit"
          variant="outlined"
          size="large"
          onClick={preview.onTrue}
          disabled={!isValid}
        >
          Preview
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting || formLoading || config.loading}
          disabled={!isValid}
        >
          {!currentConfig ? 'Create Configuration' : 'Update Configuration'}
        </LoadingButton>
      </Box>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={4} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderBasicInfo}
        {renderContactInfo}
        {renderActions}
      </Stack>
    </Form>
  );
}

// ----------------------------------------------------------------------

// Main Pharmacy Overview Component
export function OverviewPharmacyView() {
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryDetailOpen, setCategoryDetailOpen] = useState(false);

  // Use our pharmacy manager hook
  const {
    config,
    categories,
    cart,
    isLoading,
    hasError,
    isPharmacyReady,
    dashboardStats
  } = usePharmacyManager();

  const handleCreateNew = () => {
    config.setConfig(null);
    setEditMode(true);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleFormSuccess = (data) => {
    config.setConfig(data);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleCategoryClick = useCallback((category) => {
    console.log('Category clicked:', category);
    setSelectedCategory(category);
    setCategoryDetailOpen(true);
  }, []);

  const handleCategoryDetailClose = () => {
    setCategoryDetailOpen(false);
    setSelectedCategory(null);
  };

  const handleAddToCart = () => {
    try {
      if (router?.push) {
        router.push(`${paths.dashboard.root}/pharmacy/cart`);
      } else {
        toast.success('Opening cart...');
      }
    } catch (error) {
      toast.info('Cart functionality - Feature coming soon!');
    }
  };

  // Color mapping for categories
  const getCategoryColors = (index) => {
    const colors = [
      { bg: 'error.lighter', border: 'error.light', text: 'error.main' },
      { bg: 'success.lighter', border: 'success.light', text: 'success.main' },
      { bg: 'info.lighter', border: 'info.light', text: 'info.main' },
      { bg: 'warning.lighter', border: 'warning.light', text: 'warning.main' },
      { bg: 'secondary.lighter', border: 'secondary.light', text: 'secondary.main' },
      { bg: 'primary.lighter', border: 'primary.light', text: 'primary.main' },
    ];
    return colors[index % colors.length];
  };

  const renderPharmacyHeader = config.config && !editMode && (
    <Paper
      sx={{
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'primary.contrastText',
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
            width: 64,
            height: 64,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
          }}
        >
          🏥
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {config.config.name}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
            {config.config.description}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Chip
              label={config.config.operating_hours}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'inherit' }}
            />
            <Chip
              label={`License: ${config.config.license_number}`}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'inherit' }}
            />
            {config.config.is_active && (
              <Chip
                label="Active"
                sx={{ bgcolor: 'success.main', color: 'success.contrastText' }}
              />
            )}
          </Stack>
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:cart-plus-bold" />}
            onClick={handleAddToCart}
            sx={{
              color: 'inherit',
              borderColor: 'rgba(255,255,255,0.5)',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.8)',
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Cart ({cart.itemCount})
          </Button>
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:pen-bold" />}
            onClick={handleEdit}
            sx={{
              color: 'inherit',
              borderColor: 'rgba(255,255,255,0.5)',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.8)',
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Edit
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );

  const renderDashboardStats = config.config && !editMode && (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={6} sm={3}>
        <Card sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h3" color="primary.main" fontWeight="bold">
            {dashboardStats.totalCategories}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Categories
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Card sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h3" color="success.main" fontWeight="bold">
            {dashboardStats.totalProducts}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Products
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Card sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h3" color="info.main" fontWeight="bold">
            {dashboardStats.cartItems}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cart Items
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Card sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h3" color="warning.main" fontWeight="bold">
            ₹{dashboardStats.cartValue}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cart Value
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );

  const renderCategories = config.config && !editMode && categories.categories.length > 0 && (
    <Card sx={{ mb: 4 }}>
      <CardHeader
        title="Pharmacy Categories"
        subheader={`${categories.categoriesStats.total} categories available with ${categories.categoriesStats.totalProducts} total products`}
        action={
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => categories.updateFilters({ is_featured: !categories.filters.is_featured })}
            >
              {categories.filters.is_featured ? 'Show All' : 'Featured Only'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:add-circle-bold" />}
              onClick={() => toast.info('Add category feature coming soon!')}
            >
              Add Category
            </Button>
          </Stack>
        }
      />
      <CardContent>
        {categories.loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {categories.categories.map((category, index) => {
              const colors = getCategoryColors(index);

              return (
                <Grid item xs={6} sm={4} md={2} key={category.id}>
                  <Card
                    onClick={() => handleCategoryClick(category)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: (theme) => theme.shadows[12],
                        borderColor: colors.border,
                        '& .category-icon': {
                          transform: 'scale(1.1)',
                        },
                        '& .category-title': {
                          color: colors.text,
                        },
                      },
                    }}
                  >
                    {category.is_featured && (
                      <Chip
                        label="Featured"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'warning.main',
                          color: 'warning.contrastText',
                          fontSize: '0.6rem',
                          height: 20,
                          zIndex: 1,
                        }}
                      />
                    )}

                    <CardContent sx={{ textAlign: 'center', p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box
                        component="img"
                        src={category.icon}
                        alt={category.name}
                        className="category-icon"
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1.5,
                          bgcolor: colors.bg,
                          border: '1px solid',
                          borderColor: colors.border,
                          mx: 'auto',
                          mb: 1.5,
                          p: 1,
                          transition: 'transform 0.3s ease',
                        }}
                      />

                      <Typography
                        className="category-title"
                        variant="subtitle2"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                          fontSize: '0.8rem',
                          lineHeight: 1.2,
                          transition: 'color 0.3s ease',
                          minHeight: 32,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 1,
                        }}
                      >
                        {category.name}
                      </Typography>

                      <Stack spacing={0.5} alignItems="center" sx={{ mt: 'auto' }}>
                        <Chip
                          label={`${category.product_count} items`}
                          size="small"
                          sx={{
                            bgcolor: colors.bg,
                            color: colors.text,
                            fontSize: '0.65rem',
                            height: 20,
                            border: '1px solid',
                            borderColor: colors.border,
                          }}
                        />

                        {category.subcategory_count > 0 && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: '0.6rem' }}
                          >
                            {category.subcategory_count} subcategories
                          </Typography>
                        )}

                        <Typography
                          variant="caption"
                          color="success.main"
                          sx={{ fontSize: '0.6rem', fontWeight: 'bold' }}
                        >
                          ₹{category.min_price} - ₹{category.max_price}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </CardContent>
    </Card>
  );

  // Error state
  if (hasError && !config.config) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Card sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
              <Iconify icon="solar:wifi-router-minimalistic-bold" width={64} sx={{ color: 'error.main', mb: 2 }} />
              <Typography variant="h6" color="error" gutterBottom>
                Connection Error
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {config.error || categories.error || 'Failed to load pharmacy data'}
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

  // Loading state
  if (isLoading && !config.config) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Stack spacing={3} alignItems="center">
              <CircularProgress size={40} thickness={4} />
              <Typography variant="h6" color="text.secondary">
                Loading pharmacy configuration...
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Please wait while we fetch your pharmacy data
              </Typography>
            </Stack>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Pharmacy Management"
          links={[
            { name: 'Dashboard', href: paths.dashboard?.root || '/dashboard' },
            { name: 'Pharmacy' },
          ]}
          action={
            !editMode && (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="solar:cart-bold" />}
                  onClick={handleAddToCart}
                >
                  View Cart ({cart.itemCount})
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={handleCreateNew}
                >
                  Configure Pharmacy
                </Button>
              </Stack>
            )
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {/* Display success message if configuration was just saved */}
        {config.config && !editMode && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={handleEdit}
                startIcon={<Iconify icon="solar:pen-bold" />}
              >
                Edit
              </Button>
            }
          >
            Pharmacy configuration is active and ready to serve customers!
          </Alert>
        )}

        {renderPharmacyHeader}
        {renderDashboardStats}
        {renderCategories}

        {editMode && (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h4">
                  {config.config ? 'Edit Pharmacy Configuration' : 'Setup Pharmacy Configuration'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {config.config ? 'Update your pharmacy information and settings' : 'Configure your pharmacy details to get started'}
                </Typography>
              </Box>
              <Button
                color="inherit"
                variant="outlined"
                startIcon={<Iconify icon="solar:arrow-left-bold" />}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Stack>

            <PharmacyConfigForm
              currentConfig={config.config}
              onSuccess={handleFormSuccess}
              loading={config.loading}
            />
          </>
        )}

        {!editMode && !config.config && (
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
                    bgcolor: 'primary.lighter',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Iconify icon="solar:hospital-bold" width={64} sx={{ color: 'primary.main' }} />
                </Box>
                <Typography variant="h4" gutterBottom>
                  Welcome to Pharmacy Management
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 480 }}>
                  Set up your pharmacy configuration to start managing your inventory,
                  categories, and provide excellent healthcare services to your customers.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={handleCreateNew}
                  >
                    Setup Pharmacy
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Iconify icon="solar:document-text-bold" />}
                    onClick={() => toast.info('Documentation coming soon!')}
                  >
                    View Guide
                  </Button>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Category Detail Dialog */}
        <CategoryDetailDialog
          category={selectedCategory}
          open={categoryDetailOpen}
          onClose={handleCategoryDetailClose}
        />
      </Container>
    </DashboardContent>
  );
}

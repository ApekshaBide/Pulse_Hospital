import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

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
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { Form, Field} from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

// Schema for Pharmacy Configuration
const PharmacyConfigSchema = zod.object({
  name: zod.string().min(1, { message: 'Pharmacy name is required!' }),
  description: zod.string().min(10, { message: 'Description must be at least 10 characters' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  phone: zod.string().min(1, { message: 'Phone number is required!' }),
  email: zod.string().email({ message: 'Invalid email address!' }),
  operatingHours: zod.string().min(1, { message: 'Operating hours are required!' }),
  emergencyContact: zod.string().min(1, { message: 'Emergency contact is required!' }),
  licenseNumber: zod.string().min(1, { message: 'License number is required!' }),
  // Optional fields
  website: zod.string().optional(),
  specialServices: zod.string().optional(),
});

// Mock data for current pharmacy configuration
const mockPharmacyConfig = {
  id: '1',
  name: 'HealthCare Pharmacy',
  description: 'Your trusted neighborhood pharmacy providing quality medicines and healthcare services 24/7.',
  address: '123 Main Street, Downtown, City 12345',
  phone: '+1 (555) 123-4567',
  email: 'info@healthcarepharmacy.com',
  operatingHours: '24/7 - Always Open',
  emergencyContact: '+1 (555) 999-HELP',
  licenseNumber: 'PH-2024-001',
  website: 'https://healthcarepharmacy.com',
  specialServices: 'Home delivery, Prescription consultation, Health checkups',
  isActive: true,
  lastUpdated: '2024-06-01',
};

// Categories for pharmacy services
const pharmacyCategories = [
  { id: 1, name: 'Pain Relief', icon: '💊', color: '#2196F3', bgColor: '#E3F2FD', count: 45 },
  { id: 2, name: 'Cold & Flu', icon: '🤧', color: '#4CAF50', bgColor: '#E8F5E8', count: 32 },
  { id: 3, name: 'Vitamins', icon: '⚡', color: '#FF9800', bgColor: '#FFF3E0', count: 67 },
  { id: 4, name: 'Antibiotics', icon: '🩺', color: '#9C27B0', bgColor: '#F3E5F5', count: 28 },
  { id: 5, name: 'Digestive Health', icon: '🍽️', color: '#F44336', bgColor: '#FFEBEE', count: 23 },
  { id: 6, name: 'Heart Care', icon: '❤️', color: '#00BCD4', bgColor: '#E0F2F1', count: 19 },
];

// ----------------------------------------------------------------------

// Pharmacy Configuration Preview Component
function PharmacyConfigPreview({
  name,
  description,
  address,
  phone,
  email,
  operatingHours,
  emergencyContact,
  licenseNumber,
  website,
  specialServices,
  open,
  isValid,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const hasContent = name || description || address || phone || email;

  const renderHeader = (
    <Stack spacing={2} sx={{ p: 3, pb: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            color: 'white',
          }}
        >
          🏥
        </Box>
        <Box>
          <Typography variant="h4" component="h1">
            {name || 'Pharmacy Name'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            License: {licenseNumber || 'Not specified'}
          </Typography>
        </Box>
      </Stack>

      {description && (
        <Box sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
          <Typography variant="body1">
            {description}
          </Typography>
        </Box>
      )}
    </Stack>
  );

  const renderContent = (
    <Stack spacing={3} sx={{ p: 3, pt: 1 }}>
      {hasContent ? (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Address:</strong> {address || 'Not specified'}
                </Typography>
                <Typography variant="body2">
                  <strong>Phone:</strong> {phone || 'Not specified'}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {email || 'Not specified'}
                </Typography>
                {website && (
                  <Typography variant="body2">
                    <strong>Website:</strong> {website}
                  </Typography>
                )}
              </Stack>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Operating Details
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Hours:</strong> {operatingHours || 'Not specified'}
                </Typography>
                <Typography variant="body2">
                  <strong>Emergency:</strong> {emergencyContact || 'Not specified'}
                </Typography>
                {specialServices && (
                  <Typography variant="body2">
                    <strong>Services:</strong> {specialServices}
                  </Typography>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            py: 10,
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Iconify icon="solar:hospital-bold" width={48} sx={{ color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.disabled">
            No configuration available
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Fill in the pharmacy details to see the preview
          </Typography>
        </Box>
      )}
    </Stack>
  );

  const renderActions = (
    <DialogActions sx={{ p: 3 }}>
      <Stack direction="row" spacing={2} sx={{ width: 1 }}>
        <Button
          fullWidth
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="solar:close-circle-bold" />}
          onClick={onClose}
        >
          Close
        </Button>

        <LoadingButton
          fullWidth
          color="primary"
          variant="contained"
          startIcon={<Iconify icon="solar:check-circle-bold" />}
          onClick={onSubmit}
          loading={isSubmitting}
          disabled={!isValid}
        >
          Save Configuration
        </LoadingButton>
      </Stack>
    </DialogActions>
  );

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { bgcolor: 'background.default' }
      }}
    >
      <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <DialogContent sx={{ flex: 1, p: 0, overflow: 'hidden' }}>
          <Scrollbar sx={{ height: 1 }}>
            {hasContent ? (
              <>
                {renderHeader}
                <Divider />
                {renderContent}
              </>
            ) : (
              <Box
                sx={{
                  py: 10,
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon="solar:hospital-bold" width={64} sx={{ color: 'text.disabled', mb: 3 }} />
                <Typography variant="h5" color="text.disabled" gutterBottom>
                  No Preview Available
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  Fill in the form fields to see your pharmacy configuration preview
                </Typography>
              </Box>
            )}
          </Scrollbar>
        </DialogContent>

        <Divider />
        {renderActions}
      </Box>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

// Pharmacy Configuration Form Component
function PharmacyConfigForm({ currentConfig, onSuccess }) {
  const router = useRouter();
  const preview = useBoolean();

  const defaultValues = useMemo(
    () => ({
      name: currentConfig?.name || '',
      description: currentConfig?.description || '',
      address: currentConfig?.address || '',
      phone: currentConfig?.phone || '',
      email: currentConfig?.email || '',
      operatingHours: currentConfig?.operatingHours || '24/7',
      emergencyContact: currentConfig?.emergencyContact || '',
      licenseNumber: currentConfig?.licenseNumber || '',
      website: currentConfig?.website || '',
      specialServices: currentConfig?.specialServices || '',
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

  useEffect(() => {
    if (currentConfig) {
      reset(defaultValues);
    }
  }, [currentConfig, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const submitData = {
        ...data,
        lastUpdated: new Date().toISOString().split('T')[0],
      };

      reset();
      preview.onFalse();
      toast.success(currentConfig ? 'Pharmacy configuration updated successfully!' : 'Pharmacy configuration created successfully!');

      if (onSuccess) {
        onSuccess(submitData);
      }

      console.info('PHARMACY CONFIG DATA', submitData);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  const renderBasicInfo = (
    <Card>
      <CardHeader
        title="Basic Information"
        subheader="Essential pharmacy details and identification..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="name"
          label="Pharmacy Name"
          placeholder="e.g., HealthCare Pharmacy"
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
            name="licenseNumber"
            label="License Number"
            placeholder="e.g., PH-2024-001"
          />
          <Field.Text
            name="operatingHours"
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
        subheader="How customers can reach your pharmacy..."
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
            name="emergencyContact"
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
          name="specialServices"
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
        control={<Switch defaultChecked inputProps={{ id: 'active-pharmacy-switch' }} />}
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
          loading={isSubmitting}
          disabled={!isValid}
        >
          {!currentConfig ? 'Create Configuration' : 'Update Configuration'}
        </LoadingButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={4} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
          {renderBasicInfo}
          {renderContactInfo}
          {renderActions}
        </Stack>
      </Form>

      <PharmacyConfigPreview
        isValid={isValid}
        onSubmit={onSubmit}
        name={values.name}
        open={preview.value}
        description={values.description}
        onClose={preview.onFalse}
        isSubmitting={isSubmitting}
        address={values.address}
        phone={values.phone}
        email={values.email}
        operatingHours={values.operatingHours}
        emergencyContact={values.emergencyContact}
        licenseNumber={values.licenseNumber}
        website={values.website}
        specialServices={values.specialServices}
      />
    </>
  );
}

// ----------------------------------------------------------------------

// Main Pharmacy Management View Component
export function OverviewPharmacyView() {
  const router = useRouter();
  const [currentConfig, setCurrentConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch current pharmacy configuration
    const fetchConfig = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        setCurrentConfig(mockPharmacyConfig);
      } catch (error) {
        console.error('Error fetching pharmacy config:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const handleCreateNew = () => {
    setCurrentConfig(null);
    setEditMode(true);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleFormSuccess = (data) => {
    setCurrentConfig(data);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const renderPharmacyHeader = currentConfig && !editMode && (
    <Paper
      sx={{
        background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
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
            {currentConfig.name}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
            {currentConfig.description}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Chip
              label={currentConfig.operatingHours}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
            <Chip
              label={`License: ${currentConfig.licenseNumber}`}
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
            />
          </Stack>
        </Box>
        <Button
          variant="outlined"
          startIcon={<Iconify icon="solar:pen-bold" />}
          onClick={handleEdit}
          sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}
        >
          Edit
        </Button>
      </Stack>
    </Paper>
  );

  const renderCategories = currentConfig && !editMode && (
    <Card sx={{ mb: 4 }}>
      <CardHeader
        title="Pharmacy Categories"
        subheader="Available medicine categories and inventory count"
      />
<CardContent
  sx={{
    mt: { xs: 2, sm: 3, md: 4 },
    mx: { xs: 1, sm: 2, md: 3, lg: 4 },
  }}
>
  <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} alignItems="stretch">
    {pharmacyCategories.map((category) => (
      <Grid
        item
        xs={6}
        sm={4}
        md={2}
        key={category.id}
        sx={{
          px: { xs: 0.5, sm: 1, md: 1.5 },
          display: 'flex',
        }}
      >
        <Card
          onClick={() => console.log('Category clicked:', category.name)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexGrow: 1,
            p: { xs: 1.5, sm: 2, md: 2.5 },
            textAlign: 'center',
            borderRadius: { xs: 2, md: 3 },
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            height: '100%',
            width: '100%',
            willChange: 'transform',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: (theme) => theme.shadows[6],
              '& .category-icon': {
                transform: 'scale(1.15) rotate(3deg)',
              },
              '& .category-title': {
                color: category.color,
              },
              '& .category-chip': {
                transform: 'scale(1.1)',
              },
            },
            '&:active': {
              transform: 'translateY(-2px)',
              transition: 'transform 0.1s ease',
            },
          }}
        >
          <Box
            className="category-icon"
            sx={{
              width: { xs: 40, sm: 45, md: 50, lg: 55 },
              height: { xs: 40, sm: 45, md: 50, lg: 55 },
              borderRadius: { xs: 1.5, md: 2 },
              bgcolor: category.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: { xs: 1, sm: 1.25, md: 1.5 },
              fontSize: { xs: 20, sm: 22, md: 24, lg: 26 },
              transition: 'transform 0.3s ease',
            }}
          >
            {category.icon}
          </Box>
          <Typography
            className="category-title"
            variant="subtitle2"
            fontWeight={600}
            gutterBottom
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
              lineHeight: 1.2,
              transition: 'color 0.3s ease',
            }}
          >
            {category.name}
          </Typography>
          <Chip
            className="category-chip"
            label={`${category.count} items`}
            size="small"
            sx={{
              bgcolor: category.bgColor,
              color: category.color,
              fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
              height: { xs: 20, md: 24 },
              mt: 1,
              transition: 'transform 0.3s ease',
            }}
          />
        </Card>
      </Grid>
    ))}
  </Grid>
</CardContent>



    </Card>
  );

  if (loading) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Typography>Loading pharmacy configuration...</Typography>
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
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Healthcare', href: paths.dashboard.healthcare?.root },
            { name: 'Pharmacy' },
          ]}
          action={
            !editMode && (
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={handleCreateNew}
              >
                Configure Pharmacy
              </Button>
            )
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {renderPharmacyHeader}
        {renderCategories}

        {editMode && (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
              <Typography variant="h4">
                {currentConfig ? 'Edit Pharmacy Configuration' : 'Setup Pharmacy Configuration'}
              </Typography>
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
              currentConfig={currentConfig}
              onSuccess={handleFormSuccess}
            />
          </>
        )}

        {!editMode && !currentConfig && (
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
                <Iconify icon="solar:hospital-bold" width={64} sx={{ color: 'text.disabled', mb: 3 }} />
                <Typography variant="h5" color="text.disabled" gutterBottom>
                  No Pharmacy Configuration Found
                </Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>
                  Set up your pharmacy configuration to get started
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={handleCreateNew}
                >
                  Setup Pharmacy
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </DashboardContent>
  );
}

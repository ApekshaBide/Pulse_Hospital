import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { Form, Field } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

// Schema for Diagnostics Configuration
const DiagnosticsConfigSchema = zod.object({
  centerName: zod.string().min(1, { message: 'Diagnostic center name is required!' }),
  description: zod.string().min(10, { message: 'Description must be at least 10 characters' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  phone: zod.string().min(1, { message: 'Phone number is required!' }),
  email: zod.string().email({ message: 'Invalid email address!' }),
  operatingHours: zod.string().min(1, { message: 'Operating hours are required!' }),
  emergencyContact: zod.string().min(1, { message: 'Emergency contact is required!' }),
  licenseNumber: zod.string().min(1, { message: 'License number is required!' }),
  website: zod.string().optional(),
  specializations: zod.string().optional(),
});

// Mock data for current diagnostics configuration
const mockDiagnosticsConfig = {
  id: '1',
  centerName: 'Advanced Diagnostic Center',
  description: 'State-of-the-art diagnostic facility providing comprehensive medical testing and health screening services.',
  address: '456 Healthcare Avenue, Medical District, City 67890',
  phone: '+1 (555) 234-5678',
  email: 'info@advanceddiagnostics.com',
  operatingHours: 'Mon-Sat: 6AM-10PM, Sun: 8AM-6PM',
  emergencyContact: '+1 (555) 888-HELP',
  licenseNumber: 'DX-2024-002',
  website: 'https://advanceddiagnostics.com',
  specializations: 'Blood tests, Imaging, Cardiac screening, Genetic testing, Cancer screening',
  isActive: true,
  lastUpdated: '2024-06-01',
};

// Featured Categories Data
const featuredCategories = [
  {
    id: 1,
    name: 'Blood Tests',
    description: 'Complete blood analysis and screening',
    tests: '45 Tests',
    icon: '🩸',
    color: '#2196F3',
    bgColor: '#E3F2FD',
    count: 45
  },
  {
    id: 2,
    name: 'Imaging',
    description: 'X-Ray, MRI, CT Scan and Ultrasound',
    tests: '25 Tests',
    icon: '🏥',
    color: '#4CAF50',
    bgColor: '#E8F5E8',
    count: 25
  },
  {
    id: 3,
    name: 'Cardiac',
    description: 'Heart health monitoring and tests',
    tests: '18 Tests',
    icon: '❤️',
    color: '#FF9800',
    bgColor: '#FFF3E0',
    count: 18
  },
];

// Health Packages Data
const healthPackages = [
  {
    id: 1,
    name: 'Full Body Checkup',
    description: 'Comprehensive health screening package',
    tests: '50 Tests',
    price: '₹4.5K',
    icon: '👤',
    color: '#2196F3',
    bgColor: '#E3F2FD',
  },
  {
    id: 2,
    name: "Women's Health Package",
    description: "Specialized tests for women's health",
    tests: '25 Tests',
    price: '₹3.2K',
    icon: '👩',
    color: '#4CAF50',
    bgColor: '#E8F5E8',
  },
  {
    id: 3,
    name: "Men's Health Package",
    description: "Specialized tests for men's health",
    tests: '20 Tests',
    price: '₹2.8K',
    icon: '👨',
    color: '#FF9800',
    bgColor: '#FFF3E0',
  },
  {
    id: 4,
    name: 'Senior Citizens Package',
    description: 'Comprehensive care for seniors',
    tests: '30 Tests',
    price: '₹3.8K',
    icon: '👴',
    color: '#9C27B0',
    bgColor: '#F3E5F5',
  },
];

// All Categories Data
const allCategories = [
  { id: 1, name: 'Blood Tests', description: 'Complete blood analysis and screening', tests: '45 Tests', icon: '🩸', color: '#2196F3', bgColor: '#E3F2FD' },
  { id: 2, name: 'Imaging', description: 'X-Ray, MRI, CT Scan and Ultrasound', tests: '25 Tests', icon: '🏥', color: '#4CAF50', bgColor: '#E8F5E8' },
  { id: 3, name: 'Cardiac', description: 'Heart health monitoring and tests', tests: '18 Tests', icon: '❤️', color: '#FF9800', bgColor: '#FFF3E0' },
  { id: 4, name: 'Hormonal', description: 'Hormone levels and endocrine function', tests: '22 Tests', icon: '🧬', color: '#9C27B0', bgColor: '#F3E5F5' },
  { id: 5, name: 'Genetic', description: 'DNA analysis and genetic disorders', tests: '15 Tests', icon: '🧪', color: '#F44336', bgColor: '#FFEBEE' },
  { id: 6, name: 'Allergy', description: 'Allergy testing and immunology', tests: '30 Tests', icon: '🤧', color: '#00BCD4', bgColor: '#E0F2F1' },
  { id: 7, name: 'Cancer Screening', description: 'Early detection and screening tests', tests: '12 Tests', icon: '🎗️', color: '#673AB7', bgColor: '#EDE7F6' },
  { id: 8, name: 'Diabetes', description: 'Blood sugar monitoring and management', tests: '10 Tests', icon: '📊', color: '#E91E63', bgColor: '#FCE4EC' },
  { id: 9, name: 'Liver Function', description: 'Comprehensive liver health assessment', tests: '8 Tests', icon: '🫀', color: '#00BCD4', bgColor: '#E0F2F1' },
  { id: 10, name: 'Kidney Function', description: 'Renal health and function tests', tests: '6 Tests', icon: '🫘', color: '#FF5722', bgColor: '#FBE9E7' },
  { id: 11, name: 'Lipid Profile', description: 'Cholesterol and fat metabolism', tests: '5 Tests', icon: '💚', color: '#8BC34A', bgColor: '#F1F8E9' },
  { id: 12, name: 'Vitamin Profile', description: 'Essential vitamins and minerals', tests: '14 Tests', icon: '⚡', color: '#9C27B0', bgColor: '#F3E5F5' },
];

// ----------------------------------------------------------------------

// Diagnostics Configuration Preview Component
function DiagnosticsConfigPreview({
  centerName,
  description,
  address,
  phone,
  email,
  operatingHours,
  emergencyContact,
  licenseNumber,
  website,
  specializations,
  open,
  isValid,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const hasContent = centerName || description || address || phone || email;

  const renderHeader = (
    <Stack spacing={1.5} sx={{ p: 2, pb: 1.5 }}>
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
          🔬
        </Box>
        <Box>
          <Typography variant="h4" component="h1">
            {centerName || 'Diagnostic Center Name'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            License: {licenseNumber || 'Not specified'}
          </Typography>
        </Box>
      </Stack>

      {description && (
        <Box sx={{ p: 1.5, bgcolor: 'background.neutral', borderRadius: 1 }}>
          <Typography variant="body1">
            {description}
          </Typography>
        </Box>
      )}
    </Stack>
  );

  const renderContent = (
    <Stack spacing={2} sx={{ p: 2, pt: 1 }}>
      {hasContent ? (
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 1.5 }}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Stack spacing={0.5}>
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
            <Card sx={{ p: 1.5 }}>
              <Typography variant="h6" gutterBottom>
                Operating Details
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2">
                  <strong>Hours:</strong> {operatingHours || 'Not specified'}
                </Typography>
                <Typography variant="body2">
                  <strong>Emergency:</strong> {emergencyContact || 'Not specified'}
                </Typography>
                {specializations && (
                  <Typography variant="body2">
                    <strong>Specializations:</strong> {specializations}
                  </Typography>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            py: 8,
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Iconify icon="solar:test-tube-bold" width={48} sx={{ color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.disabled">
            No configuration available
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Fill in the diagnostic center details to see the preview
          </Typography>
        </Box>
      )}
    </Stack>
  );

  const renderActions = (
    <DialogActions sx={{ p: 2 }}>
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
                  py: 8,
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon="solar:test-tube-bold" width={64} sx={{ color: 'text.disabled', mb: 2 }} />
                <Typography variant="h5" color="text.disabled" gutterBottom>
                  No Preview Available
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  Fill in the form fields to see your diagnostic center configuration preview
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

// Diagnostics Configuration Form Component
function DiagnosticsConfigForm({ currentConfig, onSuccess }) {
  const router = useRouter();
  const preview = useBoolean();

  const defaultValues = useMemo(
    () => ({
      centerName: currentConfig?.centerName || '',
      description: currentConfig?.description || '',
      address: currentConfig?.address || '',
      phone: currentConfig?.phone || '',
      email: currentConfig?.email || '',
      operatingHours: currentConfig?.operatingHours || 'Mon-Sat: 9AM-6PM',
      emergencyContact: currentConfig?.emergencyContact || '',
      licenseNumber: currentConfig?.licenseNumber || '',
      website: currentConfig?.website || '',
      specializations: currentConfig?.specializations || '',
    }),
    [currentConfig]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(DiagnosticsConfigSchema),
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
      toast.success(currentConfig ? 'Diagnostic center configuration updated successfully!' : 'Diagnostic center configuration created successfully!');

      if (onSuccess) {
        onSuccess(submitData);
      }

      console.info('DIAGNOSTICS CONFIG DATA', submitData);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  const renderBasicInfo = (
    <Card>
      <CardHeader
        title="Basic Information"
        subheader="Essential diagnostic center details and identification..."
        sx={{ pb: 1 }}
      />

      <Divider />

      <Stack spacing={2} sx={{ p: 2 }}>
        <Field.Text
          name="centerName"
          label="Diagnostic Center Name"
          placeholder="e.g., Advanced Diagnostic Center"
        />

        <Field.Text
          name="description"
          label="Description"
          multiline
          rows={3}
          placeholder="Brief description of your diagnostic center and services..."
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Field.Text
            name="licenseNumber"
            label="License Number"
            placeholder="e.g., DX-2024-002"
          />
          <Field.Text
            name="operatingHours"
            label="Operating Hours"
            placeholder="e.g., Mon-Sat: 9AM-6PM"
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderContactInfo = (
    <Card>
      <CardHeader
        title="Contact Information"
        subheader="How patients can reach your diagnostic center..."
        sx={{ pb: 1 }}
      />

      <Divider />

      <Stack spacing={2} sx={{ p: 2 }}>
        <Field.Text
          name="address"
          label="Address"
          multiline
          rows={2}
          placeholder="Complete diagnostic center address with city and postal code..."
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Field.Text
            name="phone"
            label="Phone Number"
            placeholder="e.g., +1 (555) 234-5678"
          />
          <Field.Text
            name="emergencyContact"
            label="Emergency Contact"
            placeholder="e.g., +1 (555) 888-HELP"
          />
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Field.Text
            name="email"
            label="Email Address"
            placeholder="e.g., info@diagnostics.com"
          />
          <Field.Text
            name="website"
            label="Website (Optional)"
            placeholder="e.g., https://diagnostics.com"
          />
        </Stack>

        <Field.Text
          name="specializations"
          label="Specializations (Optional)"
          multiline
          rows={2}
          placeholder="e.g., Blood tests, Imaging, Cardiac screening, Genetic testing..."
        />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="space-between">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'active-diagnostics-switch' }} />}
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
        <Stack spacing={3} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
          {renderBasicInfo}
          {renderContactInfo}
          {renderActions}
        </Stack>
      </Form>

      <DiagnosticsConfigPreview
        isValid={isValid}
        onSubmit={onSubmit}
        centerName={values.centerName}
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
        specializations={values.specializations}
      />
    </>
  );
}

// ----------------------------------------------------------------------

// Main Diagnostics Management View Component
export function OverviewDiagnosticsView() {
  const router = useRouter();
  const [currentConfig, setCurrentConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const handleCategoryClick = (category) => {
    console.log('Category clicked:', category.name);
  };

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentConfig(mockDiagnosticsConfig);
      } catch (error) {
        console.error('Error fetching diagnostics config:', error);
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

  const renderSearchSection = currentConfig && !editMode && (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ py: 2 }}>
        <TextField
          fullWidth
          placeholder="Find your test..."
          size="medium"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="solar:magnifer-bold" width={20} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            },
          }}
          sx={{ bgcolor: 'background.neutral' }}
        />
      </CardContent>
    </Card>
  );

  const renderFeaturedCategories = currentConfig && !editMode && (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title="Featured Categories"
        subheader="Popular diagnostic tests"
        sx={{ pb: 1 }}
      />
    <CardContent
  sx={{
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 2, sm: 3 },
  }}
>
  <Grid container spacing={3}>
    {featuredCategories.map((category) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4} // you can change to md={3} for 4 cards per row
        key={category.id}
        sx={{
          display: 'flex',
        }}
      >
        <Card
          onClick={() => handleCategoryClick(category)}
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: category.bgColor,
            color: category.color,
            boxShadow: 3,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '&:hover': {
              transform: 'translateY(-6px)',
              boxShadow: 10,
            },
          }}
        >
          <Stack spacing={2} sx={{ height: '100%' }}>
            {/* Top Row: Icon and Growth */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: '#ffffff22',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  color: 'inherit',
                }}
              >
                {category.icon}
              </Box>
              <Typography variant="caption" fontWeight={500}>
                {category.growth > 0
                  ? `+${category.growth}%`
                  : `${category.growth}%`}
              </Typography>
            </Stack>

            {/* Middle Row: Title */}
            <Typography variant="subtitle1" fontWeight={600}>
              {category.name}
            </Typography>

            {/* Bottom Row: Value and Chip */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6" fontWeight={700}>
                {category.value}
              </Typography>
              <Chip
                label={category.tests}
                size="small"
                sx={{
                  bgcolor: '#ffffff33',
                  color: 'inherit',
                  fontWeight: 600,
                }}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    ))}
  </Grid>
</CardContent>

    </Card>
  );

  const renderHealthPackages = currentConfig && !editMode && (
   <Card sx={{ mb: 2 }}>
  <CardHeader
    title="Health Packages"
    subheader="Comprehensive checkup plans"
    sx={{ pb: 1 }}
  />

  <CardContent sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3 } }}>
    <Grid
      container
      spacing={{ xs: 2, sm: 3, md: 3 }}
      alignItems="stretch"
    >
      {healthPackages.map((pkg) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={3}
          key={pkg.id}
          sx={{ display: 'flex' }}
        >
          <Card
            onClick={() => handleCategoryClick(pkg)}
            sx={{
              p: { xs: 2, sm: 2.5 },
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: 2,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="flex-start"
              sx={{ flex: 1 }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: pkg.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  flexShrink: 0,
                }}
              >
                {pkg.icon}
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  noWrap
                  sx={{ mb: 0.75 }}
                >
                  {pkg.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: '0.85rem',
                    mb: 1,
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {pkg.description}
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label={pkg.tests}
                    size="small"
                    sx={{
                      bgcolor: pkg.bgColor,
                      color: pkg.color,
                      fontWeight: 600,
                      height: 22,
                      fontSize: '0.75rem',
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color={pkg.color}
                    sx={{ fontSize: '0.9rem' }}
                  >
                    {pkg.price}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  </CardContent>
</Card>

  );

  const renderAllCategories = currentConfig && !editMode && (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title="All Categories"
        subheader="Browse all available tests"
        sx={{ pb: 1 }}
      />
    <CardContent
  sx={{
    px: { xs: 2, sm: 3, md: 4 }, // consistent left/right margin
    py: { xs: 2, sm: 2.5 },      // consistent vertical padding
  }}
>
  <Grid container spacing={2}>
    {allCategories.map((category) => (
      <Grid
        item
        xs={6}
        sm={4}
        md={3}
        lg={2}
        key={category.id}
        sx={{ display: 'flex' }} // ensures full height cards
      >
        <Card
          onClick={() => handleCategoryClick(category)}
          sx={{
            p: { xs: 1.5, sm: 2 },
            width: '100%',
            height: '100%',
            textAlign: 'center',
            borderRadius: { xs: 2, md: 3 },
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            '&:hover': {
              transform: 'translateY(-4px) translateX(6px)',
              boxShadow: (theme) => theme.shadows[8],
              '& .category-icon': {
                transform: 'scale(1.2) rotateZ(5deg)',
              },
              '& .category-title': {
                color: category.color,
              },
              '& .category-chip': {
                transform: 'translateX(3px) scale(1.1)',
              },
            },
            '&:active': {
              transform: 'translateY(-2px) translateX(3px)',
              transition: 'all 0.1s ease',
            },
          }}
        >
          <Box
            className="category-icon"
            sx={{
              width: { xs: 40, sm: 45, md: 50 },
              height: { xs: 40, sm: 45, md: 50 },
              borderRadius: { xs: 1.5, md: 2 },
              bgcolor: category.bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: { xs: 1, sm: 1.25 },
              fontSize: { xs: 20, sm: 22, md: 24 },
              transition: 'transform 0.3s ease',
            }}
          >
            {category.icon}
          </Box>

          <Typography
            className="category-title"
            variant="subtitle2"
            fontWeight={600}
            mb={0.5}
            sx={{
              fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
              lineHeight: 1.2,
              transition: 'color 0.3s ease',
            }}
          >
            {category.name}
          </Typography>

          <Typography
            variant="caption"
            mb={0.75}
            sx={{
              fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {category.description}
          </Typography>

          <Chip
            className="category-chip"
            label={category.tests}
            size="small"
            sx={{
              bgcolor: category.bgColor,
              color: category.color,
              fontWeight: 600,
              fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' },
              height: { xs: 20, md: 24 },
              transition: 'transform 0.3s ease',
              mx: 'auto',
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
            <Typography>Loading diagnostic center configuration...</Typography>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Diagnostics Management"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Healthcare', href: paths.dashboard.healthcare?.root },
            { name: 'Diagnostics' },
          ]}
          action={
            !editMode && (
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={handleCreateNew}
              >
                Configure Diagnostics
              </Button>
            )
          }
          sx={{ mb: { xs: 2, md: 3 } }}
        />

        {renderSearchSection}
        {renderFeaturedCategories}
        {renderHealthPackages}
        {renderAllCategories}

        {editMode && (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="h4">
                {currentConfig ? 'Edit Diagnostics Configuration' : 'Setup Diagnostics Configuration'}
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

            <DiagnosticsConfigForm
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
                  py: 8,
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Iconify icon="solar:test-tube-bold" width={64} sx={{ color: 'text.disabled', mb: 2 }} />
                <Typography variant="h5" color="text.disabled" gutterBottom>
                  No Diagnostic Center Configuration Found
                </Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mb: 2 }}>
                  Set up your diagnostic center configuration to get started
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={handleCreateNew}
                >
                  Setup Diagnostics
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </DashboardContent>
  );
}

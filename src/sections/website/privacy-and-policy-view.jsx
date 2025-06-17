import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import {useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
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
import { Markdown } from 'src/components/markdown';
import { Scrollbar } from 'src/components/scrollbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';


// ----------------------------------------------------------------------

// Schema for Privacy Policy Form
const PrivacyPolicySchema = zod.object({
  title: zod.string().min(1, { message: 'Title is required!' }),
  content: schemaHelper.editor().min(100, { message: 'Content must be at least 100 characters' }),
  effectiveDate: zod.string().min(1, { message: 'Effective date is required!' }),
  version: zod.string().min(1, { message: 'Version is required!' }),
  // Optional fields
  lastUpdated: zod.string().optional(),
  summary: zod.string().optional(),
});

// Mock data - replace with actual API call
const mockCurrentPolicy = {
  id: '1',
  title: 'Privacy Policy',
  content: `
# Privacy Policy

## Introduction
We respect your privacy and are committed to protecting your personal data.

## Information We Collect
- Personal identification information
- Usage data
- Cookies and tracking technologies

## How We Use Your Information
We use the information we collect to:
- Provide and maintain our services
- Improve user experience
- Communicate with you

## Data Protection
We implement appropriate security measures to protect your data.

## Contact Us
If you have questions about this privacy policy, please contact us.
  `,
  effectiveDate: '2024-01-01',
  version: '2.0',
  lastUpdated: '2024-06-01',
  summary: 'This policy explains how we collect, use, and protect your personal information.',
  isActive: true,
};

// ----------------------------------------------------------------------

// Privacy Policy Preview Component
function PrivacyPolicyPreview({
  title,
  content,
  effectiveDate,
  version,
  summary,
  open,
  isValid,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const hasContent = title || content || effectiveDate || version;

  const renderHeader = (
    <Stack spacing={2} sx={{ p: 3, pb: 2 }}>
      <Typography variant="h4" component="h1">
        {title || 'Privacy Policy'}
      </Typography>

      <Stack direction="row" spacing={3} sx={{ color: 'text.secondary' }}>
        {version && (
          <Typography variant="body2">
            Version: {version}
          </Typography>
        )}
        {effectiveDate && (
          <Typography variant="body2">
            Effective Date: {new Date(effectiveDate).toLocaleDateString()}
          </Typography>
        )}
      </Stack>

      {summary && (
        <Box sx={{ p: 2, bgcolor: 'background.neutral', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            {summary}
          </Typography>
        </Box>
      )}
    </Stack>
  );

  const renderContent = (
    <Stack spacing={3} sx={{ p: 3, pt: 1 }}>
      {content ? (
        <Markdown content={content} />
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
          <Iconify icon="solar:document-bold" width={48} sx={{ color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.disabled">
            No content available
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Start writing your privacy policy content to see the preview
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
          Save Policy
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
                <Iconify icon="solar:document-bold" width={64} sx={{ color: 'text.disabled', mb: 3 }} />
                <Typography variant="h5" color="text.disabled" gutterBottom>
                  No Preview Available
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  Fill in the form fields to see your privacy policy preview
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

// Privacy Policy Form Component
function PrivacyPolicyForm({ currentPolicy, onSuccess }) {
  const router = useRouter();
  const preview = useBoolean();

  const defaultValues = useMemo(
    () => ({
      title: currentPolicy?.title || 'Privacy Policy',
      content: currentPolicy?.content || '',
      effectiveDate: currentPolicy?.effectiveDate || '',
      version: currentPolicy?.version || '1.0',
      lastUpdated: currentPolicy?.lastUpdated || '',
      summary: currentPolicy?.summary || '',
    }),
    [currentPolicy]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(PrivacyPolicySchema),
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
    if (currentPolicy) {
      reset(defaultValues);
    }
  }, [currentPolicy, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Add current timestamp for lastUpdated if not provided
      const submitData = {
        ...data,
        lastUpdated: data.lastUpdated || new Date().toISOString().split('T')[0],
      };

      reset();
      preview.onFalse();
      toast.success(currentPolicy ? 'Privacy Policy updated successfully!' : 'Privacy Policy created successfully!');

      if (onSuccess) {
        onSuccess(submitData);
      }

      console.info('PRIVACY POLICY DATA', submitData);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  const renderPolicyDetails = (
    <Card>
      <CardHeader
        title="Policy Details"
        subheader="Basic information about the privacy policy..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="title"
          label="Policy Title"
          placeholder="e.g., Privacy Policy, Data Protection Policy"
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Field.Text
            name="version"
            label="Version"
            placeholder="e.g., 1.0, 2.1"
          />
          <Field.DatePicker
            name="effectiveDate"
            label="Effective Date"
          />
        </Stack>

        <Field.DatePicker
          name="lastUpdated"
          label="Last Updated (Optional)"
          helperText="Leave empty to auto-set to today's date"
        />

        <Field.Text
          name="summary"
          label="Summary (Optional)"
          multiline
          rows={2}
          placeholder="Brief summary of key policy points..."
        />
      </Stack>
    </Card>
  );

  const renderPolicyContent = (
    <Card>
      <CardHeader
        title="Policy Content"
        subheader="The main content of your privacy policy..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Policy Content</Typography>
          <Typography variant="body2" color="text.secondary">
            Write your complete privacy policy content here. Include sections like data collection,
            usage, sharing, user rights, contact information, etc.
          </Typography>
          <Field.Editor name="content" sx={{ maxHeight: 600 }} />
        </Stack>
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="space-between">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'active-policy-switch' }} />}
        label="Set as Active Policy"
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
          {!currentPolicy ? 'Create Policy' : 'Update Policy'}
        </LoadingButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={4} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
          {renderPolicyDetails}
          {renderPolicyContent}
          {renderActions}
        </Stack>
      </Form>

      <PrivacyPolicyPreview
        isValid={isValid}
        onSubmit={onSubmit}
        title={values.title}
        open={preview.value}
        content={values.content}
        onClose={preview.onFalse}
        isSubmitting={isSubmitting}
        effectiveDate={values.effectiveDate}
        version={values.version}
        summary={values.summary}
      />
    </>
  );
}

// ----------------------------------------------------------------------

// Main Privacy and Policy View Component
export function PrivacyAndPolicyView() {
  const router = useRouter();
  const [currentPolicy, setCurrentPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch current policy
    const fetchPolicy = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        setCurrentPolicy(mockCurrentPolicy);
      } catch (error) {
        console.error('Error fetching policy:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, []);

  const handleCreateNew = () => {
    setCurrentPolicy(null);
    setEditMode(true);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleFormSuccess = (data) => {
    setCurrentPolicy(data);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const renderCurrentPolicy = currentPolicy && !editMode && (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h6">Current Active Policy</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:pen-bold" />}
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleCreateNew}
            >
              Create New
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            <strong>Title:</strong> {currentPolicy.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Version:</strong> {currentPolicy.version}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Effective Date:</strong> {new Date(currentPolicy.effectiveDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Last Updated:</strong> {new Date(currentPolicy.lastUpdated).toLocaleDateString()}
          </Typography>
          {currentPolicy.summary && (
            <Typography variant="body2" color="text.secondary">
              <strong>Summary:</strong> {currentPolicy.summary}
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <DashboardContent>
        <Container maxWidth="xl">
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
            <Typography>Loading...</Typography>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Privacy & Policy Management"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Settings', href: paths.dashboard.settings?.root },
            { name: 'Privacy Policy' },
          ]}
          action={
            !editMode && (
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={handleCreateNew}
              >
                Create New Policy
              </Button>
            )
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {renderCurrentPolicy}

        {editMode && (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
              <Typography variant="h4">
                {currentPolicy ? 'Edit Privacy Policy' : 'Create Privacy Policy'}
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

            <PrivacyPolicyForm
              currentPolicy={currentPolicy}
              onSuccess={handleFormSuccess}
            />
          </>
        )}

        {!editMode && !currentPolicy && (
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
                <Iconify icon="solar:document-bold" width={64} sx={{ color: 'text.disabled', mb: 3 }} />
                <Typography variant="h5" color="text.disabled" gutterBottom>
                  No Privacy Policy Found
                </Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>
                  Create your first privacy policy to get started
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={handleCreateNew}
                >
                  Create Privacy Policy
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </DashboardContent>
  );
}

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

// Schema for Terms and Conditions Form
const TermsConditionsSchema = zod.object({
  title: zod.string().min(1, { message: 'Title is required!' }),
  content: schemaHelper.editor().min(100, { message: 'Content must be at least 100 characters' }),
  effectiveDate: zod.string().min(1, { message: 'Effective date is required!' }),
  version: zod.string().min(1, { message: 'Version is required!' }),
  // Optional fields
  lastUpdated: zod.string().optional(),
  summary: zod.string().optional(),
});

// Mock data - replace with actual API call
const mockCurrentTerms = {
  id: '1',
  title: 'Terms and Conditions',
  content: `
# Terms and Conditions

## Introduction
These Terms and Conditions govern your use of our service and tell you how we operate.

## Acceptance of Terms
By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement.

## Use License
Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.

## Disclaimer
The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

## Limitations
In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.

## Account Terms
You are responsible for safeguarding the password that you use to access the service and for all activities that occur under your account.

## Prohibited Uses
You may not use our service for any illegal or unauthorized purpose or to violate any laws in your jurisdiction.

## Termination
We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever.

## Changes to Terms
We reserve the right, at our sole discretion, to modify or replace these Terms at any time.

## Contact Information
If you have any questions about these Terms and Conditions, please contact us.
  `,
  effectiveDate: '2024-01-01',
  version: '2.0',
  lastUpdated: '2024-06-01',
  summary: 'These terms outline the rules and regulations for using our service and your rights and responsibilities as a user.',
  isActive: true,
};

// ----------------------------------------------------------------------

// Terms and Conditions Preview Component
function TermsConditionsPreview({
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
        {title || 'Terms and Conditions'}
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
          <Iconify icon="solar:document-text-bold" width={48} sx={{ color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.disabled">
            No content available
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Start writing your terms and conditions content to see the preview
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
          Save Terms
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
                <Iconify icon="solar:document-text-bold" width={64} sx={{ color: 'text.disabled', mb: 3 }} />
                <Typography variant="h5" color="text.disabled" gutterBottom>
                  No Preview Available
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  Fill in the form fields to see your terms and conditions preview
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

// Terms and Conditions Form Component
function TermsConditionsForm({ currentTerms, onSuccess }) {
  const router = useRouter();
  const preview = useBoolean();

  const defaultValues = useMemo(
    () => ({
      title: currentTerms?.title || 'Terms and Conditions',
      content: currentTerms?.content || '',
      effectiveDate: currentTerms?.effectiveDate || '',
      version: currentTerms?.version || '1.0',
      lastUpdated: currentTerms?.lastUpdated || '',
      summary: currentTerms?.summary || '',
    }),
    [currentTerms]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(TermsConditionsSchema),
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
    if (currentTerms) {
      reset(defaultValues);
    }
  }, [currentTerms, defaultValues, reset]);

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
      toast.success(currentTerms ? 'Terms and Conditions updated successfully!' : 'Terms and Conditions created successfully!');

      if (onSuccess) {
        onSuccess(submitData);
      }

      console.info('TERMS AND CONDITIONS DATA', submitData);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  const renderTermsDetails = (
    <Card>
      <CardHeader
        title="Terms Details"
        subheader="Basic information about the terms and conditions..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="title"
          label="Terms Title"
          placeholder="e.g., Terms and Conditions, Terms of Service, User Agreement"
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
          placeholder="Brief summary of key terms and user responsibilities..."
        />
      </Stack>
    </Card>
  );

  const renderTermsContent = (
    <Card>
      <CardHeader
        title="Terms Content"
        subheader="The main content of your terms and conditions..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Terms Content</Typography>
          <Typography variant="body2" color="text.secondary">
            Write your complete terms and conditions content here. Include sections like acceptance of terms,
            use license, user accounts, prohibited uses, termination, liability limitations, etc.
          </Typography>
          <Field.Editor name="content" sx={{ maxHeight: 600 }} />
        </Stack>
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="space-between">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'active-terms-switch' }} />}
        label="Set as Active Terms"
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
          {!currentTerms ? 'Create Terms' : 'Update Terms'}
        </LoadingButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={4} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
          {renderTermsDetails}
          {renderTermsContent}
          {renderActions}
        </Stack>
      </Form>

      <TermsConditionsPreview
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

// Main Terms and Conditions View Component
export function TermsAndConditionsView() {
  const router = useRouter();
  const [currentTerms, setCurrentTerms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch current terms
    const fetchTerms = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        setCurrentTerms(mockCurrentTerms);
      } catch (error) {
        console.error('Error fetching terms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const handleCreateNew = () => {
    setCurrentTerms(null);
    setEditMode(true);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleFormSuccess = (data) => {
    setCurrentTerms(data);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const renderCurrentTerms = currentTerms && !editMode && (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h6">Current Active Terms</Typography>
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
            <strong>Title:</strong> {currentTerms.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Version:</strong> {currentTerms.version}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Effective Date:</strong> {new Date(currentTerms.effectiveDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Last Updated:</strong> {new Date(currentTerms.lastUpdated).toLocaleDateString()}
          </Typography>
          {currentTerms.summary && (
            <Typography variant="body2" color="text.secondary">
              <strong>Summary:</strong> {currentTerms.summary}
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
          heading="Terms & Conditions Management"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Settings', href: paths.dashboard.settings?.root },
            { name: 'Terms & Conditions' },
          ]}
          action={
            !editMode && (
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={handleCreateNew}
              >
                Create New Terms
              </Button>
            )
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {renderCurrentTerms}

        {editMode && (
          <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
              <Typography variant="h4">
                {currentTerms ? 'Edit Terms and Conditions' : 'Create Terms and Conditions'}
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

            <TermsConditionsForm
              currentTerms={currentTerms}
              onSuccess={handleFormSuccess}
            />
          </>
        )}

        {!editMode && !currentTerms && (
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
                <Iconify icon="solar:document-text-bold" width={64} sx={{ color: 'text.disabled', mb: 3 }} />
                <Typography variant="h5" color="text.disabled" gutterBottom>
                  No Terms and Conditions Found
                </Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>
                  Create your first terms and conditions to get started
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={handleCreateNew}
                >
                  Create Terms and Conditions
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </DashboardContent>
  );
}

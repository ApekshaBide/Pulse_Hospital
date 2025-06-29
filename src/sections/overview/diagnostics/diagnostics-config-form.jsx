// src/sections/overview/diagnostics/diagnostics-config-form.jsx

import { useState, useCallback } from 'react';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';

import { useDiagnosticsActions } from 'src/hooks/use-diagnostics';

import { Form, Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const schema = Yup.object().shape({
  centerName: Yup.string().required('Center name is required'),
  description: Yup.string().required('Description is required'),
  address: Yup.string().required('Address is required'),
  phone: Yup.string().required('Phone number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  operatingHours: Yup.string().required('Operating hours are required'),
  emergencyContact: Yup.string().required('Emergency contact is required'),
  licenseNumber: Yup.string().required('License number is required'),
  website: Yup.string().url('Invalid URL'),
  specializations: Yup.string().required('Specializations are required'),
});

// ----------------------------------------------------------------------

export function DiagnosticsConfigForm({ currentConfig, onSuccess }) {
  const [submitError, setSubmitError] = useState('');
  const { createConfig, updateConfig } = useDiagnosticsActions();

const defaultValues = useMemo(() => ({
  centerName:     currentConfig?.centerName     || '',
  description:    currentConfig?.description    || '',
  address:        currentConfig?.address        || '',
  phone:          currentConfig?.phone          || '',
  email:          currentConfig?.email          || '',
  operatingHours: currentConfig?.operatingHours || '',
  emergencyContact: currentConfig?.emergencyContact || '',
  licenseNumber:  currentConfig?.licenseNumber  || '',
  website:        currentConfig?.website        || '',
  specializations: currentConfig?.specializations || '',
}), [currentConfig]);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = useCallback(
    async (data) => {
      try {
        setSubmitError('');

        if (currentConfig?.id) {
          await updateConfig(currentConfig.id, data);
        } else {
          await createConfig(data);
        }

        onSuccess?.(data);
      } catch (error) {
        console.error('Form submission error:', error);
        setSubmitError(error.message || 'An error occurred while saving the configuration');
      }
    },
    [currentConfig, createConfig, updateConfig, onSuccess]
  );

  const handleReset = useCallback(() => {
    reset(defaultValues);
    setSubmitError('');
  }, [reset, defaultValues]);

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                <Iconify icon="solar:hospital-bold" sx={{ mr: 1, verticalAlign: 'middle' }} />
                Basic Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Field.Text
                    name="centerName"
                    label="Diagnostic Center Name"
                    placeholder="Enter center name"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field.Text
                    name="licenseNumber"
                    label="License Number"
                    placeholder="Enter license number"
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field.Text
                    name="description"
                    label="Description"
                    placeholder="Describe your diagnostic services"
                    multiline
                    rows={3}
                    required
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field.Text
                    name="specializations"
                    label="Specializations"
                    placeholder="e.g., Blood tests, Imaging, Cardiac screening, Genetic testing"
                    helperText="List your key diagnostic specializations separated by commas"
                    required
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                <Iconify icon="solar:phone-bold" sx={{ mr: 1, verticalAlign: 'middle' }} />
                Contact Information
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Field.Text
                    name="address"
                    label="Address"
                    placeholder="Enter full address"
                    multiline
                    rows={2}
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field.Text
                    name="phone"
                    label="Phone Number"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field.Text
                    name="emergencyContact"
                    label="Emergency Contact"
                    placeholder="+1 (555) 888-HELP"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field.Text
                    name="email"
                    label="Email Address"
                    placeholder="info@diagnostics.com"
                    type="email"
                    required
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field.Text
                    name="website"
                    label="Website (Optional)"
                    placeholder="https://www.diagnostics.com"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field.Text
                    name="operatingHours"
                    label="Operating Hours"
                    placeholder="Mon-Sat: 6AM-10PM, Sun: 8AM-6PM"
                    helperText="Specify your center's operating hours"
                    required
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Error Message */}
        {submitError && (
          <Grid item xs={12}>
            <Alert severity="error">
              {submitError}
            </Alert>
          </Grid>
        )}

        {/* Form Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  Reset
                </Button>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  loadingIndicator="Saving..."
                >
                  {currentConfig ? 'Update Configuration' : 'Save Configuration'}
                </LoadingButton>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}

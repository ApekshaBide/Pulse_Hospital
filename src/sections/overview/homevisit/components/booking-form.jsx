import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

// Schema for Booking Form
const BookingSchema = zod.object({
  patientName: zod.string().min(1, { message: 'Patient name is required!' }),
  contactNumber: zod.string().min(10, { message: 'Valid contact number is required!' }),
  selectedDate: zod.string().min(1, { message: 'Date is required!' }),
  timeSlot: zod.string().min(1, { message: 'Time slot is required!' }),
  // Optional fields
  specialInstructions: zod.string().optional(),
});

// Time slots data
const timeSlots = [
  { id: 1, label: '09:00 AM - 12:00 PM', value: '09:00-12:00' },
  { id: 2, label: '12:00 PM - 06:00 PM', value: '12:00-18:00' },
  { id: 3, label: '06:00 PM - 09:00 PM', value: '18:00-21:00' },
];

// ----------------------------------------------------------------------

// Booking Form Component
export function BookingForm({ selectedPackage, onSuccess, onCancel }) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const defaultValues = useMemo(
    () => ({
      patientName: '',
      contactNumber: '',
      selectedDate: '',
      timeSlot: '',
      specialInstructions: '',
    }),
    []
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(BookingSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const submitData = {
        ...data,
        packageName: selectedPackage?.name,
        packagePrice: selectedPackage?.price,
        packageDuration: selectedPackage?.duration,
        bookingDate: new Date().toISOString().split('T')[0],
      };

      reset();
      setSelectedTimeSlot('');
      toast.success('Booking confirmed successfully!');

      if (onSuccess) {
        onSuccess(submitData);
      }

      console.info('BOOKING DATA', submitData);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot.value);
    setValue('timeSlot', timeSlot.value);
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardHeader
          title={`Book ${selectedPackage?.name}`}
          subheader={`${selectedPackage?.price} / ${selectedPackage?.duration}`}
          sx={{
            pb: 2,
            '& .MuiCardHeader-subheader': {
              color: selectedPackage?.color,
              fontWeight: 600,
              fontSize: '1.1rem'
            }
          }}
        />

        <Divider />

        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Stack spacing={3}>
            {/* Patient Information */}
            <Field.Text
              name="patientName"
              label="Patient Name *"
              placeholder="Enter patient full name"
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, color: 'text.secondary' }}>
                    <Iconify icon="solar:user-bold" width={20} />
                  </Box>
                ),
              }}
            />

            <Field.Text
              name="contactNumber"
              label="Contact Number *"
              placeholder="Enter contact number"
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, color: 'text.secondary' }}>
                    <Iconify icon="solar:phone-bold" width={20} />
                  </Box>
                ),
              }}
            />

            <Field.DatePicker
              name="selectedDate"
              label="Select Date *"
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, color: 'text.secondary' }}>
                    <Iconify icon="solar:calendar-bold" width={20} />
                  </Box>
                ),
              }}
            />

            {/* Time Slot Selection */}
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight={600}>
                Preferred Time Slot *
              </Typography>
              <Grid container spacing={2}>
                {timeSlots.map((timeSlot) => (
                  <Grid item xs={12} sm={6} key={timeSlot.id}>
                    <Card
                      onClick={() => handleTimeSlotSelect(timeSlot)}
                      sx={{
                        p: { xs: 1.5, sm: 2 },
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        bgcolor: selectedTimeSlot === timeSlot.value ? selectedPackage?.bgColor : 'background.paper',
                        border: selectedTimeSlot === timeSlot.value ? `2px solid ${selectedPackage?.color}` : '1px solid',
                        borderColor: selectedTimeSlot === timeSlot.value ? selectedPackage?.color : 'divider',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: (theme) => theme.shadows[4],
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color={selectedTimeSlot === timeSlot.value ? selectedPackage?.color : 'text.primary'}
                        textAlign="center"
                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                      >
                        {timeSlot.label}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>

            <Field.Text
              name="specialInstructions"
              label="Special Instructions (Optional)"
              placeholder="Any special instructions for the healthcare provider..."
              multiline
              rows={3}
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }}>
                    <Iconify icon="solar:document-text-bold" width={20} />
                  </Box>
                ),
              }}
            />

            {/* Action Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 2 }}>
              <Button
                color="inherit"
                variant="outlined"
                size="large"
                startIcon={<Iconify icon="solar:arrow-left-bold" />}
                onClick={onCancel}
                fullWidth
              >
                Cancel
              </Button>

              <LoadingButton
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Iconify icon="solar:check-circle-bold" />}
                loading={isSubmitting}
                disabled={!isValid}
                fullWidth
                sx={{
                  bgcolor: selectedPackage?.color,
                  '&:hover': {
                    bgcolor: selectedPackage?.color,
                    opacity: 0.9,
                  },
                }}
              >
                Confirm Booking
              </LoadingButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Form>
  );
}

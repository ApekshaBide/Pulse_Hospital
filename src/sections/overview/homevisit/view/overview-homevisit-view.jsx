// src/sections/overview/homevisit/view/overview-homevisit-view.jsx

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';

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

// Schema for Booking Form
const BookingSchema = zod.object({
  patientName: zod.string().min(1, { message: 'Patient name is required!' }),
  contactNumber: zod.string().min(10, { message: 'Valid contact number is required!' }),
  selectedDate: zod.string().min(1, { message: 'Date is required!' }),
  timeSlot: zod.string().min(1, { message: 'Time slot is required!' }),
  specialInstructions: zod.string().optional(),
});

// Schema for Patient Information Form
const PatientInfoSchema = zod.object({
  patientName: zod.string().min(1, { message: 'Patient name is required!' }),
  age: zod.string().min(1, { message: 'Age is required!' }),
  gender: zod.string().min(1, { message: 'Gender is required!' }),
  contactNumber: zod.string().min(10, { message: 'Valid contact number is required!' }),
  address: zod.string().min(1, { message: 'Address is required!' }),
  medicalHistory: zod.string().optional(),
});

// Time slots data
const timeSlots = [
  { id: 1, label: '09:00 AM - 12:00 PM', value: '09:00-12:00' },
  { id: 2, label: '12:00 PM - 06:00 PM', value: '12:00-18:00' },
  { id: 3, label: '06:00 PM - 09:00 PM', value: '18:00-21:00' },
];

// Mock data for healthcare services
const mockCurrentHealthcareData = {
  id: '1',
  centerName: 'Advanced Home Healthcare',
  description: 'Professional healthcare services delivered to your home with trained medical staff.',
  serviceCategories: [
    {
      id: 1,
      name: 'Nursing Care',
      description: 'Professional nursing services at home',
      icon: 'solar:health-bold',
      color: '#2196F3',
      bgColor: '#E3F2FD',
      isActive: true
    },
    {
      id: 2,
      name: 'Home Visit',
      description: 'Doctor visits to your home',
      icon: 'solar:home-bold',
      color: '#4CAF50',
      bgColor: '#E8F5E8',
      isActive: false
    },
  ],
  durationOptions: [
    {
      id: 1,
      name: 'Full Day (12hrs)',
      description: 'Complete 12-hour service',
      isActive: true
    },
    {
      id: 2,
      name: 'Half Day (6hrs)',
      description: 'Half-day 6-hour service',
      isActive: false
    },
  ],
  healthcarePackages: [
    {
      id: 1,
      name: 'Full Day Nursing Care',
      description: 'Complete nursing care for 12 hours with trained medical staff',
      duration: '12hrs',
      price: '₹2500',
      services: [
        'Medication Administration',
        'Vital Signs Monitoring',
        'Wound Care & Dressing',
        'IV Therapy Management'
      ],
      additionalServices: '+4 more services',
      color: '#2196F3',
      bgColor: '#E3F2FD',
    },
    {
      id: 2,
      name: 'Post-Surgery Care',
      description: 'Specialized post-operative care for recovering patients',
      duration: '12hrs',
      price: '₹3000',
      services: [
        'Post-operative Monitoring',
        'Pain Management',
        'Medication Administration',
        'Recovery Assistance'
      ],
      additionalServices: '+3 more services',
      color: '#FF9800',
      bgColor: '#FFF3E0',
    },
    {
      id: 3,
      name: 'Elderly Care',
      description: 'Comprehensive care for elderly patients at home',
      duration: '24hrs',
      price: '₹4500',
      services: [
        'Daily Living Assistance',
        'Medication Management',
        'Health Monitoring',
        'Companionship'
      ],
      additionalServices: '+5 more services',
      color: '#9C27B0',
      bgColor: '#F3E5F5',
    },
  ],
  isActive: true,
  lastUpdated: '2024-06-01',
};

// ----------------------------------------------------------------------

// Patient Information Form Drawer Component
function PatientInfoDrawer({ open, onClose, onNext }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const defaultValues = useMemo(
    () => ({
      patientName: '',
      age: '',
      gender: '',
      contactNumber: '',
      address: '',
      medicalHistory: '',
    }),
    []
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(PatientInfoSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info('PATIENT INFO DATA', data);
      toast.success('Patient information saved successfully!');
      onNext(data);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : 480,
          maxWidth: '100%',
          borderRadius: 0,
        }
      }}
    >
      <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  bgcolor: '#E8F5E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon="solar:user-bold" width={20} sx={{ color: '#4CAF50' }} />
              </Box>
              <Box>
                <Typography variant="h6" component="div">
                  Add Patient Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enter patient details for consultation
                </Typography>
              </Box>
            </Stack>
            <IconButton onClick={handleClose} size="small">
              <Iconify icon="solar:close-circle-bold" width={24} />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <Scrollbar sx={{ height: 1 }}>
            <Box sx={{ p: 2 }}>
              <Form methods={methods} onSubmit={onSubmit}>
                <Stack spacing={2}>
                  <Field.Text
                    name="patientName"
                    label="Patient Name"
                    placeholder="Enter patient full name"
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ mr: 1, color: 'text.secondary' }}>
                          <Iconify icon="solar:user-bold" width={20} />
                        </Box>
                      ),
                    }}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field.Text
                        name="age"
                        label="Age"
                        placeholder="Age"
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ mr: 1, color: 'text.secondary' }}>
                              <Iconify icon="solar:calendar-bold" width={20} />
                            </Box>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field.Select
                        name="gender"
                        label="Gender"
                        options={[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                          { value: 'other', label: 'Other' },
                        ]}
                      />
                    </Grid>
                  </Grid>

                  <Field.Text
                    name="contactNumber"
                    label="Contact Number"
                    placeholder="Enter contact number"
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ mr: 1, color: 'text.secondary' }}>
                          <Iconify icon="solar:phone-bold" width={20} />
                        </Box>
                      ),
                    }}
                  />

                  <Field.Text
                    name="address"
                    label="Address"
                    placeholder="Enter complete address"
                    multiline
                    rows={3}
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ mr: 1, color: 'text.secondary', alignSelf: 'flex-start', mt: 1 }}>
                          <Iconify icon="solar:map-point-bold" width={20} />
                        </Box>
                      ),
                    }}
                  />

                  <Field.Text
                    name="medicalHistory"
                    label="Medical History (Optional)"
                    placeholder="Any relevant medical history..."
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
                </Stack>
              </Form>
            </Box>
          </Scrollbar>
        </Box>

        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.neutral' }}>
          <Stack spacing={1.5}>
            <LoadingButton
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              startIcon={<Iconify icon="solar:arrow-right-bold" />}
              onClick={onSubmit}
              loading={isSubmitting}
              disabled={!isValid}
              sx={{
                bgcolor: '#4CAF50',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: '#4CAF50',
                  opacity: 0.9,
                },
              }}
            >
              Next: Schedule Appointment
            </LoadingButton>

            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              size="large"
              startIcon={<Iconify icon="solar:close-circle-bold" />}
              onClick={handleClose}
              sx={{ borderRadius: 1 }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}

// Appointment Scheduling Drawer Component
function AppointmentDrawer({ open, onClose, patientInfo }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const defaultValues = useMemo(
    () => ({
      selectedDate: '',
      timeSlot: '',
      specialInstructions: '',
    }),
    []
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(BookingSchema.pick({ selectedDate: true, timeSlot: true, specialInstructions: true })),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const submitData = {
        ...patientInfo,
        ...data,
        serviceType: 'Home Visit',
        bookingDate: new Date().toISOString().split('T')[0],
      };

      reset();
      setSelectedTimeSlot('');
      onClose();
      toast.success('Home visit appointment scheduled successfully!');

      console.info('APPOINTMENT DATA', submitData);
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  });

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot.value);
    setValue('timeSlot', timeSlot.value);
  };

  const handleClose = () => {
    reset();
    setSelectedTimeSlot('');
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : 480,
          maxWidth: '100%',
          borderRadius: 0,
        }
      }}
    >
      <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  bgcolor: '#E8F5E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon="solar:calendar-add-bold" width={20} sx={{ color: '#4CAF50' }} />
              </Box>
              <Box>
                <Typography variant="h6" component="div">
                  Schedule Appointment
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Select your preferred date and time
                </Typography>
              </Box>
            </Stack>
            <IconButton onClick={handleClose} size="small">
              <Iconify icon="solar:close-circle-bold" width={24} />
            </IconButton>
          </Stack>

          {patientInfo && (
            <Box
              sx={{
                p: 1.5,
                borderRadius: 1,
                bgcolor: '#E8F5E8',
                border: '1px solid #4CAF5020',
              }}
            >
              <Typography variant="subtitle2" fontWeight={600} color="#4CAF50" sx={{ mb: 0.5 }}>
                Patient: {patientInfo.patientName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Contact: {patientInfo.contactNumber}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <Scrollbar sx={{ height: 1 }}>
            <Box sx={{ p: 2 }}>
              <Form methods={methods} onSubmit={onSubmit}>
                <Stack spacing={2}>
                  <Field.DatePicker
                    name="selectedDate"
                    label="Select Preferred Date"
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ mr: 1, color: 'text.secondary' }}>
                          <Iconify icon="solar:calendar-bold" width={20} />
                        </Box>
                      ),
                    }}
                  />

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Select Preferred Time *
                    </Typography>
                    <Grid container spacing={1}>
                      {timeSlots.map((timeSlot) => (
                        <Grid item xs={12} key={timeSlot.id}>
                          <Card
                            onClick={() => handleTimeSlotSelect(timeSlot)}
                            sx={{
                              p: 1.5,
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              bgcolor: selectedTimeSlot === timeSlot.value ? '#E8F5E8' : 'background.paper',
                              border: selectedTimeSlot === timeSlot.value ? '2px solid #4CAF50' : '1px solid',
                              borderColor: selectedTimeSlot === timeSlot.value ? '#4CAF50' : 'divider',
                              borderRadius: 1,
                              '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: theme.shadows[2],
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              fontWeight={selectedTimeSlot === timeSlot.value ? 600 : 400}
                              color={selectedTimeSlot === timeSlot.value ? '#4CAF50' : 'text.primary'}
                              textAlign="center"
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
                    placeholder="Any special instructions for the doctor..."
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
                </Stack>
              </Form>
            </Box>
          </Scrollbar>
        </Box>

        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.neutral' }}>
          <Stack spacing={1.5}>
            <LoadingButton
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              startIcon={<Iconify icon="solar:check-circle-bold" />}
              onClick={onSubmit}
              loading={isSubmitting}
              disabled={!isValid}
              sx={{
                bgcolor: '#4CAF50',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: '#4CAF50',
                  opacity: 0.9,
                },
              }}
            >
              Confirm Appointment
            </LoadingButton>

            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              size="large"
              startIcon={<Iconify icon="solar:close-circle-bold" />}
              onClick={handleClose}
              sx={{ borderRadius: 1 }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}

// Booking Form Drawer Component (Right side popup)
function BookingFormDrawer({ open, onClose, selectedPackage }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
    handleSubmit,
    setValue,
    formState: { isSubmitting, isValid },
  } = methods;

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
      onClose();
      toast.success('Booking confirmed successfully!');

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

  const handleClose = () => {
    reset();
    setSelectedTimeSlot('');
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: isMobile ? '100%' : 480,
          maxWidth: '100%',
          borderRadius: 0,
        }
      }}
    >
      <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  bgcolor: selectedPackage?.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify
                  icon="solar:calendar-add-bold"
                  width={20}
                  sx={{ color: selectedPackage?.color }}
                />
              </Box>
              <Box>
                <Typography variant="h6" component="div">
                  Book Service
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fill the form to book your service
                </Typography>
              </Box>
            </Stack>
            <IconButton onClick={handleClose} size="small">
              <Iconify icon="solar:close-circle-bold" width={24} />
            </IconButton>
          </Stack>

          <Box
            sx={{
              p: 1.5,
              borderRadius: 1,
              bgcolor: selectedPackage?.bgColor,
              border: `1px solid ${selectedPackage?.color}20`,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} color={selectedPackage?.color} sx={{ mb: 0.5 }}>
              {selectedPackage?.name}
            </Typography>
            <Typography variant="h6" color={selectedPackage?.color} fontWeight="bold">
              {selectedPackage?.price} / {selectedPackage?.duration}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <Scrollbar sx={{ height: 1 }}>
            <Box sx={{ p: 2 }}>
              <Form methods={methods} onSubmit={onSubmit}>
                <Stack spacing={2}>
                  <Field.Text
                    name="patientName"
                    label="Patient Name"
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
                    label="Contact Number"
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
                    label="Select Date"
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ mr: 1, color: 'text.secondary' }}>
                          <Iconify icon="solar:calendar-bold" width={20} />
                        </Box>
                      ),
                    }}
                  />

                  <Stack spacing={1.5}>
                    <Typography variant="subtitle2" fontWeight={600}>
                      Preferred Time Slot *
                    </Typography>
                    <Grid container spacing={1}>
                      {timeSlots.map((timeSlot) => (
                        <Grid item xs={12} key={timeSlot.id}>
                          <Card
                            onClick={() => handleTimeSlotSelect(timeSlot)}
                            sx={{
                              p: 1.5,
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              bgcolor: selectedTimeSlot === timeSlot.value ? selectedPackage?.bgColor : 'background.paper',
                              border: selectedTimeSlot === timeSlot.value ? `2px solid ${selectedPackage?.color}` : '1px solid',
                              borderColor: selectedTimeSlot === timeSlot.value ? selectedPackage?.color : 'divider',
                              borderRadius: 1,
                              '&:hover': {
                                transform: 'translateY(-1px)',
                                boxShadow: theme.shadows[2],
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              fontWeight={selectedTimeSlot === timeSlot.value ? 600 : 400}
                              color={selectedTimeSlot === timeSlot.value ? selectedPackage?.color : 'text.primary'}
                              textAlign="center"
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
                </Stack>
              </Form>
            </Box>
          </Scrollbar>
        </Box>

        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.neutral' }}>
          <Stack spacing={1.5}>
            <LoadingButton
              fullWidth
              color="primary"
              variant="contained"
              size="large"
              startIcon={<Iconify icon="solar:check-circle-bold" />}
              onClick={onSubmit}
              loading={isSubmitting}
              disabled={!isValid}
              sx={{
                bgcolor: selectedPackage?.color,
                borderRadius: 1,
                '&:hover': {
                  bgcolor: selectedPackage?.color,
                  opacity: 0.9,
                },
              }}
            >
              Confirm Booking
            </LoadingButton>

            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              size="large"
              startIcon={<Iconify icon="solar:close-circle-bold" />}
              onClick={handleClose}
              sx={{ borderRadius: 1 }}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
}

// ----------------------------------------------------------------------

// Main Home Visit View Component
export function OverviewHomevisitView() {
  const router = useRouter();
  const bookingDrawer = useBoolean();
  const patientInfoDrawer = useBoolean();
  const appointmentDrawer = useBoolean();
  const theme = useTheme();
  const [currentHealthcareData, setCurrentHealthcareData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Nursing Care');
  const [selectedDuration, setSelectedDuration] = useState('Full Day (12hrs)');
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState(null);
  const [showHomeVisitContent, setShowHomeVisitContent] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    const fetchHealthcareData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentHealthcareData(mockCurrentHealthcareData);
      } catch (error) {
        console.error('Error fetching healthcare data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthcareData();
  }, []);

  const handleCategorySelect = (category) => {
    if (category.name === 'Home Visit') {
      setShowHomeVisitContent(true);
      setSelectedCategory(category.name);

      setCurrentHealthcareData(prevData => ({
        ...prevData,
        serviceCategories: prevData.serviceCategories.map(cat => ({
          ...cat,
          isActive: cat.id === category.id
        }))
      }));
      return;
    }

    setShowHomeVisitContent(false);
    setSelectedCategory(category.name);

    setCurrentHealthcareData(prevData => ({
      ...prevData,
      serviceCategories: prevData.serviceCategories.map(cat => ({
        ...cat,
        isActive: cat.id === category.id
      }))
    }));

    console.log('Category selected:', category.name);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration.name);

    setCurrentHealthcareData(prevData => ({
      ...prevData,
      durationOptions: prevData.durationOptions.map(option => ({
        ...option,
        isActive: option.id === duration.id
      }))
    }));

    console.log('Duration selected:', duration.name);
  };

  const handleBookService = (pkg) => {
    setSelectedPackageForBooking(pkg);
    bookingDrawer.onTrue();
    console.log('Opening booking form for:', pkg.name);
  };

  const handleAddPatientInfo = () => {
    patientInfoDrawer.onTrue();
  };

  const handlePatientInfoNext = (data) => {
    setPatientInfo(data);
    appointmentDrawer.onTrue();
  };

  const handleBackToServices = () => {
    setShowHomeVisitContent(false);
    setSelectedCategory('Nursing Care');

    setCurrentHealthcareData(prevData => ({
      ...prevData,
      serviceCategories: prevData.serviceCategories.map(cat => ({
        ...cat,
        isActive: cat.name === 'Nursing Care'
      }))
    }));
  };

  // Home Visit Content Component
  const renderHomeVisitContent = (
    <Stack spacing={2}>
      <Card sx={{ borderRadius: 1 }}>
        <CardContent sx={{ py: 1.5 }}>
          <Button
            startIcon={<Iconify icon="solar:arrow-left-bold" />}
            onClick={handleBackToServices}
            sx={{ color: 'text.secondary' }}
          >
            Back to Healthcare Services
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ bgcolor: '#4CAF50', color: 'white', borderRadius: 1 }}>
        <CardContent sx={{ py: 2 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1,
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify icon="solar:home-bold" width={24} sx={{ color: 'white' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 0.5 }}>
                Home Visit
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Our qualified doctors will visit your home for consultation and treatment.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ bgcolor: '#E3F2FD', borderRadius: 1 }}>
        <CardContent sx={{ py: 2 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1,
                bgcolor: '#2196F3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify icon="solar:map-point-bold" width={24} sx={{ color: 'white' }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                Deliver to
              </Typography>
              <Typography variant="h6" fontWeight={600} color="#2196F3">
                Home
              </Typography>
            </Box>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                bgcolor: '#2196F3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Iconify icon="solar:alt-arrow-up-bold" width={20} sx={{ color: 'white' }} />
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 1 }}>
        <CardHeader
          title="Patient Information"
          titleTypographyProps={{ color: '#2196F3' }}
          sx={{
            borderLeft: 4,
            borderColor: '#2196F3',
            bgcolor: '#F8F9FA',
            py: 1
          }}
        />
        <CardContent sx={{ py: 2 }}>
          <Card
            onClick={handleAddPatientInfo}
            sx={{
              p: 2,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[4],
                borderColor: '#4CAF50',
              },
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 1,
                  bgcolor: '#E8F5E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon="solar:user-plus-bold" width={24} sx={{ color: '#4CAF50' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                  Add Patient Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tap to enter patient details
                </Typography>
              </Box>
              <Iconify icon="solar:arrow-right-bold" width={24} sx={{ color: 'text.secondary' }} />
            </Stack>
          </Card>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 1 }}>
        <CardHeader
          title="Schedule Appointment"
          titleTypographyProps={{ color: '#2196F3' }}
          sx={{
            borderLeft: 4,
            borderColor: '#2196F3',
            bgcolor: '#F8F9FA',
            py: 1
          }}
        />
        <CardContent sx={{ py: 2 }}>
          <Card
            onClick={() => {
              if (!patientInfo) {
                toast.error('Please add patient information first');
                return;
              }
              appointmentDrawer.onTrue();
            }}
            sx={{
              p: 2,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '1px solid',
              borderColor: patientInfo ? 'divider' : '#E0E0E0',
              borderRadius: 1,
              opacity: patientInfo ? 1 : 0.6,
              '&:hover': patientInfo ? {
                transform: 'translateY(-2px)',
                boxShadow: theme.shadows[4],
                borderColor: '#4CAF50',
              } : {},
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 1,
                  bgcolor: patientInfo ? '#E8F5E8' : '#F5F5F5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify
                  icon="solar:calendar-add-bold"
                  width={24}
                  sx={{ color: patientInfo ? '#4CAF50' : '#BDBDBD' }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ mb: 0.5 }}
                  color={patientInfo ? 'text.primary' : 'text.disabled'}
                >
                  Select Preferred Date
                </Typography>
                <Typography
                  variant="body2"
                  color={patientInfo ? 'text.secondary' : 'text.disabled'}
                >
                  {patientInfo ? 'Choose your appointment time' : 'Add patient info first'}
                </Typography>
              </Box>
              <Iconify
                icon="solar:arrow-right-bold"
                width={24}
                sx={{ color: patientInfo ? 'text.secondary' : 'text.disabled' }}
              />
            </Stack>
          </Card>
        </CardContent>
      </Card>

      {patientInfo && (
        <Card sx={{ borderRadius: 1, bgcolor: '#E8F5E8', border: '1px solid #4CAF50' }}>
          <CardContent sx={{ py: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  bgcolor: '#4CAF50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon="solar:check-circle-bold" width={20} sx={{ color: 'white' }} />
              </Box>
              <Typography variant="subtitle1" fontWeight={600} color="#4CAF50">
                Patient Information Added
              </Typography>
            </Stack>
            <Stack spacing={0.5}>
              <Typography variant="body2">
                <strong>Patient:</strong> {patientInfo.patientName}
              </Typography>
              <Typography variant="body2">
                <strong>Age:</strong> {patientInfo.age} years
              </Typography>
              <Typography variant="body2">
                <strong>Contact:</strong> {patientInfo.contactNumber}
              </Typography>
              <Typography variant="body2">
                <strong>Address:</strong> {patientInfo.address}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  );

  const renderCurrentHealthcareData = currentHealthcareData && (
    <Card sx={{ mb: 2, borderRadius: 1 }}>
      <CardContent sx={{ py: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.5 }}>
          <Typography variant="h6">Current Home Healthcare Services</Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:pen-bold" />}
              onClick={() => console.log('Edit services')}
              sx={{ borderRadius: 1 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => console.log('Add new service')}
              sx={{ borderRadius: 1 }}
            >
              Add Service
            </Button>
          </Stack>
        </Stack>

        <Stack spacing={0.5}>
          <Typography variant="body2" color="text.secondary">
            <strong>Center:</strong> {currentHealthcareData.centerName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Available Categories:</strong> {currentHealthcareData.serviceCategories?.length || 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Duration Options:</strong> {currentHealthcareData.durationOptions?.length || 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Healthcare Packages:</strong> {currentHealthcareData.healthcarePackages?.length || 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Last Updated:</strong> {new Date(currentHealthcareData.lastUpdated).toLocaleDateString()}
          </Typography>
          {currentHealthcareData.description && (
            <Typography variant="body2" color="text.secondary">
              <strong>Description:</strong> {currentHealthcareData.description}
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
            <Typography>Loading healthcare services...</Typography>
          </Box>
        </Container>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading={showHomeVisitContent ? "Home Visit Service" : "Home Healthcare Management"}
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Healthcare', href: paths.dashboard.healthcare?.root },
            { name: showHomeVisitContent ? 'Home Visit' : 'Home Healthcare' },
          ]}
          action={
            !showHomeVisitContent && (
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={() => console.log('Add new healthcare service')}
                sx={{ borderRadius: 1 }}
              >
                Add New Service
              </Button>
            )
          }
          sx={{ mb: { xs: 2, md: 3 } }}
        />

        {showHomeVisitContent ? (
          renderHomeVisitContent
        ) : (
          <>
            {renderCurrentHealthcareData}

            <Card sx={{ mb: 2, borderRadius: 1 }}>
              <CardContent sx={{ py: 2 }}>
                <Typography variant="h4" sx={{ mb: 1 }}>
                  Hi, Patient 👋
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  How is your health today! Select from our home healthcare services
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mb: 2, bgcolor: '#2196F3', color: 'white', borderRadius: 1 }}>
              <CardContent sx={{ py: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1,
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon="solar:map-point-bold" width={24} sx={{ color: 'white' }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
                      Deliver to
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      Home
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Iconify icon="solar:alt-arrow-up-bold" width={20} sx={{ color: 'white' }} />
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {currentHealthcareData?.serviceCategories && (
              <Card sx={{ mb: 2, borderRadius: 1 }}>
                <CardHeader
                  title="Select Service Type"
                  subheader="Choose the type of healthcare service you need"
                  sx={{ py: 1.5 }}
                />
                <CardContent sx={{ py: 1.5 }}>
                  <Grid container spacing={2}>
                    {currentHealthcareData.serviceCategories.map((category) => (
                      <Grid item xs={6} key={category.id}>
                        <Card
                          onClick={() => handleCategorySelect(category)}
                          sx={{
                            p: 1.5,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            bgcolor: category.isActive ? category.bgColor : 'background.paper',
                            border: category.isActive ? `2px solid ${category.color}` : '1px solid',
                            borderColor: category.isActive ? category.color : 'divider',
                            borderRadius: 1,
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: theme.shadows[4],
                            },
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 1,
                                bgcolor: category.isActive ? category.bgColor : 'background.neutral',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Iconify
                                icon={category.icon}
                                width={20}
                                sx={{ color: category.isActive ? category.color : 'text.secondary' }}
                              />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                variant="subtitle2"
                                fontWeight={600}
                                color={category.isActive ? category.color : 'text.primary'}
                              >
                                {category.name}
                              </Typography>
                            </Box>
                          </Stack>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            )}

            {currentHealthcareData?.durationOptions && selectedCategory !== 'Home Visit' && (
              <Card sx={{ mb: 2, borderRadius: 1 }}>
                <CardHeader
                  title="Select Duration"
                  subheader="Choose the duration of service you need"
                  sx={{ py: 1.5 }}
                />
                <CardContent sx={{ py: 1.5 }}>
                  <Grid container spacing={2}>
                    {currentHealthcareData.durationOptions.map((duration) => (
                      <Grid item xs={6} key={duration.id}>
                        <Card
                          onClick={() => handleDurationSelect(duration)}
                          sx={{
                            p: 1.5,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            bgcolor: duration.isActive ? '#E3F2FD' : 'background.paper',
                            border: duration.isActive ? '2px solid #2196F3' : '1px solid',
                            borderColor: duration.isActive ? '#2196F3' : 'divider',
                            borderRadius: 1,
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: theme.shadows[4],
                            },
                          }}
                        >
                          <Stack spacing={1} alignItems="center">
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 1,
                                bgcolor: duration.isActive ? '#2196F3' : 'background.neutral',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Iconify
                                icon="solar:clock-circle-bold"
                                width={20}
                                sx={{ color: duration.isActive ? 'white' : 'text.secondary' }}
                              />
                            </Box>
                            <Box textAlign="center">
                              <Typography
                                variant="subtitle2"
                                fontWeight={600}
                                color={duration.isActive ? '#2196F3' : 'text.primary'}
                              >
                                {duration.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color={duration.isActive ? '#2196F3' : 'text.secondary'}
                              >
                                {duration.description}
                              </Typography>
                            </Box>
                          </Stack>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            )}

            {currentHealthcareData?.healthcarePackages && selectedCategory !== 'Home Visit' && (
              <Stack spacing={2}>
                {currentHealthcareData.healthcarePackages.map((pkg) => (
                  <Card key={pkg.id} sx={{ borderRadius: 1 }}>
                    <CardContent sx={{ p: 2 }}>
                      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 1.5 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight={600} color={pkg.color} sx={{ mb: 1 }}>
                            {pkg.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                            {pkg.description}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            bgcolor: pkg.bgColor,
                            ml: 2,
                          }}
                        >
                          <Typography variant="h6" fontWeight="bold" color={pkg.color} textAlign="center">
                            {pkg.price}
                          </Typography>
                          <Typography variant="caption" color={pkg.color} textAlign="center" display="block">
                            {pkg.duration}
                          </Typography>
                        </Box>
                      </Stack>

                      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1.5 }}>
                        Services Included
                      </Typography>

                      <Stack spacing={0.5} sx={{ mb: 2 }}>
                        {pkg.services.map((service, index) => (
                          <Stack key={index} direction="row" alignItems="center" spacing={1}>
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                bgcolor: '#4CAF50',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Iconify icon="solar:check-bold" width={12} sx={{ color: 'white' }} />
                            </Box>
                            <Typography variant="body2">
                              {service}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>

                      <Typography variant="body2" color={pkg.color} sx={{ mb: 2, fontWeight: 500 }}>
                        {pkg.additionalServices}
                      </Typography>

                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        endIcon={<Iconify icon="solar:arrow-right-bold" />}
                        onClick={() => handleBookService(pkg)}
                        sx={{
                          bgcolor: pkg.color,
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: pkg.color,
                            opacity: 0.9,
                          },
                        }}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}

            {!currentHealthcareData && (
              <Card sx={{ borderRadius: 1 }}>
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
                    <Iconify icon="solar:health-bold" width={64} sx={{ color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h5" color="text.disabled" gutterBottom>
                      No Healthcare Services Found
                    </Typography>
                    <Typography variant="body2" color="text.disabled" sx={{ mb: 2 }}>
                      Set up your home healthcare services to get started
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Iconify icon="mingcute:add-line" />}
                      onClick={() => console.log('Setup healthcare services')}
                      sx={{ borderRadius: 1 }}
                    >
                      Setup Healthcare Services
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}
          </>
        )}

        <BookingFormDrawer
          open={bookingDrawer.value}
          onClose={bookingDrawer.onFalse}
          selectedPackage={selectedPackageForBooking}
        />

        <PatientInfoDrawer
          open={patientInfoDrawer.value}
          onClose={patientInfoDrawer.onFalse}
          onNext={handlePatientInfoNext}
        />

        <AppointmentDrawer
          open={appointmentDrawer.value}
          onClose={appointmentDrawer.onFalse}
          patientInfo={patientInfo}
        />
      </Container>
    </DashboardContent>
  );
}

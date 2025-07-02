// src/sections/overview/diagnostics/view/diagnostics-checkout-view.jsx
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { paths } from 'src/routes/paths';

import { useCart } from 'src/hooks/use-diagnostics';
import DiagnosticsAPI, { formatPrice, calculateCartTotal, validateBookingForm } from 'src/utils/diagnostics-api';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

const STEPS = ['Patient Details', 'Schedule', 'Payment', 'Confirmation'];

const COLLECTION_TYPES = [
  { value: 'home', label: 'Home Collection', icon: 'solar:home-bold' },
  { value: 'lab', label: 'Lab Visit', icon: 'solar:hospital-bold' }
];

export function DiagnosticsCheckoutView() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, cartLoading } = useCart();

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [errors, setErrors] = useState({});
  const [successDialog, setSuccessDialog] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  const [formData, setFormData] = useState({
    patient_details: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      age: '',
      gender: ''
    },
    address: {
      street: '',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '',
      landmark: ''
    },
    preferred_slot: {
      date: null,
      time_slot: '',
      collection_type: 'home'
    },
    payment_method: ''
  });

  // Calculate cart totals
const cartTotals = useMemo(() => (
  cart?.items ? calculateCartTotal(cart.items) : {
    subtotal: 0,
    homeCollectionCharge: 0,
    totalSavings: 0,
    total: 0
  }
), [cart]);

  // Load time slots when date changes
  useEffect(() => {
    if (formData.preferred_slot.date) {
      loadTimeSlots();
    }
  },[formData.preferred_slot.date, loadTimeSlots])

  // Load payment methods on component mount
  useEffect(() => {
    loadPaymentMethods();
  }, [loadPaymentMethods]);

  const loadTimeSlots = useCallback(async () => {
    try {
      const slots = await DiagnosticsAPI.getTimeSlots(formData.preferred_slot.date);
      setTimeSlots(slots);
    } catch (error) {
      console.error('Error loading time slots:', error);
    }
  }, [formData.preferred_slot.date]);

  const loadPaymentMethods = useCallback(async () => {
    try {
      const methods = await DiagnosticsAPI.getPaymentMethods();
      setPaymentMethods(methods);
    } catch (error) {
      console.error('Error loading payment methods:', error);
    }
  }, []);

  const handleInputChange = useCallback((section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  }, [errors]);

  const handleNext = useCallback(() => {
    // Validate current step
    const validation = validateBookingForm(formData);

    if (activeStep === 0) {
      // Validate patient details and address
      const stepErrors = {};
      Object.keys(validation.errors).forEach(key => {
        if (['first_name', 'last_name', 'email', 'phone', 'age', 'gender', 'street', 'city', 'state', 'pincode'].includes(key)) {
          stepErrors[key] = validation.errors[key];
        }
      });

      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    } else if (activeStep === 1) {
      // Validate schedule
      const stepErrors = {};
      Object.keys(validation.errors).forEach(key => {
        if (['date', 'time_slot'].includes(key)) {
          stepErrors[key] = validation.errors[key];
        }
      });

      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        return;
      }
    } else if (activeStep === 2) {
      // Validate payment method
      if (!formData.payment_method) {
        setErrors({ payment_method: 'Please select a payment method' });
        return;
      }
    }

    if (activeStep === STEPS.length - 1) {
      handleBookingSubmit();
    } else {
      setActiveStep(prev => prev + 1);
      setErrors({});
    }
  }, [activeStep, formData, handleBookingSubmit]);

  const handleBack = useCallback(() => {
    setActiveStep(prev => prev - 1);
    setErrors({});
  }, []);

  const handleBookingSubmit = useCallback(async () => {
    setLoading(true);

    try {
      // Create booking
      const bookingData = {
        cart_id: cart.id,
        ...formData,
        payment_summary: {
          subtotal: cartTotals.subtotal.toFixed(2),
          home_collection_charge: cartTotals.homeCollectionCharge.toFixed(2),
          discount: "0.00",
          total_amount: cartTotals.total.toFixed(2)
        }
      };

      const booking = await DiagnosticsAPI.createBooking(bookingData);

      // Initiate payment
      const paymentData = {
        booking_id: booking.id,
        amount: cartTotals.total,
        payment_method: formData.payment_method,
        customer_details: formData.patient_details
      };

      const payment = await DiagnosticsAPI.initiatePayment(paymentData);

      setBookingResult({ booking, payment });
      setSuccessDialog(true);

    } catch (error) {
      console.error('Error creating booking:', error);
      setErrors({ submit: 'Failed to create booking. Please try again.' });
    } finally {
      setLoading(false);
    }
  }, [cart, formData, cartTotals]);

  const handleSuccessClose = useCallback(() => {
    setSuccessDialog(false);
    navigate(paths.dashboard.diagnostics.bookings);
  }, [navigate]);

  // Redirect if no cart items
  if (!cartLoading && (!cart?.items || cart.items.length === 0)) {
    return (
      <DashboardContent>
        <Container maxWidth="lg">
          <Alert severity="warning" sx={{ mb: 3 }}>
            Your cart is empty. Please add some tests before proceeding to checkout.
          </Alert>
          <Button
            variant="contained"
            onClick={() => navigate(paths.dashboard.diagnostics.root)}
            startIcon={<Iconify icon="solar:arrow-left-bold" />}
          >
            Browse Tests
          </Button>
        </Container>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Container maxWidth="lg">
        <CustomBreadcrumbs
          heading="Book Diagnostic Tests"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Diagnostics', href: paths.dashboard.diagnostics.root },
            { name: 'Checkout' },
          ]}
          sx={{ mb: 3 }}
        />

        {/* Stepper */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stepper activeStep={activeStep} alternativeLabel>
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                {activeStep === 0 && (
                  <PatientDetailsStep
                    formData={formData}
                    errors={errors}
                    onInputChange={handleInputChange}
                  />
                )}

                {activeStep === 1 && (
                  <ScheduleStep
                    formData={formData}
                    errors={errors}
                    timeSlots={timeSlots}
                    onInputChange={handleInputChange}
                  />
                )}

                {activeStep === 2 && (
                  <PaymentStep
                    formData={formData}
                    errors={errors}
                    paymentMethods={paymentMethods}
                    onInputChange={handleInputChange}
                  />
                )}

                {activeStep === 3 && (
                  <ConfirmationStep
                    formData={formData}
                    cart={cart}
                    cartTotals={cartTotals}
                  />
                )}

                {/* Error Alert */}
                {errors.submit && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.submit}
                  </Alert>
                )}

                {/* Navigation Buttons */}
                <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
                  <Button
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    startIcon={<Iconify icon="solar:arrow-left-bold" />}
                  >
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={loading}
                    endIcon={
                      loading ? (
                        <CircularProgress size={20} />
                      ) : activeStep === STEPS.length - 1 ? (
                        <Iconify icon="solar:card-bold" />
                      ) : (
                        <Iconify icon="solar:arrow-right-bold" />
                      )
                    }
                  >
                    {activeStep === STEPS.length - 1 ? 'Complete Booking' : 'Next'}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 24 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Order Summary
                </Typography>

                {/* Cart Items */}
                <Stack spacing={2} sx={{ mb: 3 }}>
                  {cart?.items?.map((item) => (
                    <Box key={item.id}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body2" fontWeight="medium">
                            {item.test?.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Code: {item.test?.code} • Qty: {item.quantity}
                          </Typography>
                        </Box>
                        <Typography variant="body2" fontWeight="medium">
                          {formatPrice(parseFloat(item.test?.effective_price || item.unit_price) * item.quantity)}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ my: 2 }} />

                {/* Pricing Breakdown */}
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="text.secondary">
                      Subtotal ({cart?.items?.reduce((total, item) => total + item.quantity, 0)} items)
                    </Typography>
                    <Typography variant="body2">
                      {formatPrice(cartTotals.subtotal)}
                    </Typography>
                  </Stack>

                  {cartTotals.homeCollectionCharge > 0 && (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="text.secondary">
                        Home Collection
                      </Typography>
                      <Typography variant="body2">
                        {formatPrice(cartTotals.homeCollectionCharge)}
                      </Typography>
                    </Stack>
                  )}

                  {cartTotals.totalSavings > 0 && (
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2" color="success.main">
                        Total Savings
                      </Typography>
                      <Typography variant="body2" color="success.main">
                        -{formatPrice(cartTotals.totalSavings)}
                      </Typography>
                    </Stack>
                  )}

                  <Divider />

                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="subtitle1" fontWeight="bold">
                      Total Amount
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold" color="primary.main">
                      {formatPrice(cartTotals.total)}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Collection Info */}
                {formData.preferred_slot.collection_type === 'home' && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      Our trained professional will collect samples from your home at the scheduled time.
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Success Dialog */}
        <Dialog open={successDialog} onClose={handleSuccessClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Iconify icon="solar:check-circle-bold" color="success.main" width={24} />
              <Typography variant="h6">Booking Confirmed!</Typography>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Typography>
                Your diagnostic test booking has been confirmed successfully.
              </Typography>

              {bookingResult && (
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2">Booking Details:</Typography>
                    <Typography variant="body2">
                      Booking ID: <strong>{bookingResult.booking.booking_id}</strong>
                    </Typography>
                    <Typography variant="body2">
                      Amount: <strong>{formatPrice(cartTotals.total)}</strong>
                    </Typography>
                    <Typography variant="body2">
                      Payment ID: <strong>{bookingResult.payment.payment_id}</strong>
                    </Typography>
                  </Stack>
                </Paper>
              )}

              <Alert severity="success">
                You will receive a confirmation email and SMS with your booking details.
              </Alert>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSuccessClose} variant="contained" fullWidth>
              View My Bookings
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function PatientDetailsStep({ formData, errors, onInputChange }) {
  return (
    <Stack spacing={3}>
      <Typography variant="h6">Patient Information</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            value={formData.patient_details.first_name}
            onChange={(e) => onInputChange('patient_details', 'first_name', e.target.value)}
            error={!!errors.first_name}
            helperText={errors.first_name}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            value={formData.patient_details.last_name}
            onChange={(e) => onInputChange('patient_details', 'last_name', e.target.value)}
            error={!!errors.last_name}
            helperText={errors.last_name}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.patient_details.email}
            onChange={(e) => onInputChange('patient_details', 'email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            value={formData.patient_details.phone}
            onChange={(e) => onInputChange('patient_details', 'phone', e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Age"
            type="number"
            value={formData.patient_details.age}
            onChange={(e) => onInputChange('patient_details', 'age', e.target.value)}
            error={!!errors.age}
            helperText={errors.age}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.gender} required>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.patient_details.gender}
              label="Gender"
              onChange={(e) => onInputChange('patient_details', 'gender', e.target.value)}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Divider />

      <Typography variant="h6">Address Information</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Street Address"
            value={formData.address.street}
            onChange={(e) => onInputChange('address', 'street', e.target.value)}
            error={!!errors.street}
            helperText={errors.street}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="City"
            value={formData.address.city}
            onChange={(e) => onInputChange('address', 'city', e.target.value)}
            error={!!errors.city}
            helperText={errors.city}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="State"
            value={formData.address.state}
            onChange={(e) => onInputChange('address', 'state', e.target.value)}
            error={!!errors.state}
            helperText={errors.state}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Pincode"
            value={formData.address.pincode}
            onChange={(e) => onInputChange('address', 'pincode', e.target.value)}
            error={!!errors.pincode}
            helperText={errors.pincode}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Landmark (Optional)"
            value={formData.address.landmark}
            onChange={(e) => onInputChange('address', 'landmark', e.target.value)}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}

function ScheduleStep({ formData, errors, timeSlots, onInputChange }) {
  return (
    <Stack spacing={3}>
      <Typography variant="h6">Schedule Your Test</Typography>

      {/* Collection Type */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Collection Type
        </Typography>
        <RadioGroup
          value={formData.preferred_slot.collection_type}
          onChange={(e) => onInputChange('preferred_slot', 'collection_type', e.target.value)}
        >
          {COLLECTION_TYPES.map((type) => (
            <FormControlLabel
              key={type.value}
              value={type.value}
              control={<Radio />}
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Iconify icon={type.icon} width={20} />
                  <Typography>{type.label}</Typography>
                </Stack>
              }
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Date Selection */}
      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Preferred Date
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={formData.preferred_slot.date}
            onChange={(date) => onInputChange('preferred_slot', 'date', date)}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
            slotProps={{
              textField: {
                fullWidth: true,
                error: !!errors.date,
                helperText: errors.date,
                required: true
              }
            }}
          />
        </LocalizationProvider>
      </Box>

      {/* Time Slot Selection */}
      {formData.preferred_slot.date && (
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Available Time Slots
          </Typography>
          <Grid container spacing={1}>
            {timeSlots.map((slot) => (
              <Grid item xs={12} sm={6} key={slot.id}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    cursor: slot.available ? 'pointer' : 'not-allowed',
                    bgcolor: formData.preferred_slot.time_slot === slot.slot ? 'primary.lighter' : 'transparent',
                    borderColor: formData.preferred_slot.time_slot === slot.slot ? 'primary.main' : 'divider',
                    opacity: slot.available ? 1 : 0.5,
                    '&:hover': slot.available ? {
                      borderColor: 'primary.main',
                      bgcolor: 'primary.lighter'
                    } : {}
                  }}
                  onClick={() => {
                    if (slot.available) {
                      onInputChange('preferred_slot', 'time_slot', slot.slot);
                    }
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" fontWeight="medium">
                      {slot.label}
                    </Typography>
                    {!slot.available && (
                      <Chip label="Booked" size="small" color="error" variant="outlined" />
                    )}
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
          {errors.time_slot && (
            <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
              {errors.time_slot}
            </Typography>
          )}
        </Box>
      )}

      {formData.preferred_slot.collection_type === 'home' && (
        <Alert severity="info">
          <Typography variant="body2">
            Our trained professional will arrive at your address during the selected time slot for sample collection.
          </Typography>
        </Alert>
      )}
    </Stack>
  );
}

function PaymentStep({ formData, errors, paymentMethods, onInputChange }) {
  return (
    <Stack spacing={3}>
      <Typography variant="h6">Select Payment Method</Typography>

      <RadioGroup
        value={formData.payment_method}
        onChange={(e) => onInputChange('', 'payment_method', e.target.value)}
      >
        {paymentMethods.map((method) => (
          <Paper
            key={method.id}
            variant="outlined"
            sx={{
              p: 2,
              bgcolor: formData.payment_method === method.type ? 'primary.lighter' : 'transparent',
              borderColor: formData.payment_method === method.type ? 'primary.main' : 'divider'
            }}
          >
            <FormControlLabel
              value={method.type}
              control={<Radio />}
              label={
                <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                  <Iconify icon={method.icon} width={24} />
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle2">{method.name}</Typography>
                      {method.is_popular && (
                        <Chip label="Popular" size="small" color="primary" variant="soft" />
                      )}
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {method.description}
                    </Typography>
                  </Box>
                </Stack>
              }
              sx={{ width: '100%', m: 0 }}
            />
          </Paper>
        ))}
      </RadioGroup>

      {errors.payment_method && (
        <Typography variant="caption" color="error">
          {errors.payment_method}
        </Typography>
      )}

      <Alert severity="info">
        <Typography variant="body2">
          Your payment is 100% secure. We use industry-standard encryption to protect your payment information.
        </Typography>
      </Alert>
    </Stack>
  );
}

function ConfirmationStep({ formData, cart, cartTotals }) {
  return (
    <Stack spacing={3}>
      <Typography variant="h6">Review Your Booking</Typography>

      {/* Patient Details */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Patient Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Name:</Typography>
              <Typography variant="body2">
                {formData.patient_details.first_name} {formData.patient_details.last_name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Email:</Typography>
              <Typography variant="body2">{formData.patient_details.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Phone:</Typography>
              <Typography variant="body2">{formData.patient_details.phone}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Age/Gender:</Typography>
              <Typography variant="body2">
                {formData.patient_details.age} years, {formData.patient_details.gender}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Address */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Address</Typography>
          <Typography variant="body2">
            {formData.address.street}, {formData.address.city}, {formData.address.state} - {formData.address.pincode}
            {formData.address.landmark && `, Near ${formData.address.landmark}`}
          </Typography>
        </CardContent>
      </Card>

      {/* Schedule */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Schedule</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Date:</Typography>
              <Typography variant="body2">
                {formData.preferred_slot.date?.toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">Time:</Typography>
              <Typography variant="body2">{formData.preferred_slot.time_slot}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">Collection:</Typography>
              <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                {formData.preferred_slot.collection_type} Collection
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tests */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Tests Ordered</Typography>
          <Stack spacing={1}>
            {cart?.items?.map((item) => (
              <Stack key={item.id} direction="row" justifyContent="space-between">
                <Typography variant="body2">
                  {item.test?.name} (x{item.quantity})
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formatPrice(parseFloat(item.test?.effective_price || item.unit_price) * item.quantity)}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Terms */}
      <Alert severity="info">
        <Typography variant="body2">
          By proceeding with this booking, you agree to our terms and conditions.
          Sample collection will be done by trained professionals following all safety protocols.
        </Typography>
      </Alert>
    </Stack>
  );
}

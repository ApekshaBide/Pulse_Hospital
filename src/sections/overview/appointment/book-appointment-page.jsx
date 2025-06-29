// File: src/sections/overview/appointment/book-appointment-page.jsx
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';


export default function BookAppointmentPage({ doctor, specialty, onBack }) {
  const theme = useTheme();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  const [formData, setFormData] = useState({
    appointmentMode: 'in-person',
    selectedDate: '',
    selectedTime: '',
    patientName: '',
    phoneNumber: '',
    email: '',
    symptoms: '',
    paymentMethod: 'pay-at-hospital'
  });

  const consultationFee = doctor?.fee || 800;
  const convenienceFee = 50;
  const totalAmount = consultationFee + convenienceFee;

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push('/dashboard/appointment');
    }
  };

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const getNextSevenDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i += 1) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        id: i,
        label: `${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'short' })}`,
        fullDate: date.toDateString()
      });
    }
    return days;
  };

  const availableDates = getNextSevenDays();
  const timeSlots = ["11:00 AM", "2:00 PM", "4:00 PM", "5:00 PM"];

  const handleConfirmBooking = () => {
    console.log('Booking Data:', formData);
    alert(`Booking Confirmed Successfully!\nTotal Amount: ₹${totalAmount}`);
    router.push('/dashboard/appointment');
  };

  const canProceed = () =>
    formData.appointmentMode &&
    formData.selectedDate &&
    formData.selectedTime &&
    formData.patientName.trim() &&
    formData.phoneNumber.trim() &&
    formData.symptoms.trim();

  if (!doctor) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">Doctor information not available</Typography>
        <Button onClick={handleBack} sx={{ mt: 2 }}>← Back</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 2 }}>
                <Typography variant="h4" sx={{ mt: 1 }}>
                  Hi, Patient 👋
                </Typography>
                <Typography>
                  How is your health today!
                </Typography>

    <Box sx={{ minHeight: '100vh' }}>
  <Box sx={{ mt: { xs: 2, sm: 3 } }}>
  <Slide direction="right" in={showContent} timeout={500}>
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton
        onClick={handleBack}
        sx={{
          width: { xs: 36, sm: 42 },     // Equal width and height for circle
          height: { xs: 36, sm: 42 },
          borderRadius: '50%',
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
          p: 0,
          '&:hover': {
            bgcolor: 'primary.main',
            transform: 'scale(1.05)'
          },
          transition: 'all 0.2s ease'
        }}
      >
        <Typography sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, fontWeight: 'bold' }}>
          ←
        </Typography>
      </IconButton>
      <Typography variant="h5" fontWeight="600">Book Appointment</Typography>
    </Box>
  </Slide>
</Box>


      <Fade in={showContent} timeout={600}>
        <Grid container spacing={3} sx={{ mt: 2 }}>

          {/* Left Doctor Info */}
       <Grid container spacing={3}>
  {/* Doctor Card */}
  <Grid item xs={12} md={4}>
    <Card sx={{ pt: 6, pb: 4, px: 3, textAlign: 'center', height: '30%' }}>
      <Box sx={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        bgcolor: 'primary.light',
        color: 'primary.contrastText',
        fontSize: '1.8rem',
        fontWeight: 600,
        mx: 'auto',
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {doctor.name.split(' ').map(n => n[0]).join('')}
      </Box>
      <Typography variant="h6">{doctor.name}</Typography>
      <Typography variant="body2" color="text.secondary">{specialty || 'Specialist'}</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        ⭐ {doctor.rating} | 📅 {doctor.experience}
      </Typography>
      <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
        ₹{doctor.fee}
      </Typography>
    </Card>
  </Grid>

  {/* Right Appointment Form */}
  <Grid item xs={12} md={8}>
    <Card sx={{ p: { xs: 2, sm: 3 } }}>
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
      >
        {/* Appointment Mode */}
        <Box gridColumn="span 2">
          <Typography variant="subtitle1">Appointment Mode</Typography>
          <Stack direction="row" spacing={2} mt={1}>
            <Button
              variant={formData.appointmentMode === 'in-person' ? 'contained' : 'outlined'}
              onClick={() => setFormData(prev => ({ ...prev, appointmentMode: 'in-person' }))}
            >In-Person</Button>
            <Button
              variant={formData.appointmentMode === 'video' ? 'contained' : 'outlined'}
              onClick={() => setFormData(prev => ({ ...prev, appointmentMode: 'video' }))}
            >Video Call</Button>
          </Stack>
        </Box>

        {/* Select Date */}
        <Box gridColumn="span 2">
          <Typography variant="subtitle1">Select Date</Typography>
          <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
            {availableDates.map(day => (
              <Button
                key={day.id}
                variant={formData.selectedDate === day.id.toString() ? 'contained' : 'outlined'}
                onClick={() => setFormData(prev => ({ ...prev, selectedDate: day.id.toString() }))}
              >
                {day.label}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Select Time */}
        <Box gridColumn="span 2">
          <Typography variant="subtitle1">Select Time</Typography>
          <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
            {timeSlots.map(time => (
              <Button
                key={time}
                variant={formData.selectedTime === time ? 'contained' : 'outlined'}
                onClick={() => setFormData(prev => ({ ...prev, selectedTime: time }))}
              >{time}</Button>
            ))}
          </Stack>
        </Box>

        {/* Patient Details */}
        <TextField label="Patient Name" fullWidth variant="standard" value={formData.patientName} onChange={handleInputChange('patientName')} />
        <TextField label="Phone Number" fullWidth variant="standard" value={formData.phoneNumber} onChange={handleInputChange('phoneNumber')} />
        <TextField label="Email (Optional)" fullWidth variant="standard" value={formData.email} onChange={handleInputChange('email')} />
        <TextField label="Symptoms" fullWidth variant="standard" multiline rows={3} value={formData.symptoms} onChange={handleInputChange('symptoms')} />

        {/* Payment */}
        <Box gridColumn="span 2">
          <Typography variant="subtitle1">Payment Method</Typography>
          <RadioGroup value={formData.paymentMethod} onChange={handleInputChange('paymentMethod')}>
            <FormControlLabel value="pay-at-hospital" control={<Radio />} label="Pay at Hospital" />
            <FormControlLabel value="card" control={<Radio />} label="Credit/Debit Card" />
            <FormControlLabel value="upi" control={<Radio />} label="UPI Payment" />
          </RadioGroup>
        </Box>

        {/* Fee Summary */}
        <Box gridColumn="span 2">
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Consultation Fee:</Typography>
            <Typography>₹{consultationFee}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Convenience Fee:</Typography>
            <Typography>₹{convenienceFee}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" fontWeight="bold">
            <Typography>Total Amount:</Typography>
            <Typography color="primary">₹{totalAmount}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Confirm Button */}
      <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton variant="contained" fullWidth onClick={handleConfirmBooking} disabled={!canProceed()}>
          Confirm Booking
        </LoadingButton>
      </Stack>
    </Card>
  </Grid>
</Grid>


        </Grid>
      </Fade>
    </Box>
     </Box>
  );
}

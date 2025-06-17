// File: src/sections/overview/appointment/final-booking-page.jsx
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

export default function FinalBookingPage({
  doctor,
  specialty,
  appointmentDetails,
  onBack
}) {
  const theme = useTheme();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    email: '',
    symptoms: '',
    paymentMethod: 'pay-at-hospital'
  });

  // Fee structure
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

  const handleConfirmBooking = () => {
    const finalBookingData = {
      ...appointmentDetails,
      ...formData,
      consultationFee,
      convenienceFee,
      totalAmount,
      bookingTime: new Date().toISOString()
    };

    console.log('Final Booking Data:', finalBookingData);

    // Here you would typically send the data to your backend
    alert(`Booking Confirmed Successfully!\n\nBooking ID: #${Math.random().toString(36).substr(2, 9).toUpperCase()}\nTotal Amount: ₹${totalAmount}\nPayment Method: ${formData.paymentMethod === 'pay-at-hospital' ? 'Pay at Hospital' : formData.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI Payment'}`);

    // Navigate to success page or dashboard
    router.push('/dashboard/appointment');
  };

  const canProceed = () =>
    formData.phoneNumber.trim() !== '' && formData.symptoms.trim() !== '';

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#f8f9fa',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      pb: 4
    }}>
      {/* Header */}
      <Box sx={{
        bgcolor: 'white',
        p: { xs: 2, sm: 3 },
        borderBottom: '1px solid #e0e0e0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
      }}>
        <Slide direction="right" in={showContent} timeout={500}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                onClick={handleBack}
                sx={{
                  p: 1,
                  bgcolor: `${theme.palette.primary.main}10`,
                  '&:hover': {
                    bgcolor: `${theme.palette.primary.main}20`,
                    transform: 'scale(1.05)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <Typography sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>←</Typography>
              </IconButton>
              <Typography variant="h5" color="primary" fontWeight="600">
                Book Appointment
              </Typography>
            </Box>
          </Box>
        </Slide>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: '600px', mx: 'auto' }}>
        <Fade in={showContent} timeout={600}>
          <Card sx={{
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            mb: 4
          }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              {/* Phone Number Field */}
              <Box mb={3}>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Typography sx={{ fontSize: '1.2rem' }}>📞</Typography>
                  <Typography variant="h6" fontWeight="600">
                    Phone Number
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="standard"
                  value={formData.phoneNumber}
                  onChange={handleInputChange('phoneNumber')}
                  placeholder="Enter your phone number"
                  sx={{
                    '& .MuiInput-root': {
                      fontSize: '1.1rem',
                      '&:before': {
                        borderBottomColor: '#e0e0e0',
                        borderBottomWidth: 2
                      },
                      '&:hover:not(.Mui-disabled):before': {
                        borderBottomColor: theme.palette.primary.main,
                        borderBottomWidth: 2
                      },
                      '&.Mui-focused:after': {
                        borderBottomColor: theme.palette.primary.main,
                        borderBottomWidth: 3
                      }
                    }
                  }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Email Field */}
              <Box mb={3}>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Typography sx={{ fontSize: '1.2rem' }}>✉️</Typography>
                  <Typography variant="h6" fontWeight="600">
                    Email (Optional)
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  variant="standard"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  placeholder="Enter your email address"
                  sx={{
                    '& .MuiInput-root': {
                      fontSize: '1.1rem',
                      '&:before': {
                        borderBottomColor: '#e0e0e0',
                        borderBottomWidth: 2
                      },
                      '&:hover:not(.Mui-disabled):before': {
                        borderBottomColor: theme.palette.primary.main,
                        borderBottomWidth: 2
                      },
                      '&.Mui-focused:after': {
                        borderBottomColor: theme.palette.primary.main,
                        borderBottomWidth: 3
                      }
                    }
                  }}
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Symptoms Field */}
              <Box mb={4}>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Typography sx={{ fontSize: '1.2rem' }}>📝</Typography>
                  <Typography variant="h6" fontWeight="600">
                    Symptoms/Reason for Visit
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  variant="standard"
                  value={formData.symptoms}
                  onChange={handleInputChange('symptoms')}
                  placeholder="Describe your symptoms or reason for visit"
                  sx={{
                    '& .MuiInput-root': {
                      fontSize: '1.1rem',
                      '&:before': {
                        borderBottomColor: '#e0e0e0',
                        borderBottomWidth: 2
                      },
                      '&:hover:not(.Mui-disabled):before': {
                        borderBottomColor: theme.palette.primary.main,
                        borderBottomWidth: 2
                      },
                      '&.Mui-focused:after': {
                        borderBottomColor: theme.palette.primary.main,
                        borderBottomWidth: 3
                      }
                    }
                  }}
                />
              </Box>

              {/* Payment Method */}
              <Box mb={4}>
                <Typography variant="h6" fontWeight="600" mb={3}>
                  Payment Method
                </Typography>
                <FormControl component="fieldset" fullWidth>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onChange={handleInputChange('paymentMethod')}
                  >
                    <Card sx={{
                      mb: 2,
                      border: formData.paymentMethod === 'pay-at-hospital' ? `3px solid ${theme.palette.primary.main}` : '2px solid #e0e0e0',
                      borderRadius: 3,
                      bgcolor: formData.paymentMethod === 'pay-at-hospital' ? `${theme.palette.primary.main}08` : 'white',
                      transition: 'all 0.3s ease'
                    }}>
                      <CardContent sx={{ py: 2, px: 3 }}>
                        <FormControlLabel
                          value="pay-at-hospital"
                          control={<Radio sx={{ color: theme.palette.primary.main }} />}
                          label={
                            <Box display="flex" alignItems="center" gap={2}>
                              <Typography sx={{ fontSize: '1.5rem' }}>🏥</Typography>
                              <Typography variant="h6" fontWeight="600">
                                Pay at Hospital
                              </Typography>
                            </Box>
                          }
                          sx={{ margin: 0, width: '100%' }}
                        />
                      </CardContent>
                    </Card>

                    <Card sx={{
                      mb: 2,
                      border: formData.paymentMethod === 'card' ? `3px solid ${theme.palette.primary.main}` : '2px solid #e0e0e0',
                      borderRadius: 3,
                      bgcolor: formData.paymentMethod === 'card' ? `${theme.palette.primary.main}08` : 'white',
                      transition: 'all 0.3s ease'
                    }}>
                      <CardContent sx={{ py: 2, px: 3 }}>
                        <FormControlLabel
                          value="card"
                          control={<Radio sx={{ color: theme.palette.primary.main }} />}
                          label={
                            <Box display="flex" alignItems="center" gap={2}>
                              <Typography sx={{ fontSize: '1.5rem' }}>💳</Typography>
                              <Typography variant="h6" fontWeight="600">
                                Credit/Debit Card
                              </Typography>
                            </Box>
                          }
                          sx={{ margin: 0, width: '100%' }}
                        />
                      </CardContent>
                    </Card>

                    <Card sx={{
                      border: formData.paymentMethod === 'upi' ? `3px solid ${theme.palette.primary.main}` : '2px solid #e0e0e0',
                      borderRadius: 3,
                      bgcolor: formData.paymentMethod === 'upi' ? `${theme.palette.primary.main}08` : 'white',
                      transition: 'all 0.3s ease'
                    }}>
                      <CardContent sx={{ py: 2, px: 3 }}>
                        <FormControlLabel
                          value="upi"
                          control={<Radio sx={{ color: theme.palette.primary.main }} />}
                          label={
                            <Box display="flex" alignItems="center" gap={2}>
                              <Typography sx={{ fontSize: '1.5rem' }}>📱</Typography>
                              <Typography variant="h6" fontWeight="600">
                                UPI Payment
                              </Typography>
                            </Box>
                          }
                          sx={{ margin: 0, width: '100%' }}
                        />
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </FormControl>
              </Box>

              {/* Fee Details */}
              <Box mb={4}>
                <Typography variant="h6" fontWeight="600" mb={3}>
                  Fee Details
                </Typography>
                <Card sx={{
                  border: '2px solid #f0f0f0',
                  borderRadius: 3,
                  bgcolor: '#fafafa'
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                      <Typography variant="body1" fontWeight="500">
                        Consultation Fee
                      </Typography>
                      <Typography variant="body1" fontWeight="600">
                        ₹{consultationFee}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={3}>
                      <Typography variant="body1" fontWeight="500">
                        Convenience Fee
                      </Typography>
                      <Typography variant="body1" fontWeight="600">
                        ₹{convenienceFee}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2, borderWidth: 2 }} />
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h6" fontWeight="700">
                        Total Amount
                      </Typography>
                      <Typography variant="h6" fontWeight="700" color="primary">
                        ₹{totalAmount}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </CardContent>
          </Card>
        </Fade>

        {/* Confirm Booking Button */}
        <Fade in={showContent} timeout={800}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleConfirmBooking}
            disabled={!canProceed()}
            sx={{
              py: 2,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1.2rem',
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 35px rgba(25, 118, 210, 0.4)'
              },
              '&:disabled': {
                background: '#ccc',
                transform: 'none',
                boxShadow: 'none'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Confirm Booking
          </Button>
        </Fade>
      </Box>
    </Box>
  );
}

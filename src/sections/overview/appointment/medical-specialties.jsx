// File: src/sections/overview/appointment/medical-specialties.jsx
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

// UPDATED SPECIALTIES ARRAY WITH NEW ADDITIONS
const specialties = [
  { id: 1, name: "Cardiology", description: "Heart and cardiovascular care", icon: "❤️", bgColor: "#1976d2", key: "cardiology" },
  { id: 2, name: "Dermatology", description: "Skin, hair and nail care", icon: "💆‍♀️", bgColor: "#d32f2f", key: "dermatology" },
  { id: 3, name: "Neurology", description: "Brain and nervous system", icon: "🧠", bgColor: "#7b1fa2", key: "neurology" },
  { id: 4, name: "Orthopedics", description: "Bones, joints and muscles", icon: "🦴", bgColor: "#00796b", key: "orthopedics" },
  { id: 5, name: "Ophthalmology", description: "Eye and vision care", icon: "👁️", bgColor: "#f57c00", key: "ophthalmology" },
  { id: 6, name: "Pediatrics", description: "Children's health care", icon: "👶", bgColor: "#388e3c", key: "pediatrics" },
  { id: 7, name: "Gynecology", description: "Women's reproductive health", icon: "👩‍⚕️", bgColor: "#e91e63", key: "gynecology" },
  { id: 8, name: "Urology", description: "Urinary system and male health", icon: "🔬", bgColor: "#9c27b0", key: "urology" },
  { id: 9, name: "Dentistry", description: "Dental and oral health care", icon: "🦷", bgColor: "#607d8b", key: "dentistry" },
  { id: 10, name: "Physiotherapy", description: "Physical rehabilitation therapy", icon: "🏃‍♂️", bgColor: "#795548", key: "physiotherapy" },
  { id: 11, name: "General Medicine", description: "Primary healthcare and diagnosis", icon: "🩺", bgColor: "#3f51b5", key: "general-medicine" }
];

export default function MedicalSpecialties() {
  const theme = useTheme();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter specialties based on search
  const filteredSpecialties = specialties.filter(specialty =>
    specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    specialty.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSpecialtyClick = (specialty) => {
    console.log('Navigating to:', `/dashboard/appointment/${specialty.key}`);
    // Navigate to the specialty-specific page
    router.push(`/dashboard/appointment/${specialty.key}`);
  };

  const handleEmergencyClick = () => {
    router.push('/dashboard/appointment/emergency');
  };

  const handleVideoCallClick = () => {
    router.push('/dashboard/appointment/video-call');
  };

  return (
    <Box sx={{
      p: { xs: 1, sm: 2, md: 3 },
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* Search Section - Enhanced Responsive */}
      <Box mb={{ xs: 3, sm: 4 }}>
        <Box
          display="flex"
          gap={{ xs: 1, sm: 2 }}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <TextField
            fullWidth
            placeholder="Search specialties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>🔍</Typography>
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: { xs: 1.5, sm: 2 },
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                minHeight: { xs: 48, sm: 56 },
                '& fieldset': { border: 'none' },
                '&:hover': { bgcolor: alpha(theme.palette.background.paper, 0.9) },
                '&.Mui-focused': { border: `2px solid ${theme.palette.primary.main}` },
              },
            }}
          />
          <IconButton
            sx={{
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              borderRadius: { xs: 1.5, sm: 2 },
              bgcolor: theme.palette.primary.main,
              color: '#fff',
              fontSize: { xs: '1.2rem', sm: '1.4rem' },
              alignSelf: { xs: 'center', sm: 'stretch' },
              '&:hover': { bgcolor: theme.palette.primary.dark }
            }}
          >
            ☰
          </IconButton>
        </Box>
      </Box>

      {/* Title Section - Enhanced Responsive */}
      <Box mb={{ xs: 3, sm: 4 }} textAlign={{ xs: 'center', sm: 'left' }}>
        <Typography
          variant="h4"
          mb={{ xs: 0.5, sm: 1 }}
          sx={{
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' },
            fontWeight: 600
          }}
        >
          Medical Specialties
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1rem' },
            px: { xs: 2, sm: 0 }
          }}
        >
          Choose a specialty to book your appointment
        </Typography>
      </Box>

      {/* Specialty Cards - Optimized Grid Responsive */}
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} mb={{ xs: 3, sm: 4 }}>
        {filteredSpecialties.map((specialty) => (
          <Grid
            xs={6}       // 2 cards per row on mobile
            sm={4}       // 3 cards per row on small tablets
            md={3}       // 4 cards per row on medium screens
            lg={2.4}     // 5 cards per row on large screens
            xl={2}       // 6 cards per row on extra large screens
            key={specialty.id}
          >
            <Card
              sx={{
                textAlign: 'center',
                borderRadius: { xs: 2, sm: 2.5, md: 3 },
                bgcolor: 'background.paper',
                boxShadow: { xs: 2, sm: 3 },
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                height: '100%',
                minHeight: { xs: 140, sm: 160, md: 180 },
                '&:hover': {
                  transform: { xs: 'translateY(-3px)', sm: 'translateY(-6px)' },
                  boxShadow: { xs: 4, sm: 6 },
                  bgcolor: alpha(theme.palette.primary.main, 0.02)
                },
                '&:active': {
                  transform: 'translateY(-2px)',
                }
              }}
              onClick={() => handleSpecialtyClick(specialty)}
            >
              <CardContent sx={{
                p: { xs: 1.5, sm: 2, md: 2.5 },
                '&:last-child': { pb: { xs: 1.5, sm: 2, md: 2.5 } }
              }}>
                {/* Icon Circle */}
                <Box sx={{
                  width: { xs: 48, sm: 56, md: 64 },
                  height: { xs: 48, sm: 56, md: 64 },
                  mx: 'auto',
                  mb: { xs: 1, sm: 1.5, md: 2 },
                  borderRadius: '50%',
                  bgcolor: specialty.bgColor,
                  color: '#fff',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: 2
                }}>
                  {specialty.icon}
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  mb={{ xs: 0.25, sm: 0.5 }}
                  sx={{
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                    fontWeight: 600,
                    lineHeight: 1.3
                  }}
                >
                  {specialty.name}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
                    lineHeight: 1.4,
                    display: { xs: 'none', sm: 'block' } // Hide on mobile for cleaner look
                  }}
                >
                  {specialty.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Emergency & Video Call Buttons - Enhanced Responsive */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleEmergencyClick}
            sx={{
              py: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: { xs: 2, sm: 2.5, md: 3 },
              bgcolor: '#d32f2f',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontWeight: 600,
              minHeight: { xs: 56, sm: 64 },
              boxShadow: 3,
              '&:hover': {
                bgcolor: '#b71c1c',
                boxShadow: 6,
                transform: 'translateY(-2px)'
              },
              '&:active': {
                transform: 'translateY(0px)'
              }
            }}
          >
            <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' }, mr: 1 }}>🚨</Typography>
            Emergency
          </Button>
        </Grid>
        <Grid xs={12} sm={6}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleVideoCallClick}
            sx={{
              py: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: { xs: 2, sm: 2.5, md: 3 },
              color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              fontWeight: 600,
              minHeight: { xs: 56, sm: 64 },
              borderWidth: 2,
              '&:hover': {
                borderColor: theme.palette.primary.dark,
                color: theme.palette.primary.dark,
                bgcolor: alpha(theme.palette.primary.main, 0.04),
                borderWidth: 2,
                transform: 'translateY(-2px)'
              },
              '&:active': {
                transform: 'translateY(0px)'
              }
            }}
          >
            <Typography sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' }, mr: 1 }}>📹</Typography>
            Video Call
          </Button>
        </Grid>
      </Grid>

      {/* No Results Message */}
      {filteredSpecialties.length === 0 && (
        <Box
          textAlign="center"
          py={{ xs: 4, sm: 6 }}
          sx={{
            bgcolor: alpha(theme.palette.grey[100], 0.5),
            borderRadius: { xs: 2, sm: 3 },
            mt: 2
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
          >
            No specialties found
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
            sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
          >
            Try searching with different keywords
          </Typography>
        </Box>
      )}
    </Box>
  );
}

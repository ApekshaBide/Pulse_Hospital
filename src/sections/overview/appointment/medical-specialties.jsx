// File: src/sections/overview/appointment/medical-specialties.jsx
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useTheme, alpha } from '@mui/material/styles';

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
    <Box>
      {/* Search */}
      <Box mb={4}>
        <Box display="flex" gap={2} mb={3}>
          <TextField
            fullWidth
            placeholder="Search specialties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">🔍</InputAdornment>
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: alpha(theme.palette.background.paper, 0.8),
                border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
                '& fieldset': { border: 'none' },
                '&:hover': { bgcolor: alpha(theme.palette.background.paper, 0.9) },
                '&.Mui-focused': { border: `2px solid ${theme.palette.primary.main}` },
              },
            }}
          />
          <IconButton
            sx={{
              width: 56, height: 56, borderRadius: 2,
              bgcolor: theme.palette.primary.main, color: '#fff'
            }}
          >☰</IconButton>
        </Box>
      </Box>

      {/* Title */}
      <Typography variant="h4" mb={1}>Medical Specialties</Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Choose a specialty to book your appointment
      </Typography>

      {/* Cards - Updated to show more specialties */}
      <Grid container spacing={3} mb={4}>
        {filteredSpecialties.map((specialty) => (
          <Grid xs={12} sm={6} md={4} lg={3} key={specialty.id}>
            <Card
              sx={{
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: 'background.paper',
                boxShadow: 3,
                transition: 'all 0.3s',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 6,
                  bgcolor: alpha(theme.palette.primary.main, 0.02)
                }
              }}
              onClick={() => handleSpecialtyClick(specialty)}
            >
              <CardContent>
                <Box sx={{
                  width: 64, height: 64, mx: 'auto', mb: 2,
                  borderRadius: '50%', bgcolor: specialty.bgColor, color: '#fff',
                  fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {specialty.icon}
                </Box>
                <Typography variant="h6" mb={0.5}>{specialty.name}</Typography>
                <Typography variant="body2" color="text.secondary">{specialty.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Emergency & Video Call */}
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleEmergencyClick}
            sx={{
              py: 2.5, borderRadius: 3,
              bgcolor: '#d32f2f', '&:hover': { bgcolor: '#b71c1c' }
            }}
          >
            🚨 Emergency
          </Button>
        </Grid>
        <Grid xs={12} md={6}>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleVideoCallClick}
            sx={{
              py: 2.5, borderRadius: 3, color: theme.palette.primary.main,
              borderColor: theme.palette.primary.main,
              '&:hover': { borderColor: theme.palette.primary.dark, color: theme.palette.primary.dark }
            }}
          >
            📹 Video Call
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

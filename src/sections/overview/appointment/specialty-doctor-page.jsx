// File: src/sections/overview/appointment/specialty-doctor-page.jsx
// 1️⃣ React
import React, { useState } from 'react';

// 2️⃣ MUI core components (alphabetically)
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// 3️⃣ Other imports (non-MUI)
import { useRouter } from 'src/routes/hooks';


// Import the booking component
import BookAppointmentPage from './book-appointment-page';

// Doctor data for all specialties
const doctorsData = {
  cardiology: [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      qualifications: "MBBS, MD Cardiology",
      experience: "15+ years",
      rating: 4.8,
      slots: 4,
      fee: 800,
      homeVisit: true,
      nextAvailable: "Today, 10:30 AM",
      availableSlots: ["11:00 AM", "2:00 PM", "4:00 PM", "5:00 PM"]
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      qualifications: "MBBS, MS Cardiology",
      experience: "12+ years",
      rating: 4.6,
      slots: 3,
      fee: 700,
      homeVisit: false,
      nextAvailable: "Today, 2:00 PM",
      availableSlots: ["11:00 AM", "2:00 PM", "4:00 PM", "5:00 PM"]
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      qualifications: "MBBS, DM Cardiology",
      experience: "10+ years",
      rating: 4.9,
      slots: 2,
      fee: 900,
      homeVisit: true,
      nextAvailable: "Today, 4:00 PM",
      availableSlots: ["11:00 AM", "2:00 PM", "4:00 PM", "5:00 PM"]
    },
    {
      id: 4,
      name: "Dr. Rajesh Kumar",
      qualifications: "MBBS, MD Cardiology",
      experience: "18+ years",
      rating: 4.5,
      slots: 5,
      fee: 1000,
      homeVisit: false,
      nextAvailable: "Tomorrow, 9:00 AM",
      availableSlots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"]
    },
    {
      id: 5,
      name: "Dr. Jennifer Lee",
      qualifications: "MBBS, MD Cardiology",
      experience: "8+ years",
      rating: 4.4,
      slots: 3,
      fee: 650,
      homeVisit: true,
      nextAvailable: "Today, 3:00 PM",
      availableSlots: ["10:00 AM", "1:00 PM", "3:00 PM", "6:00 PM"]
    },
    {
      id: 6,
      name: "Dr. Arun Verma",
      qualifications: "MBBS, DM Cardiology",
      experience: "22+ years",
      rating: 4.7,
      slots: 2,
      fee: 1200,
      homeVisit: false,
      nextAvailable: "Tomorrow, 11:00 AM",
      availableSlots: ["11:00 AM", "4:00 PM"]
    }
  ],
  dermatology: [
    {
      id: 1,
      name: "Dr. Emma Williams",
      qualifications: "MBBS, MD Dermatology",
      experience: "14+ years",
      rating: 4.7,
      slots: 3,
      fee: 750,
      homeVisit: true,
      nextAvailable: "Today, 11:00 AM",
      availableSlots: ["11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"]
    },
    {
      id: 2,
      name: "Dr. Arjun Patel",
      qualifications: "MBBS, DVD Dermatology",
      experience: "8+ years",
      rating: 4.4,
      slots: 4,
      fee: 600,
      homeVisit: false,
      nextAvailable: "Today, 2:30 PM",
      availableSlots: ["10:00 AM", "12:00 PM", "2:30 PM", "4:30 PM"]
    },
    {
      id: 3,
      name: "Dr. Sneha Gupta",
      qualifications: "MBBS, MD Dermatology",
      experience: "12+ years",
      rating: 4.8,
      slots: 2,
      fee: 850,
      homeVisit: true,
      nextAvailable: "Tomorrow, 10:00 AM",
      availableSlots: ["10:00 AM", "3:00 PM"]
    },
    {
      id: 4,
      name: "Dr. Mark Davis",
      qualifications: "MBBS, MD Dermatology",
      experience: "16+ years",
      rating: 4.6,
      slots: 5,
      fee: 700,
      homeVisit: false,
      nextAvailable: "Today, 12:00 PM",
      availableSlots: ["9:00 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"]
    },
    {
      id: 5,
      name: "Dr. Nisha Jain",
      qualifications: "MBBS, MD Dermatology",
      experience: "9+ years",
      rating: 4.5,
      slots: 3,
      fee: 650,
      homeVisit: true,
      nextAvailable: "Today, 1:30 PM",
      availableSlots: ["11:30 AM", "1:30 PM", "4:00 PM"]
    }
  ],
  neurology: [
    {
      id: 1,
      name: "Dr. James Rodriguez",
      qualifications: "MBBS, DM Neurology",
      experience: "16+ years",
      rating: 4.8,
      slots: 2,
      fee: 1200,
      homeVisit: false,
      nextAvailable: "Tomorrow, 10:00 AM",
      availableSlots: ["10:00 AM", "3:00 PM"]
    },
    {
      id: 2,
      name: "Dr. Kavya Reddy",
      qualifications: "MBBS, MD Neurology",
      experience: "11+ years",
      rating: 4.6,
      slots: 3,
      fee: 950,
      homeVisit: true,
      nextAvailable: "Today, 4:00 PM",
      availableSlots: ["11:00 AM", "1:00 PM", "4:00 PM"]
    },
    {
      id: 3,
      name: "Dr. Amit Shah",
      qualifications: "MBBS, DM Neurology",
      experience: "20+ years",
      rating: 4.9,
      slots: 1,
      fee: 1500,
      homeVisit: false,
      nextAvailable: "Next Week",
      availableSlots: ["2:00 PM"]
    },
    {
      id: 4,
      name: "Dr. Rebecca Martinez",
      qualifications: "MBBS, MD Neurology",
      experience: "13+ years",
      rating: 4.7,
      slots: 4,
      fee: 1100,
      homeVisit: true,
      nextAvailable: "Today, 11:00 AM",
      availableSlots: ["9:00 AM", "11:00 AM", "2:00 PM", "5:00 PM"]
    },
    {
      id: 5,
      name: "Dr. Rohit Gupta",
      qualifications: "MBBS, DM Neurology",
      experience: "18+ years",
      rating: 4.8,
      slots: 2,
      fee: 1300,
      homeVisit: false,
      nextAvailable: "Tomorrow, 2:00 PM",
      availableSlots: ["10:00 AM", "2:00 PM"]
    }
  ],
  orthopedics: [
    {
      id: 1,
      name: "Dr. Robert Kim",
      qualifications: "MBBS, MS Orthopedics",
      experience: "13+ years",
      rating: 4.7,
      slots: 4,
      fee: 850,
      homeVisit: false,
      nextAvailable: "Today, 1:00 PM",
      availableSlots: ["10:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"]
    },
    {
      id: 2,
      name: "Dr. Vikram Singh",
      qualifications: "MBBS, MS Orthopedics",
      experience: "9+ years",
      rating: 4.5,
      slots: 3,
      fee: 700,
      homeVisit: true,
      nextAvailable: "Today, 2:00 PM",
      availableSlots: ["11:00 AM", "2:00 PM", "4:00 PM"]
    },
    {
      id: 3,
      name: "Dr. Lisa Anderson",
      qualifications: "MBBS, MS Orthopedics",
      experience: "7+ years",
      rating: 4.3,
      slots: 5,
      fee: 600,
      homeVisit: false,
      nextAvailable: "Today, 3:00 PM",
      availableSlots: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"]
    },
    {
      id: 4,
      name: "Dr. Ashwin Patel",
      qualifications: "MBBS, MS Orthopedics",
      experience: "15+ years",
      rating: 4.8,
      slots: 3,
      fee: 900,
      homeVisit: true,
      nextAvailable: "Today, 12:00 PM",
      availableSlots: ["10:00 AM", "12:00 PM", "4:00 PM"]
    },
    {
      id: 5,
      name: "Dr. Sandra Wilson",
      qualifications: "MBBS, MS Orthopedics",
      experience: "11+ years",
      rating: 4.6,
      slots: 4,
      fee: 750,
      homeVisit: false,
      nextAvailable: "Tomorrow, 10:00 AM",
      availableSlots: ["10:00 AM", "1:00 PM", "3:00 PM", "6:00 PM"]
    }
  ],
  ophthalmology: [
    {
      id: 1,
      name: "Dr. Lisa Chen",
      qualifications: "MBBS, MS Ophthalmology",
      experience: "9+ years",
      rating: 4.5,
      slots: 5,
      fee: 650,
      homeVisit: false,
      nextAvailable: "Today, 12:00 PM",
      availableSlots: ["9:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]
    },
    {
      id: 2,
      name: "Dr. Anjali Mehta",
      qualifications: "MBBS, MS Ophthalmology",
      experience: "15+ years",
      rating: 4.8,
      slots: 2,
      fee: 900,
      homeVisit: false,
      nextAvailable: "Tomorrow, 11:00 AM",
      availableSlots: ["11:00 AM", "4:00 PM"]
    },
    {
      id: 3,
      name: "Dr. David Park",
      qualifications: "MBBS, MS Ophthalmology",
      experience: "12+ years",
      rating: 4.6,
      slots: 3,
      fee: 750,
      homeVisit: true,
      nextAvailable: "Today, 2:00 PM",
      availableSlots: ["10:00 AM", "2:00 PM", "5:00 PM"]
    },
    {
      id: 4,
      name: "Dr. Priya Nair",
      qualifications: "MBBS, MS Ophthalmology",
      experience: "8+ years",
      rating: 4.4,
      slots: 4,
      fee: 600,
      homeVisit: false,
      nextAvailable: "Today, 3:30 PM",
      availableSlots: ["9:30 AM", "11:30 AM", "2:30 PM", "3:30 PM"]
    },
    {
      id: 5,
      name: "Dr. Thomas Brown",
      qualifications: "MBBS, MS Ophthalmology",
      experience: "18+ years",
      rating: 4.9,
      slots: 2,
      fee: 1000,
      homeVisit: false,
      nextAvailable: "Tomorrow, 9:00 AM",
      availableSlots: ["9:00 AM", "3:00 PM"]
    }
  ],
  pediatrics: [
    {
      id: 1,
      name: "Dr. Maria Garcia",
      qualifications: "MBBS, MD Pediatrics",
      experience: "12+ years",
      rating: 4.9,
      slots: 3,
      fee: 700,
      homeVisit: true,
      nextAvailable: "Today, 3:00 PM",
      availableSlots: ["10:00 AM", "1:00 PM", "3:00 PM"]
    },
    {
      id: 2,
      name: "Dr. Ravi Kumar",
      qualifications: "MBBS, MD Pediatrics",
      experience: "8+ years",
      rating: 4.6,
      slots: 4,
      fee: 600,
      homeVisit: true,
      nextAvailable: "Today, 11:00 AM",
      availableSlots: ["9:00 AM", "11:00 AM", "2:00 PM", "5:00 PM"]
    },
    {
      id: 3,
      name: "Dr. Sophie Turner",
      qualifications: "MBBS, MD Pediatrics",
      experience: "10+ years",
      rating: 4.7,
      slots: 2,
      fee: 800,
      homeVisit: false,
      nextAvailable: "Tomorrow, 9:00 AM",
      availableSlots: ["9:00 AM", "4:00 PM"]
    },
    {
      id: 4,
      name: "Dr. Neha Sharma",
      qualifications: "MBBS, MD Pediatrics",
      experience: "14+ years",
      rating: 4.8,
      slots: 5,
      fee: 750,
      homeVisit: true,
      nextAvailable: "Today, 10:00 AM",
      availableSlots: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"]
    },
    {
      id: 5,
      name: "Dr. Alex Thompson",
      qualifications: "MBBS, MD Pediatrics",
      experience: "6+ years",
      rating: 4.5,
      slots: 3,
      fee: 550,
      homeVisit: false,
      nextAvailable: "Today, 1:30 PM",
      availableSlots: ["11:30 AM", "1:30 PM", "3:30 PM"]
    }
  ],
  gynecology: [
    {
      id: 1,
      name: "Dr. Anita Sharma",
      qualifications: "MBBS, MS Gynecology",
      experience: "16+ years",
      rating: 4.9,
      slots: 3,
      fee: 900,
      homeVisit: true,
      nextAvailable: "Today, 2:00 PM",
      availableSlots: ["10:00 AM", "2:00 PM", "4:00 PM"]
    },
    {
      id: 2,
      name: "Dr. Rebecca Thompson",
      qualifications: "MBBS, MD Gynecology",
      experience: "12+ years",
      rating: 4.7,
      slots: 4,
      fee: 750,
      homeVisit: false,
      nextAvailable: "Today, 11:00 AM",
      availableSlots: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"]
    },
    {
      id: 3,
      name: "Dr. Meera Joshi",
      qualifications: "MBBS, DGO Gynecology",
      experience: "14+ years",
      rating: 4.8,
      slots: 2,
      fee: 850,
      homeVisit: true,
      nextAvailable: "Tomorrow, 10:00 AM",
      availableSlots: ["10:00 AM", "5:00 PM"]
    },
    {
      id: 4,
      name: "Dr. Kavitha Reddy",
      qualifications: "MBBS, MS Gynecology",
      experience: "10+ years",
      rating: 4.6,
      slots: 3,
      fee: 700,
      homeVisit: false,
      nextAvailable: "Today, 3:30 PM",
      availableSlots: ["11:30 AM", "2:30 PM", "3:30 PM"]
    },
    {
      id: 5,
      name: "Dr. Sarah Mitchell",
      qualifications: "MBBS, MD Gynecology",
      experience: "18+ years",
      rating: 4.9,
      slots: 2,
      fee: 1000,
      homeVisit: true,
      nextAvailable: "Tomorrow, 9:00 AM",
      availableSlots: ["9:00 AM", "2:00 PM"]
    }
  ],
  urology: [
    {
      id: 1,
      name: "Dr. Mark Wilson",
      qualifications: "MBBS, MS Urology",
      experience: "18+ years",
      rating: 4.8,
      slots: 2,
      fee: 1100,
      homeVisit: false,
      nextAvailable: "Today, 3:00 PM",
      availableSlots: ["11:00 AM", "3:00 PM"]
    },
    {
      id: 2,
      name: "Dr. Suresh Reddy",
      qualifications: "MBBS, MCh Urology",
      experience: "15+ years",
      rating: 4.6,
      slots: 3,
      fee: 950,
      homeVisit: false,
      nextAvailable: "Today, 1:00 PM",
      availableSlots: ["10:00 AM", "1:00 PM", "4:00 PM"]
    },
    {
      id: 3,
      name: "Dr. Jennifer Lee",
      qualifications: "MBBS, MS Urology",
      experience: "10+ years",
      rating: 4.5,
      slots: 4,
      fee: 800,
      homeVisit: true,
      nextAvailable: "Tomorrow, 9:00 AM",
      availableSlots: ["9:00 AM", "11:00 AM", "2:00 PM", "5:00 PM"]
    },
    {
      id: 4,
      name: "Dr. Rajesh Kumar",
      qualifications: "MBBS, MCh Urology",
      experience: "22+ years",
      rating: 4.9,
      slots: 2,
      fee: 1300,
      homeVisit: false,
      nextAvailable: "Tomorrow, 11:00 AM",
      availableSlots: ["11:00 AM", "4:00 PM"]
    },
    {
      id: 5,
      name: "Dr. Amanda Davis",
      qualifications: "MBBS, MS Urology",
      experience: "8+ years",
      rating: 4.4,
      slots: 3,
      fee: 750,
      homeVisit: true,
      nextAvailable: "Today, 2:30 PM",
      availableSlots: ["12:30 PM", "2:30 PM", "5:30 PM"]
    }
  ],
  dentistry: [
    {
      id: 1,
      name: "Dr. Alex Martin",
      qualifications: "BDS, MDS Oral Surgery",
      experience: "12+ years",
      rating: 4.7,
      slots: 5,
      fee: 500,
      homeVisit: false,
      nextAvailable: "Today, 10:00 AM",
      availableSlots: ["9:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]
    },
    {
      id: 2,
      name: "Dr. Pooja Agarwal",
      qualifications: "BDS, MDS Orthodontics",
      experience: "8+ years",
      rating: 4.6,
      slots: 4,
      fee: 600,
      homeVisit: false,
      nextAvailable: "Today, 11:00 AM",
      availableSlots: ["10:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"]
    },
    {
      id: 3,
      name: "Dr. Kevin Brown",
      qualifications: "BDS, MDS Periodontics",
      experience: "14+ years",
      rating: 4.8,
      slots: 3,
      fee: 700,
      homeVisit: false,
      nextAvailable: "Tomorrow, 9:00 AM",
      availableSlots: ["9:00 AM", "2:00 PM", "4:00 PM"]
    },
    {
      id: 4,
      name: "Dr. Ritu Singh",
      qualifications: "BDS, MDS Endodontics",
      experience: "9+ years",
      rating: 4.5,
      slots: 4,
      fee: 550,
      homeVisit: false,
      nextAvailable: "Today, 2:30 PM",
      availableSlots: ["10:30 AM", "12:30 PM", "2:30 PM", "4:30 PM"]
    },
    {
      id: 5,
      name: "Dr. James Wilson",
      qualifications: "BDS, MDS Prosthodontics",
      experience: "16+ years",
      rating: 4.9,
      slots: 3,
      fee: 800,
      homeVisit: false,
      nextAvailable: "Tomorrow, 10:00 AM",
      availableSlots: ["10:00 AM", "1:00 PM", "3:00 PM"]
    }
  ],
  physiotherapy: [
    {
      id: 1,
      name: "Dr. Rachel Green",
      qualifications: "BPT, MPT Orthopedics",
      experience: "10+ years",
      rating: 4.6,
      slots: 6,
      fee: 400,
      homeVisit: true,
      nextAvailable: "Today, 9:00 AM",
      availableSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]
    },
    {
      id: 2,
      name: "Dr. Rohit Sharma",
      qualifications: "BPT, MPT Sports",
      experience: "7+ years",
      rating: 4.5,
      slots: 5,
      fee: 450,
      homeVisit: true,
      nextAvailable: "Today, 10:00 AM",
      availableSlots: ["10:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"]
    },
    {
      id: 3,
      name: "Dr. Lisa Wang",
      qualifications: "BPT, MPT Neurology",
      experience: "12+ years",
      rating: 4.7,
      slots: 4,
      fee: 500,
      homeVisit: true,
      nextAvailable: "Today, 2:00 PM",
      availableSlots: ["11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]
    },
    {
      id: 4,
      name: "Dr. Amit Joshi",
      qualifications: "BPT, MPT Cardiopulmonary",
      experience: "9+ years",
      rating: 4.4,
      slots: 5,
      fee: 380,
      homeVisit: true,
      nextAvailable: "Today, 11:30 AM",
      availableSlots: ["9:30 AM", "11:30 AM", "1:30 PM", "3:30 PM", "5:30 PM"]
    },
    {
      id: 5,
      name: "Dr. Maya Patel",
      qualifications: "BPT, MPT Pediatrics",
      experience: "6+ years",
      rating: 4.6,
      slots: 4,
      fee: 420,
      homeVisit: true,
      nextAvailable: "Today, 12:00 PM",
      availableSlots: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]
    }
  ],
}


const specialtyNames = {
  cardiology: "Cardiology Doctors",
  dermatology: "Dermatology Doctors",
  neurology: "Neurology Doctors",
  orthopedics: "Orthopedics Doctors",
  ophthalmology: "Ophthalmology Doctors",
  pediatrics: "Pediatrics Doctors",
  gynecology: "Gynecology Doctors",
  urology: "Urology Doctors",
  dentistry: "Dentistry Doctors",
  physiotherapy: "Physiotherapy Specialists",
  generalmedicine: "General Medicine Doctors",
};

export default function SpecialtyDoctorPage({ specialty }) {
  const theme = useTheme();
  const router = useRouter();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const doctors = doctorsData[specialty] || [];

  const getAvatarColor = (name) => {
    const colors = ['#1976d2', '#d32f2f', '#7b1fa2', '#00796b', '#f57c00', '#388e3c'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const handleBack = () => {
    router.push('/dashboard/appointment');
  };

  const handleTimeSlotClick = (doctor, slot) => {
    setSelectedDoctor(doctor);
    setShowBooking(true);
  };

  const handleBackFromBooking = () => {
    setShowBooking(false);
    setSelectedDoctor(null);
  };

  if (!doctors || doctors.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">No doctors found for {specialty}</Typography>
        <Button onClick={handleBack} sx={{ mt: 2 }}>← Back to Appointments</Button>
      </Box>
    );
  }

  // Show booking page if a doctor is selected
  if (showBooking && selectedDoctor) {
    return (
      <BookAppointmentPage
        doctor={selectedDoctor}
        specialty={specialty}
        onBack={handleBackFromBooking}
      />
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              onClick={handleBack}
              sx={{
                p: 1,
                '&:hover': { bgcolor: theme.palette.action.hover }
              }}
            >
              ←
            </IconButton>
            <Typography
              variant="h5"

              fontWeight="600"
              sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
            >
              {specialtyNames[specialty] || `${specialty} Doctors`}
            </Typography>
          </Box>
          <IconButton>
            ☰
          </IconButton>
        </Box>
      </Box>

      {/* Doctor Cards Grid */}
      <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {doctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={doctor.id}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  border: '1px solid #f0f0f0',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
                  {/* Doctor Avatar & Basic Info */}
                  <Box display="flex" gap={1.5} mb={1.5}>
                    <Box
                      sx={{
                        width: 45,
                        height: 45,
                        borderRadius: '50%',
                        bgcolor: getAvatarColor(doctor.name),
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        flexShrink: 0
                      }}
                    >
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </Box>

                    <Box flex={1} minWidth={0}>
                      <Typography
                        variant="subtitle2"
                        color="primary"
                        fontWeight="600"
                        sx={{
                          fontSize: '0.95rem',
                          lineHeight: 1.2,
                          mb: 0.5,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {doctor.name}
                      </Typography>

                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
                        <Typography
                          variant="caption"
                          sx={{
                            bgcolor: '#e8f5e8',
                            color: '#2e7d32',
                            px: 0.8,
                            py: 0.2,
                            borderRadius: 0.8,
                            fontWeight: 500,
                            fontSize: '0.7rem'
                          }}
                        >
                          ⭐ {doctor.rating}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="success.main"
                          fontWeight="500"
                          sx={{ fontSize: '0.7rem' }}
                        >
                          {doctor.slots} slots
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Qualifications & Experience */}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{
                      fontSize: '0.75rem',
                      mb: 0.5,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {doctor.qualifications}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ fontSize: '0.75rem', mb: 1.5 }}
                  >
                    📅 {doctor.experience}
                  </Typography>

                  {/* Fee and Visit Type */}
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                    <Typography
                      variant="h6"
                      color="primary"
                      fontWeight="600"
                      sx={{ fontSize: '1.1rem' }}
                    >
                      ₹ {doctor.fee}
                    </Typography>
                    {doctor.homeVisit && (
                      <Chip
                        icon={<span style={{ fontSize: '0.7rem' }}>🏠</span>}
                        label="Home"
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{
                          height: 20,
                          fontSize: '0.65rem',
                          '& .MuiChip-label': { px: 0.8 }
                        }}
                      />
                    )}
                  </Box>

                  {/* Next Available */}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ fontSize: '0.7rem', mb: 1 }}
                  >
                    Next: {doctor.nextAvailable}
                  </Typography>

                  {/* Available Slots - Show only first 3 */}
                  <Box display="flex" gap={0.5} mb={1.5} flexWrap="wrap">
                    {doctor.availableSlots.slice(0, 3).map((slot, index) => (
                      <Chip
                        key={index}
                        label={slot}
                        variant="outlined"
                        size="small"
                        onClick={() => handleTimeSlotClick(doctor, slot)}
                        sx={{
                          height: 22,
                          borderRadius: 1.5,
                          fontSize: '0.65rem',
                          cursor: 'pointer',
                          '& .MuiChip-label': { px: 0.8 },
                          '&:hover': {
                            bgcolor: theme.palette.primary.light,
                            color: 'white',
                            borderColor: theme.palette.primary.main
                          }
                        }}
                      />
                    ))}
                    {doctor.availableSlots.length > 3 && (
                      <Chip
                        label={`+${doctor.availableSlots.length - 3} more`}
                        variant="outlined"
                        size="small"
                        onClick={() => handleTimeSlotClick(doctor, doctor.availableSlots[3])}
                        sx={{
                          height: 22,
                          borderRadius: 1.5,
                          fontSize: '0.65rem',
                          cursor: 'pointer',
                          '& .MuiChip-label': { px: 0.8 },
                          '&:hover': {
                            bgcolor: theme.palette.primary.light,
                            color: 'white',
                            borderColor: theme.palette.primary.main
                          }
                        }}
                      />
                    )}
                  </Box>

                  {/* Book Button */}
                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    onClick={() => handleTimeSlotClick(doctor, doctor.availableSlots[0])}
                    sx={{
                      borderRadius: 1.5,
                      py: 0.8,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)'
                      }
                    }}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

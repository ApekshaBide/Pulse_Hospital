// File: src/sections/overview/appointment/specialty-doctor-page.jsx
// 1️⃣ React
import React, { useState } from 'react';

// 2️⃣ MUI core components (alphabetically)
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

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
  "general-medicine": [
    {
      id: 1,
      name: "Dr. John Anderson",
      qualifications: "MBBS, MD General Medicine",
      experience: "15+ years",
      rating: 4.7,
      slots: 6,
      fee: 500,
      homeVisit: true,
      nextAvailable: "Today, 9:00 AM",
      availableSlots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]
    },
    {
      id: 2,
      name: "Dr. Priya Mehta",
      qualifications: "MBBS, MD Internal Medicine",
      experience: "11+ years",
      rating: 4.6,
      slots: 5,
      fee: 450,
      homeVisit: true,
      nextAvailable: "Today, 10:00 AM",
      availableSlots: ["10:00 AM", "12:00 PM", "1:00 PM", "3:00 PM", "5:00 PM"]
    },
    {
      id: 3,
      name: "Dr. Robert Taylor",
      qualifications: "MBBS, MD General Medicine",
      experience: "18+ years",
      rating: 4.8,
      slots: 4,
      fee: 600,
      homeVisit: false,
      nextAvailable: "Today, 11:00 AM",
      availableSlots: ["11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"]
    },
    {
      id: 4,
      name: "Dr. Sunita Rao",
      qualifications: "MBBS, MD Internal Medicine",
      experience: "13+ years",
      rating: 4.5,
      slots: 5,
      fee: 520,
      homeVisit: true,
      nextAvailable: "Today, 2:00 PM",
      availableSlots: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"]
    },
    {
      id: 5,
      name: "Dr. Michael Zhang",
      qualifications: "MBBS, MD General Medicine",
      experience: "9+ years",
      rating: 4.4,
      slots: 6,
      fee: 480,
      homeVisit: true,
      nextAvailable: "Today, 12:30 PM",
      availableSlots: ["9:30 AM", "11:30 AM", "12:30 PM", "2:30 PM", "4:30 PM", "6:30 PM"]
    }
  ]
};

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

  // Number of slots to show: 2 on mobile, 3 on tablet and up
  const slotsToShow = window.innerWidth < 600 ? 2 : 3;

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
    <Box sx={{
      p: { xs: 1, sm: 2, md: 3 },
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Box mb={{ xs: 2, sm: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 2 }}>
            <IconButton
              onClick={handleBack}
              sx={{
                p: { xs: 0.5, sm: 1 },
                fontSize: { xs: '1.2rem', sm: '1.4rem' },
                color: theme.palette.primary.main,
                '&:hover': { bgcolor: theme.palette.action.hover }
              }}
            >
              ←
            </IconButton>
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
              }}
            >
              {specialtyNames[specialty] || `${specialty} Doctors`}
            </Typography>
          </Box>
          <IconButton sx={{
            fontSize: { xs: '1.2rem', sm: '1.4rem' },
            color: theme.palette.primary.main
          }}>
            ☰
          </IconButton>
        </Box>
      </Box>

      {/* Doctor Cards Grid */}
      <Grid
  container
  spacing={{ xs: 1.5, sm: 2, md: 2.5 }}
  alignItems="stretch"  // ✅ Ensures all cards are the same height
>
  {doctors.map((doctor) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={3}
      key={doctor.id}
      sx={{ display: 'flex' }} // ✅ Makes card fill available height
    >
      <Card
        sx={{
          width: '100%',          // ✅ Fills the Grid column
          height: '100%',         // ✅ Fills vertical space evenly
          borderRadius: { xs: 2, sm: 2.5 },
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #f0f0f0',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
          },
        }}
      >
              <CardContent sx={{
                p: { xs: 1.2, sm: 1.5 }, // Reduced from 1.5/2
                '&:last-child': { pb: { xs: 1.2, sm: 1.5 } },
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {/* Doctor Avatar & Basic Info - Fixed Height */}
                <Box display="flex" gap={1.2} mb={1.2} sx={{ minHeight: 42}}>
                  <Box
                    sx={{
                      width: { xs: 38, sm: 42 }, // Reduced from 45/50
                      height: { xs: 38, sm: 42 },
                      borderRadius: '50%',
                      bgcolor: getAvatarColor(doctor.name),
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: { xs: '0.9rem', sm: '1rem' }, // Reduced from 1rem/1.1rem
                      fontWeight: 600,
                      flexShrink: 0,
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
                        fontSize: { xs: '0.8rem', sm: '0.85rem' }, // Reduced from 0.9/0.95rem
                        lineHeight: 1.2,
                        mb: 0.4, // Reduced from 0.5
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {doctor.name}
                    </Typography>

                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.4}>
                      <Typography
                        variant="caption"
                        sx={{
                          bgcolor: '#e8f5e8',
                          color: '#2e7d32',
                          px: { xs: 0.5, sm: 0.6 }, // Reduced from 0.6/0.8
                          py: 0.15, // Reduced from 0.2
                          borderRadius: 0.6, // Reduced from 0.8
                          fontWeight: 500,
                          fontSize: { xs: '0.6rem', sm: '0.65rem' } // Reduced from 0.65/0.7rem
                        }}
                      >
                        ⭐ {doctor.rating}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="success.main"
                        fontWeight="500"
                        sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }} // Reduced from 0.65/0.7rem
                      >
                        {doctor.slots} slots
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Qualifications & Experience - Fixed Height */}
                <Box sx={{ minHeight: { xs: 35, sm: 38 }, mb: 1.2 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{
                      fontSize: { xs: '0.65rem', sm: '0.7rem' }, // Reduced from 0.7/0.75rem
                      mb: 0.4, // Reduced from 0.5
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
                    sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }} // Reduced from 0.7/0.75rem
                  >
                    📅 {doctor.experience}
                  </Typography>
                </Box>

                {/* Fee and Visit Type - Fixed Height */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.2} // Reduced from 1.5
                  sx={{ minHeight: 26 }} // Reduced from 30
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    fontWeight="600"
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }} // Reduced from 1rem/1.1rem
                  >
                    ₹ {doctor.fee}
                  </Typography>
                  {doctor.homeVisit && (
                    <Chip
                      icon={<span style={{ fontSize: '0.6rem' }}>🏠</span>} // Reduced from 0.7rem
                      label="Home"
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{
                        height: { xs: 16, sm: 18 }, // Reduced from 18/20
                        fontSize: { xs: '0.55rem', sm: '0.6rem' }, // Reduced from 0.6/0.65rem
                        '& .MuiChip-label': { px: 0.6 } // Reduced from 0.8
                      }}
                    />
                  )}
                </Box>

                {/* Next Available - Fixed Height */}
                <Box sx={{ minHeight: 18, mb: 1.2 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    sx={{ fontSize: { xs: '0.6rem', sm: '0.65rem' } }} // Reduced from 0.65/0.7rem
                  >
                    Next: {doctor.nextAvailable}
                  </Typography>
                </Box>

                {/* Available Slots - Controlled Display - Fixed Height */}
                <Box
                  display="flex"
                  gap={0}
                  mb={0}
                  flexWrap="wrap"
                  sx={{ minHeight: { xs: 38, sm: 42 } }} // Reduced from 44/48
                >
                  {/* Show limited slots based on screen size */}
                  {doctor.availableSlots.slice(0, slotsToShow).map((slot, index) => (
                    <Chip
                      key={index}
                      label={slot}
                      variant="outlined"
                      size="small"
                      onClick={() => handleTimeSlotClick(doctor, slot)}
                      sx={{
                        height: { xs: 16, sm: 18 }, // Reduced from 18/20
                        borderRadius: 1,
                        fontSize: { xs: '0.5rem', sm: '0.55rem' }, // Reduced from 0.55/0.6rem
                        cursor: 'pointer',
                        mr: { xs: 0.2, sm: 0.3 },
                        mb: { xs: 0.2, sm: 0.3 },
                        '& .MuiChip-label': { px: { xs: 0.4, sm: 0.5 } }, // Reduced from 0.5/0.6

                      }}
                    />
                  ))}

                  {/* Show "..." if there are more slots */}
                  {doctor.availableSlots.length > slotsToShow && (
                    <Chip
                      label="..."
                      variant="outlined"
                      size="small"
                      onClick={() => handleTimeSlotClick(doctor, doctor.availableSlots[0])}
                      sx={{
                        height: { xs: 16, sm: 18 }, // Reduced from 18/20
                        borderRadius: 1,
                        fontSize: { xs: '0.5rem', sm: '0.55rem' }, // Reduced from 0.55/0.6rem
                        cursor: 'pointer',
                        minWidth: { xs: 22, sm: 26 }, // Reduced from 26/30
                        mr: { xs: 0.2, sm: 0.3 },
                        mb: { xs: 0.2, sm: 0.3 },
                        '& .MuiChip-label': { px: { xs: 0.4, sm: 0.5 } }, // Reduced from 0.5/0.6

                      }}
                    />
                  )}
                </Box>

                {/* Book Button - Directly touching slots with no top gap */}
                <Button
                  fullWidth
                  variant="contained"
                  size="small"
                  onClick={() => handleTimeSlotClick(doctor, doctor.availableSlots[0])}
                  sx={{
                    mt: 0, // Remove any top margin
                    borderRadius: { xs: 1, sm: 1.2 }, // Reduced from 1.2/1.5
                    py: { xs: 0.5, sm: 0.6 }, // Reduced from 0.6/0.8
                    fontSize: { xs: '0.65rem', sm: '0.7rem' }, // Reduced from 0.7/0.75rem
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: 'none',
                    minHeight: { xs: 24, sm: 28 }, // Reduced from 28/32

                  }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Results Message */}
      {doctors.length === 0 && (
        <Box
          textAlign="center"
          py={{ xs: 4, sm: 6 }}
          sx={{
            bgcolor: theme.palette.grey[50],
            borderRadius: { xs: 2, sm: 3 },
            mt: 2
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}
          >
            No doctors found
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
            sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
          >
            Please try again later or contact support
          </Typography>
        </Box>
      )}
    </Box>
  );
}

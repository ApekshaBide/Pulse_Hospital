import { useState } from 'react';

import {
  Paper,
  Select,
  MenuItem,
  useTheme,
  Container,
  InputLabel,
  IconButton,
  FormControl,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export function HomeSearchBar() {
  const theme = useTheme();
  const [location, setLocation] = useState('Tathawade');
  const [doctor, setDoctor] = useState('');
  const [specialist, setSpecialist] = useState('');

  const menuProps = {
    MenuProps: {
      PopoverProps: {
        sx: { zIndex: theme.zIndex.tooltip + 1 },
      },
    },
  };

  return (
    <Container sx={{ py: 0 }}>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          gap: { xs: 1, md: 2 },
          p: { xs: 1, md: 1.5 },
          bgcolor: 'background.paper',
        }}
      >
        {/* Location */}
        <FormControl fullWidth size="small" sx={{ minWidth: 250 }}>
          <InputLabel id="select-location-label">Location</InputLabel>
          <Select
            labelId="select-location-label"
            value={location}
            label="Location"
            onChange={(e) => setLocation(e.target.value)}
            {...menuProps}
          >
            <MenuItem value="Tathawade">Tathawade</MenuItem>
          </Select>
        </FormControl>

        {/* Doctor */}
        <FormControl fullWidth size="small" sx={{ minWidth: 250 }}>
          <InputLabel id="select-doctor-label">Doctor</InputLabel>
          <Select
            labelId="select-doctor-label"
            value={doctor}
            label="Doctor"
            onChange={(e) => setDoctor(e.target.value)}
            {...menuProps}
          >
            <MenuItem value="">Doctor</MenuItem>
            <MenuItem value="Dr. Tushar Kharade">Dr. Tushar Kharade</MenuItem>
            <MenuItem value="Dr. Sairandhri Shinde">Dr. Sairandhri Shinde</MenuItem>
            <MenuItem value="Dr. Rajendra Chavan">Dr. Rajendra Chavan</MenuItem>
            <MenuItem value="Dr. Mukesh Phalak">Dr. Mukesh Phalak</MenuItem>
          </Select>
        </FormControl>

        {/* Specialists */}
        <FormControl fullWidth size="small" sx={{ minWidth: 250 }}>
          <InputLabel id="select-specialist-label">Specialists</InputLabel>
          <Select
            labelId="select-specialist-label"
            value={specialist}
            label="Specialists"
            onChange={(e) => setSpecialist(e.target.value)}
            {...menuProps}
          >
            <MenuItem value="">Specialists</MenuItem>
            <MenuItem value="Director & General Physician">
              Director &amp; General Physician
            </MenuItem>
            <MenuItem value="Gynecology & Obstetrics">Gynecology &amp; Obstetrics</MenuItem>
            <MenuItem value="Cardiology">Cardiology</MenuItem>
            <MenuItem value="Orthopedics & Spine Surgery">Orthopedics &amp; Spine Surgery</MenuItem>
          </Select>
        </FormControl>

        {/* Search Button */}
        <IconButton
          size="large"
          color="primary"
          sx={{
            alignSelf: { xs: 'flex-end', md: 'center' },
            mt: { xs: 1, md: 0 },
          }}
          onClick={() => console.log({ location, doctor, specialist })}
        >
          <Iconify icon="eva:search-fill" width={24} />
        </IconButton>
      </Paper>
    </Container>
  );
}

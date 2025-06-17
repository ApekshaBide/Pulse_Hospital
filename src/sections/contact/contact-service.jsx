import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import meetUsIcon from 'src/assets/image1/meet-us.png';
import callNowIcon from 'src/assets/image1/call-now.png';
import sendNowIcon from 'src/assets/image1/send-now.png';

import { MotionViewport } from 'src/components/animate';

const items = [
  {
    icon: meetUsIcon,
    title: 'Meet Us',
    description:
       {
  bold: 'Email Address',
  normal: 'example@email.com',
}

  },
  {
    icon: callNowIcon,
    title: 'Call',
    description:
          {
  bold: 'Phone Number',
  normal: 'Phone : (+55) 654 - 545 - 5418',
}
  },
  {
    icon: sendNowIcon,
    title: 'Send Now',
    description:
                {
  bold: 'Our Locations',
  normal: 'A-1, Envanto Headquarter, Australia',
}
  },
];

export function Contactservice() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: 'background.neutral',
      }}
    >
      <Container component={MotionViewport}>
        <Typography variant="h3" sx={{ mb: 6, textAlign: 'center' }}>
         Contact Us
        </Typography>

        <Grid container spacing={4}>
          {items.map((item) => (
            <Grid key={item.title} item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row', md: 'column' },
                  alignItems: { sm: 'flex-start', md: 'center' },
                  textAlign: { sm: 'left', md: 'center' },
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 3,
                  p: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                    bgcolor: 'grey.100',
                  },
                }}
              >
              <Box
                  component="img"
                  src={item.icon}
                  alt={item.title}
                  sx={{
                    width: 48,
                    height: 48,
                    mb: { xs: 2, sm: 0, md: 2 },
                    mr: { sm: 2, md: 0 },
                  }}
                />

                <Box>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>

  <Typography variant="body2" sx={{ fontWeight: 'fontWeightBold' }}>
    {item.description.bold}
  </Typography>

  <Typography variant="body2">
    {item.description.normal}
  </Typography>


                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

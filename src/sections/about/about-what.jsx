import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { varAlpha, stylesMode } from 'src/theme/styles';
import aboutImage from 'src/assets/image1/healthcare.jpg';

import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';



// ----------------------------------------------------------------------

export function AboutWhat() {
  const theme = useTheme();

  return (
    <Container
      component={MotionViewport}
      sx={{
        py: { xs: 10, md: 15 },
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Left side image (doctor) */}
        <Grid xs={12} md={6}>
          <m.div variants={varFade().inUp}>
            <Image
              alt="Doctor"
              src={aboutImage}
              ratio="1/1"
              sx={{
                borderRadius: 3,
                width: '100%',
                maxWidth: 400,
                margin: '0 auto',
                boxShadow: `-40px 40px 80px ${varAlpha(
                  theme.vars.palette.grey['500Channel'],
                  0.24
                )}`,
                [stylesMode.dark]: {
                  boxShadow: `-40px 40px 80px ${varAlpha(
                    theme.vars.palette.common.blackChannel,
                    0.24
                  )}`,
                },
              }}
            />
          </m.div>
        </Grid>

        {/* Right side text */}
        <Grid xs={12} md={6}>
          <m.div variants={varFade().inRight}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              Your Trusted Healthcare Partner
            </Typography>
          </m.div>

          <m.div variants={varFade().inRight}>
            <Typography
              sx={{
                color: 'text.secondary',
                [stylesMode.dark]: { color: 'common.white' },
              }}
            >
              At <b>Pulse Multispecialty Hospital</b>, we are committed to providing ethical,
              affordable, and high-quality healthcare. Here’s why thousands trust us for their
              healthcare needs in PCMC, Pune.
              <br />
              <br />
              Our skilled and experienced doctors offer personalized care tailored to your needs.
              From routine check-ups to complex treatments, we ensure the best possible care.
            </Typography>
          </m.div>

          {/* Unordered List */}
        {/* Unordered List in 2x2 Grid with Bullet First */}
<Box component={m.div} variants={varFade().inRight} sx={{ mt: 4 }}>
  <Grid container spacing={2} component="ul" sx={{ pl: 2, m: 0 }}>
    {[
      '24/7 Emergency Services',
      'Expert Multispecialty Doctors',
      'Advanced Diagnostic Equipment',
      'Affordable & Ethical Care',
    ].map((item, index) => (
      <Grid key={index} item xs={12} sm={6} component="li" sx={{ listStyle: 'disc' }}>
        <Typography
          variant="body1"
          sx={{
            color: 'text.primary',
            [stylesMode.dark]: { color: 'common.white' },
          }}
        >
          {item}
        </Typography>
      </Grid>
    ))}
  </Grid>
</Box>


          <m.div variants={varFade().inRight}>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              sx={{ mt: 4 }}
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            >
              Our Work
            </Button>
          </m.div>
        </Grid>
      </Grid>
    </Container>
  );
}

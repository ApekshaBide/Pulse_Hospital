import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { CONFIG } from 'src/config-global';

import { varScale, MotionViewport } from 'src/components/animate';

import { SectionTitle } from './section-title';
import { FloatLine, FloatDotIcon } from './svg-elements';

// ----------------------------------------------------------------------

export function HomeDetails({ sx, ...other }) {
  const renderLines = (
    <>
      <Stack
        spacing={8}
        alignItems="center"
        sx={{
          top: 64,
          left: 80,
          zIndex: 2,
          bottom: 64,
          position: 'absolute',
          transform: 'translateX(-7px)',
          '& span': { position: 'static', opacity: 0.12 },
        }}
      >
        <FloatDotIcon />
        <FloatDotIcon sx={{ opacity: 0.24, width: 14, height: 14 }} />
        <Box sx={{ flexGrow: 1 }} />
        <FloatDotIcon sx={{ opacity: 0.24, width: 14, height: 14 }} />
        <FloatDotIcon />
      </Stack>
      <FloatLine vertical sx={{ top: 0, left: 80 }} />
    </>
  );

  const renderDescription = (
    <SectionTitle
      caption="About Our Medical"
      title="Reliable Healthcare, Dedicated"
      txtGradient="Specialists"
      description={
        <>
          <Box component="span" sx={{ mb: 1, display: 'block' }}>
            Pulse Multispeciality Hospital delivers affordable, quality healthcare services with
            advanced diagnostics and round-the-clock emergency care in Tathawade, Pune.
          </Box>
          <Box component="span" sx={{ color: 'text.disabled' }}>
            <br />
            Professional intellectual capital without enterprise users Seamlessly matrix value
            e-commerce
            <br />
          </Box>
        </>
      }
      sx={{ textAlign: { xs: 'center', md: 'left' } }}
    />
  );

  const renderImg = (
    <Box
      component={m.img}
      variants={{ ...varScale().in, initial: { scale: 0.8, opacity: 0 } }}
      alt="Integration"
      src={`${CONFIG.site.basePath}/assets/images/about/about-3.jpg`}
      sx={{ width: 520, objectFit: 'cover', aspectRatio: '1/1', borderRadius: '20px' }}
    />
  );

  return (
    <Stack component="section" sx={{ pt: 10, position: 'relative', ...sx }} {...other}>
      <MotionViewport>
        {renderLines}

        <Container>
          <Grid disableEqualOverflow container spacing={{ xs: 5, md: 8 }}>
            <Grid xs={12} md={6} lg={5}>
              {renderDescription}
            </Grid>

            <Grid xs={12} md={6} lg={7} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              {renderImg}
            </Grid>
          </Grid>
        </Container>
      </MotionViewport>
    </Stack>
  );
}

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';
import { varFade, MotionViewport } from 'src/components/animate';


const items = [
  {
    icon: `${CONFIG.site.basePath}/assets/icons/home/ic-make-brand.svg`,
    title: 'Our Mission',
    description: 'Professional mission capital without enterprise medical users, value-added, enabling creative technology via team.',
  },
  {
    icon: `${CONFIG.site.basePath}/assets/icons/home/ic-design.svg`,
    title: 'Our Permission',
    description: 'Professional mision capital without enterp medical users pros value added e-enable creative technology via team.',
  },
  {
    icon: `${CONFIG.site.basePath}/assets/icons/home/ic-development.svg`,
    title: 'Our Vision',
    description: 'Professional mision capital without enterp medical users pros value added e-enable creative technology via team.',
  },
];

export function AboutVision() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.neutral' }}>
      <Container component={MotionViewport}>
        <Typography variant="h3" sx={{ mb: 6, textAlign: 'center' }}>
          Our Mission, Permission & Vision
        </Typography>

        <Grid container spacing={4}>
          {items.map((item, index) => (
            <Grid key={item.title} item xs={12} sm={6} md={4}>
              <m.div
                variants={varFade().inUp}
                whileHover={{
                  scale: 1.05,
                  rotate: [0, 2, -2, 0],
                  transition: { duration: 0.5, type: 'spring' },
                }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
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
                    transition: 'all 0.3s',
                  }}
                >
                  <Box
                    sx={{
                      flexShrink: 0,
                      mb: { xs: 2, sm: 0, md: 2 },
                      mr: { sm: 2, md: 0 },
                    }}
                  >
                    <SvgColor src={item.icon} sx={{ width: 48, height: 48 }} />
                  </Box>

                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2">{item.description}</Typography>
                  </Box>
                </Box>
              </m.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

import {
  Box,
  Grid,
  Card,
  Link,
  Container,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

const services = [
  {
    icon: `${CONFIG.site.basePath}/assets/icons/home/ic-make-brand.svg`,
    title: 'General Medicine',
    description:
      'Our General Medicine department provides comprehensive diagnosis, treatment, and preventive care for a wide range of health conditions. With expert physicians and personalized attention, we ensure faster recovery and long-term wellness for all age groups.',
    href: '/services/bariatric',
  },
  {
    icon: `${CONFIG.site.basePath}/assets/icons/home/ic-design.svg`,
    title: 'Gynecology and Obstetrics',
    description:
      'Our Gynecology and Obstetrics unit supports women through every phase of life — from adolescence to motherhood and beyond. We offer expert consultations, maternity care, infertility solutions, and advanced gynecological treatments in a compassionate, safe environment.',
    href: '/services/breast-care',
  },
  {
    icon: `${CONFIG.site.basePath}/assets/icons/home/ic-development.svg`,
    title: 'Orthopedics',
    description:
      'Whether its fractures, joint replacements, sports injuries, or chronic pain management, our Orthopedics department provides world-class care using advanced techniques for quicker mobility and better quality of life.',
    href: '/services/cardiac-surgery',
  },
];

export function ServicesSection() {
  return (
    <Container sx={{ pt: 32, pb: 8 }}>
      <Grid container spacing={4}>
        {services.map((svc) => (
          <Grid key={svc.title} item xs={12} sm={6} md={4}>
            <Card
              elevation={1}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box mb={1}>
                  <SvgColor src={svc.icon} sx={{ width: 40, height: 40 }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {svc.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {svc.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Link
                  component={RouterLink}
                  to={svc.href}
                  underline="none"
                  sx={{ fontWeight: 600, color: 'primary.main' }}
                >
                  Know More
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

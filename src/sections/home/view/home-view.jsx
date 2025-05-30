import { Stack } from '@mui/material';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { AboutTeam } from 'src/sections/about/about-team';

import { HomeHero } from '../home-hero';
import { HomeFAQs } from '../components/home-faq';
import { HomeDetails } from '../components/home-details';
import { ServicesSection } from '../components/service-section';
import { HomeTestimonials } from '../components/home-testimonial';

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <HomeHero />

      <Stack sx={{ position: 'relative', bgcolor: 'background.default' }}>
        <ServicesSection />

        <HomeDetails />

        <AboutTeam />

        <HomeTestimonials />

        <HomeFAQs />
      </Stack>
    </>
  );
}

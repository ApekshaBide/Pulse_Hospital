import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function OverviewCovidView() {
  const theme = useTheme();
  return (
    <DashboardContent
      maxWidth={false}
      disablePadding
      sx={{
        borderTop: { lg: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}` },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Box
          sx={{
            gap: 3,
            display: 'flex',
            minWidth: { lg: 0 },
            py: { lg: 3, xl: 5 },
            flexDirection: 'column',
            flex: { lg: '1 1 auto' },
            px: { xs: 2, sm: 3, xl: 5 },
            borderRight: {
              lg: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
            },
          }}
        >
          {/* Welcome Message */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Hi, Patient 👋
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              How is your health today!
            </Typography>
          </Box>
        </Box>
      </Box>
    </DashboardContent>
  );
}

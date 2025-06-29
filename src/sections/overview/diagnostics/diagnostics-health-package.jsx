import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

// ----------------------------------------------------------------------

export function DiagnosticsHealthPackages({
  packages,
  loading,
  onPackageClick
}) {
  if (loading || !packages || packages.length === 0) {
    return null;
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title="Health Packages"
        subheader="Comprehensive checkup plans"
        sx={{ pb: 1 }}
      />

      <CardContent sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, sm: 3 } }}>
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 3 }}
          alignItems="stretch"
        >
          {packages.map((pkg) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              key={pkg.id}
              sx={{ display: 'flex' }}
            >
              <Card
                onClick={() => onPackageClick(pkg)}
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: 2,
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="flex-start"
                  sx={{ flex: 1 }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: pkg.bgColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 24,
                      flexShrink: 0,
                    }}
                  >
                    {pkg.icon}
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      noWrap
                      sx={{ mb: 0.75 }}
                    >
                      {pkg.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: '0.85rem',
                        mb: 1,
                        lineHeight: 1.4,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {pkg.description}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Chip
                        label={pkg.tests}
                        size="small"
                        sx={{
                          bgcolor: pkg.bgColor,
                          color: pkg.color,
                          fontWeight: 600,
                          height: 22,
                          fontSize: '0.75rem',
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        color={pkg.color}
                        sx={{ fontSize: '0.9rem' }}
                      >
                        {pkg.price}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

// src/sections/overview/diagnostics/diagnostics-empty-states.jsx

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function DiagnosticsEmptyState({ onCreateNew }) {
  return (
    <Card>
      <CardContent>
        <Stack alignItems="center" spacing={3} sx={{ py: 6 }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.lighter',
            }}
          >
            <Iconify icon="solar:health-bold" width={64} sx={{ color: 'primary.main' }} />
          </Box>

          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography variant="h5" fontWeight="bold">
              Setup Diagnostics Services
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480 }}>
              Configure your diagnostic center information, categories, and tests to start offering
              comprehensive healthcare diagnostic services to your patients.
            </Typography>
          </Stack>

          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={onCreateNew}
            >
              Configure Diagnostics
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<Iconify icon="solar:document-text-bold" />}
            >
              View Documentation
            </Button>
          </Stack>

          {/* Feature highlights */}
          <Box sx={{ mt: 4, width: '100%', maxWidth: 600 }}>
            <Typography variant="h6" textAlign="center" sx={{ mb: 2 }}>
              Key Features
            </Typography>
            <Stack spacing={2}>
              {[
                { icon: 'solar:test-tube-bold', title: 'Test Management', desc: 'Organize diagnostic tests by categories' },
                { icon: 'solar:home-bold', title: 'Home Collection', desc: 'Offer convenient home sample collection' },
                { icon: 'solar:cart-large-bold', title: 'Online Booking', desc: 'Enable patients to book tests online' },
                { icon: 'solar:document-bold', title: 'Digital Reports', desc: 'Generate and share digital test reports' },
              ].map((feature) => (
                <Stack key={feature.title} direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'grey.100',
                    }}
                  >
                    <Iconify icon={feature.icon} width={20} sx={{ color: 'primary.main' }} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.desc}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function DiagnosticsLoadingState() {
  return (
    <Card>
      <CardContent>
        <Stack alignItems="center" spacing={3} sx={{ py: 6 }}>
          <CircularProgress size={60} thickness={4} />

          <Stack spacing={1} alignItems="center" textAlign="center">
            <Typography variant="h6">
              Loading Diagnostics Data
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please wait while we fetch your diagnostic services information...
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function DiagnosticsErrorState({ onRetry, error }) {
  return (
    <Card>
      <CardContent>
        <Stack alignItems="center" spacing={3} sx={{ py: 6 }}>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'error.lighter',
            }}
          >
            <Iconify icon="solar:danger-bold" width={64} sx={{ color: 'error.main' }} />
          </Box>

          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography variant="h5" fontWeight="bold">
              Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 480 }}>
              We encountered an error while loading your diagnostics data.
              Please try refreshing the page or contact support if the problem persists.
            </Typography>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ width: '100%', maxWidth: 500 }}>
              <Typography variant="body2">
                <strong>Error Details:</strong> {error}
              </Typography>
            </Alert>
          )}

          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Iconify icon="solar:refresh-bold" />}
              onClick={onRetry}
            >
              Try Again
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<Iconify icon="solar:phone-bold" />}
            >
              Contact Support
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

export function DiagnosticsNoResults({ searchQuery, onClearSearch }) {
  return (
    <Card>
      <CardContent>
        <Stack alignItems="center" spacing={3} sx={{ py: 4 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.100',
            }}
          >
            <Iconify icon="solar:file-search-bold" width={40} sx={{ color: 'text.disabled' }} />
          </Box>

          <Stack spacing={1} alignItems="center" textAlign="center">
            <Typography variant="h6">
              No results found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchQuery
                ? `No tests or packages match "${searchQuery}"`
                : 'No diagnostic tests or packages are currently available'
              }
            </Typography>
          </Stack>

          {searchQuery && (
            <Button
              variant="outlined"
              startIcon={<Iconify icon="solar:close-circle-bold" />}
              onClick={onClearSearch}
            >
              Clear Search
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export function DiagnosticsConfigPreview({
  centerName,
  description,
  address,
  phone,
  email,
  operatingHours,
  emergencyContact,
  licenseNumber,
  website,
  specializations,
  open,
  isValid,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const hasContent = centerName || description || address || phone || email;

  const renderHeader = (
    <Stack spacing={1.5} sx={{ p: 2, pb: 1.5 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            color: 'white',
          }}
        >
          🔬
        </Box>
        <Box>
          <Typography variant="h4" component="h1">
            {centerName || 'Diagnostic Center Name'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            License: {licenseNumber || 'Not specified'}
          </Typography>
        </Box>
      </Stack>

      {description && (
        <Box sx={{ p: 1.5, bgcolor: 'background.neutral', borderRadius: 1 }}>
          <Typography variant="body1">
            {description}
          </Typography>
        </Box>
      )}
    </Stack>
  );

  const renderContent = (
    <Stack spacing={2} sx={{ p: 2, pt: 1 }}>
      {hasContent ? (
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Card sx={{ p: 1.5 }}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2">
                  <strong>Address:</strong> {address || 'Not specified'}
                </Typography>
                <Typography variant="body2">
                  <strong>Phone:</strong> {phone || 'Not specified'}
                </Typography>
                <Typography variant="body2">
                  <strong>Email:</strong> {email || 'Not specified'}
                </Typography>
                {website && (
                  <Typography variant="body2">
                    <strong>Website:</strong> {website}
                  </Typography>
                )}
              </Stack>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Card sx={{ p: 1.5 }}>
              <Typography variant="h6" gutterBottom>
                Operating Details
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant="body2">
                  <strong>Hours:</strong> {operatingHours || 'Not specified'}
                </Typography>
                <Typography variant="body2">
                  <strong>Emergency:</strong> {emergencyContact || 'Not specified'}
                </Typography>
                {specializations && (
                  <Typography variant="body2">
                    <strong>Specializations:</strong> {specializations}
                  </Typography>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            py: 8,
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Iconify icon="solar:test-tube-bold" width={48} sx={{ color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.disabled">
            No configuration available
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Fill in the diagnostic center details to see the preview
          </Typography>
        </Box>
      )}
    </Stack>
  );

  const renderActions = (
    <DialogActions sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} sx={{ width: 1 }}>
        <Button
          fullWidth
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="solar:close-circle-bold" />}
          onClick={onClose}
        >
          Close
        </Button>

        <LoadingButton
          fullWidth
          color="primary"
          variant="contained"
          startIcon={<Iconify icon="solar:check-circle-bold" />}
          onClick={onSubmit}
          loading={isSubmitting}
          disabled={!isValid}
        >
          Save Configuration
        </LoadingButton>
      </Stack>
    </DialogActions>
  );

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { bgcolor: 'background.default' }
      }}
    >
      <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
        <DialogContent sx={{ flex: 1, p: 0, overflow: 'hidden' }}>
          <Scrollbar sx={{ height: 1 }}>
            {hasContent ? (
              <>
                {renderHeader}
                <Divider />
                {renderContent}
              </>
            ) : (
              <Box
                sx={{
                  py: 8,
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  height: '100%',
                  justifyContent: 'center',
                }}
              >
                <Iconify icon="solar:test-tube-bold" width={64} sx={{ color: 'text.disabled', mb: 2 }} />
                <Typography variant="h5" color="text.disabled" gutterBottom>
                  No Preview Available
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  Fill in the form fields to see your diagnostic center configuration preview
                </Typography>
              </Box>
            )}
          </Scrollbar>
        </DialogContent>

        <Divider />
        {renderActions}
      </Box>
    </Dialog>
  );
}

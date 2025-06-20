import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import useMediaQuery from '@mui/material/useMediaQuery';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

// Emergency Contact Data
const emergencyContacts = [
  {
    id: 1,
    title: 'Emergency Services',
    number: '911',
    description: 'Life-threatening emergencies',
    icon: 'solar:danger-bold',
    color: '#F44336',
    bgColor: '#FFEBEE',
    type: 'emergency'
  },
  {
    id: 2,
    title: 'Healthcare Provider',
    number: '1-800-HEALTH',
    description: 'Medical consultations',
    icon: 'solar:user-bold',
    color: '#2196F3',
    bgColor: '#E3F2FD',
    type: 'provider'
  },
  {
    id: 3,
    title: 'Poison Control',
    number: '1-800-222-1222',
    description: 'Poison emergencies',
    icon: 'solar:shield-warning-bold',
    color: '#FF9800',
    bgColor: '#FFF3E0',
    type: 'poison'
  },
  {
    id: 4,
    title: 'Mental Health Crisis',
    number: '988',
    description: 'Mental health support',
    icon: 'solar:heart-bold',
    color: '#9C27B0',
    bgColor: '#F3E5F5',
    type: 'mental'
  }
];

// Quick Actions Data
const quickActions = [
  {
    id: 1,
    title: 'Find Nearest Hospital',
    description: 'Locate emergency rooms nearby',
    icon: 'solar:map-point-hospital-bold',
    color: '#F44336',
    bgColor: '#FFEBEE'
  },
  {
    id: 2,
    title: 'Call Ambulance',
    description: 'Request emergency transport',
    icon: 'solar:bus-bold',
    color: '#FF5722',
    bgColor: '#FFF3E0'
  },
  {
    id: 3,
    title: 'Medical History',
    description: 'View your medical records',
    icon: 'solar:document-medicine-bold',
    color: '#2196F3',
    bgColor: '#E3F2FD'
  },
  {
    id: 4,
    title: 'Emergency Contacts',
    description: 'Access saved contacts',
    icon: 'solar:phone-calling-bold',
    color: '#4CAF50',
    bgColor: '#E8F5E8'
  }
];

// Emergency Tips Data
const emergencyTips = [
  {
    id: 1,
    title: 'Heart Attack Signs',
    tips: [
      'Chest pain or discomfort',
      'Upper body pain (arms, back, neck, jaw)',
      'Shortness of breath',
      'Nausea, lightheadedness, cold sweat'
    ],
    icon: 'solar:heart-pulse-bold',
    color: '#F44336'
  },
  {
    id: 2,
    title: 'Stroke Signs (FAST)',
    tips: [
      'Face drooping on one side',
      'Arm weakness or numbness',
      'Speech difficulty or slurred',
      'Time to call emergency services'
    ],
    icon: 'solar:pulse-bold',
    color: '#FF9800'
  },
  {
    id: 3,
    title: 'Choking Emergency',
    tips: [
      'Encourage coughing if conscious',
      'Back blows between shoulder blades',
      'Heimlich maneuver if needed',
      'Call 911 if object not dislodged'
    ],
    icon: 'solar:lungs-bold',
    color: '#9C27B0'
  }
];

// Emergency Dialog Component
function EmergencyContactDialog({ open, onClose, contact }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCall = () => {
    if (contact?.number) {
      window.open(`tel:${contact.number}`, '_self');
      toast.success(`Calling ${contact.title}...`);
    }
    onClose();
  };

  const handleContactProvider = () => {
    toast.success('Connecting to your healthcare provider...');
    onClose();
  };

  if (!contact) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      fullScreen={isMobile}
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
          m: isMobile ? 0 : 2,
        }
      }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box sx={{ p: 3, pb: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 1,
                  bgcolor: contact.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify
                  icon={contact.icon}
                  width={24}
                  sx={{ color: contact.color }}
                />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={600} color={contact.color}>
                  {contact.title}
                </Typography>
              </Box>
            </Stack>
            {!isMobile && (
              <IconButton onClick={onClose} size="small">
                <Iconify icon="solar:close-circle-bold" width={24} />
              </IconButton>
            )}
          </Stack>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 0 }}>
        <Box sx={{ mb: 3 }}>
          {contact.type === 'emergency' ? (
            <Typography variant="body1" color="text.primary" sx={{ mb: 2, lineHeight: 1.6 }}>
              For life-threatening emergencies, call immediately. Do not hesitate if you believe someone&apos;s life is in danger.
            </Typography>
          ) : (
            <Typography variant="body1" color="text.primary" sx={{ mb: 2, lineHeight: 1.6 }}>
              Contact {contact.title.toLowerCase()} for medical assistance and support.
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            p: 2,
            borderRadius: 1,
            bgcolor: contact.bgColor,
            border: `1px solid ${contact.color}20`,
            mb: 3,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: contact.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Iconify icon="solar:phone-bold" width={20} sx={{ color: 'white' }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600} color={contact.color}>
                {contact.number}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {contact.description}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {contact.type === 'emergency' && (
          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: '#FFF3E0',
              border: '1px solid #FF980020',
            }}
          >
            <Typography variant="body2" color="#F57C00" fontWeight={500}>
              ⚠️ Only call 911 for true emergencies. For non-urgent medical questions, contact your healthcare provider.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<Iconify icon="solar:phone-bold" />}
            onClick={handleCall}
            sx={{
              bgcolor: contact.color,
              borderRadius: 1,
              py: 1.5,
              '&:hover': {
                bgcolor: contact.color,
                opacity: 0.9,
              },
            }}
          >
            Call {contact.title}
          </Button>

          {contact.type !== 'emergency' && (
            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<Iconify icon="solar:chat-round-dots-bold" />}
              onClick={handleContactProvider}
              sx={{
                borderRadius: 1,
                py: 1.5,
                borderColor: contact.color,
                color: contact.color,
              }}
            >
              Send Message
            </Button>
          )}

          <Button
            fullWidth
            variant="outlined"
            size="large"
            color="inherit"
            startIcon={<Iconify icon="solar:close-circle-bold" />}
            onClick={onClose}
            sx={{
              borderRadius: 1,
              py: 1.5,
              borderColor: 'divider',
              color: 'text.secondary',
            }}
          >
            Cancel
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}

export function OverviewEmergencyView() {
  const theme = useTheme();
  const [selectedContact, setSelectedContact] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedContact(null);
  };

  const handleQuickAction = (action) => {
    toast.info(`${action.title} - Feature coming soon!`);
    console.log('Quick action:', action.title);
  };

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
          {/* Emergency Header */}
          <Card sx={{ mb: 4, bgcolor: '#F44336', color: 'white', borderRadius: 1 }}>
            <CardContent sx={{ py: 3 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 1,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify icon="solar:danger-bold" width={24} sx={{ color: 'white' }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" fontWeight={600} sx={{ mb: 0.5 }}>
                    Emergency Services
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Get immediate help when you need it most
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Welcome Message */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Hi, Patient 👋
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Access emergency services and medical assistance quickly and safely.
            </Typography>
          </Box>

          {/* Emergency Contacts */}
          <Card sx={{ mb: 4, borderRadius: 1 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                Emergency Contacts
              </Typography>

              <Grid container spacing={2}>
                {emergencyContacts.map((contact) => (
                  <Grid item xs={12} sm={6} key={contact.id}>
                    <Card
                      onClick={() => handleContactClick(contact)}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4],
                          borderColor: contact.color,
                        },
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 1,
                            bgcolor: contact.bgColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Iconify
                            icon={contact.icon}
                            width={24}
                            sx={{ color: contact.color }}
                          />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
                            {contact.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {contact.description}
                          </Typography>
                          <Typography variant="h6" color={contact.color} fontWeight={600}>
                            {contact.number}
                          </Typography>
                        </Box>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card sx={{ mb: 4, borderRadius: 1 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                Quick Actions
              </Typography>

              <Grid container spacing={2}>
                {quickActions.map((action) => (
                  <Grid item xs={6} sm={3} key={action.id}>
                    <Card
                      onClick={() => handleQuickAction(action)}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        textAlign: 'center',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[2],
                          borderColor: action.color,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 1,
                          bgcolor: action.bgColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                        }}
                      >
                        <Iconify
                          icon={action.icon}
                          width={24}
                          sx={{ color: action.color }}
                        />
                      </Box>
                      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                        {action.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {action.description}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Emergency Tips */}
          <Card sx={{ borderRadius: 1 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                Emergency Recognition Tips
              </Typography>

              <Grid container spacing={3}>
                {emergencyTips.map((tip) => (
                  <Grid item xs={12} md={4} key={tip.id}>
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1,
                            bgcolor: `${tip.color}20`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Iconify
                            icon={tip.icon}
                            width={20}
                            sx={{ color: tip.color }}
                          />
                        </Box>
                        <Typography variant="subtitle1" fontWeight={600} color={tip.color}>
                          {tip.title}
                        </Typography>
                      </Stack>

                      <Stack spacing={1}>
                        {tip.tips.map((tipItem, index) => (
                          <Stack key={index} direction="row" alignItems="center" spacing={1}>
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                bgcolor: tip.color,
                                flexShrink: 0,
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {tipItem}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

        </Box>
      </Box>

      {/* Emergency Contact Dialog */}
      <EmergencyContactDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        contact={selectedContact}
      />
    </DashboardContent>
  );
}

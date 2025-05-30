import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { _socials, _carouselsMembers } from 'src/_mock';

import { Image } from 'src/components/image';
import { SocialIcon } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export function AboutTeamInner() {
  return (
    <Container component={MotionViewport} sx={{ textAlign: 'center' }}>
      <Grid container spacing={4}>
        {_carouselsMembers.map((member) => (
          <Grid key={member.id} xs={12} sm={6} md={3}>
            <Box component={m.div} variants={varFade().in}>
              <MemberCard member={member} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// ----------------------------------------------------------------------

function MemberCard({ member }) {
  return (
    <Card sx={{ p: 2 }}>
      <Image alt={member.name} src={member.avatarUrl} ratio="1/1" sx={{ borderRadius: 2 }} />

      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {member.name}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2.5, color: 'text.secondary' }}>
        {member.role}
      </Typography>

      <Stack direction="row" justifyContent="center" spacing={1}>
        {_socials.map((social) => (
          <IconButton key={social.name}>
            <SocialIcon icon={social.name} />
          </IconButton>
        ))}
      </Stack>
    </Card>
  );
}

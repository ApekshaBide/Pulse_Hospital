import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function ContactForm() {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Make an Online Appoinemnt <br />
        We&apos;Booking For Treatment Patients
      </Typography>

      <Box gap={3} display="flex" flexDirection="column" sx={{ my: 5 }}>
  <TextField fullWidth label="Name" name="name" />
  <TextField fullWidth label="Email" name="email" type="email" />
  <TextField fullWidth label="Phone Number" name="phone" type="tel" />
  <TextField fullWidth label="Subject" name="subject" />
  <TextField
    fullWidth
    label="Enter your message here."
    multiline
    rows={4}
    name="message"
  />
</Box>


      <Button size="large" variant="contained" fullWidth>
        Submit
      </Button>
    </Box>
  );
}

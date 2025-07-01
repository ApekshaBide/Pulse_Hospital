// 📄 src/pages/dashboard/pharmacy/reports.jsx
import { Helmet } from 'react-helmet-async';
import { Container, Typography, Card, CardContent } from '@mui/material';
import { DashboardContent } from 'src/layouts/dashboard';

export default function PharmacyReportsPage() {
  return (
    <>
      <Helmet>
        <title>Reports | Pharmacy</title>
      </Helmet>
      <DashboardContent>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>
            Pharmacy Reports
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="body1">
                Pharmacy Reports page - Coming Soon
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </DashboardContent>
    </>
  );
}

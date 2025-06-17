import { DashboardContent } from 'src/layouts/dashboard';

import SpecialtyDoctorPage from 'src/sections/overview/appointment/specialty-doctor-page';

export default function NeurologyPage() {
  return (
    <DashboardContent>
      <SpecialtyDoctorPage specialty="neurology" />
    </DashboardContent>
  );
}

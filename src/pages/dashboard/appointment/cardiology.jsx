import { DashboardContent } from 'src/layouts/dashboard';

import SpecialtyDoctorPage from 'src/sections/overview/appointment/specialty-doctor-page';

export default function CardiologyPage() {
  return (
    <DashboardContent>
      <SpecialtyDoctorPage specialty="cardiology" />
    </DashboardContent>
  );
}

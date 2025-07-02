// 📄 src/pages/dashboard/pharmacy/configuration.jsx
import { Helmet } from 'react-helmet-async';

import { OverviewPharmacyView } from 'src/sections/overview/pharmacy/view';

export default function PharmacyConfigurationPage() {
  return (
    <>
      <Helmet>
        <title>Pharmacy Configuration | Dashboard</title>
      </Helmet>
      <OverviewPharmacyView />
    </>
  );
}

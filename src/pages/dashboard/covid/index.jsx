import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OverviewAppointmentView } from 'src/sections/overview/appointment/view/overview-appointment-view';

// ----------------------------------------------------------------------

const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OverviewAppointmentView />
    </>
  );
}

import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OverviewDiagnosticsView } from 'src/sections/overview/diagnostics/view';

// ----------------------------------------------------------------------

const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OverviewDiagnosticsView />
    </>
  );
}

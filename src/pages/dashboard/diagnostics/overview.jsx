import { Helmet } from 'react-helmet-async';

import { OverviewDiagnosticsView } from 'src/sections/overview/diagnostics/view';

// ----------------------------------------------------------------------

export default function DiagnosticsOverviewPage() {
  return (
    <>
      <Helmet>
        <title>Diagnostics | Dashboard</title>
      </Helmet>

      <OverviewDiagnosticsView />
    </>
  );
}

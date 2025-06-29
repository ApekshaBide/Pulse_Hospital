import { Helmet } from 'react-helmet-async';

import { DiagnosticsTestDetailView } from 'src/sections/overview/diagnostics/view';

// ----------------------------------------------------------------------

export default function DiagnosticsTestPage() {
  return (
    <>
      <Helmet>
        <title>Test Details | Diagnostics</title>
      </Helmet>

      <DiagnosticsTestDetailView />
    </>
  );
}

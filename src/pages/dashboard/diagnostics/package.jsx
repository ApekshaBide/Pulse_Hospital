import { Helmet } from 'react-helmet-async';

import DiagnosticsPackageView from 'src/sections/overview/diagnostics/view/diagnostics-package-view';

// ----------------------------------------------------------------------

export default function DiagnosticsPackagePage() {
  return (
    <>
      <Helmet>
        <title>Package Details | Diagnostics</title>
      </Helmet>

      <DiagnosticsPackageView />
    </>
  );
}

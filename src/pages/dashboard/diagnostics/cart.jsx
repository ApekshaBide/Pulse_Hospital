import { Helmet } from 'react-helmet-async';

import DiagnosticsCartView from 'src/sections/overview/diagnostics/view/diagnostics-cart-view';
// ----------------------------------------------------------------------

export default function DiagnosticsCartPage() {
  return (
    <>
      <Helmet>
        <title>Cart | Diagnostics</title>
      </Helmet>

      <DiagnosticsCartView />
    </>
  );
}

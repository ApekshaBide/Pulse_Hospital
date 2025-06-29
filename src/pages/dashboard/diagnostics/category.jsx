// src/pages/dashboard/diagnostics/category.jsx

import { Helmet } from 'react-helmet-async';

import { DiagnosticsCategoryView } from 'src/sections/overview/diagnostics/view/diagnostics-category-view';

// ----------------------------------------------------------------------

export default function DiagnosticsCategoryPage() {
  return (
    <>
      <Helmet>
        <title>Category Details | Diagnostics</title>
      </Helmet>

      <DiagnosticsCategoryView />
    </>
  );
}

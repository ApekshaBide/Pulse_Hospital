import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';
import { AuthGuard } from 'src/auth/guard';

import { OverviewCovidView } from 'src/sections/overview/covid/view';
import { OverviewPharmacyView } from 'src/sections/overview/pharmacy/view';
import { OverviewEmergencyView } from 'src/sections/overview/emergency/view';
import { OverviewHomevisitView } from 'src/sections/overview/homevisit/view';
import { OverviewAppointmentView } from 'src/sections/overview/appointment/view';
import { OverviewDiagnosticsView } from 'src/sections/overview/diagnostics/view';

const DiagnosticsOverviewPage = lazy(() => import('src/pages/dashboard/diagnostics/overview'));
const DiagnosticsCategoryPage = lazy(() => import('src/pages/dashboard/diagnostics/category'));
const DiagnosticsTestPage = lazy(() => import('src/pages/dashboard/diagnostics/test'));
const DiagnosticsPackagePage = lazy(() => import('src/pages/dashboard/diagnostics/package'));
const DiagnosticsCartPage = lazy(() => import('src/pages/dashboard/diagnostics/cart'));

const PharmacyOverviewPage = lazy(() => import('src/pages/dashboard/pharmacy'));
const PharmacyCategoriesPage = lazy(() => import('src/pages/dashboard/pharmacy/categories'));
const PharmacyCategoryPage = lazy(() => import('src/pages/dashboard/pharmacy/category'));
const PharmacyProductsPage = lazy(() => import('src/pages/dashboard/pharmacy/products'));
const PharmacyProductPage = lazy(() => import('src/pages/dashboard/pharmacy/products'));
const PharmacyCartPage = lazy(() => import('src/pages/dashboard/pharmacy/cart'));
const PharmacyOrdersPage = lazy(() => import('src/pages/dashboard/pharmacy/orders'));
const PharmacyOrderPage = lazy(() => import('src/pages/dashboard/pharmacy/order'));
const PharmacyInventoryPage = lazy(() => import('src/pages/dashboard/pharmacy/inventory'));
const PharmacyConfigurationPage = lazy(() => import('src/pages/dashboard/pharmacy/configuration'));
const PharmacyReportsPage = lazy(() => import('src/pages/dashboard/pharmacy/reports'));

// Overview
const IndexPage = lazy(() => import('src/pages/dashboard'));
const OverviewCoursePage = lazy(() => import('src/pages/dashboard/course'));
// Product
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));

// Appointment
const AppointmentPage = lazy(() => import('src/pages/dashboard/appointment/index'));
const CardiologyPage = lazy(() => import('src/pages/dashboard/appointment/cardiology'));
const DermatologyPage = lazy(() => import('src/pages/dashboard/appointment/dermatology'));
const NeurologyPage = lazy(() => import('src/pages/dashboard/appointment/neurology'));
const OrthopedicsPage = lazy(() => import('src/pages/dashboard/appointment/orthopedics'));
const OphthalmologyPage = lazy(() => import('src/pages/dashboard/appointment/ophthalmology'));
const PediatricsPage = lazy(() => import('src/pages/dashboard/appointment/pediatrics'));
const GynecologyPage = lazy(() => import('src/pages/dashboard/appointment/gynecology'));
const UrologyPage = lazy(() => import('src/pages/dashboard/appointment/urology'));
const DentistryPage = lazy(() => import('src/pages/dashboard/appointment/dentistry'));
const PhysiotherapyPage = lazy(() => import('src/pages/dashboard/appointment/physiotherapy'));
const GeneralMedicinePage = lazy(() => import('src/pages/dashboard/appointment/general-medicine'));

// Blog
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));

// ----------------------------------------------------------------------
// Website

const PrivacyAndPolicyPage = lazy(()=>import('src/pages/dashboard/website/details'));
const TermsAndConditionsPage = lazy(()=>import('src/pages/dashboard/website/details1'));

const layoutContent = (
    <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'appointment', element: <OverviewAppointmentView /> },
      { path: 'pharmacy', element: <OverviewPharmacyView />},
      { path: 'diagnostics', element: <OverviewDiagnosticsView />},
      { path: 'homevisit', element: <OverviewHomevisitView />},
      { path: 'emergency', element: <OverviewEmergencyView />},
      { path: 'covid', element: <OverviewCovidView />},
      { path: 'patient', element: <OverviewCoursePage /> },
           {
        path: 'appointment',
        children: [
          { element: <OverviewAppointmentView />, index: true },
          { path: 'cardiology', element: <CardiologyPage /> },
          { path: 'dermatology', element: <DermatologyPage /> },
          { path: 'neurology', element: <NeurologyPage /> },
          { path: 'orthopedics', element: <OrthopedicsPage /> },
          { path: 'ophthalmology', element: <OphthalmologyPage /> },
          { path: 'pediatrics', element: <PediatricsPage /> },
          { path: 'gynecology', element: <GynecologyPage /> },
          { path: 'urology', element: <UrologyPage /> },
          { path: 'dentistry', element: <DentistryPage /> },
          { path: 'physiotherapy', element: <PhysiotherapyPage /> },
          { path: 'general-medicine', element: <GeneralMedicinePage /> },
        ],
      },

      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'diagnostics',
        children: [
          { element: <DiagnosticsOverviewPage />, index: true },
          { path: 'category/:categoryId', element: <DiagnosticsCategoryPage /> },
          { path: 'test/:testId', element: <DiagnosticsTestPage /> },
          { path: 'package/:packageId', element: <DiagnosticsPackagePage /> },
          { path: 'cart', element: <DiagnosticsCartPage /> },
        ],
      },
       {
        path: 'pharmacy',
        children: [
          { element: <OverviewPharmacyView />, index: true },
          { path: 'overview', element: <PharmacyOverviewPage /> },
          { path: 'categories', element: <PharmacyCategoriesPage /> },
          { path: 'category/:categoryId', element: <PharmacyCategoryPage /> },
          { path: 'products', element: <PharmacyProductsPage /> },
          { path: 'product/:productId', element: <PharmacyProductPage /> },
          { path: 'cart', element: <PharmacyCartPage /> },
          { path: 'orders', element: <PharmacyOrdersPage /> },
          { path: 'order/:orderId', element: <PharmacyOrderPage /> },
          { path: 'inventory', element: <PharmacyInventoryPage /> },
          { path: 'configuration', element: <PharmacyConfigurationPage /> },
          { path: 'reports', element: <PharmacyReportsPage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { element: <BlogPostsPage />, index: true },
          { path: 'list', element: <BlogPostsPage /> },
          { path: ':title', element: <BlogPostPage /> },
          { path: ':title/edit', element: <BlogEditPostPage /> },
          { path: 'new', element: <BlogNewPostPage /> },
        ],
      },
      {
        path: 'website',
        children: [
          { element: <PrivacyAndPolicyPage />, index: true },
          { path: 'privacy_policy', element: <PrivacyAndPolicyPage /> },
          { path: 'terms_conditions', element: <TermsAndConditionsPage /> }
        ],
      },
    ],
  },
];

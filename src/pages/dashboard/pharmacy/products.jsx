import { Helmet } from 'react-helmet-async';
import { PharmacyProductsView } from 'src/sections/overview/pharmacy/view/pharmacy-products-view';
import { CONFIG } from 'src/config-global';

export default function PharmacyProductsPage() {
  return (
    <>
      <Helmet>
        <title>{`Pharmacy Products - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="Browse pharmacy products, filter by category, and add items to cart."
        />
      </Helmet>
      <PharmacyProductsView />
    </>
  );
}

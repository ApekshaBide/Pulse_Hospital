import { Helmet } from 'react-helmet-async';
import PharmacyCheckoutView from 'src/sections/overview/pharmacy/view/pharmacy-checkout-view';
import { CONFIG } from 'src/config-global';

export default function PharmacyCheckoutPage() {
  return (
    <>
      <Helmet>
        <title>{`Pharmacy Checkout - ${CONFIG.appName}`}</title>
        <meta
          name="description"
          content="Complete your pharmacy order with secure checkout process."
        />
      </Helmet>
      <PharmacyCheckoutView />
    </>
  );
}

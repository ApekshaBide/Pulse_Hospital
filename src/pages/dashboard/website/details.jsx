import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetPost } from 'src/actions/blog';

import { PrivacyAndPolicyView } from '../../../sections/website/view';

// ----------------------------------------------------------------------

const metadata = { title: `Privacy And Policy details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { title = '' } = useParams();

  const { post, postLoading, postError } = useGetPost(title);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <PrivacyAndPolicyView/>

    </>
  );
}

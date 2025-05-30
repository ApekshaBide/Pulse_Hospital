import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetPost, useGetLatestPosts } from 'src/actions/blog';

import { ServiceDetailsHomeView } from 'src/sections/blog/view/service-details-home-view';

// ----------------------------------------------------------------------

const metadata = { title: `Service details - ${CONFIG.site.name}` };

export default function Page() {
  const { title = 'understanding-blockchain-technology-beyond-cryptocurrency' } = useParams();

  const { post, postLoading, postError } = useGetPost(title);

  const { latestPosts } = useGetLatestPosts(title);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ServiceDetailsHomeView
        post={post}
        latestPosts={latestPosts}
        loading={postLoading}
        error={postError}
      />
    </>
  );
}

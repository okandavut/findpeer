import 'bootstrap/dist/css/bootstrap.min.css';

import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="#da532c" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta
          content="/favicons/browserconfig.xml"
          name="msapplication-config"
        />
        <meta content="5e41b2275db646a5" name="yandex-verification" />
        <meta
          content="t28Kl2fGmZjIEgh6q3mGsf-7gGb8115VMQm1qbMMIKc"
          name="google-site-verification"
        />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

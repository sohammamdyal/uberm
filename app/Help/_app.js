import App from 'next/app';
import Head from 'next/head';
import './../../app/styles/Home.module.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Uber - Contact Us</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return {...appProps };
};

export default MyApp;
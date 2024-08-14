// pages/_app.js
import { DriverInfoProvider } from './../../context/DriverInfoContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <DriverInfoProvider>
      <Component {...pageProps} />
    </DriverInfoProvider>
  );
}

export default MyApp;

// _app.js
import React from "react";
import { MessagesProvider } from "../context/MessagesContext";

function MyApp({ Component, pageProps }) {
  return (
    <MessagesProvider>
      <Component {...pageProps} />
    </MessagesProvider>
  );
}

export default MyApp;

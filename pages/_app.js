import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    const socket = io();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SessionProvider session={session}>
      <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap' rel='stylesheet' />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;


import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import '../app/globals.css';
import AuthProvider from '@/components/provider/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID||""}>
      <Provider store={store}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;

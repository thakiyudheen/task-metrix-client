
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/index';
import '../app/globals.css';
import AuthProvider from '@/components/provider/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId='772859590844-n5b3qkh0hjcmje3r8sg82io0u1v214sc.apps.googleusercontent.com'>
      <Provider store={store}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default MyApp;

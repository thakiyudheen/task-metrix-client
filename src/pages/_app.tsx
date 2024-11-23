
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/index';  
import '../app/globals.css'; 
import AuthProvider from '@/components/provider/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}> 
     <AuthProvider>
      <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;

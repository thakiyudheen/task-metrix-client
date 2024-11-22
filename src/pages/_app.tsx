
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/index';  
import '../app/globals.css'; 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}> 
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

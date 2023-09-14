import { Provider as ReduxProvider } from 'react-redux';

import store from './redux/store';

import { AppRoutes } from './routes';
import './App.module.less';
import '@/theme/global.less';
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function App() {
  const clientSecret = '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';
  return (
    <ReduxProvider store={store}>
      <GoogleOAuthProvider clientId="349500938765-mr27odoo785td991qek1s2hk83qrtuoe.apps.googleusercontent.com">
        <AppRoutes />
      </GoogleOAuthProvider>
    </ReduxProvider>
  );
}

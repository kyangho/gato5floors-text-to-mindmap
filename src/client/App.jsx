import { Provider as ReduxProvider } from 'react-redux';

import store from './redux/store';

import { AppRoutes } from './routes';
import './App.module.less';
import '@/theme/global.less';
export default function App() {
  return (
    <ReduxProvider store={store}>
      <AppRoutes />
    </ReduxProvider>
  );
}

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import AxiosInstance from '@/redux/axios';
import { messages } from '@/i18n';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import CommonLayout from '@/components/Layout/Common';

const AppRoutes = () => {
  const { locale } = useSelector(state => state.user);
  // set the locale for the user
  // more languages options can be added here
  useEffect(() => {
    dayjs.locale('vi');
  }, [locale]);

  useEffect(() => {
    AxiosInstance.interceptors.request.use(function (config) {
      const token = localStorage.getItem('token');
      config.headers.Authorization = token ? token : '';
      return config;
    });
  }, []);

  return (
    <IntlProvider locale={locale.split('_')[0]} messages={messages['vi_VN']}>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<CommonLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default AppRoutes;

import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { isFunction, last } from 'lodash';
import AxiosInstance from '@/redux/axios';
import { ROUTES_CONST } from '@/constants/routerConst';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const alerts = useSelector(({ notification: { alerts } }) => alerts);
  const [user, setUser] = useState(() => {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile && userProfile !== 'undefined') {
      return JSON.parse(userProfile);
    }
    return null;
  });

  const login = async payload => {
    try {
      const res = await AxiosInstance.post('/auth/signin', payload);

      if (res.data) {
        localStorage.setItem('userProfile', JSON.stringify(res.data));
        localStorage.setItem(
          'token',
          `${res.data.tokenType} ${res.data.accessToken}`
        );
        setUser(res.data);
        navigate(ROUTES_CONST.DASHBOARD);
      }
    } catch ({ response }) {}
  };

  const logout = async () => {
    localStorage.removeItem('userProfile');
    if (!localStorage.getItem('userProfile')) {
      setUser(null);
    }
    navigate('/');
  };

  return (
    <>
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;

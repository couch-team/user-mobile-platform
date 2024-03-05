/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import AuthNavigation from './auth';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';
import DashboardNavigation from './dashboard';
import { StatusBar } from 'react-native';

const AppNavigation = () => {
  // const isLoggedIn = useSelector((state: RootState) => state.Auth.isLoggedIn);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <>
      {!isLoggedIn ? <AuthNavigation /> : <DashboardNavigation />}
      <StatusBar barStyle={'light-content'} />
    </>
  );
};

export const RootNavigation = AppNavigation;

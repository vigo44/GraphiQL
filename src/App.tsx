import { useCallback, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CheckAuth } from './hooks/check-auth';
import { loginUser } from './store/user-slice';
import './index.css';

import Welcome from './pages/welcome/welcome';
import Editor from './pages/editor/editor';
import NotFound from './pages/not-found/not-found';
import SignIn from './pages/sign-in/sign-in';
import SignUp from './pages/sign-up/sign-up';
import PasswordReset from './pages/forgot-password/forgot-password';
import Layout from './pages/layout';

import { Box } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const { isAuth } = CheckAuth();

  const handleAutoLogin = useCallback(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          loginUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
            name: user.displayName,
          })
        );
      }
    });
  }, [dispatch]);

  useEffect(() => {
    handleAutoLogin();
  }, [handleAutoLogin]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isAuth ? <Editor /> : <Navigate to="/sign-in" />} />
          <Route path="sign-in" element={!isAuth ? <SignIn /> : <Navigate to="/" />} />
          <Route path="sign-up" element={!isAuth ? <SignUp /> : <Navigate to="/" />} />
          <Route path="pass-reset" element={!isAuth ? <PasswordReset /> : <Navigate to="/" />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;

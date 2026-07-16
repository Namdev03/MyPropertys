import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { pagePath } from './Router/pagePaths.js'
import Signup from './pages/signup.jsx'
import Signin from './pages/Signin.jsx'
import Verify from './pages/Verify.jsx'
import ForgotPassword from './pages/ForgatePassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import HomePage from './pages/HomePage.jsx'
import Layout from './components/NavBar.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { meAsync } from './Redux/authSlice.js'
import Protected from './Router/Protected.jsx'
import Loading from './components/Loading.jsx'
import { userProfileAsync } from './Redux/userSlice.js'
import Profile from './pages/profilePage.jsx'
import Properties from './pages/Properties.jsx'
import { propertiesAsync } from './Redux/propertySlice.js'
//=====App Function =====
function App() {
  const { isLoading, isLoggedIn } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  // Check login on app start
  useEffect(() => {
    dispatch(meAsync());

  }, [dispatch]);

  // Fetch profile after login
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(userProfileAsync());
      dispatch(propertiesAsync())
    }
  }, [dispatch, isLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<Layout />}>
        <Route path={pagePath.HOME} element={<HomePage />} />
        <Route path={pagePath.PROPERTIES} element={<Properties />} />
        {/* More routes */}
      </Route>
      <Route element={<Protected />}>
        <Route element={<Layout />}>
          <Route path={pagePath.PROFILE} element={<Profile />} />
          <Route path={pagePath.PROPERTIES} element={<Properties />} />
          {/* More routes */}
        </Route>
      </Route>
      {/* Public Routes */}
      <Route path={pagePath.SIGNUP} element={<Signup />} />
      <Route path={pagePath.SIGNIN} element={<Signin />} />
      <Route path="/verify/:phone" element={<Verify />} />
      <Route
        path={pagePath.FORGOTPASSWORD}
        element={<ForgotPassword />}
      />
      <Route
        path="/resetpassword/:phone"
        element={<ResetPassword />}
      />
    </Routes>
  );
}

export default App;
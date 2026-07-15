import React from 'react'
import { Route, Routes } from 'react-router'
import { pagePath } from './Router/pagePaths.js'
import Signup from './pages/signup.jsx'
import Signin from './pages/Signin.jsx'
import Verify from './pages/Verify.jsx'
import ForgotPassword from './pages/ForgatePassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import HomePage from './pages/HomePage.jsx'
import Layout from './components/NavBar.jsx'
function App() {
  return (
    <>
      <Routes>
        {/* Routes with Navbar */}
        <Route element={<Layout/>}>
          <Route path={pagePath.HOME} element={<HomePage />} />
          {/* Add other pages that should show Navbar */}
          {/* <Route path={pagePath.PROPERTIES} element={<Properties />} /> */}
          {/* <Route path={pagePath.CONTACT} element={<Contact />} /> */}
        </Route>
        {/* Routes without Navbar */}
        <Route path={pagePath.SIGNUP} element={<Signup />} />
        <Route path={pagePath.SIGNIN} element={<Signin />} />
        <Route path="/verify/:phone" element={<Verify />} />
        <Route path={pagePath.FORGOTPASSWORD} element={<ForgotPassword />} />
        <Route path="/resetpassword/:phone" element={<ResetPassword />} />
      </Routes>
    </>
  )
}


export default App
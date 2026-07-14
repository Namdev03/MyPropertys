import React from 'react'
import { Route, Routes } from 'react-router'
import { pagePath } from './Router/pagePaths.js'
import Signup from './pages/signup.jsx'
import Signin from './pages/Signin.jsx'
function App() {
  return (
   <>
   <Routes>
        <Route path={pagePath.HOME} element={<h1>Home Page</h1>} />
        <Route path={pagePath.SIGNUP}element={<Signup/>} />
        <Route path={pagePath.SIGNIN}element={<Signin/>} />
      </Routes>
   </>
  )
}


export default App
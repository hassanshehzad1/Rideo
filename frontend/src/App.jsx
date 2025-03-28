import React from 'react'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import CaptainSign from './pages/CaptainSign'
import CaptainLogin from './pages/CaptainLogin'
import { Route, Routes } from 'react-router-dom'
import UserSign from './pages/UserSign'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/users/login" element={<UserLogin />}></Route>
      <Route path="/users/register" element={<UserSign />}></Route>
      <Route path="/captains/register" element={<CaptainSign />}></Route>
      <Route path="/captains/register" element={<CaptainLogin />}></Route>
      {/* <Route path="/captains/login" element={<CaptainLogin />}></Route> */}
    </Routes>
  )
}

export default App
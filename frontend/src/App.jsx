import React from 'react'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import CaptainSign from './pages/CaptainSign'
import CaptainLogin from './pages/CaptainLogin'
import { Route, Routes } from 'react-router-dom'
import UserSign from './pages/UserSign'
import Start from './pages/Start'
import { Toaster } from 'sonner';
import UserProtectWrapper from './protect/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainsHome from './pages/CaptainsHome'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/users/login" element={<UserLogin />} />
        <Route path="/users/register" element={<UserSign />} />
        <Route path="/captains/register" element={<CaptainSign />} />
        <Route path="/captains/login" element={<CaptainLogin />} />

        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route path="/users/logout" element={
          <UserProtectWrapper><UserLogout /></UserProtectWrapper>} />
        <Route path="/users/ride" element={
          <UserProtectWrapper><Riding /></UserProtectWrapper>} />


        <Route path="/captains/home" element={
          <UserProtectWrapper><CaptainsHome /></UserProtectWrapper>} />

        <Route path="/captains/logout" element={
          <UserProtectWrapper><CaptainLogout /></UserProtectWrapper>} />
      </Routes>

    </>
  )
}

export default App
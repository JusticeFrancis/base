import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import CreateRegion from './components/auth/CreateRegion'
import Login from './components/auth/Login'
import Dashboard from './components/Dashboard'
import MemberForm from './components/forms/MemberForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Main = () => {
  
  return (   
   <>      
     <ToastContainer />
    <BrowserRouter>
            <Routes>
            <Route path="/membership-form/:region_id" element={<MemberForm/>} />
              <Route path="/register" element={<CreateRegion/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/dashboard/*" element={<Dashboard/>} />
              <Route path="/" element={<Dashboard/>} />
            </Routes>
          </BrowserRouter>
   </>
  )
}

export default Main
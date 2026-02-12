import React from 'react'
import Login from './Components/auth/Login'
import Register from './Components/auth/Register'
import Manual from './Components/pages/Manual'
import Home from './Components/pages/Home'
import Image from './Components/pages/Image'
// import OTP from './components/auth/OTP'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { ProtectedRoutes } from './components/auth/ProtectedRoutes'

const App = () => {
  return (
    <BrowserRouter>
      {/* <div className="main-body"> */}
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Register' element={<Register />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/ManualEnter' element={<Manual/>}/>
          <Route path='/AddImage' element={<Image/>}/>
          {/* <Route path='/MyProfile' element={ 
            <ProtectedRoutes>
            <MyProfile />
            </ProtectedRoutes>} /> */}
       
        </Routes>
      {/* </div> */}
    </BrowserRouter>
  )
}

export default App
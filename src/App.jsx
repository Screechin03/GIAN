import { useState } from 'react'

import LoginPage from './login/Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import MyModal from './Dashboard/DashboardPage'
import LoginSignupPage from './login/Login'
import Header from './Dashboard/Header'


function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route index path="/" element={<div><Header/><MyModal/></div>}></Route>
      <Route index path="/login" element={<LoginSignupPage/>}></Route> 
    </Routes>
    </BrowserRouter>
   
  )
}

export default App

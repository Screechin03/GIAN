import { useState } from 'react'

import LoginPage from './login/Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import MyModal from './Dashboard/DashboardPage'
import LoginSignupPage from './login/Login'
import Header from './Dashboard/Header'
import Header1 from './LoadingPage/Header'
import CTASection from './LoadingPage/CTASection'
import ContactSection from './LoadingPage/Detail'
import FAQSection from './LoadingPage/FAQSection'
import FooterSection from './LoadingPage/FooterSection'


function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route index path="/" element={<div><Header/><MyModal/></div>}></Route>
      <Route index path="/login" element={<LoginSignupPage/>}></Route> 
      <Route index path="/contact" element={<div><Header1/><ContactSection/><FAQSection/><CTASection/></div>}></Route> 
    </Routes>
    </BrowserRouter>
   
  )
}

export default App

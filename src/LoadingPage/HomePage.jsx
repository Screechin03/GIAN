import React from 'react'

import Header from './Header'
import ContactSection from './Detail'
import FAQSection from './FAQSection'
import CTASection from './CTASection'
import FooterSection from './FooterSection'

const HomePage = () => {
  return (
    <div className="flex-col justify-center px-24 bg-purple-200 py-12">
         <Header/>
         <ContactSection/>
         <FAQSection/>
         <CTASection/>
         
        
        
       
        
    </div>
  )
}

export default HomePage

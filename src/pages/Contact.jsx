import React from 'react'
import { Navbar } from '../components/NavBar'
import { Footer } from '../components/Fotter'
import ContactSection from '../components/ContactSection'

export default function Contact() {
  return (
    <div>
      <Navbar/>
      <ContactSection/>
      <Footer/>
    </div>
  )
}

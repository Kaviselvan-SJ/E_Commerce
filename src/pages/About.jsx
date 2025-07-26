import React from 'react'
import { Navbar } from '../components/NavBar'
import { Footer } from '../components/Fotter'
import AboutSection from '../components/AboutSection'

export default function About() {
  return (
    <div>
      <Navbar/>
      <AboutSection/>
      <Footer/>
    </div>
  )
}

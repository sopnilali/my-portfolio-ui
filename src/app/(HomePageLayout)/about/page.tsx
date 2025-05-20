
import AboutPages from '@/components/Modules/About'
import { Metadata } from 'next'
import React from 'react'

export const metadata : Metadata = {
  title: "About Me",
  description: "About Me"
}

const AboutPage = () => {
  return (
    <div>
      <AboutPages />
    </div>
  )
}

export default AboutPage

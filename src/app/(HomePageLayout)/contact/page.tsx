import ContactForm from '@/components/Modules/Contact/ContactForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata : Metadata = {
  title: "Contact Me",
  description: "Contact Me"
}

const ContactPage = () => {
  return (
    <div>
      <ContactForm />
    </div>
  )
}

export default ContactPage  

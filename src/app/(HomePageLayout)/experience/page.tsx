import ExperienceList from '@/components/Modules/ExperienceAndEducationList'
import { Metadata } from 'next'
import React from 'react'

export const metadata : Metadata = {
  title: "My Experience",
  description: "My Experience"
}

const ExperiencePage = () => {
  return (
    <div className=' pt-16'>
      <ExperienceList />
    </div>
  )
}

export default ExperiencePage

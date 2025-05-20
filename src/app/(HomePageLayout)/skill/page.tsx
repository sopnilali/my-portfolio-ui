import SkillsList from '@/components/Modules/HomePage/SkillsList'
import { Metadata } from 'next'
import React from 'react'


export const metadata : Metadata = {
  title: "My Skills",
  description: "My Skills"
}

const SkillPage = () => {
  return (
    <div className='pt-16'>
      <SkillsList />
    </div>
  )
}

export default SkillPage


import SkillPages from '@/components/Modules/Skill/SkillPages'
import { Metadata } from 'next'
import React from 'react'


export const metadata : Metadata = {
  title: "My Skills",
  description: "My Skills"
}

const SkillPage = () => {
  return (
    <div className='pt-16'>
      <SkillPages />
    </div>
  )
}

export default SkillPage

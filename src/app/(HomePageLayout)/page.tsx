
import ExperienceList from '@/components/Modules/ExperienceAndEducationList'
import HomePageIndex from '@/components/Modules/HomePage'
import HeroSection from '@/components/Modules/HomePage/HeroSection'
import SkillsList from '@/components/Modules/HomePage/SkillsList'
import React from 'react'

export const metadata = {
  title: 'Welcome to my portfolio | Md. Abdul Adud ',
  description: 'I am a web developer with a passion for building web applications.',
}

const HomePage = () => {
  return (
    <div>
      <HomePageIndex />
    </div>
  )
}

export default HomePage

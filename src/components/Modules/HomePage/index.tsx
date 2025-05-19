'use client'

import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import SkillsList from './SkillsList'
import ExperienceAndEducationList from '../ExperienceAndEducationList'
import ProjectList from '../Project/ProjectList'
import BlogList from '../Blog/BlogList'

const HomePageIndex = () => {

  return (
    <div>
      <HeroSection />
      <SkillsList />
      <ProjectList />
      <ExperienceAndEducationList />
      <BlogList />
    </div>
  )
}

export default HomePageIndex

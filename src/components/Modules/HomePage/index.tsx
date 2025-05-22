'use client'

import React from 'react'
import HeroSection from './HeroSection'
import ExperienceAndEducationList from '../ExperienceAndEducationList'
import ProjectList from '../Project/ProjectList'
import BlogList from '../Blog/BlogList'
import SkillsList from '../Skill/SkillsList'
import { motion } from 'framer-motion'

const HomePageIndex = () => {
  return (
    <div>

        <HeroSection />
        <ProjectList />
        <SkillsList />
        <ExperienceAndEducationList />
        <BlogList />
    </div>
  )
}

export default HomePageIndex

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
    <div className="relative">
      {/* Global animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [-20, 20, -20],
            y: [-20, 20, -20]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [20, -20, 20],
            y: [20, -20, 20]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-40 -right-40 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [-30, 30, -30],
            y: [30, -30, 30]
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-40 left-40 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-orange-500/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Content sections with backdrop blur */}
      <div className="relative">
        <HeroSection />
        <ProjectList />
        <SkillsList />
        <ExperienceAndEducationList />
        <BlogList />
      </div>
    </div>
  )
}

export default HomePageIndex

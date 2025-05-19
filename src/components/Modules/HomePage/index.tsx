'use client'

import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import SkillsList from './SkillsList'
import ExperienceAndEducationList from '../Experience'
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePageIndex = () => {

    useEffect(() => {
        AOS.init({
          once: true,
        });
    }, []);
  return (
    <div>
      <HeroSection />
      <SkillsList />
      <ExperienceAndEducationList />
    </div>
  )
}

export default HomePageIndex

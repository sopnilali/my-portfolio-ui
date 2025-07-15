
import ExperienceList from '@/components/Modules/ExperienceAndEducationList'
import HomePageIndex from '@/components/Modules/HomePage'
import HeroSection from '@/components/Modules/HomePage/HeroSection'
import { Metadata } from 'next'

import React from 'react'

export const metadata : Metadata = {
  title: 'Welcome to my portfolio | Md. Abdul Adud ',
  description: 'I am a web developer with a passion for building web applications.',
  keywords: ['Md. Abdul Adud', 'Web Developer', 'Software Engineer', 'React Developer', 'Next.js Developer', 'Node.js Developer', 'MongoDB Developer', 'Express.js Developer', 'Tailwind CSS Developer', 'HTML Developer', 'CSS Developer', 'JavaScript Developer', 'TypeScript Developer', 'React Native Developer', 'Flutter Developer', 'Python Developer', 'Java Developer', 'C Developer', 'C++ Developer', 'C# Developer', 'PHP Developer', 'SQL Developer', 'NoSQL Developer', 'Docker Developer', 'Kubernetes Developer', 'AWS Developer', 'Azure Developer', 'GCP Developer', 'DevOps Developer', 'Cybersecurity Developer', 'Blockchain Developer', 'Artificial Intelligence Developer', 'Machine Learning Developer', 'Data Science Developer', 'Data Analyst Developer', 'Data Engineer Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer', 'Data Governance Developer', 'Data Privacy Developer', 'Data Management Developer', 'Data Analysis Developer', 'Data Science Developer', 'Data Engineering Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer', 'Data Governance Developer', 'Data Privacy Developer', 'Data Management Developer', 'Data Analysis Developer', 'Data Science Developer', 'Data Engineering Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer', 'Data Governance Developer', 'Data Privacy Developer', 'Data Management Developer', 'Data Analysis Developer', 'Data Science Developer', 'Data Engineering Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer', 'Data Governance Developer', 'Data Privacy Developer', 'Data Management Developer', 'Data Analysis Developer', 'Data Science Developer', 'Data Engineering Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer', 'Data Governance Developer', 'Data Privacy Developer', 'Data Management Developer', 'Data Analysis Developer', 'Data Science Developer', 'Data Engineering Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer', 'Data Governance Developer', 'Data Privacy Developer', 'Data Management Developer', 'Data Analysis Developer', 'Data Science Developer', 'Data Engineering Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer', 'Data Governance Developer', 'Data Privacy Developer', 'Data Management Developer', 'Data Analysis Developer', 'Data Science Developer', 'Data Engineering Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer', 'Data Governance Developer', 'Data Privacy Developer', 'Data Management Developer', 'Data Analysis Developer', 'Data Science Developer', 'Data Engineering Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer', 'Data Governance Developer', 'Data Privacy Developer', 'Data Management Developer', 'Data Analysis Developer', 'Data Science Developer', 'Data Engineering Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer', 'Data Governance Developer', 'Data Privacy Developer', 'Data Management Developer', 'Data Analysis Developer', 'Data Science Developer', 'Data Engineering Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer', 'Data Governance Developer', 'Data Privacy Developer', 'Data Management Developer', 'Data Analysis Developer', 'Data Science Developer', 'Data Engineering Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer' ],
  openGraph: {
    title: 'Welcome to my portfolio | Md. Abdul Adud ',
    description: 'I am a web developer with a passion for building web applications.',
    url: 'https://www.linkedin.com/in/ami-abdul-adud',
    images: [
      {
        url: 'https://res.cloudinary.com/dbebxi5vg/image/upload/v1752128122/documents/obkaer3eaq1u8fscapcl.jpg',
        width: 1200,
        height: 630,
        alt: 'Md. Abdul Adud'
      }
    ],
    siteName: 'Md. Abdul Adud',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welcome to my portfolio | Md. Abdul Adud ',
    description: 'I am a web developer with a passion for building web applications.',
    images: ['https://res.cloudinary.com/dbebxi5vg/image/upload/v1752128122/documents/obkaer3eaq1u8fscapcl.jpg'],
  },
  alternates: {
    canonical: 'https://mdabduladudui.vercel.app/',
  },
  robots: {
    index: true,
    follow: true,
  },
  
}

const HomePage = () => {
  return (
    <div>
      <HomePageIndex />
    </div>
  )
}

export default HomePage

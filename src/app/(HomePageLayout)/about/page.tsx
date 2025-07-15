
import AboutPages from '@/components/Modules/About'
import { Metadata } from 'next'
import React from 'react'

export const metadata : Metadata = {
  title: "About Me",
  description: "About Me",
  keywords: ['Md. Abdul Adud', 'Web Developer', 'Software Engineer', 'React Developer', 'Next.js Developer', 'Node.js Developer', 'MongoDB Developer', 'Express.js Developer', 'Tailwind CSS Developer', 'HTML Developer', 'CSS Developer', 'JavaScript Developer', 'TypeScript Developer', 'React Native Developer', 'Flutter Developer', 'Python Developer', 'Java Developer', 'C Developer', 'C++ Developer', 'C# Developer', 'PHP Developer', 'SQL Developer', 'NoSQL Developer', 'Docker Developer', 'Kubernetes Developer', 'AWS Developer', 'Azure Developer', 'GCP Developer', 'DevOps Developer', 'Cybersecurity Developer', 'Blockchain Developer', 'Artificial Intelligence Developer', 'Machine Learning Developer', 'Data Science Developer', 'Data Analyst Developer', 'Data Engineer Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer', 'Data Governance Developer', 'Data Privacy Developer', 'Data Management Developer', 'Data Analysis Developer', 'Data Science Developer', 'Data Engineering Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer', 'Data Governance Developer', 'Data Privacy Developer', 'Data Management Developer', 'Data Analysis Developer', 'Data Science Developer', 'Data Engineering Developer', 'Data Visualization Developer', 'Data Mining Developer', 'Data Warehousing Developer', 'Data Modeling Developer', 'Data Integration Developer', 'Data Quality Developer', 'Data Security Developer' ],
  openGraph: {
    title: "About Me",
    description: "About Me",
    url: 'https://www.linkedin.com/in/ami-abdul-adud',
    images: ['https://res.cloudinary.com/dbebxi5vg/image/upload/v1752128122/documents/obkaer3eaq1u8fscapcl.jpg'],
  },
  alternates: {
    canonical: 'https://www.linkedin.com/in/ami-abdul-adud',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const AboutPage = () => {
  return (
    <div>
      <AboutPages />
    </div>
  )
}

export default AboutPage

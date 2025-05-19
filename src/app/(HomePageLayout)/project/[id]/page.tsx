import ProjectDetails, { generateMetadata } from '@/components/Modules/Project/ProjectDetails'
import { Metadata } from 'next'
import React from 'react'

export const metadata : Metadata = {
  title: 'Project Details | Md. Abdul Adud',
  description: 'Project Details ',
 }

const ProjectDetailPage = () => {


  return (
    <div>
        <ProjectDetails />
    </div>
  )
}
export default ProjectDetailPage

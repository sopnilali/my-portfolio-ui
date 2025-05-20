import ProjectPages from '@/components/Modules/Project/ProjectPages'
import React from 'react'

export const metadata = {
  title: "All Project",
  description: "All Projects"
}

const ProjectPage = () => {
  return (
    <div className='container mx-auto pt-16 px-4 sm:px-4 lg:px-4'>
       <ProjectPages/>
    </div>
  )
}

export default ProjectPage

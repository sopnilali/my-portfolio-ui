import ProjectPages from '@/components/Modules/Project/ProjectPages'
import React from 'react'

export const metadata = {
  title: "All Project",
  description: "All Projects"
}

const ProjectPage = () => {
  return (
    <div className=' pt-16 '>
       <ProjectPages/>
    </div>
  )
}

export default ProjectPage

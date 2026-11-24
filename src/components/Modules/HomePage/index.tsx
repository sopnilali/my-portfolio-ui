import React from 'react';
import HeroSection from './HeroSection';
import StatsStrip from './StatsStrip';
import ExperienceAndEducationList from '../ExperienceAndEducationList';
import ProjectList from '../Project/ProjectList';
import BlogList from '../Blog/BlogList';
import SkillsList from '../Skill/SkillsList';
import type { About } from '@/services/aboutService';
import type { IProject } from '@/components/Types/project.type';
import type { Skill } from '@/services/skillService';
import type { Experience } from '@/services/experienceService';
import type { Blog } from '@/services/blogService';

interface HomePageIndexProps {
  about: About | null;
  projects: IProject[];
  skills: Skill[];
  experiences: Experience[];
  blogs: Blog[];
}

const HomePageIndex = ({
  about,
  projects,
  skills,
  experiences,
  blogs,
}: HomePageIndexProps) => {
  return (
    <div>
      <HeroSection about={about} />
      <StatsStrip
        stats={[
          { value: projects.length, label: 'Projects shipped' },
          { value: skills.length, label: 'Technologies' },
          { value: experiences.length, label: 'Roles & experience' },
          { value: blogs.length, label: 'Articles written' },
        ]}
      />
      <ProjectList projects={projects} />
      <SkillsList skills={skills} />
      <ExperienceAndEducationList experiences={experiences} />
      <BlogList blogs={blogs} />
    </div>
  );
};

export default HomePageIndex;

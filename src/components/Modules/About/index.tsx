'use client'

import React from 'react';
import Image from 'next/image';
import { useGetAllSkillsQuery } from '@/components/Redux/features/skill/skillApi';

const aboutData = {
    profile: {
        name: "Md Abdul Adud",
        title: "Full Stack Developer",
        image: "https://i.postimg.cc/Pr1QzBd0/image.png",
        description: "A passionate developer with expertise in building modern web applications using cutting-edge technologies. \n I love  solving complex problems and creating efficient, scalable solutions."
    },
    professionalSummary: "With a strong foundation in both frontend and backend development, I specialize in creating responsive, user-friendly applications. My experience spans across various technologies including React, Node.js, Redux, Next.js, Tailwind CSS and modern web frameworks. I'm committed to writing clean, maintainable code and following best practices in software development.",
    personalInterests: "When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and staying updated with the latest industry trends. I believe in continuous learning and sharing knowledge with the developer community."
};

const AboutPages = () => {
    const { data: MySkills } = useGetAllSkillsQuery(undefined)

    return (
        <div className="min-h-screen bg-white/70 backdrop-blur-md mt-16">
            <div className="container mx-auto px-4 py-16">
                <div className="container mx-auto" data-aos="fade-up">
                    <div className="flex flex-col md:flex-row-reverse gap-8 items-center mb-12">
                        <div
                            className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden border-4 border-gray-200"
                            data-aos="zoom-in"
                            data-aos-delay="200"
                        >
                            <Image
                                src={aboutData.profile.image}
                                alt="Profile"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        <div
                            className="flex-1"
                            data-aos="fade-left"
                            data-aos-delay="400"
                        >
                            <h2 className="text-4xl font-semibold text-gray-800 mb-4">{aboutData.profile.name}</h2>
                            <p className="text-gray-600 mb-4">{aboutData.profile.title}</p>
                            <p className="text-gray-700">
                            {aboutData.profile.description.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                            {line}
                            <br />
                            </React.Fragment>
                            ))}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-8" data-aos="fade-up" data-aos-delay="600">
                        <section>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4" data-aos="fade-right">Professional Summary</h3>
                            <p className="text-gray-700 leading-relaxed" data-aos="fade-up">
                                {aboutData.professionalSummary}
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4" data-aos="fade-right">Skills & Expertise</h3>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {MySkills?.data?.map((skill: any, index: number) => (
                                    <div
                                        key={skill.id}
                                        data-aos="zoom-in"
                                        data-aos-delay={index * 100}
                                        className="bg-gray-50 hover:bg-gray-200 p-4 rounded-lg text-center flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                                    >
                                        <Image 
                                            src={skill.icon}
                                            alt={skill.name}
                                            width={24}
                                            height={24}
                                            className="object-contain"
                                        />
                                        <span className="text-gray-700 font-medium">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4" data-aos="fade-right">Personal Interests</h3>
                            <p className="text-gray-700 leading-relaxed" data-aos="fade-up">
                                {aboutData.personalInterests}
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPages;

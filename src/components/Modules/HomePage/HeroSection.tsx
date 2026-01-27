'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaDownload, FaFilePdf, FaArrowAltCircleRight } from 'react-icons/fa';
import { useGetAllAboutQuery } from '@/components/Redux/features/about/aboutapi';
const heroData = {
  name: "Md. Abdul Adud",
  title: "Full Stack Developer",
  description: "I am a web developer focused on building scalable, maintainable, and high-quality web applications. . I have a deep love for learning and always strive to improve my skills.",
  buttons: [
    {
      text: <span className='flex items-center gap-2'>{<FaArrowAltCircleRight />}Contact Me</span>,
      link: "/contact",
      primary: true
    },
    {
      text: <span className='flex items-center gap-2'>{<FaFilePdf />} Resume</span>, 
      link: "https://drive.google.com/drive/folders/1vWfEtq0rSp613hx5l8rwE4flmtPgWw9W",
      primary: false
    },
    {
      text: <span className='flex items-center gap-2'>{<FaFilePdf />} CV</span>, 
      link: "https://drive.google.com/drive/folders/1GJG5ksMd4glEUwPrbSJQwVRm8iRjmD6D",
      primary: false
    }
  ],
  image: {
    src: "https://i.postimg.cc/MKD6gcRS/Whats-App-Image-2025-12-13-at-19-07-19-fb8f2939.png",
    alt: "Md. Abdul Adud"
  },
  socialLinks: [
    {
      url: "https://github.com/sopnilali",
      icon: "github"
    },
    {
      url: "https://www.linkedin.com/in/ami-abdul-adud",
      icon: "linkedin"
    },
    {
      url: "https://www.facebook.com/cse.wadud",
      icon: "facebook"
    }
  ]
};

const HeroSection = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const { data: aboutData, isLoading, isFetching } = useGetAllAboutQuery(undefined);
  const about = aboutData?.data[0];
  const isDataLoading = isLoading || isFetching;



  return (
    <div className=" md:min-h-[90vh] sm:min-h-[80vh] flex items-center justify-center bg-white dark:bg-gray-900/40 backdrop-blur-2xl pt-16 relative">
      <div className="container mx-auto px-4 sm:px-4 lg:px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Hero Image */}
          <div className="relative order-first lg:order-last pt-10">
            <div className="relative w-full aspect-square border-4 scale-95 border-gray-200/50 dark:border-gray-700/50 rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.2)] backdrop-blur-xl bg-white dark:bg-gray-800/20 transition-transform duration-200 hover:scale-[0.98]">
              {/* Image Skeleton Loader */}
              {(isDataLoading || imageLoading) && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              )}
              
              {about?.imageUrl && (
                <Image
                  src={about.imageUrl}
                  alt={about?.nameTitle || 'Profile'}
                  className={`object-cover transition-opacity duration-500 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  fill
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6 rounded-2xl">
            {/* Name Title */}
            {isDataLoading ? (
              <div className="space-y-3">
                <div className="h-12 sm:h-14 md:h-16 lg:h-20 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse" />
              </div>
            ) : (
              <h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
              >
                {about?.nameTitle}
              </h1>
            )}
            
            {/* Profession Name */}
            {isDataLoading ? (
              <div className="h-8 sm:h-10 md:h-12 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse" />
            ) : (
              <h2 
                className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200"
              >
                {about?.professonName}
              </h2>
            )}
            
            {/* Description */}
            {isDataLoading ? (
              <div className="space-y-2">
                <div className="h-4 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" />
                <div className="h-4 w-4/6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" />
              </div>
            ) : (
              <p 
                className="text-base sm:text-lg text-gray-700 dark:text-gray-300"
              >
                {about?.shortdescription}
              </p>
            )}
            <div 
              className="flex flex-col sm:flex-row gap-4"
            >
              {heroData.buttons.map((button, index) => (
                <Link key={index} href={button.link} className="w-full sm:w-auto">
                  <button
                    className={`w-full sm:w-auto backdrop-blur-md ${button.primary ? 
                      "bg-gray-900/90 dark:bg-gray-700/90 text-white px-6 py-3 rounded-md font-medium shadow-lg" :
                      "bg-white/30 dark:bg-gray-800/30 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-md font-medium border border-gray-300/50 dark:border-gray-600/50 shadow-lg"
                    } transition-transform duration-150 active:scale-95 hover:scale-[0.98]`}
                  >
                    {button.text}
                  </button>
                </Link>
              ))}
            </div>
            <div 
              className="flex gap-4 mt-6"
            >
              {heroData.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white backdrop-blur-md bg-white/20 dark:bg-gray-800/20 p-2 rounded-full shadow-lg border border-gray-200/20 dark:border-gray-700/20 transition-transform duration-150 hover:scale-110"
                >
                  {link.icon === 'github' && <FaGithub className="w-6 h-6" />}
                  {link.icon === 'linkedin' && <FaLinkedin className="w-6 h-6" />}
                  {link.icon === 'facebook' && <FaFacebook className="w-6 h-6" />}
                  {link.icon === 'instagram' && <FaInstagram className="w-6 h-6" />}
                  {link.icon === 'twitter' && <FaTwitter className="w-6 h-6" />}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaDownload, FaFilePdf } from 'react-icons/fa';

const heroData = {
  name: "Md. Abdul Adud",
  title: "Full Stack Developer",
  description: "I am a web developer focused on building scalable, maintainable, and high-quality web applications. . I have a deep love for learning and always strive to improve my skills.",
  buttons: [
    {
      text: "Contact Me",
      link: "/contact",
      primary: true
    },
    {
      text: <span className='flex items-center gap-2'>{<FaDownload />} Resume</span>, 
      link: "https://drive.google.com/drive/folders/1vWfEtq0rSp613hx5l8rwE4flmtPgWw9W",
      primary: false
    },
    {
      text: <span className='flex items-center gap-2'>{<FaFilePdf />} CV</span>, 
      link: "https://drive.google.com/file/d/1aMkOhyJ55NJSuNPYOLyxmBLZpMOVSxUV/view",
      primary: false
    }
  ],
  image: {
    src: "https://res.cloudinary.com/dbebxi5vg/image/upload/v1752128122/documents/obkaer3eaq1u8fscapcl.jpg",
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
  return (
    <div className=" md:min-h-[90vh] sm:min-h-[80vh] flex items-center justify-center bg-white dark:bg-gray-900/40 backdrop-blur-2xl pt-16 relative">
      <div className="container mx-auto px-4 sm:px-4 lg:px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative order-first lg:order-last pt-10"
          >
            <motion.div
              whileHover={{ scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="relative w-full aspect-square border-4 scale-95  border-gray-200/50 dark:border-gray-700/50 rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.2)] backdrop-blur-xl bg-white dark:bg-gray-800/20"
            >
              <Image
                src={heroData.image.src}
                alt={heroData.image.alt}
                className="object-cover "
                fill
              />
            
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 rounded-2xl "
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {heroData.name.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {heroData.title}
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {heroData.description}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {heroData.buttons.map((button, index) => (
                <Link key={index} href={button.link} className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 0.95 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full sm:w-auto backdrop-blur-md ${button.primary ? 
                      "bg-gray-900/90 dark:bg-gray-700/90 text-white px-6 py-3 rounded-md font-medium shadow-lg" :
                      "bg-white/30 dark:bg-gray-800/30 text-gray-900 dark:text-gray-100 px-6 py-3 rounded-md font-medium border border-gray-300/50 dark:border-gray-600/50 shadow-lg"
                    }`}
                  >
                    {button.text}
                  </motion.button>
                </Link>
              ))}
            </motion.div>
            <motion.div 
              className="flex gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {heroData.socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white backdrop-blur-md bg-white/20 dark:bg-gray-800/20 p-2 rounded-full shadow-lg border border-gray-200/20 dark:border-gray-700/20"
                >
                  {link.icon === 'github' && <FaGithub className="w-6 h-6" />}
                  {link.icon === 'linkedin' && <FaLinkedin className="w-6 h-6" />}
                  {link.icon === 'facebook' && <FaFacebook className="w-6 h-6" />}
                  {link.icon === 'instagram' && <FaInstagram className="w-6 h-6" />}
                  {link.icon === 'twitter' && <FaTwitter className="w-6 h-6" />}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

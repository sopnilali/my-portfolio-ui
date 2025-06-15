'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      color: "#f97316", // orange-500
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.footer
      className="bg-white dark:border-gray-700 dark:bg-gray-900/40 backdrop-blur-md pt-10"
    >
      <div className="w-full">
        <div className="container mx-auto flex flex-col md:flex-row flex-wrap justify-between gap-8 px-4 sm:px-4 lg:px-4">
          {/* Brand Section */}
          <div className="w-full md:w-[45%] lg:w-[22%] space-y-4">
            <motion.h3
              className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white"
            >
              Md Abdul Adud
            </motion.h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              Full Stack Developer
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-[45%] lg:w-[22%] space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'Project', 'About', 'Skill', 'Contact'].map((item) => (
                <motion.div key={item} >
                  <Link
                    href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-gray-500 transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="w-full md:w-[45%] lg:w-[22%] space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Services</h4>
            <div className="space-y-2">
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'API Development', 'Database Design'].map((service) => (
                <motion.div key={service}>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {service}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-[45%] lg:w-[22%] space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Connect Me</h4>
            <div className="space-y-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Email:
                </p>
                <motion.a
                  href="mailto:mdabduladud8@gmail.com"
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-gray-500"
                >
                  mdabduladud8@gmail.com
                </motion.a>
              </div>
              <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300'>Location: Rajshahi, Bangladesh</p>
              <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300'>Phone: +8801737-055870</p>
              <div className="flex space-x-4 pt-2">
                {/* Social Media Icons */}
                <motion.a
                  href="https://github.com/sopnilali"
                  target="_blank"
                  rel="noopener noreferrer"
                  title='Github'
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-500"
                >
                  <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/ami-abdul-adud"
                  target="_blank"
                  rel="noopener noreferrer"
                  title='Linkedin'
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-500"
                >
                  <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/cse.wadud"
                  target="_blank"
                  rel="noopener noreferrer"
                  title='Facebook'
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-500"
                >
                  <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          className="mt-8 pt-4 border-t flex justify-center items-center border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 pb-4">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

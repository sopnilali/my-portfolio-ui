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
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      className="bg-white/70 border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900/70 backdrop-blur-md py-4 sm:py-12 lg:py-4"
    >
      <div className="container mx-auto px-4 sm:px-4 lg:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="space-y-4">
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
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
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

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect Me</h4>
            <div className="space-y-2">
              <div className="flex space-x-2">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Email:
                </p>
                <motion.a
                  href="mailto:mdabduladud8@gmail.com"
                  className="block text-sm sm:text-base text-gray-600 dark:text-gray-300 hover:text-gray-500"
                >
                  mdabduladud8@gmail.com
                </motion.a>

              </div>
              <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300'>Location: Rajshahi, Bangladesh</p>
              <p className='text-sm sm:text-base text-gray-600 dark:text-gray-300'>Phone: +8801737-055870 </p>
              <motion.div
                className="flex space-x-4"
              >
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
                >
                  <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-gray-500" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
        <motion.div
          className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 w-full">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;

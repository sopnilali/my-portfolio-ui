'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    closed: { x: '100%' },
    open: { x: 0 },
  };

  return (
    <nav className={`fixed w-full z-20 top-0 left-0 transition-all duration-500 backdrop-blur-xl ${isScrolled || isMenuOpen ? 'bg-white dark:bg-gray-900/40 shadow-lg' : 'bg-white dark:bg-gray-900/40'}`}>
      <div className="container mx-auto px-4 sm:px-4 lg:px-4">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center group">
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className={`text-xl sm:text-2xl md:text-3xl font-semibold transition-colors duration-500 ${isScrolled || isMenuOpen ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}`}
            >
              Md. Abdul Adud
            </motion.span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-4">
            <NavLink href="/" label="Home" isScrolled={isScrolled} />
            <NavLink href="/project" label="Projects" isScrolled={isScrolled} />
            <NavLink href="/experience" label="Experience" isScrolled={isScrolled} />
            <NavLink href="/skill" label="Skills" isScrolled={isScrolled} />
            <NavLink href="/blog" label="Blog" isScrolled={isScrolled} />
            <NavLink href="/about" label="About" isScrolled={isScrolled} />
            <NavLink href="/contact" label="Contact" isScrolled={isScrolled} />
            <ThemeToggle />
          </div>

          <div className="lg:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors duration-500 ${isScrolled || isMenuOpen ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'} hover:bg-gray-100/20 dark:hover:bg-gray-800/20 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500`}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden fixed top-0 right-0 min-h-screen w-64 bg-white/90 dark:bg-gray-900/40 backdrop-blur-xl shadow-lg"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none transition-colors duration-500"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
              <MobileNavLink href="/" label="Home" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/project" label="Projects" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/experience" label="Experience" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/skill" label="Skills" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/blog" label="Blog" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/about" label="About" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/contact" label="Contact" onClick={() => setIsMenuOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ href, label, isScrolled }: { href: string; label: string; isScrolled: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Link 
        href={href} 
        className={`px-3 py-3 rounded-md text-lg font-medium transition-all duration-500 ${
          isActive 
            ? 'text-gray-600 dark:text-gray-300 bg-gray-100/50 dark:bg-gray-800/50'
            : isScrolled 
              ? 'text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50' 
              : 'text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
        } hover:text-gray-700 dark:hover:text-gray-300`}
      >
        {label}
      </Link>
    </motion.div>
  );
};

const MobileNavLink = ({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => (
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <Link 
      href={href} 
      onClick={onClick} 
      className="block border-b overflow-y-auto border-gray-200 dark:border-gray-700 px-3 py-3 rounded-md text-lg font-medium text-gray-900 dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:text-gray-500 dark:hover:text-gray-300 transition-all duration-500"
    >
      {label}
    </Link>
  </motion.div>
);

export default Navbar;

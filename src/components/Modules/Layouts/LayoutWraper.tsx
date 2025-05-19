'use client'

import Footer from '@/components/Shared/Footer'
import Navbar from '@/components/Shared/Navbar'
import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';


const LayoutWraper = ({ children }: { children: React.ReactNode }) => {


    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className=' '>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default LayoutWraper

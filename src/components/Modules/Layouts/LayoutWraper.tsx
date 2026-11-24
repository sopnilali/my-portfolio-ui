'use client'

import Footer from '@/components/Shared/Footer'
import Navbar from '@/components/Shared/Navbar'
import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
import type { About } from '@/services/aboutService';
import type { MenuItem } from '@/services/menuService';

interface LayoutWraperProps {
    children: React.ReactNode;
    about?: About | null;
    menuItems?: MenuItem[];
}

const LayoutWraper = ({ children, about, menuItems }: LayoutWraperProps) => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className="relative min-h-screen">
            {/* Premium ambient background (shared by every page) */}
            <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.08)_1px,transparent_1px)] bg-[length:56px_56px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)]" />
                <div className="absolute -top-40 left-1/2 h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent/20 blur-[130px] dark:bg-accent/15" />
                <div className="absolute top-[55%] -left-40 h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[120px]" />
                <div className="absolute top-[30%] -right-40 h-[26rem] w-[26rem] rounded-full bg-muted-foreground/10 blur-[120px]" />
            </div>

            {/* Main content */}
            <div className="relative z-10 ">
                <Navbar about={about} menuItems={menuItems} />
                {children}

                <Footer />
            </div>
        </div>
    )
}

export default LayoutWraper

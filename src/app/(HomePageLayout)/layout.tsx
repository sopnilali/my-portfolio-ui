import Footer from '@/components/Shared/Footer'
import Navbar from '@/components/Shared/Navbar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {

    
    return (
        <div className=' '>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default Layout

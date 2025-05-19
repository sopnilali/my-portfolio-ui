import LayoutWraper from '@/components/Modules/Layouts/LayoutWraper'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {

    
    return (
        <LayoutWraper>
            {children}
        </LayoutWraper>
    )
}

export default Layout

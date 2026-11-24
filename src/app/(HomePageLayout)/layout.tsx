import LayoutWraper from '@/components/Modules/Layouts/LayoutWraper'
import { getAboutList, type About } from '@/services/aboutService'
import { getMenuItems } from '@/services/menuService'
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
    let about: About | null = null;
    try {
        const aboutList = await getAboutList();
        about = aboutList[0] ?? null;
    } catch {
        about = null;
    }

    const menuItems = await getMenuItems();

    return (
        <LayoutWraper about={about} menuItems={menuItems}>
            {children}
        </LayoutWraper>
    )
}

export default Layout

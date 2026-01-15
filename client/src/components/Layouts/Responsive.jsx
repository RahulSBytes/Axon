import React, { useEffect, useState } from 'react'
import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';

function ResponsiveLayout() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); 
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    return isMobile ? <MobileLayout /> : <DesktopLayout />
}

export default ResponsiveLayout
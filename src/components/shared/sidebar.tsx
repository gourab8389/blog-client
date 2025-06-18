import { cn } from '@/lib/utils';
import React from 'react'

interface SidebarProps {
        className?: string;
}

const Sidebar = (
        { className }: SidebarProps
) => {
  return (
    <div className={cn("bg-blue-50/50", className)}>
      
    </div>
  )
}

export default Sidebar;

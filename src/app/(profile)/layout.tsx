import Sidebar from '@/components/profile/ui/sidebar/Sidebar'
import React from 'react'

const ProfileLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className="flex min-h-screen">
        <Sidebar/>
        {children}
    </div>
  )
}

export default ProfileLayout
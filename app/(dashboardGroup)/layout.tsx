import { Navbar } from '@/components/shared/Navbar'
import { getProfile } from '@/service/getProfile'
import React from 'react'

const DashboardLayout = async({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const user=await getProfile()
  return <div>
    <Navbar user={user}/>
    {children}
  </div>
}

export default DashboardLayout

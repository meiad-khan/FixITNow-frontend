import Footer from '@/components/shared/Footer'
import { Navbar } from '@/components/shared/Navbar'
import { getProfile } from '@/service/getProfile'
import React from 'react'

const PublicLayout =async ({
        children
    } : {
        children: React.ReactNode
    }
) => {
  const user = await getProfile();
  return (
    <div>
      <Navbar user={user} />
      {children}
      <Footer/>
    </div>
  )
}

export default PublicLayout

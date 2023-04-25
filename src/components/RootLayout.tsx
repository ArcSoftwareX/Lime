import { Outlet } from 'react-router-dom'
import Toolbar from './Toolbar'
import { useState } from 'react'


const RootLayout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  return (
    <main className='h-screen w-screen bg-neutral-900 rounded-lg overflow-hidden'>
      <Toolbar setSidebarVisible={setSidebarVisible} />
      <Outlet context={{ sidebarVisible }} />
    </main>
  )
}

export default RootLayout
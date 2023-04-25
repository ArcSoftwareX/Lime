import { appWindow } from '@tauri-apps/api/window'
import { Dispatch, SetStateAction } from 'react'

const Toolbar = ({ setSidebarVisible }: { setSidebarVisible: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <header className="fixed top-0 inset-x-0 h-toolbar flex items-center px-3 justify-center text-white rounded-t-lg z-50" data-tauri-drag-region>
      <div className="flex items-center absolute inset-y-0 left-5">
        <button onClick={() => appWindow.close()} className="h-3 w-3 rounded-full bg-red-500 border border-red-700 mr-2"></button>
        <button onClick={() => appWindow.minimize()} className="h-3 w-3 rounded-full bg-yellow-500 border border-yellow-700 mr-2"></button>
        <button onClick={() => appWindow.toggleMaximize()} className="h-3 w-3 rounded-full bg-green-500 border border-green-700 mr-4"></button>
        {/* <button onClick={() => setSidebarVisible(prev => !prev)} className='p-2 rounded-md hover:bg-neutral-500/10 text-white/50 hover:text-white/70 transition-colors'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-[18px] h-[18px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
        </button> */}
      </div>
      {/* <span className="text-sm font-medium">
        <button disabled className='bg-neutral-600/10 hover:bg-neutral-500/10 py-1.5 px-2 rounded-md text-[13px] outline-none min-w-[350px] flex items-center justify-center text-white/50 hover:text-white/70 transition-colors disabled:bg-transparent disabled:text-white/40 pointer-events-none'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-4 h-4 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          Search Lime
        </button>
      </span> */}
    </header>
  )
}

export default Toolbar
import { memo, useEffect, useState } from "react"
import { Tab } from "../lib/interfaces"
import ReactCodeMirror from "@uiw/react-codemirror"
import { json } from "@codemirror/lang-json"
import { AnimatePresence, motion } from 'framer-motion'
import { color } from "@uiw/codemirror-extensions-color"
import { tabsStore } from "../stores/tabs"
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night"
import { Response } from '@tauri-apps/api/http'
import useKeyPress from "../hooks/useKeyPress"
import toast from "react-hot-toast"
import jsBeautify from 'js-beautify'
import { useStore } from "@nanostores/react"

const tabs = [
  "Data",
  "Headers"
]

const toastOptions = {
  style: {
    borderRadius: '90px',
    background: '#333',
    color: '#fff',
    padding: '5px 15px',
    fontSize: '14px'
  },
}

const ResponseView = ({ id }: { id: string }) => { 
  const [tab, setTab] = useState<Tab | null>(null)
  const userTabs = useStore(tabsStore)
  const [currentTab, setCurrentTab] = useState(tabs[0])
  const [selectedData, setSelectedData] = useState<{ title: string, content: string } | null>(null)
  const escPress = useKeyPress('Escape')

  useEffect(() => {
    setTab(userTabs.tabs.get(id)!)
  }, [id])

  useEffect(() => {
    escPress ? setSelectedData(null) : null
  }, [escPress])

  const copySelectedToClipboard = () => {
    if(selectedData !== null && navigator.clipboard) navigator.clipboard.writeText(JSON.stringify(selectedData)).then(() => toast.success('Copied!', toastOptions))
    else toast.error('Failed to copy', toastOptions)
  }

  const copyAllHeaders = () => {
    if(navigator.clipboard) navigator.clipboard.writeText(JSON.stringify(tab?.response?.headers)).then(() => toast.success('Copied!', toastOptions))
    else toast.error('Failed to copy', toastOptions)
  }

  const copyResponseData = () => {
    if(navigator.clipboard) navigator.clipboard.writeText(tab?.response?.data ? tab?.response?.data as string : '').then(() => toast.success('Copied!', toastOptions))
    else toast.error('Failed to copy', toastOptions)
  }

  return <>
    { tab?.response && <>
        <div className="py-2.5 px-3.5 flex text-sm rounded-lg border border-white/10 mb-2">
          {
            tabs.map(t => <div key={t} onClick={() => setCurrentTab(t)} className={["transition mr-3.5 font-semibold cursor-pointer", t === currentTab ? 'text-blue-500' : 'text-white/70'].join(' ')}>{ t }</div>)
          }
          <span className="flex flex-1"></span>
          <div className="text-white/60">
            Status: { tab.response.status }
          </div>
        </div>
        { currentTab === 'Data' && <div className='border border-white/10 rounded-lg overflow-y-scroll scrollbar-fix bg-[#1a1b26] relative' style={{ height: `calc(100vh - 240px)` }}>
          <div className="absolute top-2.5 right-2.5 opacity-70 hover:opacity-90 z-10">
            <button onClick={copyResponseData} className="opacity-60 hover:opacity-80 ml-2 p-2 rounded-lg hover:bg-white/10 hover:backdrop-blur transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
              </svg>
            </button>
          </div>
         <ReactCodeMirror basicSetup={{ foldGutter: false }} extensions={[json(), color]} editable={false} value={tab?.response ? jsBeautify(tab?.response.data as string, { indent_size: 2, preserve_newlines: false, jslint_happy: true }) : ''} theme={tokyoNight} />
        </div> }
        { currentTab === 'Headers' && <div className='p-3.5 rounded-lg bg-neutral-800/50 border border-white/10 scrollbar-fix overflow-y-scroll' style={{ maxHeight: 'calc(100vh - 240px)' }}>{ tab?.response.headers &&
            Object.keys(tab?.response.headers).map(val => <motion.div key={val} onClick={() => setSelectedData({ title: val, content: tab?.response?.headers[val] ? tab?.response.headers[val] : '' })} className='flex justify-between px-3 py-1.5 w-full text-sm text-white/80 hover:bg-white/10 rounded-lg transition-colors hover:text-white cursor-pointer'>
              <div>{ val }</div>
              <div className='text-right whitespace-nowrap max-w-[70%] overflow-hidden text-ellipsis'>{ tab?.response?.headers[val] }</div>
            </motion.div>)}
            <div className="w-full text-center pt-2">
              <button className="text-xs px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-semibold" onClick={copyAllHeaders}>Copy all headers</button>
            </div>
        </div> }
      </> }
    { !tab?.response && <div className='border border-white/10 rounded-lg overflow-y-scroll scrollbar-fix p-4 text-sm font-semibold text-white/60'>No response</div> }
    <AnimatePresence>
      { selectedData && <motion.div variants={{ visible: { backdropFilter: 'blur(10px)', opacity: 1 }, hidden: { backdropFilter: 'blur(0px)', opacity: 0 } }} initial='hidden' animate='visible' exit='hidden' className='fixed inset-0 bg-black/10 flex items-center justify-center' onClick={() => setSelectedData(null)}>
         <motion.div variants={{ visible: { scale: 1 }, hidden: { scale: 0.8 } }} transition={{ duration: 0.4, ease: 'easeInOut' }} initial='hidden' animate='visible' exit='hidden' className='p-4 pr-16 rounded-lg bg-neutral-800 relative max-w-md' onClick={e => e.stopPropagation()}>
            <button className='absolute top-4 right-4' onClick={() => setSelectedData(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h1 className='font-semibold text-lg mb-3 flex items-center'>
              { selectedData.title }
              <button onClick={copySelectedToClipboard} className="opacity-60 hover:opacity-80 ml-2 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>
              </button>
            </h1>
            <p className="text-sm text-white/70 break-all">{ selectedData.content }</p>
          </motion.div> 
      </motion.div> }
    </AnimatePresence>
  </>
}

export default ResponseView
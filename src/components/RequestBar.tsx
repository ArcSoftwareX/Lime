import { useEffect, useState, KeyboardEvent } from "react"
import { motion } from "framer-motion"
import { Tab, methods } from "../lib/interfaces"
import { updateTabMethod } from "../stores/tabs"
// import * as Select from "@radix-ui/react-select"
// import { updateTabMethod } from '../stores/tabs'

const RequestBar = ({ makeRequest, handleKeyPress, tab, changeUrl, id }: { makeRequest: () => void, changeUrl: (value: string) => void, handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void, tab: Tab, id: string }) => {
    const [selectVisible, setSelectVisible] = useState(false)
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {
      setCurrentUrl(tab.url)
      setSelectVisible(false)
    }, [tab])

    useEffect(() => {
      changeUrl(currentUrl)
    }, [currentUrl])
  return (
    <div className='w-full border border-white/10 flex items-stretch rounded-lg text-sm text-white relative overflow-hidden'>
        <div className={["h-11 bg-neutral-500/10 transition-colors font-medium flex items-center group outline-none rounded-l-lg", selectVisible ? 'px-0' : 'px-4 hover:bg-white/10'].join(' ')} onClick={e => {setSelectVisible(prev => !prev); e.stopPropagation()}}>
          <motion.div initial='hidden' animate={ selectVisible ? 'visible' : 'hidden' } variants={{ hidden: { opacity: 0, width: 0, pointerEvents: 'none' }, visible: { opacity: 1, width: 'fit-content', pointerEvents: 'auto' } }} transition={{ ease: 'easeInOut' }} className={["h-full rounded-lg flex items-center", selectVisible ? 'p-1.5' : 'px-0'].join(' ')}>
            { methods.map((val, i) => <motion.button initial='hidden' animate={selectVisible ? 'visible' : 'hidden'} variants={{ hidden: { y: 60, scale: 0.7 }, visible: { y: 0, scale: 1 } }} transition={{ duration: 0.1 * (i + 1) }} onClick={() => {updateTabMethod(id, val); setTimeout(() => setSelectVisible(false), 10)}} key={val} className={["outline-none rounded-lg transition-colors font-semibold last:mb-0 text-xs mr-2 px-5 h-8", val === tab.method ? 'bg-blue-500' : 'hover:bg-white/10'].join(' ')}>
              {val}
            </motion.button>) }
          </motion.div>
          <motion.div initial='visible' animate={ selectVisible ? 'hidden' : 'visible' } variants={{ hidden: { opacity: 0, width: 0 }, visible: { opacity: 1, width: 'fit-content' } }} className="text-left">{ tab.method }</motion.div>
        </div>

        <div className="w-full h-full flex">
          <input onKeyDown={handleKeyPress} type='text' placeholder='Enter URL...' className='px-5 py-3 w-full placeholder:text-white/30 bg-transparent outline-none' onChange={(e) => setCurrentUrl(e.currentTarget.value)} value={currentUrl} />
          <motion.button onClick={makeRequest} className="h-full px-5 py-3 rounded-r-lg bg-blue-500 font-semibold active:bg-blue-600 transition-colors duration-150" animate={ tab.url.trim().length > 0 && tab.valid && !tab.isLoading ? 'enable': 'disable' } variants={{ disable: { opacity: 0.7, pointerEvents: 'none' }, enable: { opacity: 1, pointerEvents: 'auto' } }} >{ tab.isLoading ? "Sending" : "Send" }</motion.button>
        </div>
    </div>
  )
}

export default RequestBar
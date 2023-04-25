import { useRef } from "react"
import TabView from "./components/TabView"
import { AnimatePresence, Reorder } from "framer-motion"
// import { Tab } from "./lib/interfaces"
// import { invoke } from "@tauri-apps/api/tauri"
import { useStore } from "@nanostores/react"
import { setCurrentTab, tabsStore, createTab, closeTab } from "./stores/tabs"
// import SideBar from "./components/SideBar"
// import { useOutletContext } from "react-router-dom"

function App() {
  const tabs = useStore(tabsStore)
  const end = useRef<HTMLSpanElement>(null)
  // const { sidebarVisible } = useOutletContext() as { sidebarVisible: boolean }

  const updateTabsHandler = (newReorder: string[]) => {
    let newVal = new Map()
    newReorder.forEach(val => {
      newVal.set(val, tabs.tabs.get(val)!)
    })
    tabsStore.setKey('tabs', newVal)
  }

  return (
    <main className="h-full w-full flex justify-stretch">
      {/* <SideBar opened={sidebarVisible}/> */}
      <div className="h-full w-full flex flex-col text-white relative pt-toolbar">
        <div className="flex p-4 pb-0">
          <Reorder.Group as="ul" axis="x" onReorder={updateTabsHandler} values={Array.from(tabs.tabs.keys())} className="overflow-x-scroll scrollbar-fix max-w-full w-full flex pb-1 overflow-y-visible">
            <AnimatePresence>
              { Array.from(tabs.tabs.keys()).map((key: string) => {
                const tab = tabs.tabs.get(key)!
                return <Reorder.Item onClick={() => setCurrentTab(key)} value={key} initial={{ opacity: 0, y: 40, paddingLeft: 0, paddingRight: 0 }} exit={{ opacity: 0, y: -40, paddingLeft: 0, paddingRight: 0 }} animate={{ opacity: 1, y: 0, paddingLeft: 12, paddingRight: 12 }} key={key} className={['h-10 w-full text-xs font-medium flex items-center justify-center relative px-3 min-w-0 group max-w-xs rounded-lg whitespace-nowrap border border-transparent transition-colors', key === tabs.current ? 'bg-neutral-800' : ''].join(' ')} style={{ flex: '0 0 250px' }}>
                  <span className="max-w-[175px] overflow-hidden text-ellipsis whitespace-nowrap text-center">{ tab.name }</span>
                  <div onClick={e => {e.stopPropagation(); closeTab(key)}} className="absolute right-3 text-white/50 opacity-0 group-hover:opacity-100 transition hover:text-white/70">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </Reorder.Item>
              }) }
            </AnimatePresence>
            <span ref={end}></span>
          </Reorder.Group>
          { tabs.tabs.size > 0 && <button onClick={createTab} className="ml-3 h-full opacity-60 hover:opacity-80 transition-opacity"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.1} stroke="currentColor" className="w-5 h-5 -translate-y-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button> }
        </div>
        <div className="h-full w-full p-4 pt-0">
          { tabs.tabs.size > 0 && <TabView id={tabs.current} tab={tabs.tabs.get(tabs.current)!} /> }
          { tabs.tabs.size === 0 && <div className="absolute inset-0 h-full w-full flex items-center justify-center text-white/50 font-semibold text-sm">You have no tabs opened. <button onClick={async () => createTab()} className="text-blue-500 ml-1">Create new tab</button></div> }
        </div>
      </div>
    </main>
  )
}

export default App
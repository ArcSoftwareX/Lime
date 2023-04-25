import { useState } from 'react'
import { Tab } from '../lib/interfaces'
import { motion } from 'framer-motion'
import * as ContextMenu from '@radix-ui/react-context-menu';

const CollectionCard = ({ data }: { data: { id: string, name: string, tabs: Tab[] } }) => {
    const [expanded, setExpanded] = useState(false)
    return <ContextMenu.Root>
        <ContextMenu.Trigger>
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} onClick={() => data.tabs.length > 0 ? setExpanded(prev => !prev) : setExpanded(false)} className={["rounded-lg px-3 py-2 w-full text-sm font-medium cursor-pointer transition-colors mb-1", expanded ? 'bg-neutral-500/10 text-white/70': 'hover:bg-neutral-500/10 text-white/50 hover:text-white/70'].join(' ')}>
                <div className="flex items-center justify-between">
                    <div className="whitespace-nowrap">{ data.name }</div>
                    <div className="text-white/40 whitespace-nowrap">{ data.tabs.length > 0 ? data.tabs.length : 'No' } tabs</div>
                </div>
                { expanded ? <motion.div initial={{ opacity: 0, height: 0, paddingTop: 0 }} animate={{ opacity: 1, height: 'fit-content', paddingTop: 4 }}></motion.div> : null }
            </motion.div>
        </ContextMenu.Trigger>
        <ContextMenu.Portal>
            <ContextMenu.Content className='min-w-[220px] bg-neutral-500/10 backdrop-blur rounded-lg p-1 text-white'>
                <ContextMenu.Item className='rounded-md px-2.5 h-8 hover:bg-blue-500 mb-1 text-sm cursor-pointer transition-colors flex items-center'>
                    <button className='mr-2 opacity-60'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                    Add Tab
                </ContextMenu.Item>
                <ContextMenu.Item className='rounded-md px-2.5 py-1.5 hover:bg-blue-500 text-sm cursor-pointer transition-colors flex items-center'>
                    <button className='mr-2 opacity-60'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                    Remove
                </ContextMenu.Item>
            </ContextMenu.Content>
        </ContextMenu.Portal>
    </ContextMenu.Root>
}

export default CollectionCard
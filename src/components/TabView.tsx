import RequestBar from './RequestBar'
import ResponseView from './ResponseView'
import { Tab } from '../lib/interfaces'
import { KeyboardEvent } from 'react'
import { makeRequest, updateTabUrl } from '../stores/tabs'

const TabView = ({ tab, id }: { tab: Tab, id: string }) => {
  const changeUrl = (url: string) => {
    updateTabUrl(id, url)
  }
    
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.code === 'Enter') makeRequestHandler()
  }
    
  const makeRequestHandler = () => {
    if(tab.url.trim().length > 0 && tab.valid)
    makeRequest(id)
  }
  return (
    <>
      <div className='mb-4'>
        <RequestBar id={id} makeRequest={makeRequestHandler} changeUrl={changeUrl} tab={tab} handleKeyPress={handleKeyPress}/>
      </div>
      <ResponseView id={id}/>
    </>
  )
}

export default TabView
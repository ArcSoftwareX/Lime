import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './components/RootLayout'
import { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion'

window.addEventListener('contextmenu', e => e.preventDefault())

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path='' element={<App />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </motion.div>
    
    <Toaster />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import "flowbite"

import  "../src/assets/main.css"
import RouterConfig from './config/router.config'


//ReactDOM.createRoot(document.getElementById('root')!).render(
  const elem =ReactDOM .createRoot(document.getElementById('root')!)
  elem.render(
  <React.StrictMode>
   <RouterConfig/>
  </React.StrictMode>
)

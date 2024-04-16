import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import {StateProvider} from './context/StateContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider>
        <Routes>
          <Route path='/*' element={<App/>}/>  
        </Routes>
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

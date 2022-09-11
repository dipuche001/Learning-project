import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' 
import SearchResults from './SearchResults'
import './index.css'
import {BrowserRouter as Router , Route ,Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Router >
     <Routes>
      <Route path='/' element = {<App/>} /> 
      <Route path='/search/:field' element = {<SearchResults/>} /> 
     </Routes>
   </Router>

  </React.StrictMode>
)

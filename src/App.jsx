import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Movies from "./Routes/Movies"
import Series from "./Routes/Series"
import SelectionPage from "./Routes/SelectionPage"
import './App.css'

function App() {
  
  return (
    <nav>
      <Link to="/movies">Movies</Link>
      <Link to="/series">Series</Link>

      <Routes>
        <Route exact path='/' element= { <SelectionPage />} />
        <Route path='movies' element={ <Movies /> } />
        <Route path='series' element={ <Series /> } />
      </Routes>
    </nav>
  )
}

export default App
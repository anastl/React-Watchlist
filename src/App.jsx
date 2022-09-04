import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Movies from "./Routes/Movies"
import Series from "./Routes/Series"
import Watchlist from "./Routes/Watchlist"
import './App.css'

function App() {
  
  return (
    <>
      <nav>
        <Link to="/movies">Movies</Link>
        <Link to="/series">Series</Link>
        <Link to="/watchlist">My Watchlist</Link>
      </nav>

      <Routes>
        <Route exact path="/" element = { <h1>Working on it</h1> } />
        <Route path='watchlist' element= { <Watchlist />} />
        <Route path='movies' element={ <Movies /> } />
        <Route path='series' element={ <Series /> } />
      </Routes>
    </>
  )
}

export default App
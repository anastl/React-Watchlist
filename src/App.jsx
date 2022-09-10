import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Movies from "./Routes/Movies"
import Series from "./Routes/Series"
import Watchlist from "./Routes/Watchlist"
import MoviesAndSeries from "./Routes/MoviesAndSeries"
import './App.css'

function App() {
  
  return (
    <>
      <nav>
        <Link to="/search">Search</Link>
        <Link to="/watchlist">My Watchlist</Link>
      </nav>

      <Routes>
        <Route exact path="/" element = { <h1>Working on it</h1> } />
        <Route path='watchlist' element= { <Watchlist />} />
        <Route exact path='search/*' element={ <MoviesAndSeries /> } />
      </Routes>
    </>
  )
}

export default App
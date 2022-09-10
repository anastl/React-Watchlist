import { Link, Routes, Route } from 'react-router-dom'
import Watchlist from "./Routes/Watchlist"
import MoviesAndSeries from "./Routes/MoviesAndSeries"
import DetailedMovie from "./Components/DetailedMovie"
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
        <Route exact path='search/' element={ <MoviesAndSeries /> } />
        <Route path='search/:mediaId' element={ <DetailedMovie /> } />
      </Routes>
    </>
  )
}

export default App
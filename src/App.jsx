import { Link, Routes, Route } from 'react-router-dom'
import Watchlist from "./Routes/Watchlist"
import MoviesAndSeries from "./Routes/MoviesAndSeries"
import DetailedMedia from "./Components/DetailedMedia"
import './App.css'

function App() {
  
  return (
    <>
      <nav>
        <Link to="/search">Search</Link>
        <Link to="/watchlist">My Watchlist</Link>
      </nav>

      <Routes>
        <Route exact path="/*" element = { <MoviesAndSeries /> } />
        <Route path='watchlist/' element= { <Watchlist />} />
        <Route exact path='search/' element={ <MoviesAndSeries /> } />
        <Route path='search/:mediaId' element={ <DetailedMedia /> } />
      </Routes>
    </>
  )
}

export default App
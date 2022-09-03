import { useState } from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import Movies from "./Routes/Movies"
import Series from "./Routes/Series"
import SelectionPage from "./Routes/SelectionPage"
import './App.css'

function App() {
  
  return (
    <nav>
      <Link to="/movies">Movies</Link>
      <Link to="/series">Series</Link>

      <Switch>
        <Route exact path='/' element= { <SelectionPage />} />
        <Route path='movies' element={ <Movies /> } />
        <Route path='series' element={ <Series /> } />
    </Switch>
    </nav>
  )
}

export default App
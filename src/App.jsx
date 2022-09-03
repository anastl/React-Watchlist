import { useState } from 'react'
import { Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <nav>
      <Link to="/movies">Movies</Link>
      <Link to="/series">Series</Link>
    </nav>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import MovieListing from './pages/MovieListing'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<MovieListing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

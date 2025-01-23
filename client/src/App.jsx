import './css/App.css'
import Home from './pages/Home'
import Favourites from './pages/Favourites'
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/Navbar'

function App() {
  const photoNumber = 1

  return (
    <div>
      <NavBar />
      <main className="main-content">
        <div></div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/favourites' element={<Favourites />}></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App

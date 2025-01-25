import './css/App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Favourites from './pages/Favourites'
import NavBar from './components/Navbar'
import { PhotoProvider } from './contexts/PhotoContext'

function App() {

  return (
    <PhotoProvider>
      <NavBar />
      <main className="main-content">
        <div></div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/favourites' element={<Favourites />}></Route>
        </Routes>
      </main>  
    </PhotoProvider>
  )
}

export default App

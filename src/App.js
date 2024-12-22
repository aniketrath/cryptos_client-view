import {
  ThemeToggle,
  Navbar
} from './components/index'
import {
  Dashboard,
  Market,
  Stats
} from './pages'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

export default function App() {
  return (
    <div className='p-5 font-jetbrains'>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Dashboard />} />
          <Route path='market' element={<Market />} />
          <Route path='details' element={<Stats />} />
        </Routes>
      </BrowserRouter>
      <ThemeToggle />
    </div>

  )
}
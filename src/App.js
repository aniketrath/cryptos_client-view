import {
  ThemeToggle,
  Navbar
} from './components/index'

import { Dashboard } from './pages'

export default function App() {
  return (
    <div className='p-5 font-jetbrains'>
      <Navbar />
      <ThemeToggle />
      <Dashboard/>
    </div>

  )
}
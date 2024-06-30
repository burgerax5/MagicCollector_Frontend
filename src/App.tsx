import Header from './components/Header/Header'
import { Outlet } from "react-router-dom"
import './styles/main.css'

function App() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App

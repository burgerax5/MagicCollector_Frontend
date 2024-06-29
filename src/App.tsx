import Header from './components/Header/Header'
import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App

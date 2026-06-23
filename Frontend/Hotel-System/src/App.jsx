import { BrowserRouter, Outlet } from "react-router"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Home from "./Components/Home"

function App() {

  return (
    <>

      <Header />



      <Outlet />

      <Footer />
    </>
  )
}

export default App

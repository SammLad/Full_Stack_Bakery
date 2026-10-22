import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import EsCakeForm from "./pages/EsCakeForm"
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto px-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/pedidos/agregar" element={<EsCakeForm />} />
          <Route path="/pedidos/:id" element={<EsCakeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App


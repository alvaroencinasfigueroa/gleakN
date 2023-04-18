import './App.css'
import { RegistroEntradaSalidaVe } from './components/RegistroEntradaSalidaVe'
import { IniciarSesion } from './components/IniciarSesion'
import { PantallaInicio } from './components/PantallaInicio'
import { RegistrarAdmi } from './components/RegistrarAdmi'
import RegistroUsuarioVehiculo from './components/RegistrarUsuarioVehiculo'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
//import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PantallaInicio />} />
          <Route path="/registraradmi" element={<RegistrarAdmi />}></Route>
          <Route path="/iniciarsesion" element={<IniciarSesion />}></Route>
          <Route path="/entradasalida" element={<RegistroEntradaSalidaVe />} />
          <Route path="/registro" element={<RegistroUsuarioVehiculo />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

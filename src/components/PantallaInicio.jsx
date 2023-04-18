import React from 'react'
import './PantallaInicio.css'
//import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export const PantallaInicio = () => {
  return (
    <body>
      <container>
        <h1 className='titulo'>PARQUEO UMSS</h1>
      </container>
      <div>
        <Link to="/registraradmi">
          <button className="botonRegistro">REGISTRARSE</button>
        </Link>
      </div>
      <div>
        <Link to="/iniciarsesion">
          <button className="botonSesion">INICIAR SESIÓN</button>
        </Link>
      </div>
    </body>
  )
}

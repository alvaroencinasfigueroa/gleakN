import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'

export const RegistroEntradaSalidaVe = () => {
  const baseUrl = 'http://localhost:80/api/index1.php'
  const [data, setData] = useState([]);
  const [activo, setActivo] = useState('activo');
  const [clienteSeleccionado, setClienteSeleccionado] = useState({
    id: '',
    nombrecliente: '',
    ci: '',
    celularCliente: '',
    tipoCliente: '',
    vehiculoCliente: '',
  });

const handleClick = () => {
    if(activo === 'activo'){
        setActivo('inactivo');
    }else{
        setActivo('activo');
    }
}

  const peticionGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    peticionGet()
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE CLIENTE</th>
            <th>CI</th>
            <th>CELULAR</th>
            <th>Cliente CLIENTE</th>
            <th>VEHICULO CLIENTE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((clienteSeleccionado) => (
            <tr key={clienteSeleccionado.id}>
              <td>{clienteSeleccionado.id}</td>
              <td>{clienteSeleccionado.nombrecliente}</td>
              <td>{clienteSeleccionado.ci}</td>
              <td>{clienteSeleccionado.celularCliente}</td>
              <td>{clienteSeleccionado.tipoCliente}</td>
              <td><Button>VER</Button></td>
              <td><Button onClick={handleClick}>{activo}</Button></td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    setClienteSeleccionado(clienteSeleccionado, 'Editar')
                  }
                >
                  Editar
                </button>{' '}
                {'  '}
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    setClienteSeleccionado(clienteSeleccionado, 'Eliminar')
                  }
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

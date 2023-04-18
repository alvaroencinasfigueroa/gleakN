import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axios from 'axios'
import './RegistrarUsuarioVehiculo.css';

function RegistrarUsuarioVehiculo() {
  const baseUrl = 'http://localhost:80/api/'
  const [data, setData] = useState([])
  const [modalInsertar, setModalInsertar] = useState(false)
  const [modalEditar, setModalEditar] = useState(false)
  const [modalEliminar, setModalEliminar] = useState(false)
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState({
    id: '',
    placa: '',
    marca: '',
    modelo: '',
    color: '',
    nombreCliente: '',
  })
  const [userName, setUserName] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setVehiculoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    console.log(vehiculoSeleccionado)
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar)
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar)
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar)
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

  const peticionPost = async () => {
    var f = new FormData()
    f.append('placa', vehiculoSeleccionado.placa)
    f.append('marca', vehiculoSeleccionado.marca)
    f.append('modelo', vehiculoSeleccionado.modelo)
    f.append('color', vehiculoSeleccionado.color)
    f.append('nombrecliente', vehiculoSeleccionado.nombreCliente)
    f.append('METHOD', 'POST')
    await axios
      .post(baseUrl, f)
      .then((response) => {
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  //esto es editar
  const peticionPut = async () => {
    var f = new FormData()
    f.append('placa', vehiculoSeleccionado.placa)
    f.append('marca', vehiculoSeleccionado.marca)
    f.append('modelo', vehiculoSeleccionado.modelo)
    f.append('color', vehiculoSeleccionado.color)
    f.append('nombrecliente', vehiculoSeleccionado.nombreCliente)
    f.append('METHOD', 'PUT')
    await axios
      .post(baseUrl, f, { params: { id: vehiculoSeleccionado.id } })
      .then((response) => {
        var dataNueva = data
        dataNueva.map((vehiculo) => {
          if (vehiculo.id === vehiculoSeleccionado.id) {
            vehiculo.placa = vehiculoSeleccionado.placa
            vehiculo.marca = vehiculoSeleccionado.marca
            vehiculo.modelo = vehiculoSeleccionado.modelo
            vehiculo.color = vehiculoSeleccionado.color
            vehiculo.nombreCliente = vehiculoSeleccionado.nombreCliente
          }
        })
        setData(dataNueva)
        abrirCerrarModalEditar()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const peticionDelete = async () => {
    var f = new FormData()
    f.append('METHOD', 'DELETE')
    await axios
      .post(baseUrl, f, { params: { id: vehiculoSeleccionado.id } })
      .then((response) => {
        setData(
          data.filter((vehiculo) => vehiculo.id !== vehiculoSeleccionado.id),
        )
        abrirCerrarModalEliminar()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const seleccionarVehiculo = (vehiculo, caso) => {
    setVehiculoSeleccionado(vehiculo)

    caso === 'Editar' ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  useEffect(() => {
    peticionGet()
  }, [])

  useEffect(() => {
    axios
      .get('http://localhost:80/api/index2.php')
      .then((response) => {
        setUserName(response.data.nombre)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className='contenedor' style={{ textAlign: 'center' }}>
      <br />
      <button
        className="btn btn-success" style={{backgroundColor: '#e36918',borderColor: '#e36918'}}
        onClick={() => abrirCerrarModalInsertar()}
      >
        Insertar Vehículo Cliente
      </button>
      <br />
      <br />
      <div>{<p>Bienvenido:{userName}</p>}</div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>PLACA</th>
            <th>MARCA</th>
            <th>MODELO</th>
            <th>COLOR</th>
            <th>NOMBRE CLIENTE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((vehiculo) => (
            <tr key={vehiculo.id}>
              <td>{vehiculo.id}</td>
              <td>{vehiculo.placa}</td>
              <td>{vehiculo.marca}</td>
              <td>{vehiculo.modelo}</td>
              <td>{vehiculo.color}</td>
              <td>{vehiculo.nombreCliente}</td>
              <td>
                <button
                  className="btn btn-primary" style={{backgroundColor: '#e6962e',borderColor: '#e6962e'}}
                  onClick={() => seleccionarVehiculo(vehiculo, 'Editar')}
                >
                  Editar
                </button>{' '}
                {'  '}
                <button
                  className="btn btn-danger" style={{backgroundColor: '#e36918',borderColor: '#e36918'}}
                  onClick={() => seleccionarVehiculo(vehiculo, 'Eliminar')}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>INSERTAR DATOS</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Placa: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="placa"
              onChange={handleChange}
            />
            <br />
            <label>Marca: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="marca"
              onChange={handleChange}
            />
            <br />
            <label>Modelo: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="modelo"
              onChange={handleChange}
            />
            <br />
            <label>Color: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="color"
              onChange={handleChange}
            />
            <br />
            <label>Nombre Cliente</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombreCliente"
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"  onClick={() => peticionPost()}>
            Insertar
          </button>
          {'   '}
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalInsertar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Framework</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombre"
              onChange={handleChange}
              value={vehiculoSeleccionado && vehiculoSeleccionado.nombre}
            />
            <br />
            <label>Marca: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="marca"
              onChange={handleChange}
              value={vehiculoSeleccionado && vehiculoSeleccionado.marca}
            />
            <br />
            <label>Modelo: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="modelo"
              onChange={handleChange}
              value={vehiculoSeleccionado && vehiculoSeleccionado.modelo}
            />
            <br />
            <label>Color: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="color"
              onChange={handleChange}
              value={vehiculoSeleccionado && vehiculoSeleccionado.color}
            />
            <br />
            <label>Nombre Cliente: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="nombreCliente"
              onChange={handleChange}
              value={vehiculoSeleccionado && vehiculoSeleccionado.nombreCliente}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()}>
            Editar
          </button>
          {'   '}
          <button
            className="btn btn-danger"
            onClick={() => abrirCerrarModalEditar()}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar el Vehículo{' '}
          {vehiculoSeleccionado && vehiculoSeleccionado.nombre}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default RegistrarUsuarioVehiculo

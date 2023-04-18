import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

export const RegistrarAdmi = () => {

  const navigate = useNavigate();
  const baseUrl = 'http://localhost:80/api/index2.php'
  const [data, setData] = useState([])
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    id: '',
    nombre: '',
    correo: '',
    password: '',
    celular: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    console.log(usuarioSeleccionado)
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
  
  const handleSubmit = async () => {
    //event.preventDefault();
    navigate("/registro");
    var f = new FormData()
    f.append('nombre', usuarioSeleccionado.nombre)
    f.append('correo', usuarioSeleccionado.correo)
    f.append('password', usuarioSeleccionado.password)
    f.append('celular', usuarioSeleccionado.celular)
    f.append('METHOD', 'POST')
    await axios
      .post(baseUrl, f)
      .then(response => {
        setData(data.concat(response.data))
        //abrirCerrarModalInsertar()
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    peticionGet()
  }, [])
  

  return (
    <Form onSubmit={handleSubmit} style={{backgroundColor: '#f8efae'}}>
      <Form.Group controlId="formBasicFirstName">
        <Form.Label>NOMBRE</Form.Label>
        <Form.Control
          type="text"
          placeholder="ENTER FIRST NAME"
          name="nombre"
          onChange={handleChange}
          value={usuarioSeleccionado && usuarioSeleccionado.nombre}
        />
      </Form.Group>

      <Form.Group controlId="formBasiccorreo">
        <Form.Label>CORREO</Form.Label>
        <Form.Control
          type="email"
          placeholder="ENTER EMAIL"
          name="correo"
          onChange={handleChange}
          value={usuarioSeleccionado && usuarioSeleccionado.correo}
        />
      </Form.Group>

      <Form.Group controlId="formBasicpassword">
        <Form.Label>CONTRASEÑA</Form.Label>
        <Form.Control
          type="password"
          placeholder="ENTER PASSWORD"
          name="password"
          onChange={handleChange}
          value={usuarioSeleccionado && usuarioSeleccionado.password}
        />
        <Form.Text className="text-muted">
          We'll never share your password with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>CELULAR</Form.Label>
        <Form.Control
          type="text"
          placeholder="CELULAR"
          name="celular"
          onChange={handleChange}
          value={usuarioSeleccionado && usuarioSeleccionado.celular}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}



import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./IniciarSesion.css";

export const IniciarSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("password:", password);
    // Aquí puedes agregar la lógica para enviar la información del formulario a tu backend
  };

  return (
    <Container className="login-form-container" style={{backgroundColor: '#f8efae'}}>
      <h2 className="text-center">Iniciar sesión</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="btn-login">
          Iniciar sesión
        </Button>
      </Form>
    </Container>
  );
};


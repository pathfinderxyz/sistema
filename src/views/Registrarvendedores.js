import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/sidebar";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";

export const RegistrarClientes = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    clave: "",
    telefono: "",
    rol: "usuario", // Valor por defecto
    status: "activo" // Valor por defecto
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre) newErrors.nombre = "Nombre es requerido";
    
    if (!formData.correo) {
      newErrors.correo = "Correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = "Correo no es válido";
    }
    
    if (!formData.clave) {
      newErrors.clave = "Contraseña es requerida";
    } else if (formData.clave.length < 8) {
      newErrors.clave = "La contraseña debe tener al menos 8 caracteres";
    }
    
    if (!formData.telefono) newErrors.telefono = "Teléfono es requerido";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setLoading(true);
      try {
        console.log(formData);
        // Aquí deberías poner tu endpoint real
        const response = await axios.post("https://apiportal.iaworks.xyz/public/registrarusuario", formData);
        console.log("Usuario registrado:", response.data);
        setSuccess(true);
        // Limpiar formulario después de éxito
        setFormData({
          nombre: "",
          correo: "",
          clave: "",
          telefono: "",
          rol: "usuario",
          status: "activo"
        });
      } catch (error) {
        console.error("Error al registrar usuario:", error);
        setErrors({ submit: error.response?.data?.message || "Error al registrar el usuario. Intente nuevamente." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Sidebar>
        <Card>
          <Card.Header className="bg-dark text-white" as="h5">
            <div className="row">
              <div className="col-md-6">Registrar Nuevo Usuario</div>
            </div>
          </Card.Header>
          <Card.Body>
            {success && (
              <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
                Usuario registrado exitosamente!
              </Alert>
            )}
            
            {errors.submit && (
              <Alert variant="danger" onClose={() => setErrors({...errors, submit: null})} dismissible>
                {errors.submit}
              </Alert>
            )}
            
            <Form onSubmit={handleSubmit}>
              {/* Sección de Información Básica */}
              <Row>
                <Col md={6}>
                  <Form.Group controlId="nombre" className="mb-3">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      isInvalid={!!errors.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nombre}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group controlId="telefono" className="mb-3">
                    <Form.Label>Teléfono *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      isInvalid={!!errors.telefono}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.telefono}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              
              {/* Sección de Contacto y Credenciales */}
              <Row>
                <Col md={6}>
                  <Form.Group controlId="correo" className="mb-3">
                    <Form.Label>Correo Electrónico *</Form.Label>
                    <Form.Control
                      type="email"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      isInvalid={!!errors.correo}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.correo}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group controlId="clave" className="mb-3">
                    <Form.Label>Contraseña *</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="clave"
                        value={formData.clave}
                        onChange={handleChange}
                        isInvalid={!!errors.clave}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <i className="fas fa-eye-slash"></i>
                        ) : (
                          <i className="fas fa-eye"></i>
                        )}
                      </Button>
                    </div>
                    <Form.Text className="text-muted">
                      Mínimo 8 caracteres
                    </Form.Text>
                    <Form.Control.Feedback type="invalid">
                      {errors.clave}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              
              {/* Sección de Rol y Estado */}
              <Row>
                <Col md={6}>
                  <Form.Group controlId="rol" className="mb-3">
                    <Form.Label>Rol</Form.Label>
                    <Form.Select
                      name="rol"
                      value={formData.rol}
                      onChange={handleChange}
                    >
                      <option value="usuario">Usuario</option>
                      <option value="admin">Administrador</option>
                      <option value="editor">Editor</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group controlId="status" className="mb-3">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="activo">Activo</option>
                      <option value="inactivo">Inactivo</option>
                      <option value="suspendido">Suspendido</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              <div className="d-grid gap-2 mt-4">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={loading}
                >
                  {loading ? 'Registrando...' : 'Registrar Usuario'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Sidebar>
    </div>
  );
};

export default RegistrarClientes;
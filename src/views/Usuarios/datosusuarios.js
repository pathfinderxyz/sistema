import React, { useState, useEffect} from "react";
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Sidebar from "../../components/sidebar";
import {Col,Row} from "reactstrap";

const url = "https://apiportal.iaworks.xyz/public/usuarios";

const DatosUsuarios = () => {

/////////////Mostrar datos//////////////////////////////////
const [users, setUsers] = useState([]);
const [data, setdata] = useState([]);


useEffect(() => {
  const loginUserJSON = window.localStorage.getItem('loginUser')
  if(loginUserJSON){
    const user= JSON.parse(loginUserJSON)
    setUsers(user);
  }
 }, []);
  
 useEffect(() => {
    axios.get(url+'/'+users.id).then(res => {
    if(res.data[0]) {
    setdata(res.data[0]); 
    }
   });
 }, [users]);

 console.log(data);

    return (
        <div>
            <div>
                <Sidebar>
                    <Card>
                        <Card.Header className="bg-dark text-white" as="h3">Mis Datos</Card.Header>
                        <Card.Body>
                            <Card.Title>Datos personales</Card.Title>
                            <Card.Text>
                                Esta informacion fue proporcionado por el administrador al registrarlo en el sistema.
                            </Card.Text>

                            <Row>
                                <Col xs={6} md={4}>
                                    <div className="form-group">
                                        <label>Codigo de usuario</label>
                                        <input
                                            className="form-control"
                                            readOnly
                                            type="text"
                                            name="codigo"
                                            value={data.id}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} md={4}>
                                    <div className="form-group">
                                        <label>Nombre de usuario</label>
                                        <input
                                            className="form-control"
                                            readOnly
                                            type="text"
                                            name="proveedor"
                                            value={data.nombre}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} md={4}>
                                    <div className="form-group">
                                        <label>Rol</label>
                                        <input
                                            className="form-control"
                                            readOnly
                                            type="text"
                                            name="usuario"
                                            value={data.rol}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6} md={4}>
                                <div className="form-group">
                                        <label>Status</label>
                                        <input
                                            className="form-control"
                                            readOnly
                                            type="text"
                                            name="status"
                                            value={data.status}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} md={4}>
                                    <div className="form-group">
                                        <label>Telefono</label>
                                        <input
                                            className="form-control"
                                            readOnly
                                            type="text"
                                            name="almacen"
                                            value={data.telefono}
                                        />
                                    </div>
                                </Col>
                                <Col xs={6} md={4}>
                                    <div className="form-group">
                                        <label>Correo Electronico</label>
                                        <input
                                            className="form-control"
                                            readOnly
                                            type="text"
                                            name="ubialmacen"
                                            value={data.correo}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            
                        </Card.Body>
                    </Card>
                </Sidebar>
            </div>
        </div>
    );
};

export default DatosUsuarios;
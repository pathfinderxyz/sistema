import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import "./../assets/css/sidebar.css";
import logolatingroup from "./../assets/img/logo_portal2.png";
import Accordion from "react-bootstrap/Accordion";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  let navigate = useNavigate();

  //////////////Datos de Usuario Logueado/////////////////////////
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loginUserJSON = window.localStorage.getItem("loginUser");
    if (loginUserJSON) {
      const user = JSON.parse(loginUserJSON);
      setUsers(user);
    }
  }, []);

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const handlelogout = () => {
    window.localStorage.removeItem("loginUser");
    navigate("/");
  };

  return (
    <div>
      {/* ---------------------------------------Navbar------------------------------------------------ */}
      <Nav className="justify-content-end Nav1" activeKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="link-1" className="nav-text-white">
            <FaIcons.FaUserAlt /> {users.nombre}
          </Nav.Link>
         
        </Nav.Item>
        <Nav.Item className="hide-on-mobile">

</Nav.Item>
        <Nav>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={<FaIcons.FaRegSun className="nav-text-white" />}
          >
            <NavDropdown.Item>
              <Link to="/usuarios/info" className="enlacenav nav-text-black">
                Mis datos
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/informacion" className="enlacenav nav-text-black">
                Informacion del sistema
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <p
                className="enlacenav nav-text-black"
                onClick={() => handlelogout()}
              >
                Salir
              </p>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Nav>
      {/* ---------------------------------------Sidebar------------------------------------------------ */}
      <div className="container_side">
        <div style={{ width: isOpen ? "220px" : "60px" }} className="sidebar">
          <div className="top_section">
          <a href="https://panel.avanticamerica.com/inicio" style={{ display: isOpen ? "block" : "none" }}>
  <h1 className="logo">
    <img src={logolatingroup} alt="some value" />
  </h1>
</a>
            <div
              style={{ marginLeft: isOpen ? "200px" : "0px" }}
              className="bars"
            >
              <FaIcons.FaBars onClick={toggle} className="bars-icon" />
            </div>
          </div>
          <div style={{ display: isOpen ? "block" : "none" }}>
            <div style={{ background: isOpen ? "#000" : "#edf1f5" }}>
              <Accordion className="acordion" defaultActiveKey="0">
                {users.rol === "cliente" && (
                  <Accordion.Item>
                    <Link to="/iniciouser" className="enlace">
                      <Accordion.Header>
                        <FaIcons.FaThLarge className="icon-spacing" /> Inicio
                      </Accordion.Header>
                    </Link>
                  </Accordion.Item>
                )}
                {users.rol === "admin" && (
                  <Accordion.Item>
                    <Link to="/inicio" className="enlace">
                      <Accordion.Header>
                        <FaIcons.FaThLarge className="icon-spacing" /> Inicio
                      </Accordion.Header>
                    </Link>
                  </Accordion.Item>
                )}
             
                 

                 {users.rol === "admin" && (
                  <Accordion.Item eventKey="30">
                    <Accordion.Header>
                      <FaIcons.FaUserTie className="icon-spacing" /> Usuarios
                    </Accordion.Header>

                    <Accordion.Body>
                      <Link to="/vendedores">Gestionar</Link>
                      <br></br>
                    </Accordion.Body>
                    <Accordion.Body>
                      <Link to="/registrarvendedores">Registrar Usuarios</Link>
                      <br></br>
                    </Accordion.Body>
                  </Accordion.Item>
                )}

              </Accordion>
            </div>
          </div>
        </div>

        <main>{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;

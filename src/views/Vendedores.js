import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Card from "react-bootstrap/Card";
import DataTable from "react-data-table-component";
import axios from "axios";
import * as FaIcons from "react-icons/fa";
import Cargando from "../components/cargando";
import { Modal, ModalBody, ModalHeader, ModalFooter, Badge, Form, FormGroup, Label, Input } from "reactstrap";
import SinPermisos from "./../components/sinpermisos";
import { CSVLink } from "react-csv";

const url = "https://apiportal.iaworks.xyz/public/usuarios";

const Vendedores = () => {
  //////////////Datos de Usuario Logueado/////////////////////////
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loginUserJSON = window.localStorage.getItem("loginUser");
    if (loginUserJSON) {
      const user = JSON.parse(loginUserJSON);
      setUsers(user);
    }
  }, []);

  //////////////Iniciando Status data//////////////////////////
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const [selectedVendedor, setSelectedVendedor] = useState(null);
  const [modalEditar, setModalEditar] = useState(false);
  const [editForm, setEditForm] = useState({
    nombre: "",
    clave: "",
    telefono: "",
    rol: "",
    status: ""
  });
  const [loadingEdit, setLoadingEdit] = useState(false);

  // Columnas para la tabla de vendedores
  const columns = [
    {
      name: "Acciones",
      cell: (row) => (
        <button 
          className="btn btn-warning btn-sm"
          onClick={() => abrirModalEditar(row)}
          title="Editar usuario"
        >
          <FaIcons.FaEdit />
        </button>
      ),
      width: "80px"
    },
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px"
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
      wrap: true,
      cell: (row) => <strong>{row.nombre}</strong>
    },
    {
      name: "Clave",
      selector: (row) => row.clave,
      sortable: true,
      width: "120px"
    },
    {
      name: "Teléfono",
      selector: (row) => row.telefono,
      wrap: true,
      width: "150px"
    },
    {
      name: "Rol",
      selector: (row) => row.rol,
      wrap: true,
      width: "150px",
      cell: (row) => (
        <Badge color={row.rol === "admin" ? "success" : "primary"}>
          {row.rol}
        </Badge>
      )
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      sortable: true,
      width: "120px",
      cell: (row) => (
        <Badge color={row.status === "activo" ? "success" : "danger"}>
          {row.status}
        </Badge>
      )
    },
  ];

  /////////////Buscar datos//////////////////////////////////
  const [buscar, setBuscar] = useState("");
  const [filtrobuscar, setFiltroBuscar] = useState([]);

  useEffect(() => {
    const result = data.filter((vendedor) => {
      return (
        vendedor.nombre?.toLowerCase().includes(buscar.toLowerCase()) ||
        vendedor.clave?.toLowerCase().includes(buscar.toLowerCase()) ||
        vendedor.telefono?.toString().includes(buscar) ||
        vendedor.rol?.toLowerCase().includes(buscar.toLowerCase())
      );
    });
    setFiltroBuscar(result);
  }, [buscar, data]);

  

  // Abrir modal de edición
  const abrirModalEditar = (vendedor) => {
    setSelectedVendedor(vendedor);
    setEditForm({
      nombre: vendedor.nombre,
      clave: vendedor.clave,
      telefono: vendedor.telefono,
      rol: vendedor.rol,
      status: vendedor.status
    });
    setModalEditar(true);
  };

  // Handle form changes
  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingEdit(true);
    
    try {
      const response = await axios.put(`${url}/${selectedVendedor.id}`, editForm);
      console.log(response.data);
      if (response.status === 200) {
        alert("Usuario actualizado correctamente");
        peticionGet(); // Refrescar los datos
        setModalEditar(false);
      } else {
        alert("La actualización no tuvo efecto");
      }
    } catch (error) {
      console.error("Error updating vendedor:", error);
      alert("Error al actualizar el usuario");
    } finally {
      setLoadingEdit(false);
    }
  };

  /////////////Mostrar datos//////////////////////////////////
  const peticionGet = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setFiltroBuscar(response.data);
      setPending(false);
    } catch (error) {
      console.error("Error fetching vendedores:", error);
      setPending(false);
      alert("Error al cargar los usuarios");
    }
  };

  useEffect(() => {
    if (users.id) {
      peticionGet();
    }
  }, [users.id]);

  /////////////////////////////////////////////////////////////////
  if (users.rol !== undefined) {
    if (users.rol === "admin") {
      return (
        <div className="Vendedores">
          <Sidebar>
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">Usuarios Registrados</h4>
                  <CSVLink 
                    data={data} 
                    filename="usuarios.csv"
                    className="btn btn-light btn-sm"
                  >
                    <FaIcons.FaFileExport className="me-1" />
                    Exportar CSV
                  </CSVLink>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  <h5 className="card-title">Listado de Usuarios</h5>
                  <p className="text-muted">Usuarios registrados en el sistema.</p>
                </div>
                
                <DataTable
                  columns={columns}
                  data={filtrobuscar}
                  noDataComponent={
                    <div className="text-center py-4">
                      <FaIcons.FaUserSlash className="text-muted mb-2" size={30} />
                      <p>No hay usuarios registrados</p>
                    </div>
                  }
                  progressPending={pending}
                  progressComponent={<Cargando />}
                  pagination
                  paginationPerPage={10}
                  paginationRowsPerPageOptions={[10, 20, 30]}
                  subHeader
                  subHeaderComponent={
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <FaIcons.FaSearch />
                      </span>
                      <input
                        type="text"
                        placeholder="Buscar usuario..."
                        className="form-control"
                        value={buscar}
                        onChange={(e) => setBuscar(e.target.value)}
                      />
                    </div>
                  }
                  highlightOnHover
                  pointerOnHover
                  striped
                  customStyles={{
                    headCells: {
                      style: {
                        backgroundColor: '#f8f9fa',
                        fontWeight: 'bold',
                      },
                    },
                  }}
                />

                {/* Modal para editar usuario */}
                <Modal isOpen={modalEditar} toggle={() => setModalEditar(false)} size="lg">
                  <Form onSubmit={handleSubmit}>
                    <ModalHeader toggle={() => setModalEditar(false)}>
                      <FaIcons.FaUserEdit className="me-2" />
                      Editar Usuario: {selectedVendedor?.nombre}
                    </ModalHeader>
                    <ModalBody>
                      {selectedVendedor && (
                        <div className="row">
                          <div className="col-md-6">
                            <FormGroup>
                              <Label for="nombre">Nombre</Label>
                              <Input
                                type="text"
                                name="nombre"
                                id="nombre"
                                value={editForm.nombre}
                                onChange={handleChange}
                                required
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="clave">Clave</Label>
                              <Input
                                type="text"
                                name="clave"
                                id="clave"
                                value={editForm.clave}
                                onChange={handleChange}
                                required
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-6">
                            <FormGroup>
                              <Label for="telefono">Teléfono</Label>
                              <Input
                                type="text"
                                name="telefono"
                                id="telefono"
                                value={editForm.telefono}
                                onChange={handleChange}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="rol">Rol</Label>
                              <Input
                                type="select"
                                name="rol"
                                id="rol"
                                value={editForm.rol}
                                onChange={handleChange}
                                required
                              >
                                <option value="admin">Administrador</option>
                                <option value="vendedor">Vendedor</option>
                                <option value="usuario">Usuario</option>
                              </Input>
                            </FormGroup>
                            <FormGroup>
                              <Label for="status">Estado</Label>
                              <Input
                                type="select"
                                name="status"
                                id="status"
                                value={editForm.status}
                                onChange={handleChange}
                                required
                              >
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                              </Input>
                            </FormGroup>
                          </div>
                        </div>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={() => setModalEditar(false)}
                        disabled={loadingEdit}
                      >
                        Cancelar
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={loadingEdit}
                      >
                        {loadingEdit ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                            Guardando...
                          </>
                        ) : (
                          <>
                            <FaIcons.FaSave className="me-1" />
                            Guardar Cambios
                          </>
                        )}
                      </button>
                    </ModalFooter>
                  </Form>
                </Modal>
              </Card.Body>
            </Card>
          </Sidebar>
        </div>
      );
    } else {
      return (
        <div>
          <Sidebar>
            <SinPermisos />
          </Sidebar>
        </div>
      );
    }
  } else {
    return (
      <div>
        <Sidebar>
          <SinPermisos />
        </Sidebar>
      </div>
    );
  }
};

export default Vendedores;
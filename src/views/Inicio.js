import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from './../components/sidebar';

const url = "https://apiportal.iaworks.xyz/public/usuarios";

const Iniciouser = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(url);
      setUsers(response.data);
      setTotalUsers(response.data.length);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  return (
    <div>
      <Sidebar>
 
    <div className="container mt-4">
  
      
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h4>Resumen</h4>
        </div>
        <div className="card-body">
          <p className="h5">Total de usuarios registrados: {totalUsers}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h4>Lista de Usuarios</h4>
        </div>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nombre || 'No especificado'}</td>
                  <td>{user.correo || 'No especificado'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
           
      </Sidebar>
    </div>
  );
};

export default Iniciouser;
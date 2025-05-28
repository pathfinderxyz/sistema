import React from 'react';
import Card from 'react-bootstrap/Card';
import Sidebar from './sidebar';

const InformacionDelSistema = () => {
  return (
    <div>
    <Sidebar>
    <div className="col-md-9">
    <Card>
      <Card.Header className="bg-dark text-white" as="h5">Información del Sistema</Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Nombre del software:</strong> SGC V1<br />
          <strong>Versión actual:</strong> V1 (Lanzada el 27/05/2025)<br />
          <strong>Propósito:</strong> Sistema de Gestión<br />
          <strong>Estado:</strong> En producción<br />
          <strong>Última actualización:</strong> 27/05/2025<br />
          <strong>Tecnologías utilizadas:</strong><br />
          Base de datos: MySQL Versión 5.2.1<br />
          Lenguaje del servidor: PHP 8.1<br />
          <strong>Requisitos mínimos:</strong><br />
          Navegador: Google Chrome (versión 90+)<br />
          RAM: 2 GB<br />
          <strong>Soporte técnico:</strong><br />
          Horario: Lunes a Viernes, 9:00 AM - 6:00 PM<br />
          <strong>Seguridad:</strong><br />
          Cumple con GDPR y está auditado bajo ISO 27001.<br />
         
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
    </Sidebar>
    </div>
  );
};

export default InformacionDelSistema;
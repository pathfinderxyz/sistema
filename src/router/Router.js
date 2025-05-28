import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Inicio from "../views/Inicio";
import Page404 from "../components/page404";
import Usuario from "../views/Usuario";
import InformacionDelSistema from "../components/InformacionDelSistema";
import Vendedores from "../views/Vendedores";
import Registrarvendedores from "../views/Registrarvendedores";
import DatosUsuarios from "../views/Usuarios/datosusuarios";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Page404 />} />
          <Route
            path="/registrarvendedores"
            element={<Registrarvendedores />}
          />
          <Route path="/vendedores" element={<Vendedores />} />
          <Route path="/informacion" element={<InformacionDelSistema />} />
          <Route path="/usuarios/info" element={<DatosUsuarios />} />
          <Route path="/:usuario" element={<Usuario />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;

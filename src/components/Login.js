import React, { useState } from "react";
import "./../assets/css/login.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as FaIcons from "react-icons/fa";

const URL_LOGIN = "https://apiportal.iaworks.xyz/public/logininicial";
const URL_REGISTER = "https://apiportal.iaworks.xyz/public/register";

const Login = () => {
  let navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errordatos, setErrordatos] = useState(false);
  const [espera, setEspera] = useState(false);
  const [Data, setData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [datosSeleccionados, setDatosSeleccionados] = useState({
    usuario: "",
    clave: "",
  });

  const [registroDatos, setRegistroDatos] = useState({
    nombre: "",
    correo: "",
    clave: "",
    confirmarClave: "",
    telefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosSeleccionados((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegistroDatos((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    console.log(datosSeleccionados);
    setEspera(true);
    await axios
      .post(URL_LOGIN, datosSeleccionados)
      .then((res) => {
        setData(res.data[0]);
        setError(false);
        setEspera(false);
        console.log(res.data[0]);
        if (res.data[0].error) {
          setErrordatos(true);
        } else if (res.data[0].status === "inactivo") {
          setErrordatos(true);
          setError(true);
          setEspera(false);
        } else {
          window.localStorage.setItem("loginUser", JSON.stringify(res.data[0]));
          if (res.data[0].rol === "cliente") {
            navigate("/iniciouser");
          } else if (res.data[0].rol === "admin") {
            navigate("/inicio");
          }
        }
      })
      .catch((err) => {
        setError(true);
        setEspera(false);
      });
  };

  const handleRegister = async () => {
    if (registroDatos.clave !== registroDatos.confirmarClave) {
      setError(true);
      return;
    }
    setEspera(true);
    try {
      // Realiza el registro del usuario
      await axios.post(URL_REGISTER, registroDatos).then(async (res) => {
        setError(false);
        setEspera(false);
        setIsRegistering(false);
        setRegisterSuccess(true);

        // Envía el correo de bienvenida
        const emailData = {
          correousuario: registroDatos.correo,
          nombre: registroDatos.nombre,
        };

        await axios
          .post(
            "https://apiportal.iaworks.xyz/enviarcorreobienvenida.php",
            emailData
          )
          .then(() => {
            console.log("Correo de bienvenida enviado con éxito.");
          })
          .catch((err) => {
            console.error("Error al enviar el correo de bienvenida:", err);
          });
      });
    } catch (err) {
      setError(true);
      setEspera(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bodylogin">
      <div className="container">
        <div className="login-register">
          <div className="row">
            <div className="col-sm-4 offset-4 mt-4">
              <div className="login-box card mt-5">
                <div className="card-body" style={{ textAlign: "left" }}>
                  <div className="form-horizontal form-material text-center">
                   
                    {!isRegistering ? (
                      <>
                        {registerSuccess && (
                          <div className="alert alert-success">
                            <h6>Te hemos enviado un correo electrónico.</h6>
                            <button
                              onClick={() => {
                                setRegisterSuccess(false);
                                window.location.reload(); // Recarga toda la web
                              }}
                              className="btn btn-block btn-lg btn-dark"
                            >
                              Verifica tu correo electrónico
                            </button>
                          </div>
                        )}
                        <div className="form-group mt-3">
                          <div className="col-sm-12 mt-4">
                            <input
                              className="form-control"
                              name="usuario"
                              type="text"
                              required=""
                              placeholder="Usuario"
                              onChange={handleChange}
                            />{" "}
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="col-sm-12">
                            <div className="input-group">
                              <input
                                className="form-control"
                                name="clave"
                                type={showPassword ? "text" : "password"}
                                required=""
                                placeholder="Password"
                                onChange={handleChange}
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="btn btn-dark btn-outline-secondary"
                                  onClick={toggleShowPassword}
                                >
                                  {showPassword ? (
                                    <FaIcons.FaEyeSlash />
                                  ) : (
                                    <FaIcons.FaEye />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {errordatos && (
                          <div className="alert alert-danger">
                            <h6>
                              Datos de usuario incorrectos o usuario inactivo
                            </h6>
                          </div>
                        )}

                        {error && (
                          <div className="alert alert-danger">
                            <h6>No hay conexión a internet</h6>
                          </div>
                        )}

                        <div className="form-group text-center">
                          <div className="col-xs-12 p-b-20">
                            <button
                              onClick={handleLogin}
                              disabled={espera}
                              className="btn btn-block btn-lg btn-dark"
                            >
                              Entrar
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-group mt-3">
                          <div className="col-sm-12 ">
                            <input
                              className="form-control"
                              name="nombre"
                              type="text"
                              required=""
                              placeholder="Nombre"
                              onChange={handleRegisterChange}
                            />{" "}
                          </div>
                        </div>
                        <div className="form-group mt-3">
                          <div className="col-sm-12 ">
                            <input
                              className="form-control"
                              name="correo"
                              type="email"
                              required=""
                              placeholder="Correo"
                              onChange={handleRegisterChange}
                            />{" "}
                          </div>
                        </div>
                        <div className="form-group mt-3">
                          <div className="col-sm-12 ">
                            <input
                              className="form-control"
                              name="telefono"
                              type="text"
                              required=""
                              placeholder="Teléfono"
                              onChange={handleRegisterChange}
                            />{" "}
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-sm-12">
                            <div className="input-group">
                              <input
                                className="form-control"
                                name="clave"
                                type={showPassword ? "text" : "password"}
                                required=""
                                placeholder="Password"
                                onChange={handleRegisterChange}
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="btn btn-dark btn-outline-secondary"
                                  onClick={toggleShowPassword}
                                >
                                  {showPassword ? (
                                    <FaIcons.FaEyeSlash />
                                  ) : (
                                    <FaIcons.FaEye />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-sm-12">
                            <div className="input-group">
                              <input
                                className="form-control"
                                name="confirmarClave"
                                type={showPassword ? "text" : "password"}
                                required=""
                                placeholder="Confirmar Password"
                                onChange={handleRegisterChange}
                              />
                              <div className="input-group-append">
                                <button
                                  type="button"
                                  className="btn btn-dark btn-outline-secondary"
                                  onClick={toggleShowPassword}
                                >
                                  {showPassword ? (
                                    <FaIcons.FaEyeSlash />
                                  ) : (
                                    <FaIcons.FaEye />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {error && (
                          <div className="alert alert-danger">
                            <h6>
                              Las contraseñas no coinciden o hay un error en el
                              registro
                            </h6>
                          </div>
                        )}

                        <div className="form-group text-center">
                          <div className="col-xs-12 p-b-20">
                            <button
                              disabled
                              className="btn btn-block btn-lg btn-dark"
                            >
                              Registrar
                            </button>
                          </div>
                          <div className="col-xs-12 p-b-20">
                            <button
                              onClick={() => setIsRegistering(false)}
                              className="btn btn-block btn-lg btn-secondary"
                            >
                              Volver
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                    <h6 className="mt-4" style={{ fontSize: "12px" }}>
                      © PORTAL 2025
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

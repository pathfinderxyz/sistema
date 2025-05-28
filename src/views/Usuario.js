import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import bannerImage from "../assets/fondos/9.jpg"; // Ajusta la ruta según sea necesario

import { Helmet } from "react-helmet";
import cirpImage from "../assets/img/cirp_icon.png"; // Importa la imagen

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Importa los estilos
import "./usuario.css";

const Usuario = () => {
  const { usuario } = useParams();
  
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [userdata, setUserdata] = useState("");
  const [Pixels, setPixels] = useState("");
  const [played, setPlayed] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showReplayButton, setShowReplayButton] = useState(false);
  const [modal, setModal] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [error, setError] = useState(false);
  const playerRef = useRef(null);

  // Obtener el ID del usuario logueado desde el almacenamiento local
  const loginUserJSON = window.localStorage.getItem("loginUser");
  const loggedInUser = loginUserJSON ? JSON.parse(loginUserJSON) : null;
  const userId = loggedInUser ? loggedInUser.id : null;
  const userRole = loggedInUser ? loggedInUser.rol : null;
  const userWS = loggedInUser ? loggedInUser.tlfwhatsapp : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://apiportal.iaworks.xyz/public/usuariolanding/${usuario}`
        );
        setData(response.data[0]); // Asegúrate de acceder al primer elemento del array si la API devuelve un array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `https://apiportal.iaworks.xyz/public/infousuario/${usuario}`
        );
        setUserdata(response.data[0]); // Almacena los datos del usuario en el estado
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const pixelsuser = async () => {
      try {
        const response = await axios.get(
          `https://apiportal.iaworks.xyz/public/userpixels/${usuario}`
        );
        setPixels(response.data[0]); // Almacena los datos del usuario en el estado
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchData();
    fetchUserInfo();
    pixelsuser();
  }, [usuario]);

  const handleProgress = (state) => {
    if (!playerRef.current.seeking) {
      setPlayed(state.played);
    } else {
      playerRef.current.seekTo(played);
    }
  };

  const handleEnded = () => {
    setShowQuestion(true);
    setShowReplayButton(true);
  };

  const handleReplay = () => {
    setShowQuestion(false);
    setShowReplayButton(false);
    playerRef.current.seekTo(0);
  };

  const handleOptionA = () => {

    navigate(`/producto1/${usuario}`);

  };

  const handleOptionB = () => {
 
    navigate(`/negocio1/${usuario}`);
  };

  const handleOptionC = () => {
    navigate("/salir");
  };

  const handleBack = () => {
    if (userRole === "admin") {
      navigate("/inicio");
    } else if (userRole === "cliente") {
      navigate("/iniciouser");
    } else {
      navigate(-1); // Navegar a la página anterior
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, telefono: value });
  };

  const peticionPost = async () => {
    const nuevoLeadConUsuario = {
      ...formData,
      iduser: userdata.id_creador, // Agregar el ID del usuario registrado
      usuario: usuario,
      correodestinario: userdata.correo,
    };

    console.log(nuevoLeadConUsuario);
    try {
      const res1 = await axios.post("https://apiportal.iaworks.xyz/public/leadsnuevos", nuevoLeadConUsuario, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response from leadsnuevos:", res1.data);
  
      const res2 = await axios.post("https://apiportal.iaworks.xyz/enviarcorreoleads.php", nuevoLeadConUsuario, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response from enviarcorreoleads:", res2.data);
    
      setError(false);
      setModal(false);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.correo || !formData.telefono) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    peticionPost();
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <Helmet>
        <title>{usuario}</title>
        <meta name="description" content={`Pixels: ${Pixels}`} />
      </Helmet>
      <div style={styles.content}>
        <h1>{data.nombrecampana}</h1>
        <p>{data.descripcion}</p>
        <div className="row">
          <div
            className={
              showQuestion ? "col-md-6 col-sm-12" : "col-md-12 col-sm-12"
            }
          >
            <div style={styles.videoWrapperFull}>
              <div style={styles.videoWrapper}>
                {!showReplayButton && data.urlvideo ? (
                  <ReactPlayer
                    ref={playerRef}
                    url={data.urlvideo}
                    width="100%"
                    height="100%"
                    controls={false} // Oculta todos los controles
                    onProgress={handleProgress}
                    onEnded={handleEnded}
                    style={styles.video}
                  />
                ) : (
                  <div style={styles.replayContainer}>
                    <img
                      src={cirpImage}
                      alt="CIRP"
                      style={styles.replayImage}
                    />
                    <button style={styles.button} onClick={handleReplay}>
                      Reproducir nuevamente
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {showQuestion && (
            <div className="col-md-6 col-sm-12">
              <div style={styles.question}>
                <p>
                  <h4>
                    ¿Qué le pareció el video? … ¿Sorprendente cierto? ¿Como
                    deseas continuar?
                  </h4>
                </p>
                <button style={styles.button} onClick={handleOptionA}>
                  A) SÍ QUIERO MÁS INFORMACIÓN DEL PRODUCTO
                </button>
                <button style={styles.button} onClick={handleOptionB}>
                  B) QUIERO CONOCER MÁS DEL NEGOCIO
                </button>
                <button style={styles.button} onClick={handleOptionC}>
                  C) NO GRACIAS, DESEO SALIR
                </button>
                <button style={styles.button} onClick={handleBack}>
                  VOLVER
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

   
      <Modal isOpen={modal} centered>
        <ModalHeader>
          <h6 style={{ textAlign: "center" }}>
            Por favor, déjanos tu correo electrónico y te enviaré un obsequio de
            mi parte.
          </h6>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="correo">Correo Electrónico</Label>
              <Input
                type="email"
                name="correo"
                id="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="telefono">Teléfono</Label>
              <PhoneInput
                international
                defaultCountry="PE" // País predeterminado (Perú)
                value={formData.telefono}
                onChange={handlePhoneChange}
                placeholder="Ingresa tu número de teléfono"
                style={{ width: "100%" }}
                className="custom-phone-input"
              />
            </FormGroup>
            <Button type="submit" color="primary" style={{ width: "100%" }}>
              Enviar
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    padding: "20px",
    color: "#fff",
  },
  content: {
    textAlign: "center",
    maxWidth: "1200px",
    width: "100%",
  },
  videoWrapperFull: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingTop: "1%",
    position: "relative",
  },
  videoWrapper: {
    position: "relative",
    width: "100%",
    paddingTop: "56.25%",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  question: {
    width: "100%",
    marginTop: "20px",
  },
  button: {
    display: "block",
    margin: "10px auto",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s, color 0.3s",
  },
  replayContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  replayImage: {
    width: "150px", // Ajusta el tamaño de la imagen
    marginBottom: "20px", // Espacio entre la imagen y el botón
  },
};

export default Usuario;

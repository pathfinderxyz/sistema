-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 28-05-2025 a las 08:30:07
-- Versión del servidor: 10.11.10-MariaDB
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u146548383_portal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userpanel`
--

CREATE TABLE `userpanel` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `rol` varchar(100) NOT NULL,
  `conectado` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombreuser` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `tlfwhatsapp` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `userpanel`
--

INSERT INTO `userpanel` (`id`, `username`, `rol`, `conectado`, `password`, `nombreuser`, `correo`, `tlfwhatsapp`, `status`) VALUES
(1, 'admin', 'admin', 'TRUE', 'Admin$$25', 'Jose Carvajal', 'admin@gmail.com', '04120327698', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `telefono` varchar(100) NOT NULL,
  `rol` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `verificado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `clave`, `telefono`, `rol`, `status`, `fecha_creacion`, `verificado`) VALUES
(1, 'Jose luis mendoza', '', 'Eris$$22', '04120327698', 'cliente', 'activo', '0000-00-00', ''),
(2, 'administrador', 'admin@gmail.com', 'admin2025', '04120327698', 'admin', 'activo', '0000-00-00', ''),
(6, 'jose ', '', '22330951', '7863287834', 'cliente', 'activo', '0000-00-00', ''),
(8, 'designplay', 'designplayart4@gmail.com', 'Eris$$22', '04265873177', 'cliente', 'activo', '0000-00-00', ''),
(9, 'plants', '', 'Eris$$22', '1524699777', 'cliente', 'inactivo', '0000-00-00', ''),
(12, 'luis', 'erisgreyrat102e@gmail.com', 'Eris.102', '04265873177', 'usuario', 'inactivo', '2025-05-28', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vista_notificaciones_usuarios`
--

CREATE TABLE `vista_notificaciones_usuarios` (
  `id_notificacion` int(11) DEFAULT NULL,
  `id_usuario_notificacion` int(11) DEFAULT NULL,
  `nombredocumento` varchar(1000) DEFAULT NULL,
  `notificacion` varchar(100) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `userpanel`
--
ALTER TABLE `userpanel`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `userpanel`
--
ALTER TABLE `userpanel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

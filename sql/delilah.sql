-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-04-2021 a las 22:24:48
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
--

CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `usuario` varchar(60) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `usuario`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `estado` int(6) DEFAULT NULL,
  `fecha` varchar(50) DEFAULT NULL,
  `hora` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `tipo` int(2) DEFAULT NULL,
  `total` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `id_usuario`, `descripcion`, `estado`, `fecha`, `hora`, `numero`, `tipo`, `total`) VALUES
(5, 1, '[{\"plato\":\"Hot Dogs\",\"precio\":\"30.00\"},{\"plato\":\"Hot Dogs\",\"precio\":\"30.00\"}]', 1, '17/3/2021', '4:44', '#5', 1, '60.00'),
(6, 9, '[{\"plato\":\"Hot Dogs\",\"precio\":\"30.00\"},{\"plato\":\"Hot Dogs\",\"precio\":\"30.00\"}]', 3, '17/3/2021', '4:50', '#6', 1, '60.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platos`
--

CREATE TABLE `platos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) DEFAULT NULL,
  `precio` varchar(60) DEFAULT NULL,
  `identificadorUnico` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `platos`
--

INSERT INTO `platos` (`id`, `nombre`, `precio`, `identificadorUnico`) VALUES
(2, 'Hamburguesa McDonalds', '50.00', 'Hamburguesa McDonalds-NHH4yv4Rx'),
(3, 'Hot Dogs', '15.00', 'Hot Dogs-xXRLtZiLW'),
(4, 'Hot Dogs Sencillos', '10.00', 'Hot Dogs Sencillos-lypGrf14N'),
(6, 'Bagel de Salmon', '425.00', 'Bagel de Salmon-iEQQvjB9P'),
(7, 'Hamburguesa Clasica', '350.00', 'Hamburguesa Clasica-9BFSGq3pp'),
(8, 'Sandwich Beggie', '310.00', 'Sandwich Beggie-GwOhYx88p'),
(9, 'EnsaladaBeggie', '340.00', 'EnsaladaBeggie-giC_DpGBo'),
(10, 'Focaccia', '300.00', 'Focaccia-DEurQsFcn'),
(11, 'Sandwich Focaccia', '440.00', 'Sandwich Focaccia-TohGqNMKw');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(60) DEFAULT NULL,
  `nombre` varchar(60) DEFAULT NULL,
  `apellido` varchar(60) DEFAULT NULL,
  `correo` varchar(60) DEFAULT NULL,
  `direccion` varchar(60) DEFAULT NULL,
  `telefono` varchar(60) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `nombre`, `apellido`, `correo`, `direccion`, `telefono`, `password`) VALUES
(1, 'martin98', 'Martin Rafael', 'Barrios', 'martha.cristo@hotmail.com', 'ramon medina 108', '9321080000', 'barrios98'),
(6, 'martha20', 'marttha', 'barrios', 'martha.cristo@hotmail.com', 'ramon medina 108', '9321080000', 'barrios98'),
(9, 'martindiaz', 'Martin Rafael', 'Martinez Diaz', 'martin.cristo@hotmail.com', 'ramon medina 108', '9321080000', 'barrios98'),
(15, 'mariavaleria', 'Maria Valeria', 'Barrios', 'valeria.cristo@hotmail.com', 'ramon medina 108', '9321081120', 'barrios98'),
(16, 'jennifer20', 'Jennifer', 'Barrios', 'valeria.cristo@hotmail.com', 'ramon medina 108', '9321081120', 'barrios98');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `platos`
--
ALTER TABLE `platos`
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
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `platos`
--
ALTER TABLE `platos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

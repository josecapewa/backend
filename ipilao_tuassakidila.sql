-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 06/02/2025 às 13:46
-- Versão do servidor: 10.11.11-MariaDB
-- Versão do PHP: 8.3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `ipilao_tuassakidila`
--
CREATE DATABASE IF NOT EXISTS `ipilao_tuassakidila` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ipilao_tuassakidila`;

DELIMITER $$
--
-- Procedimentos
--
CREATE DEFINER=`ipilao`@`localhost` PROCEDURE `realizar_troca` (IN `usuario_id` INT, IN `email_destino` VARCHAR(255), IN `id_servico` INT, IN `ver` INT)   BEGIN
    DECLARE referencia_id INT;

    -- Seleciona uma referência aleatória e ativa
    SELECT id INTO referencia_id
    FROM referencia
    WHERE ativo = TRUE  -- Verifica se a referência está ativa
    ORDER BY RAND()
    LIMIT 1;

    -- Insere a nova troca na tabela trocas
    INSERT INTO trocas (id_usuario, id_referencia, email_destino, ver)
    VALUES (usuario_id, referencia_id, email_destino, ver);

    -- Atualiza o estado da referência para inativo (ativo = FALSE)
    UPDATE referencia
    SET ativo = FALSE
    WHERE id = referencia_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `card`
--

CREATE TABLE `card` (
  `id` int(11) NOT NULL,
  `numero` varchar(255) NOT NULL,
  `used` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `card`
--

INSERT INTO `card` (`id`, `numero`, `used`) VALUES
(1, '61 08 0C 22', 0),
(2, '31 E3 FE 22', 0),
(3, 'A3 45 28 1D', 0),
(4, 'A3 E2 A1 1D', 0),
(5, '9E 11 1C 2F', 0),
(6, 'A3 A9 98 1D', 1),
(7, 'A3 2E 63 1D', 0),
(8, 'A3 0E C6 1D', 1),
(9, 'B3 02 0D 1D', 0),
(10, 'A3 3C 2D 1D', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `endereco`
--

CREATE TABLE `endereco` (
  `id` int(11) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `id_municipio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `endereco`
--

INSERT INTO `endereco` (`id`, `endereco`, `id_municipio`) VALUES
(1, 'Avenida 1 de Maio, 123', 1),
(2, 'Rua da Esperança, 45', 2),
(3, 'Praça do Comércio, 10', 3),
(4, 'Rua das Flores, 25', 4),
(5, 'Avenida da Liberdade, 55', 5),
(6, 'Rua do Mercado, 30', 6),
(7, 'Avenida Principal, 90', 7);

-- --------------------------------------------------------

--
-- Estrutura para tabela `led_status`
--

CREATE TABLE `led_status` (
  `id` int(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  `timestamp` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `led_status`
--

INSERT INTO `led_status` (`id`, `status`, `timestamp`) VALUES
(1, '', '2024-11-26 16:20:53'),
(2, '', '2024-11-26 16:23:33'),
(3, '', '2024-11-26 16:23:52'),
(4, '', '2024-11-26 16:24:36'),
(5, '', '2024-11-26 16:31:04'),
(6, '', '2024-11-26 16:42:38'),
(7, '', '2024-11-26 16:43:26'),
(8, '', '2024-11-26 16:43:39'),
(9, '', '2024-11-26 16:47:20');

-- --------------------------------------------------------

--
-- Estrutura para tabela `municipio`
--

CREATE TABLE `municipio` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `id_provincia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `municipio`
--

INSERT INTO `municipio` (`id`, `nome`, `id_provincia`) VALUES
(1, 'Luanda', 1),
(2, 'Viana', 1),
(3, 'Lubango', 2),
(4, 'Tchivinguiro', 2),
(5, 'Moçâmedes', 3),
(6, 'Benguela', 4),
(7, 'Sumbe', 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `pais`
--

CREATE TABLE `pais` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pais`
--

INSERT INTO `pais` (`id`, `nome`) VALUES
(1, 'Angola');

-- --------------------------------------------------------

--
-- Estrutura para tabela `provincia`
--

CREATE TABLE `provincia` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `id_pais` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `provincia`
--

INSERT INTO `provincia` (`id`, `nome`, `id_pais`) VALUES
(1, 'Luanda', 1),
(2, 'Huíla', 1),
(3, 'Namibe', 1),
(4, 'Benguela', 1),
(5, 'Cuanza Sul', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `referencia`
--

CREATE TABLE `referencia` (
  `id` int(11) NOT NULL,
  `codigo` varchar(13) NOT NULL,
  `ativo` tinyint(1) DEFAULT 1,
  `tipo_referencia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `referencia`
--

INSERT INTO `referencia` (`id`, `codigo`, `ativo`, `tipo_referencia`) VALUES
(1, '7865678128643', 0, 1),
(2, '2516076475165', 1, 1),
(3, '5557823505931', 1, 1),
(4, '8761740465842', 0, 1),
(5, '4385033863842', 1, 1),
(6, '6404420651011', 1, 1),
(7, '8121999002309', 0, 1),
(8, '5779497800304', 0, 1),
(9, '7751821276147', 1, 1),
(10, '5065308551894', 1, 1),
(11, '7039452893470', 1, 1),
(12, '6272497979056', 0, 1),
(13, '5809246591678', 1, 1),
(14, '8209993281115', 0, 1),
(15, '4551628965699', 1, 1),
(16, '8984584646063', 0, 1),
(17, '2748166973100', 0, 1),
(18, '6675952800814', 1, 1),
(19, '7922329063321', 0, 1),
(20, '9050452417075', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `servicos`
--

CREATE TABLE `servicos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` mediumtext NOT NULL DEFAULT 'Em Breve',
  `pontos_necessarios` int(11) NOT NULL DEFAULT 0,
  `kwanzas` varchar(255) NOT NULL DEFAULT '0',
  `estado` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `servicos`
--

INSERT INTO `servicos` (`id`, `nome`, `descricao`, `pontos_necessarios`, `kwanzas`, `estado`) VALUES
(1, 'voz e sms', 'Transforme suas recompensas em comunicações significativas. Conecte-se de forma inteligente e aproveite cada ponto acumulado!', 50, '50 UTTS', 1),
(21, 'transporte público', 'Transforme suas recompensas em viagens de autocarro pagas através do seu cartão verde. Conecte-se de forma inteligente e aproveite cada ponto acumulado!', 150, '1', 1),
(23, 'Internet', 'Transforme seus pontos em conexões reais! Com nossa internet, cada ponto acumulado é uma oportunidade de comunicar-se de forma inteligente e significativa..', 100, '500Mb', 1),
(32, 'valores monetÃ¡rios', 'Converta seus pontos em dinheiro de verdade! A cada troca, transforme suas recompensas em valores monetÃ¡rios reais para usar como desejar..', 200, '400kz', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `trocas`
--

CREATE TABLE `trocas` (
  `id` int(11) NOT NULL,
  `id_referencia` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `email_destino` varchar(255) NOT NULL,
  `data_realizacao` datetime DEFAULT current_timestamp(),
  `ver` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `trocas`
--

INSERT INTO `trocas` (`id`, `id_referencia`, `id_usuario`, `email_destino`, `data_realizacao`, `ver`) VALUES
(0, 6, 12, 'capewajose@gmail.com', '2024-11-04 14:51:49', '244155'),
(0, 10, 12, 'capewajose@gmail.com', '2024-11-04 15:12:52', '889410'),
(0, 17, 12, 'capewajose@gmail.com', '2024-11-04 15:24:15', '655102'),
(0, 3, 12, 'capewajose@gmail.com', '2024-11-04 15:32:54', '243894'),
(0, 13, 12, 'capewajose@gmail.com', '2024-11-04 15:33:22', '747009'),
(0, 20, 12, 'capewajose@gmail.com', '2024-11-04 15:35:32', '237521'),
(0, 1, 12, 'capewajose@gmail.com', '2024-11-04 15:35:43', '443372'),
(0, 12, 12, 'capewajose@gmail.com', '2024-11-04 15:38:16', '713654'),
(0, 16, 12, 'capewajose@gmail.com', '2024-11-04 15:40:07', '447838'),
(0, 17, 12, 'capewajose@gmail.com', '2024-11-04 15:42:42', '597061'),
(0, 11, 12, 'jesimielnobrega25@gmail.com', '2024-11-04 15:43:36', '342769'),
(0, 8, 12, 'capewajose@gmail.com', '2024-11-04 15:53:49', '716905'),
(0, 9, 12, 'capewajose@gmail.com', '2024-11-04 15:56:53', '759804'),
(0, 14, 12, 'capewajose@gmail.com', '2024-11-04 16:04:10', '460193'),
(0, 2, 12, 'capewajose@gmail.com', '2024-11-04 16:05:34', '318403'),
(0, 4, 12, 'capewajose@gmail.com', '2024-11-04 16:10:32', '714846'),
(0, 18, 12, 'capewajose@gmail.com', '2024-11-04 16:12:11', '904586'),
(0, 5, 12, 'capewajose@gmail.com', '2024-11-04 16:16:18', '823745'),
(0, 7, 12, 'capewajose@gmail.com', '2024-11-04 16:19:52', '549585'),
(0, 4, 12, 'capewajose@gmail.com', '2024-11-05 09:16:08', '959334'),
(0, 14, 12, 'capewajose@gmail.com', '2024-11-11 09:33:23', '391045'),
(0, 12, 11, 'jesuinamiranda354@gmail.com', '2024-11-11 09:39:03', '121624'),
(0, 17, 12, 'capewajose@gmail.com', '2024-11-20 16:15:05', '674768'),
(0, 7, 12, 'capewajose@gmail.com', '2024-11-20 16:15:10', '601182'),
(0, 8, 12, 'capewajose@gmail.com', '2024-11-29 14:39:49', '984565'),
(0, 16, 12, 'capewajose@gmail.com', '2024-11-29 18:11:03', '462088'),
(0, 19, 12, 'capewajose@gmail.com', '2025-01-18 21:25:29', '231927'),
(0, 1, 12, '923615520', '2025-01-18 21:26:14', '316873');

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `user`
--

INSERT INTO `user` (`id`, `nome`, `email`, `created_at`) VALUES
(11, 'JosÃ© Capewa', 'capewajose@gmail.com', '2025-01-18 18:52:42'),
(12, 'Teste', 'teste@gmail.com', '2025-01-18 19:52:35');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usercard`
--

CREATE TABLE `usercard` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_card` int(11) NOT NULL,
  `pontos` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usercard`
--

INSERT INTO `usercard` (`id`, `id_user`, `id_card`, `pontos`) VALUES
(6, 11, 8, 0),
(7, 12, 6, 123);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_recuperacao` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `rf_id` varchar(255) NOT NULL,
  `pontos` int(11) DEFAULT 0,
  `imagem` varchar(255) NOT NULL DEFAULT 'no_image.jpg',
  `level` varchar(255) NOT NULL DEFAULT 'Comum',
  `data_criacao` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `email_recuperacao`, `senha`, `telefone`, `rf_id`, `pontos`, `imagem`, `level`, `data_criacao`) VALUES
(11, 'Jesuina Miranda', 'jesuinamiranda354@gmail.com', 'aer@gmail.com', '2', NULL, '31 E3 FE 22', 1950, 'no_image.jpg', 'Administrador', '2024-11-01'),
(12, 'JosÃ© Capewa', 'capewajose@gmail.com', 'capewajose@gmail.com', 'teste1234', NULL, '61 08 0C 22', 18500, 'nCnhkgeL12.jpeg', 'Administrador', '2024-11-01'),
(45, 'Edy', 'edivaldocoelho000@gmail.com', 'edivaldocoelho000@gmail.com', '1', NULL, '72', 30, 'no_image.jpg', 'Comum', '2024-11-01'),
(46, 'Telma  Ricardo', 'telmadosprazeres@hotmail.com', 'telmadosprazeres@hotmail.com', 'pretinha', NULL, '28', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(47, 'Adolfo Monteiro Manuel', 'adolfomonteiromanuel@gmail.com', 'adolfomonteiromanuel@gmail.com', '11', NULL, '73', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(48, 'ClÃ¡udioTavares ', 'claudiolopestavares@hotmail.com', 'claudiolopestavares@hotmail.com', '12345678', NULL, '60', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(49, 'GeovanY Bonina', 'geobonina56@gmail.com', 'geobonina56@gmail.com', '1234', NULL, '56', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(50, 'Elizangila Reis', 'ereis1897@gmail.com', 'elizangilareis07@gmail.com', 'Elsamaria12!', NULL, '18', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(51, 'AdÃ£o MagalhÃ£es', 'adaomagalhaes793@gmail.com', 'adaomagalhaes793@gmail.com', '12345678', NULL, '69', 0, 'IcxEn4b451.webp', 'Comum', '2024-11-01'),
(52, 'Domingas Dos Santos ', 'dudagonga62@gmail.com', 'dudagonga62@gmail.com', 'rosadaflor', NULL, '17', 2, 'no_image.jpg', 'Comum', '2024-11-01'),
(53, 'Manuel  Epalanga ', 'manuelcalepi19@gmail.com', 'manuelcalepi29@gmail.com', 'manuelcalepi', NULL, '13', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(54, 'Arnaldo JoÃ£o ', 'arnaldoasis321@gmail.com', 'arnaldoasis321@gmail.com', '123', NULL, '65', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(55, 'Alfredo  Figueiredo ', 'alfredofigueiredo96@gmail.com', 'alfredofigueiredo96@gmail.com', 'F1gu31r3d0', NULL, '78', 0, '9FfTQ7Tu55.jpg', 'Comum', '2024-11-01'),
(57, 'Noberto Pascoal', 'norbertopascoal2000@gmail.com', 'norbertopascoal2000@gmail.com', '789654', NULL, '20', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(58, 'Osvaldo  Costa ', 'josedamiaodacostavava@gmail.com', 'josedamiaodacostavava@gmail.com', 'M0m3ntos', NULL, '87', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(60, 'Dorivaldo  Chimuco ', 'dorivaldochimuco4@gmail.com', 'dorivaldochimuco4@gmail.com', 'dorivaldo123', NULL, '71', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(61, 'Billy Djean', 'elly@gmail.com', 'elly@gmail.com', '1234', NULL, '94', 0, '9TndMBqY61.jpg', 'Comum', '2024-11-01'),
(70, 'Silvio Francisco', 'santiago44325@gmail.com', 'santiago44325@gmail.com', 'Melqu!2#21', NULL, '58', 0, 'no_image.jpg', 'Administrador', '2024-11-01'),
(71, 'AntÃ³nia TomÃ¡s', 'antoniacorreia0718@gmail.com', 'antoniacorreia0718@gmail.com', 'areima08', NULL, '53', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(72, 'Amarildo Carlos', 'joaorockamaral@gmail.com', 'joaorockamaral@gmail.com', '1234', NULL, '27', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(73, 'Luis SimÃ£o', 'luissimao@gmail.com', 'adolfomanueldev10@gmail.com', 'luissimao', NULL, '57', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(74, 'Yola Augusta', 'yola987@gmail.com', 'yola987@gmail.com', '1234', NULL, '98', 0, 'no_image.jpg', 'Comum', '2024-11-01'),
(81, 'Melva PatrÃ­cia', 'rhodalias@gmail.com', 'rhodalias@gmail.com', 'Marcos321', NULL, '711043', 0, 'no_image.jpg', 'Comum', '2024-11-17'),
(82, 'Manuel Lucas Dimith', 'manuellucasdimith@gmail.com', 'manuellucasdimith@gmail.com', 'madaraera23', NULL, '801726', 0, 'no_image.jpg', 'Comum', '2024-11-20'),
(84, 'priscila costa', 'priscilacostta36@gmail.com', 'priscilacostta36@gmail.com', '1234', NULL, '783535', 0, 'no_image.jpg', 'Comum', '2024-11-27'),
(85, 'Andrade ITEL', 'guiandradedemelo108@gmail.com', 'guiandradedemelo108@gmail.com', 'badlifes', NULL, '855325', 0, 'no_image.jpg', 'Comum', '2024-11-27'),
(86, 'Iliano Nicolau', 'ilianonicolau75@gmail.com', 'ilianonicolau75@gmail.com', '0000', NULL, '757798', 0, 'no_image.jpg', 'Comum', '2024-11-28'),
(87, 'AntÃ³nio Ngola', 'paigrandengola@gmail.com', 'paigrandengola@gmail.com', 'Luane04IPIL', NULL, '674338', 0, 'no_image.jpg', 'Comum', '2024-11-28'),
(88, 'Ricardo SebastiÃ£o', 'ricardoricky726@gmail.com', 'ricardoricky726@gmail.com', 'kodvub-Sijjir-jodqo8', NULL, '501051', 0, 'no_image.jpg', 'Comum', '2024-11-29'),
(89, 'Pascoal Tondo', 'pascoaltondo.code@gmail.com', 'pascoaltondo.code@gmail.com', 'pascapy', NULL, '376663', 0, 'HoXzGaQS89.jpg', 'Comum', '2024-12-26'),
(90, 'Amarildo Vieira', 'amarildoricardovieira@gmail.com', 'amarildoricardovieira@gmail.com', 'melos', NULL, '620389', 0, 'iKNgKFtf90.jpg', 'Comum', '2025-01-15');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero` (`numero`);

--
-- Índices de tabela `endereco`
--
ALTER TABLE `endereco`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_municipio` (`id_municipio`);

--
-- Índices de tabela `led_status`
--
ALTER TABLE `led_status`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_provincia` (`id_provincia`);

--
-- Índices de tabela `pais`
--
ALTER TABLE `pais`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `provincia`
--
ALTER TABLE `provincia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pais` (`id_pais`);

--
-- Índices de tabela `referencia`
--
ALTER TABLE `referencia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_referencia` (`tipo_referencia`);

--
-- Índices de tabela `servicos`
--
ALTER TABLE `servicos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `trocas`
--
ALTER TABLE `trocas`
  ADD KEY `id_servico` (`id_referencia`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `usercard`
--
ALTER TABLE `usercard`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_user` (`id_user`),
  ADD UNIQUE KEY `id_card` (`id_card`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `rf_id` (`rf_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `card`
--
ALTER TABLE `card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `endereco`
--
ALTER TABLE `endereco`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `led_status`
--
ALTER TABLE `led_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `municipio`
--
ALTER TABLE `municipio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `pais`
--
ALTER TABLE `pais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `provincia`
--
ALTER TABLE `provincia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `referencia`
--
ALTER TABLE `referencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `servicos`
--
ALTER TABLE `servicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `usercard`
--
ALTER TABLE `usercard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `endereco`
--
ALTER TABLE `endereco`
  ADD CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`id_municipio`) REFERENCES `municipio` (`id`);

--
-- Restrições para tabelas `municipio`
--
ALTER TABLE `municipio`
  ADD CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`id_provincia`) REFERENCES `provincia` (`id`);

--
-- Restrições para tabelas `provincia`
--
ALTER TABLE `provincia`
  ADD CONSTRAINT `provincia_ibfk_1` FOREIGN KEY (`id_pais`) REFERENCES `pais` (`id`);

--
-- Restrições para tabelas `referencia`
--
ALTER TABLE `referencia`
  ADD CONSTRAINT `referencia_ibfk_1` FOREIGN KEY (`tipo_referencia`) REFERENCES `servicos` (`id`);

--
-- Restrições para tabelas `trocas`
--
ALTER TABLE `trocas`
  ADD CONSTRAINT `trocas_ibfk_1` FOREIGN KEY (`id_referencia`) REFERENCES `referencia` (`id`),
  ADD CONSTRAINT `trocas_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Restrições para tabelas `usercard`
--
ALTER TABLE `usercard`
  ADD CONSTRAINT `usercard_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `usercard_ibfk_2` FOREIGN KEY (`id_card`) REFERENCES `card` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

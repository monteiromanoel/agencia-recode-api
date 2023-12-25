-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: api_agencia_mysql
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20231215190430_Inicial','6.0.25'),('20231215191807_atualizacaoData','6.0.25'),('20231215193211_valoresNulos','6.0.25'),('20231225133646_remoceCD','6.0.25'),('20231225155029_label','6.0.25');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `ClienteId` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `senha` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `documento` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `telefone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `logradouro` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cep` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `uf` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `dataNasc` datetime(6) NOT NULL,
  PRIMARY KEY (`ClienteId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Manoel Monteiro','manoel1@email.com','12345','123.456.789-23','(11) 96852-2292','Rua 1, 110 - Centro','12345-123','SP','1996-02-28 00:00:00.000000'),(2,'Usuario Teste','usuario@teste.com','12345','342.351.231-31','(11) 12344-5556','Rua Teste, 100','12345-678','SP','1990-01-01 00:00:00.000000');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `destino`
--

DROP TABLE IF EXISTS `destino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destino` (
  `DestinoId` int NOT NULL AUTO_INCREMENT,
  `destino` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `data_ida` datetime(6) NOT NULL,
  `data_volta` datetime(6) NOT NULL,
  `descricao_curta` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `descricao_longa` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `adicional` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `localidade` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `imagem` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tipo_pacote` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `imagem2` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `imagem3` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `imagem4` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `preco_antigo` decimal(10,2) DEFAULT NULL,
  `label_promocao` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`DestinoId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `destino`
--

LOCK TABLES `destino` WRITE;
/*!40000 ALTER TABLE `destino` DISABLE KEYS */;
INSERT INTO `destino` VALUES (1,'Veneza',9899.00,'2023-11-05 00:00:00.000000','2023-11-17 00:00:00.000000','Aproveite as belezas de Veneza','<p>Explore a magia de Veneza, uma cidade que parece ter emergido diretamente de um conto de fadas. Com suas pitorescas ruas de paralelep&iacute;pedos e canais sinuosos que serpenteiam pela cidade, Veneza &eacute; verdadeiramente &uacute;nica no mundo. Ao passear pelas pontes hist&oacute;ricas e pra&ccedil;as encantadoras, voc&ecirc; ser&aacute; envolvido pela rica heran&ccedil;a art&iacute;stica e cultural que permeia cada canto desta cidade.</p>\n <p>Sinta a atmosfera rom&acirc;ntica enquanto faz um passeio de g&ocirc;ndola pelos canais, sob as pontes ornamentadas e ao lado das elegantes fachadas dos pal&aacute;cios venezianos. Explore os famosos pontos tur&iacute;sticos, como a deslumbrante Bas&iacute;lica de S&atilde;o Marcos e o ic&ocirc;nico Pal&aacute;cio Ducal, que contam hist&oacute;rias de uma era de esplendor e poder.</p>\n <p>Deleite-se com a culin&aacute;ria veneziana, onde pratos de frutos do mar frescos s&atilde;o preparados com maestria. N&atilde;o se esque&ccedil;a de experimentar o \'risotto al nero di seppia\', um arroz negro delicadamente temperado com tinta de lula, uma especialidade local.</p>\n <p>&Agrave; noite, enquanto o sol se p&otilde;e sobre os canais, Veneza ganha uma aura m&aacute;gica. As luzes suaves refletem na &aacute;gua, criando um cen&aacute;rio verdadeiramente rom&acirc;ntico. Percorra as ruas &agrave; luz de lanternas e descubra pequenas trattorias e bares de vinho, onde voc&ecirc; pode saborear um bom vinho italiano e se perder no charme inigual&aacute;vel de Veneza.</p>\n <p>Em Veneza, cada esquina revela uma nova surpresa, cada canal conta uma hist&oacute;ria e cada vista &eacute; uma obra de arte. Esta cidade &eacute; uma experi&ecirc;ncia que ficar&aacute; gravada na mem&oacute;ria para sempre.</p>','Hospedagem e Tour','Itália','https://i.postimg.cc/9Xk4wKKY/veneza-1.jpg','convencional','https://h8f7z4t2.stackpathcdn.com/wp-content/uploads/2015/10/grand-canal-veneza-e1596744121749.jpg',NULL,NULL,NULL,NULL),(2,'Disney World',11890.00,'2024-01-03 03:00:00.000000','2024-01-15 03:00:00.000000','Divirta-se no mundo mágico da Disney','<p>? <strong>Viva a Magia na Disney: Uma Experi&ecirc;ncia Inesquec&iacute;vel!</strong> ?✨</p>\n<p>Voc&ecirc; sonha em conhecer o lugar onde a magia se torna realidade? Prepare-se para uma aventura &uacute;nica e m&aacute;gica na Terra dos Sonhos - a Disney!</p>\n<p>Junte-se a n&oacute;s em uma jornada extraordin&aacute;ria repleta de emo&ccedil;&otilde;es, divers&atilde;o e personagens ador&aacute;veis que ganham vida. &Eacute; hora de explorar os encantos dos parques tem&aacute;ticos mais ic&ocirc;nicos do mundo, onde cada esquina reserva uma surpresa m&aacute;gica.</p>\n<p>? <strong>Explore os Parques Tem&aacute;ticos:</strong></p>\n<ul>\n<li>Embarque em emocionantes montanhas-russas e atra&ccedil;&otilde;es alucinantes.</li>\n<li>Conhe&ccedil;a seus personagens favoritos da Disney e tire fotos inesquec&iacute;veis.</li>\n<li>Desfrute de shows espetaculares e desfiles encantadores.</li>\n</ul>\n<p>? <strong>Viva Momentos Inesquec&iacute;veis:</strong></p>\n<ul>\n<li>Sinta a emo&ccedil;&atilde;o ao assistir aos fogos de artif&iacute;cio espetaculares.</li>\n<li>Saboreie deliciosas guloseimas e refei&ccedil;&otilde;es tem&aacute;ticas.</li>\n<li>Divirta-se em experi&ecirc;ncias interativas e surpreendentes.</li>\n</ul>\n<p>? <strong>A Viagem dos Sonhos Come&ccedil;a Aqui:</strong></p>\n<p>Junte-se a n&oacute;s nesta jornada &uacute;nica e traga &agrave; vida os sonhos da sua inf&acirc;ncia. Vamos criar mem&oacute;rias m&aacute;gicas que durar&atilde;o para sempre!</p>\n<p>?&nbsp;<strong>Local:</strong> Disneyland Resort, Orlando, Florida</p>\n<p>N&atilde;o deixe a oportunidade de viver essa aventura m&aacute;gica passar! Reserve seu lugar e mergulhe na magia da Disney!</p>\n<p>Para mais informa&ccedil;&otilde;es e reservas, entre em contato conosco.</p>\n<p>Venha fazer parte desta jornada inesquec&iacute;vel e transforme seus sonhos em realidade na Disney!</p>','Hospedagem e Tour','Orlando','https://i.postimg.cc/d18WZGt8/disney-1-1.jpg','promocional',NULL,NULL,NULL,15600.00,'Imperdível');
/*!40000 ALTER TABLE `destino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `ReservaId` int NOT NULL AUTO_INCREMENT,
  `NumPassageiros` int NOT NULL,
  `DataReserva` datetime(6) NOT NULL,
  `Preco` decimal(10,2) NOT NULL,
  `ClienteId` int NOT NULL,
  `DestinoId` int NOT NULL,
  PRIMARY KEY (`ReservaId`),
  KEY `ClienteId_idx` (`ClienteId`),
  KEY `DestinoId_idx` (`DestinoId`),
  CONSTRAINT `ClienteId` FOREIGN KEY (`ClienteId`) REFERENCES `cliente` (`ClienteId`),
  CONSTRAINT `DestinoId` FOREIGN KEY (`DestinoId`) REFERENCES `destino` (`DestinoId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (1,1,'2023-12-16 10:53:00.000000',9899.00,1,1),(3,3,'2023-12-25 13:49:17.937000',29697.00,2,1),(4,2,'2023-12-25 15:51:43.656000',23780.00,2,2);
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'api_agencia_mysql'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-25 12:53:06

-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: xpto_db
-- ------------------------------------------------------
-- Server version	8.0.37

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
-- Table structure for table `tb_cadastro`
--

DROP TABLE IF EXISTS `tb_cadastro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_cadastro` (
  `ID_CADASTRO` int NOT NULL AUTO_INCREMENT,
  `NOME` varchar(255) NOT NULL,
  `SENHA` varchar(255) DEFAULT NULL,
  `CPF` varchar(14) NOT NULL,
  `EMAIL` varchar(100) NOT NULL,
  `TELEFONE` varchar(20) NOT NULL,
  `GENERO` varchar(15) DEFAULT NULL,
  `DATA_NASC` date DEFAULT NULL,
  `CATEGORIA` enum('Colaborador','Administrador') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ENDERECO` varchar(100) DEFAULT NULL,
  `BAIRRO` varchar(50) DEFAULT NULL,
  `CIDADE` varchar(40) DEFAULT NULL,
  `PAIS` varchar(40) DEFAULT NULL,
  `UF` char(2) DEFAULT NULL,
  PRIMARY KEY (`ID_CADASTRO`),
  UNIQUE KEY `idx_cpf_unique` (`CPF`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_cadastro`
--

LOCK TABLES `tb_cadastro` WRITE;
/*!40000 ALTER TABLE `tb_cadastro` DISABLE KEYS */;
INSERT INTO `tb_cadastro` VALUES (1,'Lucas Pereira','','123.456.789-00','lucas.pereira@email.com','(11) 91234-5678','Masculino','1990-01-15','Administrador','Rua F, 10','Jardim Paulista','São Paulo','Brasil','SP'),(2,'Mariana Costa',NULL,'987.654.321-00','mariana.costa@email.com','(21) 99876-5432','Feminino','1988-03-22','Colaborador','Avenida G, 20','Copacabana','Rio de Janeiro','Brasil','RJ'),(3,'Fernando Lima Ferreira','','456.123.789-00','fernando.lima@email.com','(31) 98765-4321','Masculino','1995-06-30','Administrador','Rua H, 30','Centro','Belo Horizonte','Brasil','MG'),(4,'Julia Santos',NULL,'321.654.987-00','julia.santos@email.com','(41) 91234-5678','Feminino','1992-12-05','Colaborador','Praça I, 40','Centro','Curitiba','Brasil','PR'),(16,'Ana Clara Silva',NULL,'123.456.789-01','ana.clara@example.com','(11) 91234-5678','Feminino','1995-05-12','Colaborador','Rua das Flores, 123','Jardim das Rosas','São Paulo','Brasil','SP'),(18,'Mariana Oliveira',NULL,'456.123.789-09','mariana.oliveira@example.com','(31) 99876-5432','Feminino','1992-02-14','Colaborador','Praça da Liberdade, 789','Liberdade','Belo Horizonte','Brasil','MG'),(20,'Juliana Costa',NULL,'159.753.486-07','juliana.costa@example.com','(51) 98765-4321','Feminino','1990-07-19','Colaborador','Avenida Independência, 567','Centro Histórico','Porto Alegre','Brasil','RS'),(22,'Felipe Barros','$2y$10$6yYCWKLjVC62vDUoCOvofeOKgoz4/NZP2XVqQc0YjWHlXa1.fEgCi','542.318.952-22','felipe.12@gmail.com','(41) 91234-5678','Masculino','1999-12-20','Colaborador','Rua Canoas','Industrial','Canoas','Brasil','RS');
/*!40000 ALTER TABLE `tb_cadastro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-11 12:30:24

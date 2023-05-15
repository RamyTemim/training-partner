-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: training_partner
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `exercice_muscu`
--

DROP TABLE IF EXISTS `exercice_muscu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercice_muscu` (
  `idExercice` int NOT NULL AUTO_INCREMENT,
  `seanceIdSeance` int NOT NULL,
  `nbrSerie` int NOT NULL,
  `nbrRep` int NOT NULL,
  `poids` int NOT NULL,
  `nom` varchar(45) NOT NULL,
  `tmpsRepos` varchar(6) DEFAULT NULL,
  `userPseudo` varchar(20) NOT NULL,
  PRIMARY KEY (`idExercice`,`seanceIdSeance`),
  KEY `fk_exercice1_seance_idx` (`seanceIdSeance`,`userPseudo`),
  CONSTRAINT `fk_exercice1_seance` FOREIGN KEY (`seanceIdSeance`, `userPseudo`) REFERENCES `seance` (`idSeance`, `userPseudo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercice_muscu`
--

LOCK TABLES `exercice_muscu` WRITE;
/*!40000 ALTER TABLE `exercice_muscu` DISABLE KEYS */;
INSERT INTO `exercice_muscu` VALUES (1,1,1,1,1,'test1',NULL,'John'),(2,1,2,2,2,'test2',NULL,'John');
/*!40000 ALTER TABLE `exercice_muscu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-15 21:27:18
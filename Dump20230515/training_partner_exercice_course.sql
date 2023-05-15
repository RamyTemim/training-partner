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
-- Table structure for table `exercice_course`
--

DROP TABLE IF EXISTS `exercice_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercice_course` (
  `idExerciceCourse` int NOT NULL AUTO_INCREMENT,
  `seanceIdSeance` int NOT NULL,
  `distance` int NOT NULL,
  `chrono` varchar(6) NOT NULL,
  `bpm` int DEFAULT NULL,
  `vitesse` int DEFAULT NULL,
  `nom` varchar(45) NOT NULL,
  `userPseudo` varchar(20) NOT NULL,
  PRIMARY KEY (`idExerciceCourse`),
  KEY `fk_exerciceC1_seance_idx` (`seanceIdSeance`,`userPseudo`),
  CONSTRAINT `fk_exerciceC1_seance` FOREIGN KEY (`seanceIdSeance`, `userPseudo`) REFERENCES `seance` (`idSeance`, `userPseudo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercice_course`
--

LOCK TABLES `exercice_course` WRITE;
/*!40000 ALTER TABLE `exercice_course` DISABLE KEYS */;
INSERT INTO `exercice_course` VALUES (1,2,100,'00:11',157,21,'100m','John'),(2,2,200,'00:22',160,16,'200m','John'),(3,3,98,'00:13',140,17,'100m','John'),(4,4,97,'10:00',130,25,'100m','John');
/*!40000 ALTER TABLE `exercice_course` ENABLE KEYS */;
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

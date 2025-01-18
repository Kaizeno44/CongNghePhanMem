-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: login
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
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add user',7,'add_user'),(26,'Can change user',7,'change_user'),(27,'Can delete user',7,'delete_user'),(28,'Can view user',7,'view_user'),(29,'Can add custom user',8,'add_customuser'),(30,'Can change custom user',8,'change_customuser'),(31,'Can delete custom user',8,'delete_customuser'),(32,'Can view custom user',8,'view_customuser'),(33,'Can add employee',9,'add_employee'),(34,'Can change employee',9,'change_employee'),(35,'Can delete employee',9,'delete_employee'),(36,'Can view employee',9,'view_employee'),(37,'Can add product',10,'add_product'),(38,'Can change product',10,'change_product'),(39,'Can delete product',10,'delete_product'),(40,'Can view product',10,'view_product'),(41,'Can add product category',11,'add_productcategory'),(42,'Can change product category',11,'change_productcategory'),(43,'Can delete product category',11,'delete_productcategory'),(44,'Can view product category',11,'view_productcategory'),(45,'Can add voucher',12,'add_voucher'),(46,'Can change voucher',12,'change_voucher'),(47,'Can delete voucher',12,'delete_voucher'),(48,'Can view voucher',12,'view_voucher'),(49,'Can add article',13,'add_article'),(50,'Can change article',13,'change_article'),(51,'Can delete article',13,'delete_article'),(52,'Can view article',13,'view_article'),(53,'Can add order',14,'add_order'),(54,'Can change order',14,'change_order'),(55,'Can delete order',14,'delete_order'),(56,'Can view order',14,'view_order'),(57,'Can add cart',15,'add_cart'),(58,'Can change cart',15,'change_cart'),(59,'Can delete cart',15,'delete_cart'),(60,'Can view cart',15,'view_cart'),(61,'Can add order item',16,'add_orderitem'),(62,'Can change order item',16,'change_orderitem'),(63,'Can delete order item',16,'delete_orderitem'),(64,'Can view order item',16,'view_orderitem'),(65,'Can add cart item',17,'add_cartitem'),(66,'Can change cart item',17,'change_cartitem'),(67,'Can delete cart item',17,'delete_cartitem'),(68,'Can view cart item',17,'view_cartitem'),(69,'Can add promotion',18,'add_promotion'),(70,'Can change promotion',18,'change_promotion'),(71,'Can delete promotion',18,'delete_promotion'),(72,'Can view promotion',18,'view_promotion'),(73,'Can add reward',19,'add_reward'),(74,'Can change reward',19,'change_reward'),(75,'Can delete reward',19,'delete_reward'),(76,'Can view reward',19,'view_reward'),(77,'Can add point',20,'add_point'),(78,'Can change point',20,'change_point'),(79,'Can delete point',20,'delete_point'),(80,'Can view point',20,'view_point'),(81,'Can add brand',21,'add_brand'),(82,'Can change brand',21,'change_brand'),(83,'Can delete brand',21,'delete_brand'),(84,'Can view brand',21,'view_brand');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_fk_customuser_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_fk_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `webbansua_customuser` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (10,'2024-12-28 01:47:23.297693','11','abc',1,'[{\"added\": {}}]',8,3),(11,'2024-12-28 02:01:50.989400','5','baba',3,'',8,3),(12,'2024-12-28 02:02:47.205913','12','Đoàn Trần Hải Nguyên',1,'[{\"added\": {}}]',9,3),(13,'2024-12-30 09:04:07.953106','12','abcdefg',1,'[{\"added\": {}}]',8,3),(14,'2025-01-03 07:37:09.390764','1','sữa',1,'[{\"added\": {}}]',10,3),(15,'2025-01-03 07:37:38.400350','1','sữa',3,'',10,3),(16,'2025-01-04 08:15:02.068895','2','sữa',1,'[{\"added\": {}}]',10,3),(17,'2025-01-04 09:25:01.655892','3','bánh',1,'[{\"added\": {}}]',10,3),(18,'2025-01-04 09:39:32.362734','3','bánh',3,'',10,3),(19,'2025-01-04 09:41:51.827092','2','sữa',2,'[{\"changed\": {\"fields\": [\"Image\", \"Image url\"]}}]',10,3),(20,'2025-01-08 03:19:39.525285','1','giảm giá hàng tuần',1,'[{\"added\": {}}]',18,3),(21,'2025-01-08 03:30:22.285018','1','giảm giá hàng tuần',3,'',18,3),(22,'2025-01-08 03:30:51.255298','2','giảm giá hàng tuần',1,'[{\"added\": {}}]',18,3),(23,'2025-01-08 03:42:21.679243','3','giảm giá cuối tuần',1,'[{\"added\": {}}]',18,3),(24,'2025-01-08 03:43:37.155230','4','săn seo cuối năm',1,'[{\"added\": {}}]',18,3),(25,'2025-01-08 03:44:42.420692','5','săn seo cuối nămmm',1,'[{\"added\": {}}]',18,3),(26,'2025-01-08 03:55:47.487226','2','Order 2 - 1234567890',1,'[{\"added\": {}}]',14,3),(27,'2025-01-08 03:56:14.006551','1','741179',1,'[{\"added\": {}}]',12,3),(28,'2025-01-08 04:00:24.818607','2','Order 2 - 1234567890',2,'[{\"changed\": {\"fields\": [\"Voucher\"]}}]',14,3),(29,'2025-01-08 08:17:13.907381','4','bánh',1,'[{\"added\": {}}]',10,3),(30,'2025-01-08 08:20:55.307716','4','bánh',2,'[{\"changed\": {\"fields\": [\"Description\"]}}]',10,3),(31,'2025-01-09 09:06:02.182123','2','258167 - THTrueMilk',1,'[{\"added\": {}}]',12,3),(32,'2025-01-09 09:07:11.623410','1','741179 - Generic',3,'',12,3),(33,'2025-01-09 09:55:23.000230','4','bánh',2,'[{\"changed\": {\"fields\": [\"Sale price\"]}}]',10,3),(34,'2025-01-10 08:09:31.284736','3','11222 - vinamilk',1,'[{\"added\": {}}]',12,3),(35,'2025-01-10 09:28:40.950665','4','111111 - THTrueMilk',1,'[{\"added\": {}}]',12,3),(36,'2025-01-10 09:29:36.306356','4','111111 - vinamilk',2,'[{\"changed\": {\"fields\": [\"Brand\"]}}]',12,3),(37,'2025-01-11 01:37:50.623376','4','bánh',2,'[{\"changed\": {\"fields\": [\"Price\", \"Sale price\"]}}]',10,3),(38,'2025-01-11 09:09:43.037049','4','111111 - THTrueMilk',2,'[{\"changed\": {\"fields\": [\"Brand\"]}}]',12,3),(39,'2025-01-11 15:18:08.440860','5','Bộ 2 hộp Yến sào Bionest Kids cao cấp - hộp tiết kiệm 6 lọ',1,'[{\"added\": {}}]',10,3),(40,'2025-01-11 15:25:05.667679','5','Bộ 2 hộp Yến sào Bionest Kids cao cấp - hộp tiết kiệm 6 lọ',2,'[{\"changed\": {\"fields\": [\"Category\"]}}]',10,3),(41,'2025-01-12 05:32:27.088647','6','Sữa hạt Forganic đa dưỡng chất 800g tặng Sữa bữa ăn thay thế 400g [Mua 1 Tặng 1]',1,'[{\"added\": {}}]',10,3),(42,'2025-01-12 05:33:47.395457','7','Sữa Tăng Chiều Cao Nobiko Nhập Khẩu Nhật Bản, Cho Trẻ 2 Đến 16 Tuổi',1,'[{\"added\": {}}]',10,3),(43,'2025-01-12 05:33:56.060133','4','bánh',3,'',10,3),(44,'2025-01-12 05:34:01.524523','2','sữa',3,'',10,3),(45,'2025-01-12 05:35:44.365681','8','Sữa Nan InfiniPro A2 số 3 800g [Combo 6 Lon][Có Quà] cho bé 2-6 tuổi. Tặng xe đạp 12inch cho bé',1,'[{\"added\": {}}]',10,3),(46,'2025-01-12 05:37:39.123310','9','Sữa Nan InfiniPro A2 số 3 800g cho bé 2-6 tuổi. [Combo 2 Lon][Có Quà] Tặng xe điều khiển từ xa cho bé',1,'[{\"added\": {}}]',10,3),(47,'2025-01-12 05:45:39.393390','6','Sữa hạt Forganic đa dưỡng chất 800g tặng Sữa bữa ăn thay thế 400g [Mua 1 Tặng 1]',2,'[]',10,3),(48,'2025-01-12 05:47:18.056008','6','Sữa tăng chiều cao Hiup 650gr (cho bé 3 - 18 tuổi)',2,'[{\"changed\": {\"fields\": [\"Name\", \"Price\", \"Sale price\", \"Quantity\", \"Image url\"]}}]',10,3),(49,'2025-01-12 06:12:32.220748','1','1 of Sữa tăng chiều cao Hiup 650gr (cho bé 3 - 18 tuổi) for 11111',1,'[{\"added\": {}}]',17,3),(50,'2025-01-12 06:27:13.790820','2','2 of Bộ 2 hộp Yến sào Bionest Kids cao cấp - hộp tiết kiệm 6 lọ for abc',1,'[{\"added\": {}}]',17,3),(51,'2025-01-12 06:38:49.691041','16','alonso',3,'',8,3),(52,'2025-01-12 06:39:01.364820','6','kaka',3,'',8,3),(53,'2025-01-12 06:39:07.773523','11','abc',3,'',8,3),(54,'2025-01-12 06:39:11.715862','19','1nam0tam',3,'',8,3),(55,'2025-01-12 06:39:29.309173','4','nguyenbodoi',3,'',8,3),(56,'2025-01-12 06:39:35.652916','7','ak',3,'',8,3),(57,'2025-01-12 06:39:40.072969','14','testuser',3,'',8,3),(58,'2025-01-12 06:39:44.514611','12','abcdefg',3,'',8,3),(59,'2025-01-12 06:39:49.266159','1','aloalo123',3,'',8,3),(60,'2025-01-12 06:39:54.065543','18','alo',3,'',8,3),(61,'2025-01-12 06:40:02.287266','2','11111',3,'',8,3),(62,'2025-01-12 06:40:09.278619','17','kaizenoooooo',3,'',8,3),(63,'2025-01-12 06:40:14.322679','13','be',3,'',8,3),(64,'2025-01-13 12:58:12.087598','20','huyech123',3,'',8,3),(65,'2025-01-14 00:30:41.829636','10','10',1,'[{\"added\": {}}]',10,3),(66,'2025-01-14 00:32:24.462613','11','11',1,'[{\"added\": {}}]',10,3),(67,'2025-01-14 00:33:28.931231','12','12',1,'[{\"added\": {}}]',10,3),(68,'2025-01-14 00:35:35.361198','8','8',2,'[{\"changed\": {\"fields\": [\"Status\"]}}]',10,3),(69,'2025-01-14 06:11:05.564617','8','8',2,'[{\"changed\": {\"fields\": [\"Status\"]}}]',10,3),(70,'2025-01-14 13:23:22.173991','7','Sữa Tăng Chiều Cao Nobiko Nhập Khẩu Nhật Bản, Cho Trẻ 2 Đến 16 Tuổi',2,'[{\"changed\": {\"fields\": [\"Status\"]}}]',10,3),(71,'2025-01-14 14:24:52.101042','22','huyech123',3,'',8,3),(72,'2025-01-14 14:25:19.389311','23','huyech123',1,'[{\"added\": {}}]',8,3),(73,'2025-01-14 14:28:31.851710','7','1 of Sữa tăng chiều cao Hiup 650gr (cho bé 3 - 18 tuổi) for 123456',3,'',17,3),(74,'2025-01-14 14:28:36.780070','8','1 of Sữa tăng chiều cao Hiup 650gr (cho bé 3 - 18 tuổi) for 123456',3,'',17,3),(75,'2025-01-14 14:28:39.942918','9','1 of Sữa tăng chiều cao Hiup 650gr (cho bé 3 - 18 tuổi) for 123456',3,'',17,3),(76,'2025-01-14 14:28:42.981763','10','1 of Sữa tăng chiều cao Hiup 650gr (cho bé 3 - 18 tuổi) for 123456',3,'',17,3),(77,'2025-01-14 14:28:46.330681','11','1 of Sữa tăng chiều cao Hiup 650gr (cho bé 3 - 18 tuổi) for 123456',3,'',17,3),(78,'2025-01-14 14:28:49.999748','12','1 of Sữa Nan InfiniPro A2 số 3 800g [Combo 6 Lon][Có Quà] cho bé 2-6 tuổi. Tặng xe đạp 12inch cho bé for 123456',3,'',17,3),(79,'2025-01-14 14:28:53.301995','13','1 of Sữa Nan InfiniPro A2 số 3 800g [Combo 6 Lon][Có Quà] cho bé 2-6 tuổi. Tặng xe đạp 12inch cho bé for 123456',3,'',17,3),(80,'2025-01-14 16:03:57.127559','14','1 of Sữa tăng chiều cao Hiup 650gr (cho bé 3 - 18 tuổi) for 123456',2,'[{\"changed\": {\"fields\": [\"Quantity\"]}}]',17,3),(81,'2025-01-15 00:56:39.103962','24','huybv123',2,'[]',8,3),(82,'2025-01-15 01:00:12.583193','23','huyech123',3,'',8,3),(83,'2025-01-15 01:00:23.754353','21','1234567',3,'',8,3),(84,'2025-01-15 02:10:53.970566','15','4 of Sữa Nan InfiniPro A2 số 3 800g [Combo 6 Lon][Có Quà] cho bé 2-6 tuổi. Tặng xe đạp 12inch cho bé for 123456',3,'',17,3),(85,'2025-01-15 02:11:03.401857','16','1 of Sữa tăng chiều cao Hiup 650gr (cho bé 3 - 18 tuổi) for huybv123',3,'',17,3),(86,'2025-01-15 02:11:08.283729','17','6 of Sữa Nan InfiniPro A2 số 3 800g [Combo 6 Lon][Có Quà] cho bé 2-6 tuổi. Tặng xe đạp 12inch cho bé for huybv123',3,'',17,3),(87,'2025-01-15 02:11:13.764766','18','3 of Sữa Nan InfiniPro A2 số 3 800g cho bé 2-6 tuổi. [Combo 2 Lon][Có Quà] Tặng xe điều khiển từ xa cho bé for huybv123',3,'',17,3),(88,'2025-01-15 02:11:17.535523','19','1 of Sữa  Danalac 1 400g (0-6 tháng) for huybv123',3,'',17,3),(89,'2025-01-15 05:31:34.469291','25','admin',3,'',8,3),(90,'2025-01-15 05:37:11.105963','27','1 of Bộ 2 hộp Yến sào Bionest Kids cao cấp - hộp tiết kiệm 6 lọ for admin',3,'',17,3),(91,'2025-01-15 05:37:14.193450','26','1 of Sữa tăng chiều cao Hiup 650gr (cho bé 3 - 18 tuổi) for admin',3,'',17,3),(92,'2025-01-15 05:37:17.549222','25','1 of Sữa Nan InfiniPro A2 số 3 800g [Combo 6 Lon][Có Quà] cho bé 2-6 tuổi. Tặng xe đạp 12inch cho bé for admin',3,'',17,3),(93,'2025-01-15 05:37:21.905798','24','1 of Sữa Nan InfiniPro A2 số 3 800g cho bé 2-6 tuổi. [Combo 2 Lon][Có Quà] Tặng xe điều khiển từ xa cho bé for admin',3,'',17,3),(94,'2025-01-15 05:37:32.238873','23','1 of Sữa tăng chiều cao Hiup 650gr (cho bé 3 - 18 tuổi) for huybv123',3,'',17,3),(95,'2025-01-15 05:37:39.219820','21','2 of Sữa Nan InfiniPro A2 số 3 800g [Combo 6 Lon][Có Quà] cho bé 2-6 tuổi. Tặng xe đạp 12inch cho bé for huybv123',3,'',17,3),(96,'2025-01-15 06:18:57.618966','27','066205000162',3,'',8,3),(97,'2025-01-15 06:36:28.966737','13','Sữa bầu Morinaga E-Okasan vị trà sữa 800g',1,'[{\"added\": {}}]',10,3),(98,'2025-01-15 07:27:59.053359','5','săn seo cuối nămmm',3,'',18,3),(99,'2025-01-15 07:28:02.619223','4','săn seo cuối năm',3,'',18,3),(100,'2025-01-15 08:31:46.499700','3','giảm giá cuối tuần',3,'',18,3),(101,'2025-01-15 08:31:54.458708','2','giảm giá hàng tuần',3,'',18,3),(102,'2025-01-15 08:33:26.553804','6','Khuyến mại 1',1,'[{\"added\": {}}]',18,3),(103,'2025-01-15 08:40:14.954409','6','Khuyến mại 1',3,'',18,3),(104,'2025-01-15 08:47:19.690697','7','Khuyến mãi',1,'[{\"added\": {}}]',18,3),(105,'2025-01-15 08:54:14.217810','8','Khuyến mại',1,'[{\"added\": {}}]',18,3),(106,'2025-01-15 08:55:21.689612','9','Khuyến mại',1,'[{\"added\": {}}]',18,3),(107,'2025-01-15 08:55:48.883239','10','KHuyến mại',1,'[{\"added\": {}}]',18,3),(108,'2025-01-15 13:30:51.089586','29','ftytran',3,'',8,3),(109,'2025-01-15 13:30:57.372213','24','huybv123',3,'',8,3),(110,'2025-01-15 13:31:03.266979','26','admin',3,'',8,3),(111,'2025-01-16 04:15:06.583715','33','1 of Sữa tăng chiều cao Hiup 650gr (cho bé 3 - 18 tuổi) for admin',3,'',17,3),(112,'2025-01-16 13:17:09.384003','14','Sữa Tăng Chiều Cao Nobiko Nhập Khẩu Nhật Bản, Cho Trẻ 2 Đến 16 Tuổi',1,'[{\"added\": {}}]',10,3),(113,'2025-01-18 01:54:21.504118','17','OrderItem object (17)',3,'',16,3),(114,'2025-01-18 01:54:27.321114','16','OrderItem object (16)',3,'',16,3),(115,'2025-01-18 01:54:30.097105','15','OrderItem object (15)',3,'',16,3),(116,'2025-01-18 01:54:34.338542','14','OrderItem object (14)',3,'',16,3),(117,'2025-01-18 01:54:37.058119','13','OrderItem object (13)',3,'',16,3),(118,'2025-01-18 01:54:41.492428','12','OrderItem object (12)',3,'',16,3),(119,'2025-01-18 01:54:44.154224','11','OrderItem object (11)',3,'',16,3),(120,'2025-01-18 01:54:46.481511','10','OrderItem object (10)',3,'',16,3),(121,'2025-01-18 01:54:48.912340','9','OrderItem object (9)',3,'',16,3),(122,'2025-01-18 01:54:53.441047','8','OrderItem object (8)',3,'',16,3),(123,'2025-01-18 01:54:56.291172','7','OrderItem object (7)',3,'',16,3),(124,'2025-01-18 01:55:00.874597','6','OrderItem object (6)',3,'',16,3),(125,'2025-01-18 01:55:03.334866','5','OrderItem object (5)',3,'',16,3),(126,'2025-01-18 01:55:07.266993','4','OrderItem object (4)',3,'',16,3),(127,'2025-01-18 01:55:09.566961','3','OrderItem object (3)',3,'',16,3),(128,'2025-01-18 01:55:13.534913','2','OrderItem object (2)',3,'',16,3),(129,'2025-01-18 01:55:17.064317','1','OrderItem object (1)',3,'',16,3),(130,'2025-01-18 01:55:24.168825','13','Order 13 - 342345345',3,'',14,3),(131,'2025-01-18 01:55:27.330206','11','Order 11 - 23454543',3,'',14,3),(132,'2025-01-18 01:55:30.248717','12','Order 12 - 12434532423',3,'',14,3),(133,'2025-01-18 01:55:33.875306','10','Order 10 - 32432423',3,'',14,3),(134,'2025-01-18 01:55:36.815224','9','Order 9 - 34324324',3,'',14,3),(135,'2025-01-18 01:55:39.536938','8','Order 8 - 3243245435',3,'',14,3),(136,'2025-01-18 01:55:41.905470','7','Order 7 - 012345678',3,'',14,3),(137,'2025-01-18 01:55:45.283487','6','Order 6 - 1234324543',3,'',14,3),(138,'2025-01-18 01:55:48.621727','5','Order 5 - 012345678',3,'',14,3),(139,'2025-01-18 01:55:52.577635','4','Order 4 - 0868698389',3,'',14,3),(140,'2025-01-18 01:55:55.328310','3','Order 3 - 012345678',3,'',14,3);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(13,'webbansua','article'),(21,'webbansua','brand'),(15,'webbansua','cart'),(17,'webbansua','cartitem'),(8,'webbansua','customuser'),(9,'webbansua','employee'),(14,'webbansua','order'),(16,'webbansua','orderitem'),(20,'webbansua','point'),(10,'webbansua','product'),(11,'webbansua','productcategory'),(18,'webbansua','promotion'),(19,'webbansua','reward'),(7,'webbansua','user'),(12,'webbansua','voucher');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-12-26 01:25:51.722615'),(2,'auth','0001_initial','2024-12-26 01:25:52.430921'),(3,'admin','0001_initial','2024-12-26 01:25:52.591970'),(4,'admin','0002_logentry_remove_auto_add','2024-12-26 01:25:52.599089'),(5,'admin','0003_logentry_add_action_flag_choices','2024-12-26 01:25:52.609418'),(6,'contenttypes','0002_remove_content_type_name','2024-12-26 01:25:52.713196'),(7,'auth','0002_alter_permission_name_max_length','2024-12-26 01:25:52.783608'),(8,'auth','0003_alter_user_email_max_length','2024-12-26 01:25:52.805565'),(9,'auth','0004_alter_user_username_opts','2024-12-26 01:25:52.808980'),(10,'auth','0005_alter_user_last_login_null','2024-12-26 01:25:52.868838'),(11,'auth','0006_require_contenttypes_0002','2024-12-26 01:25:52.872020'),(12,'auth','0007_alter_validators_add_error_messages','2024-12-26 01:25:52.878818'),(13,'auth','0008_alter_user_username_max_length','2024-12-26 01:25:52.948752'),(14,'auth','0009_alter_user_last_name_max_length','2024-12-26 01:25:53.017188'),(15,'auth','0010_alter_group_name_max_length','2024-12-26 01:25:53.038808'),(16,'auth','0011_update_proxy_permissions','2024-12-26 01:25:53.044476'),(17,'auth','0012_alter_user_first_name_max_length','2024-12-26 01:25:53.119136'),(18,'sessions','0001_initial','2024-12-26 01:25:53.158366'),(19,'webbansua','0001_initial','2024-12-26 01:25:53.193903'),(20,'webbansua','0002_user_created_at_alter_user_email_alter_user_username','2024-12-26 01:54:45.900108'),(21,'webbansua','0003_customuser_delete_user','2024-12-26 02:15:24.378420'),(22,'webbansua','0004_rename_created_at_customuser_date_joined_and_more','2024-12-26 12:12:14.720400'),(23,'webbansua','0005_rename_date_joined_customuser_created_at','2024-12-27 13:05:01.952068'),(24,'webbansua','0006_employee_product_productcategory_voucher_and_more','2024-12-27 14:16:06.863181'),(25,'webbansua','0007_employee_user','2024-12-27 15:14:06.707505'),(26,'webbansua','0008_remove_customuser_phone','2024-12-27 15:44:04.146439'),(27,'webbansua','0009_cart_cartitem_orderitem','2024-12-29 02:30:23.671380'),(28,'webbansua','0010_promotion','2024-12-29 03:00:40.802659'),(29,'webbansua','0011_product_image_product_image_url','2024-12-29 03:03:55.379576'),(30,'webbansua','0012_alter_customuser_options_alter_customuser_table','2024-12-31 10:56:32.920842'),(31,'webbansua','0013_customuser_phone_number_order_phone_number_and_more','2025-01-08 02:38:15.698155'),(32,'webbansua','0014_order_voucher','2025-01-08 03:59:51.006818'),(33,'webbansua','0015_alter_product_category_product_sale_price_and_more','2025-01-08 11:54:39.027102'),(34,'webbansua','0016_remove_voucher_discount_voucher_brand_and_more','2025-01-08 12:03:27.248037'),(35,'webbansua','0017_alter_voucher_brand','2025-01-10 08:53:26.347743'),(36,'webbansua','0017_remove_voucher_brand_voucher_brand_id_and_more','2025-01-10 09:27:43.594414'),(37,'webbansua','0018_remove_voucher_brand_id_voucher_brand','2025-01-10 09:27:43.639869'),(38,'webbansua','0019_brand_remove_voucher_brand','2025-01-11 01:25:22.488247'),(39,'webbansua','0020_remove_voucher_brand_id','2025-01-11 01:25:22.534565'),(40,'webbansua','0021_remove_product_stock_product_quantity','2025-01-11 01:43:13.369167'),(41,'webbansua','0022_remove_cartitem_cart_remove_product_image_and_more','2025-01-11 08:42:59.518421'),(42,'webbansua','0023_reward_remove_cartitem_cart_remove_product_image_and_more','2025-01-11 09:57:14.684360'),(43,'webbansua','0024_remove_cartitem_cart','2025-01-11 10:12:53.950674'),(44,'webbansua','0025_remove_cartitem_cart_remove_product_image','2025-01-11 10:13:18.894217'),(45,'webbansua','0026_remove_cartitem_cart','2025-01-11 10:13:18.899063'),(46,'webbansua','0027_remove_cartitem_cart_delete_cart','2025-01-11 10:15:13.386266'),(47,'webbansua','0017_alter_product_category_alter_product_status','2025-01-11 14:22:07.808335'),(48,'webbansua','0028_merge_20250111_2121','2025-01-11 14:22:07.821463'),(49,'webbansua','0017_reward_remove_cartitem_cart_and_more','2025-01-11 15:06:14.412109'),(50,'webbansua','0018_cartitem_price','2025-01-11 16:01:36.814167'),(51,'webbansua','0019_remove_cartitem_user','2025-01-14 00:38:31.134248'),(52,'webbansua','0020_cartitem_user','2025-01-14 13:04:08.500929'),(53,'webbansua','0021_remove_cartitem_image_url_and_more','2025-01-14 13:04:08.638674'),(54,'webbansua','0022_cartitem_image_url','2025-01-14 13:12:21.721062'),(55,'webbansua','0023_alter_customuser_options_remove_customuser_points_and_more','2025-01-15 00:53:31.064482'),(56,'webbansua','0024_remove_employee_email','2025-01-15 06:12:08.652238'),(57,'webbansua','0025_remove_promotion_discount_percent_and_more','2025-01-15 08:44:54.396862'),(58,'webbansua','0026_brand_remove_point_order_remove_point_user_and_more','2025-01-17 14:00:37.189990'),(59,'webbansua','0027_order_total_price','2025-01-18 00:53:42.489647'),(60,'webbansua','0028_remove_order_product','2025-01-18 01:15:02.736364');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('07swgnzvjjrak6k41d0on511u4z42ct9','.eJxVjMsOgyAUBf-FdUPkLS677zeQC1yLrUKjsmr678XERbudOWfexEHdk6sbrm6KZCCCXH6Zh_DEfIj4gHwvNJS8r5Onx4SedqO3EnG-ntu_QIIttbfsexyF96NAAM-iVr3tuDQ8BsNAGuA2CBs5k2CVQt0xFXiwhiMqHa1v0SOXYcFWY1xIpRt7pZLR5bp4XMmQ6zx_vpsLRMU:1tXjL6:vYH9hwIkZt8eK8Nea9EAoxWiMlUjIIo9izPOjgTJHEI','2025-01-14 17:00:24.591489'),('0tzy0ijxuartot51p87hz6a5ys9oxgf1','.eJxVjDsOwjAQBe_iGlnx30tJzxmstXeDA8iR4qRC3B0ipYD2zcx7iYTbWtPWeUkTibMw4vS7ZSwPbjugO7bbLMvc1mXKclfkQbu8zsTPy-H-HVTs9VvbGHk0OY-GEbMi7yIM2gZNJSi0ATUUA6SVRXCO_aBc0QWCZnaeIIv3B-ySN9s:1tYmuQ:RS5y7okM9t0zEPu4GoCgMT4O7Ns2qtItzNUY8kZycP4','2025-01-17 15:01:14.093193'),('9ud64507wowcnh9dl0ex3lls9jz0d2i3','.eJxVjDsOwjAQBe_iGlnx30tJzxmstXeDA8iR4qRC3B0ipYD2zcx7iYTbWtPWeUkTibMw4vS7ZSwPbjugO7bbLMvc1mXKclfkQbu8zsTPy-H-HVTs9VvbGHk0OY-GEbMi7yIM2gZNJSi0ATUUA6SVRXCO_aBc0QWCZnaeIIv3B-ySN9s:1tYy1x:zikLyCuwBXF8QZuBfqVMvaYlJfuoLcaPHpBuPmdBcMY','2025-01-18 02:53:45.904777'),('cowkp0b6d2k8mc33jpr601bubzrw5vz3','.eJxVjMsOwiAQRf-FtSHQgdJx6d5vIEOZStWC6WNl_Hdp0oVuz7n3vIWnbU1-W3j2YxRnAVqcfmGg_sF5N_FO-VZkX_I6j0HuE3nYRV5L5Ofl2P4FEi2pvptgoiGjY6QQdGPM0IbgQCvTWbSIyjXICl3PLRECDEY5iM7ZjhCZXY3uuUwT1xrFacwVvVLJ7PM2BZ4rVp0BAGsBxecLmkZF2Q:1tYHI4:cy4yVBcjX9JddffwO54gHvm1ui_ULpb1AZNqGOgXNDI','2025-01-16 05:15:32.662581'),('d4gajwcn8ot664otb9nqh5wl0p31x5sg','.eJxVjM0OwiAQhN-Fs2mg2HbXo3efgbBlkfoDpi0mxvjuQtKD3ibzzXxvYWxeg8kLz2Zy4iC0FLvfkux45ViJu9h4Ts2Y4jpP1NRJs9GlOSXHt-O2_RMEu4TyBudBDm1LzAr23gEiakXoupFJWut6IFTtMHSWe4KSsNPOKy9ZjThUadVFe-diC_lFT9Xq0j5CimxivhPPhUjooUfQgOLzBaZwR3M:1tYzBk:PQsMyZ1B_mWA6dZPH-7Ihvmea7NnoK6H-y0mYjPvJ38','2025-01-18 04:07:56.297497'),('k02rcoz1uatr3n09eap7zdpezg5rheny','.eJxVjDsOwjAQBe_iGlnx30tJzxmstXeDA8iR4qRC3B0ipYD2zcx7iYTbWtPWeUkTibMw4vS7ZSwPbjugO7bbLMvc1mXKclfkQbu8zsTPy-H-HVTs9VvbGHk0OY-GEbMi7yIM2gZNJSi0ATUUA6SVRXCO_aBc0QWCZnaeIIv3B-ySN9s:1tYLIw:whICa2-U0_5T0etdXtubI3LPgkX677zATdyqOxvOi94','2025-01-16 09:32:42.654585'),('oie5adwhxr4ch4nxapov8ot83iym4ys4','.eJxVjDsOwjAQBe_iGlnx30tJzxmstXeDA8iR4qRC3B0ipYD2zcx7iYTbWtPWeUkTibMw4vS7ZSwPbjugO7bbLMvc1mXKclfkQbu8zsTPy-H-HVTs9VvbGHk0OY-GEbMi7yIM2gZNJSi0ATUUA6SVRXCO_aBc0QWCZnaeIIv3B-ySN9s:1tXgM9:7xrZM0PGJfr_mmSewOf9Wu99oQbSELaNHcBfp1qu1q8','2025-01-14 13:49:17.148155'),('rdgqrec6shotmtf77p41rw94cigq2hbe','.eJxVjMsOgyAUBf-FdUPkLS677zeQC1yLrUKjsmr678XERbudOWfexEHdk6sbrm6KZCCCXH6Zh_DEfIj4gHwvNJS8r5Onx4SedqO3EnG-ntu_QIIttbfsexyF96NAAM-iVr3tuDQ8BsNAGuA2CBs5k2CVQt0xFXiwhiMqHa1v0SOXYcFWY1xIpRt7pZLR5bp4XMmQ6zx_vpsLRMU:1tY3yx:RA7BP6Uz3GnP0mXaWvbBpPi8vYzILSwUOfS2Rc7ixuQ','2025-01-15 15:02:55.200295'),('xlg76h0gjjdeqxhjr6ctjyrfqu7die59','.eJxVjDsOwjAQBe_iGlnx30tJzxmstXeDA8iR4qRC3B0ipYD2zcx7iYTbWtPWeUkTibMw4vS7ZSwPbjugO7bbLMvc1mXKclfkQbu8zsTPy-H-HVTs9VvbGHk0OY-GEbMi7yIM2gZNJSi0ATUUA6SVRXCO_aBc0QWCZnaeIIv3B-ySN9s:1tTcRj:5RWFrsOgWFewy_GsxK8cR9UtEjpDQRAv6pIn9sQt-0w','2025-01-17 07:50:15.166079');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webbansua_brand`
--

DROP TABLE IF EXISTS `webbansua_brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webbansua_brand` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image_url` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webbansua_brand`
--

LOCK TABLES `webbansua_brand` WRITE;
/*!40000 ALTER TABLE `webbansua_brand` DISABLE KEYS */;
/*!40000 ALTER TABLE `webbansua_brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webbansua_cartitem`
--

DROP TABLE IF EXISTS `webbansua_cartitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webbansua_cartitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int unsigned NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `product_id` bigint NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `webbansua_cartitem_product_id_a185c22a_fk_webbansua_product_id` (`product_id`),
  KEY `webbansua_cartitem_user_id_9fc5b90d_fk_webbansua_customuser_id` (`user_id`),
  CONSTRAINT `webbansua_cartitem_product_id_a185c22a_fk_webbansua_product_id` FOREIGN KEY (`product_id`) REFERENCES `webbansua_product` (`id`),
  CONSTRAINT `webbansua_cartitem_user_id_9fc5b90d_fk_webbansua_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `webbansua_customuser` (`id`),
  CONSTRAINT `webbansua_cartitem_chk_1` CHECK ((`quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webbansua_cartitem`
--

LOCK TABLES `webbansua_cartitem` WRITE;
/*!40000 ALTER TABLE `webbansua_cartitem` DISABLE KEYS */;
INSERT INTO `webbansua_cartitem` VALUES (34,2,'2025-01-16 04:16:11.023947',6,535000.00,31,'https://sua.vn/uploads/shop/pic/small_1730521533.nv.jpg'),(35,1,'2025-01-16 04:16:12.439226',9,1160000.00,31,'https://sua.vn/uploads/shop/pic/small_1731898382.nv.jpg'),(36,1,'2025-01-16 04:16:15.730618',5,456000.00,31,'https://sua.vn/uploads/shop/pic/small_1611042095.nv.jpg'),(37,1,'2025-01-16 14:40:13.076863',8,3480000.00,31,'https://sua.vn/uploads/shop/pic/small_1731899307.nv.jpg'),(55,1,'2025-01-18 03:08:04.051690',6,535000.00,30,'https://sua.vn/uploads/shop/pic/small_1730521533.nv.jpg');
/*!40000 ALTER TABLE `webbansua_cartitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webbansua_customuser`
--

DROP TABLE IF EXISTS `webbansua_customuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webbansua_customuser` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `last_login` datetime(6) DEFAULT NULL,
  `username` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(128) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `Point` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `webbansua_customuser_phone_number_1bd391e7_uniq` (`phone_number`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webbansua_customuser`
--

LOCK TABLES `webbansua_customuser` WRITE;
/*!40000 ALTER TABLE `webbansua_customuser` DISABLE KEYS */;
INSERT INTO `webbansua_customuser` VALUES (3,'2025-01-18 01:53:45.890991','123456','alo@gmail.com','pbkdf2_sha256$870000$vgvRedAOb6ykRh9FUmGTIC$TWJLM/0lmN3Mtcsa6GSbaSjwfw0lWFApJkn8/xAD/rI=',1,1,1,'2024-12-27 14:16:06.288331','','',NULL,'1'),(28,'2025-01-15 06:19:31.066977','Huyech123','','pbkdf2_sha256$870000$WQKcdUwpbXyHNZtS1PDApM$+uBtNp3ZjKXOnG4ZBV4i3jD+YGQo0ItHW5XBHWblatc=',1,0,0,'2025-01-15 06:19:29.252223','','','0865303029','1'),(30,'2025-01-18 03:07:56.290272','huybv123','','pbkdf2_sha256$870000$k2vF5RvCB7FyPgT4iKVl1M$UEsEMQxmg03sbvv3Q6lgc785NFKRSHM+zgmyfHoFTYs=',1,0,0,'2025-01-15 13:34:56.279028','','','0868698389','1'),(31,'2025-01-16 14:19:22.538675','admin','','pbkdf2_sha256$870000$PefHrESei8sDjBnuloeu2x$ckBsf+ohFJjEyaTrZuSl6Dv3sTVeNZS7olHOOiU/nIY=',1,0,0,'2025-01-16 04:11:24.091637','','','0843335539','1');
/*!40000 ALTER TABLE `webbansua_customuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webbansua_customuser_groups`
--

DROP TABLE IF EXISTS `webbansua_customuser_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webbansua_customuser_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `webbansua_customuser_groups_customuser_id_group_id_91401c56_uniq` (`customuser_id`,`group_id`),
  KEY `webbansua_customuser_groups_group_id_a1f6c45b_fk_auth_group_id` (`group_id`),
  CONSTRAINT `webbansua_customuser_customuser_id_cf701039_fk_webbansua` FOREIGN KEY (`customuser_id`) REFERENCES `webbansua_customuser` (`id`),
  CONSTRAINT `webbansua_customuser_groups_group_id_a1f6c45b_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webbansua_customuser_groups`
--

LOCK TABLES `webbansua_customuser_groups` WRITE;
/*!40000 ALTER TABLE `webbansua_customuser_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `webbansua_customuser_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webbansua_customuser_user_permissions`
--

DROP TABLE IF EXISTS `webbansua_customuser_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webbansua_customuser_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `webbansua_customuser_use_customuser_id_permission_ff84d287_uniq` (`customuser_id`,`permission_id`),
  KEY `webbansua_customuser_permission_id_6232d3c4_fk_auth_perm` (`permission_id`),
  CONSTRAINT `webbansua_customuser_customuser_id_2dba6b7a_fk_webbansua` FOREIGN KEY (`customuser_id`) REFERENCES `webbansua_customuser` (`id`),
  CONSTRAINT `webbansua_customuser_permission_id_6232d3c4_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webbansua_customuser_user_permissions`
--

LOCK TABLES `webbansua_customuser_user_permissions` WRITE;
/*!40000 ALTER TABLE `webbansua_customuser_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `webbansua_customuser_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webbansua_employee`
--

DROP TABLE IF EXISTS `webbansua_employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webbansua_employee` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `position` varchar(100) NOT NULL,
  `date_joined` date NOT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `webbansua_employee_user_id_9044c05b_fk_webbansua_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `webbansua_customuser` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webbansua_employee`
--

LOCK TABLES `webbansua_employee` WRITE;
/*!40000 ALTER TABLE `webbansua_employee` DISABLE KEYS */;
INSERT INTO `webbansua_employee` VALUES (26,'Huyech123','0865303029','Employee','2025-01-15',28),(28,'huybv123','0868698389','Employee','2025-01-15',30),(29,'admin','0843335539','Employee','2025-01-16',31);
/*!40000 ALTER TABLE `webbansua_employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webbansua_order`
--

DROP TABLE IF EXISTS `webbansua_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webbansua_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(50) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `customer_id` bigint DEFAULT NULL,
  `phone_number` varchar(15) NOT NULL,
  `voucher_id` bigint DEFAULT NULL,
  `address` longtext,
  `full_name` varchar(255) NOT NULL,
  `notes` longtext,
  `total_price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `webbansua_order_customer_id_7195a820_fk_webbansua_customuser_id` (`customer_id`),
  KEY `webbansua_order_voucher_id_24c51f8a_fk_webbansua_voucher_id` (`voucher_id`),
  CONSTRAINT `webbansua_order_customer_id_7195a820_fk_webbansua_customuser_id` FOREIGN KEY (`customer_id`) REFERENCES `webbansua_customuser` (`id`),
  CONSTRAINT `webbansua_order_voucher_id_24c51f8a_fk_webbansua_voucher_id` FOREIGN KEY (`voucher_id`) REFERENCES `webbansua_voucher` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webbansua_order`
--

LOCK TABLES `webbansua_order` WRITE;
/*!40000 ALTER TABLE `webbansua_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `webbansua_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webbansua_orderitem`
--

DROP TABLE IF EXISTS `webbansua_orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webbansua_orderitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int unsigned NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `webbansua_orderitem_order_id_f7f50c13_fk_webbansua_order_id` (`order_id`),
  KEY `webbansua_orderitem_product_id_8e6fe0fa_fk_webbansua_product_id` (`product_id`),
  CONSTRAINT `webbansua_orderitem_order_id_f7f50c13_fk_webbansua_order_id` FOREIGN KEY (`order_id`) REFERENCES `webbansua_order` (`id`),
  CONSTRAINT `webbansua_orderitem_product_id_8e6fe0fa_fk_webbansua_product_id` FOREIGN KEY (`product_id`) REFERENCES `webbansua_product` (`id`),
  CONSTRAINT `webbansua_orderitem_chk_1` CHECK ((`quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webbansua_orderitem`
--

LOCK TABLES `webbansua_orderitem` WRITE;
/*!40000 ALTER TABLE `webbansua_orderitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `webbansua_orderitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webbansua_product`
--

DROP TABLE IF EXISTS `webbansua_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webbansua_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `image_url` varchar(200) DEFAULT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `quantity` int unsigned NOT NULL,
  `Point` varchar(15) NOT NULL,
  `name_brand` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `webbansua_product_chk_1` CHECK ((`quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webbansua_product`
--

LOCK TABLES `webbansua_product` WRITE;
/*!40000 ALTER TABLE `webbansua_product` DISABLE KEYS */;
INSERT INTO `webbansua_product` VALUES (5,'Bộ 2 hộp Yến sào Bionest Kids cao cấp - hộp tiết kiệm 6 lọ','Ảnh',456000.00,'2025-01-11 15:18:08.439831','2025-01-11 15:25:05.665681','hang_khuyen_mai','https://sua.vn/uploads/shop/pic/small_1611042095.nv.jpg',498000.00,'con_hang',100,'2',''),(6,'Sữa tăng chiều cao Hiup 650gr (cho bé 3 - 18 tuổi)','Ảnh sản phẩm',535000.00,'2025-01-12 05:32:27.085644','2025-01-12 05:47:18.053006','hang_khuyen_mai','https://sua.vn/uploads/shop/pic/small_1730521533.nv.jpg',849000.00,'con_hang',50,'2',''),(7,'Sữa Tăng Chiều Cao Nobiko Nhập Khẩu Nhật Bản, Cho Trẻ 2 Đến 16 Tuổi','Ảnh sản phẩm',580000.00,'2025-01-12 05:33:47.394488','2025-01-14 13:23:22.171993','hang_khuyen_mai','https://sua.vn/uploads/shop/pic/small_1651135331.nv.jpg',NULL,'het_hang',50,'2',''),(8,'Sữa Nan InfiniPro A2 số 3 800g [Combo 6 Lon][Có Quà] cho bé 2-6 tuổi. Tặng xe đạp 12inch cho bé','Ảnh sản phẩm',3480000.00,'2025-01-12 05:35:44.363682','2025-01-14 06:11:05.562619','hang_khuyen_mai','https://sua.vn/uploads/shop/pic/small_1731899307.nv.jpg',3690000.00,'con_hang',100,'2',''),(9,'Sữa Nan InfiniPro A2 số 3 800g cho bé 2-6 tuổi. [Combo 2 Lon][Có Quà] Tặng xe điều khiển từ xa cho bé','Ảnh sản phẩm',1160000.00,'2025-01-12 05:37:39.122312','2025-01-12 05:37:39.122312','hang_khuyen_mai','https://sua.vn/uploads/shop/pic/small_1731898382.nv.jpg',1230000.00,'con_hang',75,'2',''),(10,'Sữa  Danalac 2 400g (6-12 tháng)','Ảnh sản phẩm',245000.00,'2025-01-14 00:30:41.826639','2025-01-14 00:30:41.826639','hang_ban_chay','https://sua.vn/uploads/shop/pic/small_Danalac2-400g.jpg',245000.00,'con_hang',50,'2',''),(11,'Sữa  Danalac 1 400g (0-6 tháng)','Ảnh sản phẩm',248000.00,'2025-01-14 00:32:24.460609','2025-01-14 00:32:24.460609','hang_ban_chay','https://sua.vn/uploads/shop/pic/small_Danalac1-400g.jpg',NULL,'con_hang',30,'2',''),(12,'Sữa Nutrizen Sure Gold 400g (Dinh dưỡng cho người lớn)','Ảnh sản phẩm',205500.00,'2025-01-14 00:33:28.929231','2025-01-14 00:33:28.930243','hang_ban_chay','https://sua.vn/uploads/shop/pic/small_NutrizenGold-400g.jpg',NULL,'con_hang',50,'2',''),(13,'Sữa bầu Morinaga E-Okasan vị trà sữa 800g','Ảnh sản phẩm',550000.00,'2025-01-15 06:36:28.965462','2025-01-15 06:36:28.965462','sua_bot_dinh_duong','https://sua.vn/uploads/shop/pic/small_1730519403.nv.jpg',630000.00,'con_hang',50,'2',''),(14,'Sữa Tăng Chiều Cao Nobiko Nhập Khẩu Nhật Bản, Cho Trẻ 2 Đến 16 Tuổi','Ảnh sản phẩm',580000.00,'2025-01-16 13:17:09.383003','2025-01-16 13:17:09.383003','sua_bot_dinh_duong','https://sua.vn/uploads/shop/pic/small_1651135331.nv.jpg',NULL,'con_hang',50,'2','');
/*!40000 ALTER TABLE `webbansua_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webbansua_promotion`
--

DROP TABLE IF EXISTS `webbansua_promotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webbansua_promotion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` longtext,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webbansua_promotion`
--

LOCK TABLES `webbansua_promotion` WRITE;
/*!40000 ALTER TABLE `webbansua_promotion` DISABLE KEYS */;
INSERT INTO `webbansua_promotion` VALUES (7,'Khuyến mãi','Ảnh khuyến mãi','2025-01-15','2025-01-31','https://sua.vn/uploads/News/pic/1724213426.nv.jpg'),(8,'Khuyến mại','Ảnh','2025-01-15','2025-01-31','https://sua.vn/uploads/News/pic/1724203436.nv.jpg'),(9,'Khuyến mại','Ảnh','2025-01-15','2025-01-31','https://sua.vn/uploads/News/pic/1687425392.nv.jpg'),(10,'KHuyến mại','ảnh','2025-01-15','2025-01-31','https://sua.vn/uploads/News/pic/1687426264.nv.jpg');
/*!40000 ALTER TABLE `webbansua_promotion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webbansua_reward`
--

DROP TABLE IF EXISTS `webbansua_reward`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webbansua_reward` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `img_url` varchar(200) DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `points` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `webbansua_reward_chk_1` CHECK ((`points` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webbansua_reward`
--

LOCK TABLES `webbansua_reward` WRITE;
/*!40000 ALTER TABLE `webbansua_reward` DISABLE KEYS */;
/*!40000 ALTER TABLE `webbansua_reward` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webbansua_voucher`
--

DROP TABLE IF EXISTS `webbansua_voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `webbansua_voucher` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(50) NOT NULL,
  `expiration_date` date NOT NULL,
  `description` longtext,
  `discount_percent` decimal(5,2) DEFAULT NULL,
  `discount_value` decimal(10,2) DEFAULT NULL,
  `minimum_order_value` decimal(10,2) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webbansua_voucher`
--

LOCK TABLES `webbansua_voucher` WRITE;
/*!40000 ALTER TABLE `webbansua_voucher` DISABLE KEYS */;
INSERT INTO `webbansua_voucher` VALUES (2,'258167','2025-01-10','tàm tạm',10.00,50000.00,200000.00,NULL),(3,'11222','2025-01-10','',20.00,15000.00,20000.00,NULL),(4,'111111','2025-01-10','ngon vl',30.00,100000.00,300000.00,'THTrueMilk');
/*!40000 ALTER TABLE `webbansua_voucher` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-18 10:12:04

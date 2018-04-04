--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `empid` int(10) unsigned NOT NULL,
  `name` varchar(300) NOT NULL,
  `homeaddress` text NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `salary` varchar(20) NOT NULL,
  `joineddate` varchar(25) NOT NULL,
  `lastincrementdate` varchar(25) NOT NULL,
  `dateofbirth` varchar(25) NOT NULL,
  `designation` varchar(30) NOT NULL,
  `leaves` int(11) DEFAULT NULL,
  `resigneddate` varchar(25) DEFAULT NULL,
  `expertise` varchar(75) DEFAULT NULL,
  `nic` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`empid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventory` (
  `seqid` int(20) NOT NULL AUTO_INCREMENT,
  `itemtype` varchar(300) NOT NULL,
  `itemname` text NOT NULL,
  `itemid` varchar(20) NOT NULL,
  `usedby` int(10) DEFAULT NULL,
  PRIMARY KEY (`seqid`),
  UNIQUE KEY `itemid` (`itemid`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `projid` varchar(20) NOT NULL,
  `projname` varchar(30) NOT NULL,
  `starteddate` varchar(25) NOT NULL,
  `currentstatus` varchar(25) NOT NULL,
  `projinfo` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`projid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `releases`
--

DROP TABLE IF EXISTS `releases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `releases` (
  `relid` varchar(75) NOT NULL DEFAULT '',
  `releasedate` date DEFAULT NULL,
  `releaseinfo` varchar(300) NOT NULL,
  `projid` varchar(20) NOT NULL,
  PRIMARY KEY (`relid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

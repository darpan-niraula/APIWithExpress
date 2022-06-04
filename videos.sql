-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2022 at 05:33 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `videos`
--

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `VideoId` int(11) NOT NULL,
  `Name` varchar(500) NOT NULL,
  `Description` varchar(500) NOT NULL,
  `Active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`VideoId`, `Name`, `Description`, `Active`) VALUES
(0, 'Testing API', 'Testing API again', 0),
(1, 'Testing API', 'Testing API again', 0),
(2, 'Testing API', 'Testing API again', 1),
(3, 'Comedy', 'Collection of Comedy Movies ', 0);

-- --------------------------------------------------------

--
-- Table structure for table `videolist`
--

CREATE TABLE `videolist` (
  `VideoListId` int(11) NOT NULL,
  `Name` varchar(500) NOT NULL,
  `Link` varchar(500) NOT NULL,
  `VideoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `videolist`
--

INSERT INTO `videolist` (`VideoListId`, `Name`, `Link`, `VideoId`) VALUES
(0, 'Dumb and Dumber', 'https://www.youtube.com/watch?v=a8Gx8wiNbs8', 1),
(1, 'Dumb and Dumber', 'https://www.youtube.com/watch?v=a8Gx8wiNbs8', 3),
(2, 'Avatar', 'https://www.youtube.com/watch?v=a8Gx8wiNbs8', 2),
(3, 'Dumb and Dumber', 'https://www.youtube.com/watch?v=a8Gx8wiNbs8', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`VideoId`);

--
-- Indexes for table `videolist`
--
ALTER TABLE `videolist`
  ADD PRIMARY KEY (`VideoListId`),
  ADD KEY `VideoId` (`VideoId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `videolist`
--
ALTER TABLE `videolist`
  ADD CONSTRAINT `videolist_ibfk_1` FOREIGN KEY (`VideoId`) REFERENCES `video` (`VideoId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

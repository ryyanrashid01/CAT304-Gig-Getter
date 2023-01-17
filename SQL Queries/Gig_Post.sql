-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql6.freesqldatabase.com
-- Generation Time: Dec 27, 2022 at 10:41 AM
-- Server version: 5.5.62-0ubuntu0.14.04.1
-- PHP Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql6585788`
--

-- --------------------------------------------------------

--
-- Table structure for table `Gig_Post`
--

CREATE TABLE `Gig_Post` (
  `gigPostID` int(5) NOT NULL,
  `user_id` int(11) NOT NULL,
  `gigTitle` varchar(30) NOT NULL,
  `gigDescription` varchar(300) NOT NULL,
  `minBid` float NOT NULL,
  `startBid` date NOT NULL,
  `endBid` date NOT NULL,
  `location_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Gig_Post`
--
-- change in user_id need to alter the user id first bfr run the sql
INSERT INTO `Gig_Post` (`gigPostID`, `user_id`, `gigTitle`, `gigDescription`, `minBid`, `startBid`, `endBid`, `location_id`) VALUES
(10001, 13, 'Lawn Mowing', 'around house - price rate', 30, '2022-12-27', '2022-12-28', 6013),
(10002, 11, 'Plumbing', 'house leaking - price rate', 20, '2022-12-28', '2022-12-30', 6004),
(10003, 17, 'Secondary Math Tutoring', 'secondary school syllabus ', 35, '2022-12-28', '2022-12-29', 6006),
(10005, 17, 'Secondary Physics Tutoring', 'Secondary school syllabus physics subject', 35, '2022-12-29', '2022-12-30', 6006),
(10006, 7, 'House cleaning', 'Old house, abandoned house, urgent cleaning', 50, '2023-01-05', '2023-01-07', 6015);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Gig_Post`
--
ALTER TABLE `Gig_Post`
  ADD PRIMARY KEY (`gigPostID`),
  ADD KEY `gigPost_FK_user_id` (`user_id`),
  ADD KEY `gigPost_FK_location_id` (`location_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Gig_Post`
--
ALTER TABLE `Gig_Post`
  MODIFY `gigPostID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10007;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `Gig_Post`
--
ALTER TABLE `Gig_Post`
  ADD CONSTRAINT `gigPost_FK_user_id` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

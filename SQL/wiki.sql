-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Erstellungszeit: 10. Apr 2014 um 11:41
-- Server Version: 5.6.16
-- PHP-Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `wiki`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `wiki`
--

CREATE TABLE IF NOT EXISTS `wiki` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(20) NOT NULL,
  `title_id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `version` int(11) NOT NULL,
  `notes` text NOT NULL,
  `author` varchar(50) NOT NULL,
  `creation_date` date NOT NULL,
  `expiration_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `wiki`
--

INSERT INTO `wiki` (`category`, `title_id`, `title`, `version`, `notes`, `author`, `creation_date`, `expiration_date`) VALUES
('php', 1, 'PHP Test', 1, 'Dies ist der erste Artikel', 'Roger Ordon', '2014-04-09', '2014-06-09'),
('SQL', 1, 'SQL Test', 1, 'SQL ist leicht zu verstehen.', 'Hans Zimmer', '2014-04-01', '2014-08-14');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

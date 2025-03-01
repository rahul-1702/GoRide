-- admins table -- (28 jan, 2025)

CREATE TABLE `admins` (
 `id` int NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 `status` enum('Active','Inactive','Deleted') NOT NULL DEFAULT 'Active',
 `email` varchar(255) NOT NULL,
 `mobile` varchar(15) NOT NULL,
 `password` varchar(255) NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
)


-- customers table -- (29 jan, 2025)

CREATE TABLE `customers` (
 `id` int NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 `status` enum('Active','Inactive','Deleted') NOT NULL DEFAULT 'Active',
 `email` varchar(255) NOT NULL,
 `mobile` varchar(255) NOT NULL,
 `password` varchar(255) NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
)


-- ride_details table -- (07 feb, 2025)

CREATE TABLE `ride_details` (
 `ride_id` int NOT NULL AUTO_INCREMENT,
 `ride_type` enum('Auto','Other') NOT NULL,
 `fuel_type` enum('Electric','Petrol','Diesel','CNG') NOT NULL,
 `auto_number` varchar(30) NOT NULL,
 `total_seats` int NOT NULL,
 `number_of_wheels` int NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`ride_id`)
)


-- drivers table -- (30 jan, 2025)

CREATE TABLE `drivers` (
 `id` int NOT NULL AUTO_INCREMENT,
 `first_name` varchar(100) NOT NULL,
 `last_name` varchar(100) NOT NULL,
 `status` enum('Active','Inactive','Deleted') NOT NULL DEFAULT 'Active',
 `mobile` varchar(15) NOT NULL,
 `gender` enum('male','female','others') NOT NULL,
 `dob` date NOT NULL,
 `profile_pic` varchar(255) NOT NULL,
 `email` varchar(255) NOT NULL,
 `password` varchar(255) NOT NULL,
 `current_address` text NOT NULL,
 `permanent_address` text NOT NULL,
 `city` varchar(100) NOT NULL,
 `state` varchar(100) NOT NULL,
 `zip_code` varchar(10) NOT NULL,
 `ride_no` int NOT NULL,
 `license` varchar(50) NOT NULL,
 `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 KEY `ride_no` (`ride_no`),
 CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`ride_no`) REFERENCES `ride_details` (`ride_id`) ON DELETE CASCADE
)


-- admins table -- (01 March, 2025)

ALTER TABLE admins ADD COLUMN profile_pic VARCHAR(255) AFTER `password`;

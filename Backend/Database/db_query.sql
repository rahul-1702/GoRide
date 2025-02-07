-- admins table -- (28 jan, 2025)

CREATE TABLE `admins` (
 `id` int NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 `status` enum('Active','Inactive','Deleted') NOT NULL DEFAULT 'Active',
 `email` varchar(255) NOT NULL,
 `mobile` varchar(15) NOT NULL,
 `password` varchar(255) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


-- customers table -- (29 jan, 2025)

CREATE TABLE `customers` (
 `id` int NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 `status` enum('Active','Inactive','Deleted') NOT NULL DEFAULT 'Active',
 `email` varchar(255) NOT NULL,
 `mobile` varchar(255) NOT NULL,
 `password` varchar(255) NOT NULL,
 `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
 `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


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
 `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 KEY `ride_no` (`ride_no`),
 CONSTRAINT `drivers_ibfk_1` FOREIGN KEY (`ride_no`) REFERENCES `ride_details` (`ride_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


-- ride_details table -- (07 feb, 2025)

CREATE TABLE `ride_details` (
 `ride_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- Set ride_id as PRIMARY KEY
 `ride_type` enum('Auto','Other') NOT NULL,
 `fuel_type` enum('Electric','Petrol','Diesel','CNG') NOT NULL,
 `auto_number` varchar(30) NOT NULL,
 `total_seats` int NOT NULL,
 `number_of_wheels` int NOT NULL,
 `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `course` (
	`course_no` INT NOT NULL AUTO_INCREMENT,
	`course_name` VARCHAR(100) NULL DEFAULT '0',
	`course_latitude` VARCHAR(3000) NOT NULL DEFAULT '0',
	`course_longitude` VARCHAR(3000) NOT NULL DEFAULT '0',
	`course_qr` VARCHAR(50) NOT NULL DEFAULT '0',
	PRIMARY KEY (`course_no`)
)
COLLATE='utf8mb4_general_ci';

CREATE TABLE `users` (
	`user_no` INT NOT NULL AUTO_INCREMENT,
	`user_id` VARCHAR(500) NULL DEFAULT '0',
	`user_password` VARCHAR(1000) NULL DEFAULT '0',
	`user_name` VARCHAR(50) NULL DEFAULT '0',
	`user_provider` VARCHAR(50) NULL DEFAULT '0',
	`user_email` VARCHAR(200) NULL DEFAULT '0',
	`user_image` VARCHAR(1000) NULL DEFAULT '0',
	PRIMARY KEY (`user_no`)
)
COLLATE='utf8mb4_general_ci';

CREATE TABLE `users_course` (
	`user_courses_id` INT NOT NULL AUTO_INCREMENT,
	`user_no` INT NOT NULL,
	`course_no` INT NOT NULL,
	PRIMARY KEY (`user_courses_id`),
	CONSTRAINT `FK__users` FOREIGN KEY (`user_no`) REFERENCES `users` (`user_no`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `FK__course` FOREIGN KEY (`course_no`) REFERENCES `course` (`course_no`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB;

INSERT INTO `course` (`course_name`, `course_latitude`, `course_longitude`, `course_qr`) 
VALUES ('영진', '35.87555082502176', '128.6816374505427', 'YUNGJIN');

INSERT INTO `course` (`course_name`, `course_latitude`, `course_longitude`, `course_qr`) 
VALUES ('국밥집', '35.87583123506328', '128.6817532073904', 'GUKBOB');

INSERT INTO `course` (`course_name`, `course_latitude`, `course_longitude`, `course_qr`) 
VALUES ('제주흑돈', '35.87664030121222', '128.68155341448463', 'JEJUPIG');

INSERT INTO `course` (`course_name`, `course_latitude`, `course_longitude`, `course_qr`) 
VALUES ('용계역', '35.87623769570281', '128.68104555230227', 'SUBWAY2');
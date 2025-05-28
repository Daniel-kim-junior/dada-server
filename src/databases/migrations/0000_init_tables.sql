CREATE TABLE `auth` (
	`user_id` varchar(36) NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`type` varchar(50) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `auth_user_id` PRIMARY KEY(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `classes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`organization_id` bigint NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(500),
	`open_date` timestamp NOT NULL,
	`close_date` timestamp NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `classes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `classrooms` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(500),
	`organization_id` bigint NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `classrooms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `course_profiles` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`course_id` bigint NOT NULL,
	`student_profile_id` varchar(36) NOT NULL,
	`status` varchar(50) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `course_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`session_id` bigint NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(500),
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`phone_number` varchar(30) NOT NULL,
	`name` varchar(30) NOT NULL,
	`email` varchar(255) NOT NULL,
	`birth` varchar(10) NOT NULL,
	`agreed_privacy` varchar(5) NOT NULL,
	`agreed_third_party` varchar(5) NOT NULL,
	`agreed_marketing` varchar(5) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `organizations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(1000),
	`logo` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `organizations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notice_ownerships` (
	`id` bigint NOT NULL,
	`notice_id` bigint NOT NULL,
	`type` varchar(50) NOT NULL,
	`register_profile_id` varchar(36) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notice_ownerships_id_type_pk` PRIMARY KEY(`id`,`type`)
);
--> statement-breakpoint
CREATE TABLE `notices` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` varchar(5000),
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `organization_ownerships` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`profile_id` varchar(36) NOT NULL,
	`organization_id` bigint NOT NULL,
	`role` varchar(50) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `organization_ownerships_id` PRIMARY KEY(`id`),
	CONSTRAINT `profile_org_unique` UNIQUE(`profile_id`,`organization_id`)
);
--> statement-breakpoint
CREATE TABLE `organizations_roster` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`profile_id` varchar(36) NOT NULL,
	`organization_id` bigint NOT NULL,
	`invite_profile_id` varchar(36) NOT NULL,
	CONSTRAINT `organizations_roster_id` PRIMARY KEY(`id`),
	CONSTRAINT `profile_org_roster_unique` UNIQUE(`profile_id`,`organization_id`)
);
--> statement-breakpoint
CREATE TABLE `profile_connections` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`status` varchar(50) NOT NULL,
	`requester_profile_id` varchar(36) NOT NULL,
	`target_profile_id` varchar(36) NOT NULL,
	`message` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profile_connections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`role` varchar(50) NOT NULL,
	`profile_picture` varchar(255),
	`nickname` varchar(50) NOT NULL,
	`introduction` varchar(500),
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`class_id` bigint NOT NULL,
	`session_number` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lecture_schedules` (
	`schedule_id` bigint NOT NULL,
	`type` varchar(50) NOT NULL,
	`classroom_id` bigint,
	`instructor_profile_id` varchar(36) NOT NULL,
	`time_date` varchar(50) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`deleted_at` timestamp,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `lecture_schedules_schedule_id_type_pk` PRIMARY KEY(`schedule_id`,`type`)
);
--> statement-breakpoint
CREATE INDEX `course_id_idx` ON `course_profiles` (`course_id`);--> statement-breakpoint
CREATE INDEX `student_profile_id_and_status_idx` ON `course_profiles` (`student_profile_id`,`status`);--> statement-breakpoint
CREATE INDEX `session_id_idx` ON `courses` (`session_id`);--> statement-breakpoint
CREATE INDEX `idx_profile_connections_requester_profile_id` ON `profile_connections` (`requester_profile_id`);--> statement-breakpoint
CREATE INDEX `idx_profile_connections_target_profile_id` ON `profile_connections` (`target_profile_id`);--> statement-breakpoint
CREATE INDEX `class_id_idx` ON `sessions` (`class_id`);--> statement-breakpoint
CREATE INDEX `idx_classroom_id` ON `lecture_schedules` (`classroom_id`);--> statement-breakpoint
CREATE INDEX `idx_instructor_profile_id` ON `lecture_schedules` (`instructor_profile_id`);
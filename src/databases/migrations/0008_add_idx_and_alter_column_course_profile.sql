ALTER TABLE `course_profiles` MODIFY COLUMN `course_id` bigint NOT NULL;--> statement-breakpoint
ALTER TABLE `course_profiles` ADD `id` serial AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `course_profiles` ADD PRIMARY KEY(`id`);--> statement-breakpoint
CREATE INDEX `course_id_idx` ON `course_profiles` (`course_id`);--> statement-breakpoint
CREATE INDEX `student_profile_id_and_status_idx` ON `course_profiles` (`student_profile_id`,`status`);--> statement-breakpoint
CREATE INDEX `session_id_idx` ON `courses` (`session_id`);--> statement-breakpoint
CREATE INDEX `class_id_idx` ON `sessions` (`class_id`);
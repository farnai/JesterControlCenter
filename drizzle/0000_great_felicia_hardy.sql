CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`record_id` text NOT NULL,
	`data` text NOT NULL,
	`at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `records` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`data` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL
);

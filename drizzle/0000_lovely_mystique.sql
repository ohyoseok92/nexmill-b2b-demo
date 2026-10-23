CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`company` text NOT NULL,
	`contact_name` text NOT NULL,
	`email` text NOT NULL,
	`product` text NOT NULL,
	`quantity` integer NOT NULL,
	`request_type` text NOT NULL,
	`message` text NOT NULL,
	`created_at` text NOT NULL
);

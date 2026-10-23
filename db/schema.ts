import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const inquiries = sqliteTable("inquiries", {
  id: text("id").primaryKey(),
  company: text("company").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  product: text("product").notNull(),
  quantity: integer("quantity").notNull(),
  requestType: text("request_type").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

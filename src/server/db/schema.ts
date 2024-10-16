import { sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `shawty_${name}`);

export const subscriptions = createTable(
	"subscription",
	{
		id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
		name: text("name", { length: 256 }).notNull(),
		url: text("url", { length: 2048 }).notNull(),
		price: int("price").notNull(),
		icon: text("icon", { length: 2048 }).notNull(),
		currency: text("currency", { length: 3 }).default("USD").notNull(),
		recurrence: text("recurrence", { length: 10 }).default("monthly").notNull(), // Add this
		startDate: text("start_date").default("2024-01-01").notNull(), // Add this
		createdAt: int("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`).notNull(),
		updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
	},
	(subscription) => ({
		nameIndex: index("name_idx").on(subscription.name),
	}),
);


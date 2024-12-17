import { serial, text, pgTable, pgSchema } from "drizzle-orm/pg-core";


export const meals = pgTable('meals', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  ingredients: text('ingredients').notNull(),
  tags: text('tags'),
  cost: text('cost'),
});



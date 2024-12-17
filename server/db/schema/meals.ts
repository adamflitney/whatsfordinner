import { serial, text, pgTable, pgSchema } from "drizzle-orm/pg-core";


export const meals = pgTable('meals', {
  id: serial('id').primaryKey(),
  name: text('name'),
  ingredients: text('ingredients'),
  tags: text('tags'),
  cost: text('cost'),
});



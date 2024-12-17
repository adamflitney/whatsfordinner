import { serial, text, pgTable, pgSchema } from "drizzle-orm/pg-core";


export const shoppingLists = pgTable('shopping_lists', {
  id: serial('id').primaryKey(),
  items: text('items')
});
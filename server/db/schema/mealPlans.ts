import { timestamp, serial, pgTable } from "drizzle-orm/pg-core";
import { meals } from "./meals";
import { relations } from "drizzle-orm";
import { shoppingLists } from "./shoppingLists";


export const mealPlans = pgTable('meal_plans', {
  id: serial('id').primaryKey(),
  generatedOn: timestamp('generated_on').notNull(),
});

export const mealPlansRelations = relations(mealPlans, ({ one, many }) => ({
    shoppingList: one(shoppingLists),
    meals: many(meals),
}))

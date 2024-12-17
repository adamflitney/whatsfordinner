import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: ['./server/db/schema/mealPlans.ts', './server/db/schema/meals.ts', './server/db/schema/shoppingLists.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
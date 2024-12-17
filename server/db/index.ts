// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/node-postgres';

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5433/postgres';

export const db = drizzle(DATABASE_URL);
 
//const result = await db.execute('select 1');

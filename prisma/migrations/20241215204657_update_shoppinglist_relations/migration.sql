/*
  Warnings:

  - A unique constraint covering the columns `[shoppingListId]` on the table `MealPlan` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MealPlan" ADD COLUMN     "shoppingListId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "MealPlan_shoppingListId_key" ON "MealPlan"("shoppingListId");

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Meal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ingredients" TEXT[],
    "tags" TEXT[],
    "cost" TEXT,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "generated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShoppingList" (
    "id" TEXT NOT NULL,
    "generated" TIMESTAMP(3) NOT NULL,
    "items" TEXT[],

    CONSTRAINT "ShoppingList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MealToMealPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MealToMealPlan_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MealToMealPlan_B_index" ON "_MealToMealPlan"("B");

-- AddForeignKey
ALTER TABLE "_MealToMealPlan" ADD CONSTRAINT "_MealToMealPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealToMealPlan" ADD CONSTRAINT "_MealToMealPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "MealPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

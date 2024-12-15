import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'


const mealSchema = z.object({
    id: z.number().int().positive(),
    name: z.string(),
    ingredients: z.array(z.string()),
    tags: z.array(z.string()).optional(),
    cost: z.string().optional()
})

type Meal = z.infer<typeof mealSchema>

const createMealSchema = mealSchema.omit({id: true}).transform((data) => {
    return {...data, ingredients: z.string().parse(), tags: z.string()}
});

type CreateMeal = z.infer<typeof createMealSchema>

const fakeMeals: Meal[] = [
    {id: 1, name: 'Nachos', ingredients: ['cheese', 'doritos', 'salsa', 'guacamole', 'sour cream', 'chicken'], tags: ['mexican, main'], cost: 'medium'},
    {id: 2, name: 'Spaghetti Bolognese', ingredients: ['spaghetti', 'ground beef', 'tomato sauce', 'onion', 'garlic'], tags: ['italian', 'main'], cost: 'low'},
    {id: 3, name: 'Caesar Salad', ingredients: ['romaine lettuce', 'croutons', 'parmesan cheese', 'caesar dressing', 'chicken'], tags: ['salad', 'starter'], cost: 'low'},
    {id: 4, name: 'Sushi', ingredients: ['rice', 'nori', 'salmon', 'avocado', 'soy sauce'], tags: ['japanese', 'main'], cost: 'high'},
    {id: 5, name: 'Tacos', ingredients: ['tortillas', 'ground beef', 'lettuce', 'cheese', 'salsa'], tags: ['mexican', 'main'], cost: 'medium'},
    {id: 6, name: 'Chicken Curry', ingredients: ['chicken', 'curry powder', 'coconut milk', 'onion', 'garlic'], tags: ['indian', 'main'], cost: 'medium'}
]



export const mealsRoute = new Hono()
.get('/', (c) => {
    return c.json({meals: fakeMeals})
})
.post('/', zValidator("json", createMealSchema), async (c) => {
    const mealInput: CreateMeal = await c.req.valid("json")
    const meal: Meal = {...mealInput, ingredients: mealInput.ingredients.transform((data) => data.split(',')), tags: mealInput.tags.transform((data) => data.split(','))}
    fakeMeals.push({id: fakeMeals.length + 1, ...meal})
    c.status(201)
    return c.json({message: 'Meal created', meal})
})
.get('/:id{[0-9]+}', (c) => {
    const id = parseInt(c.req.param('id'))
    const meal = fakeMeals.find(m => m.id === id)
    if (!meal) {
        return c.notFound()
    }
    return c.json({meal})
})
.delete('/:id{[0-9]+}', (c) => {
    const id = parseInt(c.req.param('id'))
    const index = fakeMeals.findIndex(m => m.id === id)
    if (index === -1) {
        return c.notFound()
    }
    fakeMeals.splice(index, 1)
    return c.json({message: 'Meal deleted'})
})

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

interface Meal {
    id: number;
    name: string;
    ingredients: Array<string>;
    tags?: Array<string>;
    cost?: string;
}

// const fakeMeals: Meal[] = [
//     {
//         id: 1,
//         name: 'Spaghetti',
//         ingredients: ['pasta', 'tomato sauce', 'meatballs'],
//         tags: ['italian'],
//         cost: '10',
//     },
//     {
//         id: 2,
//         name: 'Pizza',
//         ingredients: ['dough', 'tomato sauce', 'cheese', 'pepperoni'],
//         tags: ['italian'],
//         cost: '15',
//     },
//     {
//         id: 3,
//         name: 'Burger',
//         ingredients: ['bun', 'beef patty', 'lettuce', 'tomato', 'onion'],
//         tags: ['american'],
//         cost: '12',
//     },
// ];

const getMeals = async () => {
    const response = await api.meals.$get();
    if (!response.ok) {
        throw new Error('Error fetching meals');
    }
    const data = await response.json();
    return data.meals;
}

export const MealsList: React.FC = () => {
    const { isPending, error, data } = useQuery({ queryKey: ['get-meals'], queryFn: getMeals });

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    const formatIngredients = (ingredients: Array<string>) => {
        return ingredients.join(', ');
    }

    const formatTags = (tags: Array<string>) => {
        return tags.join(', ');
    }


    return (
        <div className="meals-list">
            {isPending ? "..." : data.map((meal: Meal) => (
                <Card key={meal.id} className="meal-card">
                    <CardHeader>
                        <CardTitle>{meal.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p><span className='text-lg font-semibold'>Ingredients: </span>{formatIngredients(meal.ingredients)}</p>
                        <p><span className='text-lg font-semibold'>Tags: </span>{meal?.tags && formatTags(meal.tags)}</p>
                        <p><span className='text-lg font-semibold'>Cost: </span>{meal?.cost}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

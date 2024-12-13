import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { MealForm } from '@/components/mealForm'
import { MealsList } from '@/components/mealsList'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card className='max-w-md m-auto'>
      <MealForm />
      <MealsList />
    </Card>
  )
}

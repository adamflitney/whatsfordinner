import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { MealsList } from '@/components/mealsList'

export const Route = createFileRoute('/meals')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card className='max-w-md m-auto'>
      <MealsList />
    </Card>
  )
}

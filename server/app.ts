import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { mealsRoute } from './routes/meals'
import { serveStatic } from 'hono/bun'

const app = new Hono()

app.use("*", logger())

const apiRoutes = app.basePath('/api')
.route('/meals', mealsRoute)

app.use('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app
export type ApiRoutes = typeof apiRoutes
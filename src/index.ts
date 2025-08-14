import { serve } from '@hono/node-server'
import { Hono } from 'hono'


const app = new Hono()

app.get('/', (c) => {
  console.log('Received a request at /3000')
  return c.text('Hello Hono!')
})

app.get('/test',(c)=>{
  return c.text('Hello Dani')
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

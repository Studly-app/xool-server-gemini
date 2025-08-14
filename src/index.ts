import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/extension'


const app = new Hono()
const prisma = new PrismaClient()

await prisma.user.create({
  data: {
    name: 'Dani',
    email: 'dani@gmail.com'},
});

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

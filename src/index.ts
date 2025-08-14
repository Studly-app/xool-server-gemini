import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { GoogleGenAI } from "@google/genai";
import { cors } from 'hono/cors';
import { getOrCreateChat } from './sessions.js';
import 'dotenv/config';


const GEMINI_MODEL = 'gemini-2.5-flash';
const app = new Hono()
//const prisma = new PrismaClient()
app.use('*', cors()); // autorise tous les domaines

// prisma.user.create({
//   data: {
//     name: 'Dani',
//     email: 'dani@gmail.com'},
// });
const googleAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

app.get('/', (c) => {
  console.log('Received a request at /3000')
  return c.text('Hello Hono!')
})

app.get('/test',(c)=>{
  return c.text('Hello Dani')
})

app.post('/ai/ask',async (c)=>{
  const body = await c.req.json();

  const prompt = body.prompt;

  if(!prompt){
    return c.json({error : 'Prompt requis'},400)
  }

  try {

    const { sessionId, chat } = getOrCreateChat(googleAI, "");

    const response = await googleAI.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt
    });

    const result = response.text

    // const result = await chat.sendMessageStream({
    //   message:prompt
    // })
    // for await (const chunk of result) {
    //    console.log(chunk.text);  
    // }

    return c.json({
      sessionId,
      result: result
    })
  } catch (error) {
    console.log(error)
    console.error('Error generating text:', error);
  }
 return c.text("")
});


serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

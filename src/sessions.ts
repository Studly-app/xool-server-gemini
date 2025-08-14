import { GoogleGenAI } from '@google/genai';
import { v4 } from 'uuid';
const GEMINI_MODEL = 'gemini-2.5-flash';
const sessions = new Map<string, ReturnType<GoogleGenAI['chats']['create']>>();

export function getOrCreateChat(googleAI: GoogleGenAI, sessionId?: string) {
  const sid = sessionId || v4();
  let chat = sessions.get(sid);

  if (!chat) {
    chat = googleAI.chats.create({
      model: GEMINI_MODEL, // ou gemini-1.5-pro
    });
    sessions.set(sid, chat);
  }
  console.log(`La nouvelle session est de : ${sid}`)
  console.log('-----------------------------------------------------')
  console.log(chat)
  return { sessionId: sid, chat };
}

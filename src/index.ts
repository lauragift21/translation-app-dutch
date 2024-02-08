import { Ai } from '@cloudflare/ai';
import { Hono } from 'hono';

type Bindings = {
  AI: any;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get('/api', async (c) => {
  return c.text('This is the api endpoint');
});

app.post('/api/translate', async (c) => {
  const ai = new Ai(c.env.AI);
  try {
    const requestBody = await c.req.json();
    const text = requestBody.text;

    const inputs = {
      text: text,
      source_lang: 'en',
      target_lang: 'nl',
    };

    const response = await ai.run('@cf/meta/m2m100-1.2b', inputs);
    return c.json({ inputs, response });
  } catch (error) {
    console.log(error);
  }
});

export default app;

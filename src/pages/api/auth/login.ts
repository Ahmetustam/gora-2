import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const CLIENT_ID = process.env.BOT_CLIENT_ID; // .env ile aynı isimde olduğundan emin ol
  const REDIRECT_URI = 'https://goradashboard.vercel.app/api/auth/callback';
  
  // URL'yi manuel ve temiz bir şekilde oluşturuyoruz
  const url = `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20guilds&state=en`;

  res.redirect(302, url);
}

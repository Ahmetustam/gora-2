import { NextApiRequest, NextApiResponse } from 'next';
import { CLIENT_ID } from '@/utils/auth/server';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { locale } = req.query as {
    locale?: string;
  };

  // URLSearchParams nesnesini oluşturuyoruz
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: 'https://goradashboard.vercel.app/api/auth/callback',
    response_type: 'code',
    scope: 'identify guilds',
    state: locale ?? 'en', // State boş gitmesin, varsayılan 'en' olsun
  });

  // Linki temiz bir şekilde birleştiriyoruz
  const url = `https://discord.com/oauth2/authorize?${params.toString()}`;

  res.redirect(302, url);
}

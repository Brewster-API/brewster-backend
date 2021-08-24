import fetch from 'node-fetch';

export const exchangeCodeForToken = async (code) => {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'aplication/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.client_id,
      client_secrects: process.env.Client_SECRECTS,
      code,
    }),
  });
  const body = await response.json();
  return body.access_token;
};
export const getUserProfile = async (token) => {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `token ${token}`,
    },
  });
  const body = await response.json();
  return body;
};



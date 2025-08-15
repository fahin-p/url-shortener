// /api/[shortCode].js
export default async function handler(req, res) {
  const { shortCode } = req.query;

  global.urlDatabase = global.urlDatabase || {};
  const longUrl = global.urlDatabase[shortCode];

  if (!longUrl) {
    return res.status(404).send('Short URL not found.');
  }

  res.writeHead(302, { Location: longUrl });
  res.end();
}

// server/index.js
module.exports = (req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const { url } = JSON.parse(body);
        if (!url) return res.status(400).json({ error: 'URL is required' });

        const shortCode = Math.random().toString(36).substring(2, 8);
        const shortUrl = `${req.headers.origin || 'https://url-shortener-chi-five.vercel.app/'}/${shortCode}`;
        res.status(200).json({ shortUrl });
      } catch (e) {
        res.status(400).json({ error: 'Invalid JSON' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

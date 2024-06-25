const express = require('express');
const app = express();
const port = 3000;

app.get('/static', (req, res) => {
  res.json({ header: 'Hello', body: 'Octagon NodeJS Test' });
});

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end('<h1>Привет, Октагон!</h1>');
});

app.get('/dynamic', (req, res) => {
  const { a, b, c } = req.query;
  const values = [a, b, c].map(Number);

  if (values.some(isNaN)) {
    res.json({ header: 'Error' });
  } else {
    const result = values.reduce((product, value) => product * value, 1) / 3;
    res.json({ header: 'Calculated', body: result.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

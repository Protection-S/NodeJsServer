const express = require('express');
const app = express();
const port = 3000;

app.get('/static', (request, response) => {
  response.json({ header: 'Hello', body: 'Octagon NodeJS Test' });
});

app.get('/', (request, response) => {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.end('<h1>Привет, Октагон!</h1>');
  });

app.get('/dynamic', (request, response) => {
  const a = parseFloat(request.query.a);
  const b = parseFloat(request.query.b);
  const c = parseFloat(request.query.c);

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    response.json({ header: 'Error' });
  } else {
    const result = (a * b * c) / 3;
    response.json({ header: 'Calculated', body: result.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('✅ It works! Your server is alive!');
});

app.listen(5050, () => {
  console.log('🟢 Test server running at http://localhost:5050');
});

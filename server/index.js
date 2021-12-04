const express = require('express');
const { getOverview } = require('./models');

const app = express();
const PORT = 8080 || process.env.PORT;

app.use(express.static('client/dist'));

app.use(express.json());

app.get('/products/:id', getOverview);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

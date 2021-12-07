const express = require('express');
const cors = require('cors');
const { getOverview } = require('./models');

const app = express();
const PORT = 8080 || process.env.PORT;

// app.use(express.static('client/dist'));
app.use(cors());
app.use(express.json());

app.get('/bills/:id', getOverview);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

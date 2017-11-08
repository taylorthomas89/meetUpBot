'use strict';

const express = require('express');
require('dotenv').load();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}\n`);
});

module.exports = { app };

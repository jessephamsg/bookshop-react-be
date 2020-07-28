const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router/routes');
const db = require('./db/db');

app.use(bodyParser.json());
app.use(cors());
app.use(router);
db.connect();

app.listen(port, () => {
    console.log('listening on', port);
});
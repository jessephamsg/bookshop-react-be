const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router/routes');
const db = require('./db/db');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const corsURLs = ['http://localhost:3000','https://bookshop-dev-fe.herokuapp.com','https://bookshop-react-fe.herokuapp.com'];

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json());
app.use(cors({
    origin: corsURLs,
    credentials: true
}));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
      })
);

app.use(cookieParser('secret'))
app.use(passport.initialize());
app.use(passport.session());
require('./services/passport')(passport);

app.use(router);
db.connect(); 

app.listen(port, () => {
    console.log(`listening on ${port}`);
});
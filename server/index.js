const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const user = require('./controllers/user-controller');

app.use(bodyParser.json());
require('dotenv').config();

app.use(express.static(`${__dirname}/../build`));

app.use(
  session({
    secret: 'za-fan/link-tracking',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000 * 24 * 14
    }
  })
);

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Session Management

app.post('/api/v1/create-session', user.createSession);
app.post('/api/v1/destroy-session', user.destroySession);
app.get('/api/v1/session', user.session);

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(port);
});

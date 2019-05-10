const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const {validateJwtToken} = require('./api/middlewares/jwtValdiator');

const enquire = require('./api/enquire');
const auth = require('./api/auth');

// N.B: All routes under /enquire require JWT token validation
app.use('/enquire', validateJwtToken, enquire);

// Auth does not require JWT validation
app.use('/auth', auth);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const swaggerUi = require('swagger-ui-express');
const express = require('express');
const cors = require('cors');
const YAML = require('yamljs');
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load('./mock_api/swagger.yaml')));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

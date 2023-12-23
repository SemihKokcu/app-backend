const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errorHandler } = require('./src/utils/errors/ErrorHandler');
const dotenv = require('dotenv');

const authRoutes = require('./src/routes/AuthRoutes')
const userRoutes = require('./src/routes/UserRoutes')
const productRoutes = require('./src/routes/ProductRoutes')
const roleRoutes = require('./src/routes/RoleRoutes')
const claimRoutes = require('./src/routes/ClaimRoutes')

dotenv.config();
const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: path.resolve(__dirname, envFile) });

const app = express();
app.use(bodyParser.json());

app.use('/images', express.static(path.join(process.cwd(), '/public/images/')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/products',productRoutes)
app.use('/api/roles',roleRoutes)
app.use('/api/claims',claimRoutes)

app.use(errorHandler);

mongoose
  .connect(process.env.DATABASE_URL)
  .then((result) => {
    app.listen(process.env.PORT);
    console.info('Listening on port: ' + process.env.PORT);
  })
  .catch((error) => {
    console.info(error);
  });

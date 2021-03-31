const express = require('express');
// const mongoose = require('mongoose');
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://postgres:password@127.0.0.1:5001/postgres')


const cors = require('cors');
const port = 3000;

const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const config = require('./config/config.json');


// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// });


//  EXPRESS::INITIALIZE APP -/

const app = express();

// # ADD MIDDLEWARE -/

app.use(cors());

// # GRAPHQL::API SERVICE -/

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);


db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value);
  })
  .catch(function (error) {
    console.log('ERROR:', error);
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


// # MONGOOSE::DATABASE SETUP -/


// mongoose
//   .connect(
//     'mongodb://backend_admin:password@localhost:27017/mean-ecommerce',
//     {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//     }
//   )
//   .then(() => {
//     app.listen(3000, console.log('Connected to Port 3000.'));
//   })
//   .catch((err) => console.log(err));
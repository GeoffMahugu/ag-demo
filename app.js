require('dotenv').config()

const express = require('express');
const pgp = require('pg-promise')(/* options */);

const db_config = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
};

const db = pgp(db_config);
// const db = pgp('postgres://postgres:password@127.0.01:5001/postgres');


const cors = require('cors');
const port = 3000;

const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

// const config = require('./config/config.json');


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

// db.one('select * from users')
//     .then(res => {
//         console.log('DB RESPONSE');
//         console.log(res);
//     });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

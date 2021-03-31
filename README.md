### GraphQL - Sequelize - Express

This document contains details of the project setup.

![Screenshot from 2021-04-01 00-13-51](https://user-images.githubusercontent.com/17265995/113213199-80d76100-9280-11eb-8390-792c758f3835.jpg)


### Project Layout

[config](./config)  - Contains configuration for the database

[data](./data)  - Contains database file (not in repo; will auto generate)

[graphql](./graphql)  - Contains graphl mutations and schema

[migrations](./migrations)  - Contains Sequelizer migrations for DB

[models](./models)  - Contains Sequelizer model schema for DB



#### Run Project

To run the project run:

``npm run serve``  This serves the backend on http://localhost:3000

To run the docker container:


``docker-compose -f "docker-compose.yml" up -d --build``

The docker creadentials are(Found on .env file):


#### Database Setup

To create the db:

``sequelize db:create``

To make migrations:

``sequelize db:migrate``

To generate the tables:

USERS  - ``sequelize model:generate --name user --attributes name:string,balance:float``

BET - ``sequelize model:generate --name bet --attributes betAmount:float,chance:float,payout:float,win:boolean``


### GraphQl Queries & Mutations

**To create a User:**

```

mutation {
  createUser(userInput: { name: "TestUser"}){
	id,
    name,
    balance,
    updatedAt,
    createdAt,
  }
},
```

**To get a single User**


```
{
  getUser(id:"09a685c1-6199-4f85-94e6-8628afa37d75"){
    id,
    name,
    balance,
    updatedAt,
    createdAt,
  }
}

```

**To get all Users**

```
{
    getUserList {users{id,name,balance,createdAt,updatedAt}}
}
```


**To delete a User**


```
mutation {
  deleteUser(id:"6391b918-2e98-4f4e-9224-8f302c6e4214"){
      id,
      name,
      balance,
      updatedAt,
      createdAt,
  }
 }

```


**To create a Bet**


```
mutation {
    createBet(betInput: {userId: "c9edbe82-71e7-4ea2-b9e1-55255e03a3eb", betAmount: 400, chance: 7.1}){
    id,
    userId,
    betAmount,
    chance,
    payout,
    win,
    createdAt,
    updatedAt
    }
}

```

**To get all Bets**

```
{
    getBestBetPerUser(id: "c9edbe82-71e7-4ea2-b9e1-55255e03a3eb"){bets{id, userId,betAmount, chance,payout,win,createdAt,updatedAt}}
}
```


**To get a users bets Bets**


```
{
  getBestBetPerUser(id: "c9edbe82-71e7-4ea2-b9e1-55255e03a3eb"){bets{id, userId,betAmount, chance,payout,win,createdAt,updatedAt}}
}

```

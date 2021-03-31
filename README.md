### GraphQL - Sequelize - Express

This document contains details of the project setup.


### Project Layout

[config](./config)  - Contains fonfiguration for the database



#### Run Project

To run the project run:

``npm run serve``  This serves the backend on http://localhost:3000

To run the docker container:


``docker-compose -f "docker-compose.yml" up -d --build``

The docker creadentials are:


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
        updated_at,
        created_at,
    }
}

```

**To get all Users**

```
{
    getUserList {users{id,name,balance,created_at,updated_at}}
}
```


**To delete a User**


```
mutation {
    deleteUser(id:"9cc37f1c-6409-4a70-848f-34d5eecde4bb"){
        id,
        name,
        balance,
        updated_at,
        created_at,
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
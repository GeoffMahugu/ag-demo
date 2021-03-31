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

const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        id:ID!
        name: String!
        balance: Float!
        bet: [Bet!],
        createdAt: String!
        updatedAt: String!
    }    
    type UserData {
        users: [User!]!
    }
    input UserInputData {
        name: String!,
    }
    type Bet {
        id:ID!
        userId: String!,
        betAmount: Float!
        chance: Float!
        payout: Float!
        win: Boolean!
        created_at: String!
        updated_at: String!
    }    
    type BetData {
        bets: [Bet!]!
    }
    input BetInputData {
        userId: String!
        betAmount: Float!
        chance: Float!
    }
    type RootQuery {
        getUserList: UserData!
        getUser(id: ID!): User!
        getBetList: BetData!
    }
    type RootMutation {
        createUser(userInput:UserInputData): User!
        deleteUser(id: ID!,userInput:UserInputData): User!
        createBet(betInput:BetInputData): Bet!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);


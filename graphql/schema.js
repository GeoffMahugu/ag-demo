
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        _id:ID!
        name: String!
        balance: Float!
        bets: [Bet!],
        created_at: String!
        updated_at: String!
    }    
    type UserData {
        users: [User!]!
    }
    input UserInputData {
        name: String!
        balance: Float!
    }
    type Bet {
        _id:ID!
        userId: User!,
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
        getBetList: BetData!
    }
    type RootMutation {
        createUser(userInput:UserInputData): User!
        createBet(betInput:BetInputData): Bet!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);


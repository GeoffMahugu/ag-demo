const { v4: uuidv4 } = require('uuid');
const db = require('../models/index');

module.exports = {

  /**
   * CREATE USER - 
   * @param { name } 
   * @returns User
   * @mutation 
    mutation {
      createUser(userInput: { name: "TestUser"}){
          id,
          name,
          balance,
          updatedAt,
          createdAt,
      }
    },
   */
  createUser: async function ({ userInput }) {
    const newUser = db.user.build({
      id: uuidv4(),
      name: userInput.name,
    });

    const createdUser = await newUser.save();

    return {
      ...createdUser.dataValues,
    };
  },

  /**
   * GET USERS - 
   * @param {id} ID
   * @returns User
   * @query
   *  {
        getUser(id:"09a685c1-6199-4f85-94e6-8628afa37d75"){
          id,
          name,
          balance,
          updated_at,
          created_at,
        }
      }
   */
  getUser: async function ({ id }) {
    const user = await db.user.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User Not found!');
    }

    return {
      ...user.dataValues,
    };
  },

  /**
   * READ: QUERY USERS - 
   * @returns USER 
   * @query
   * {
      getUserList {users{id,name,balance,created_at,updated_at}}
    }
   */
  getUserList: async function () {

    // const users = await db.user.findAll({attributes: ['name', 'balance']});
    const users = await db.user.findAll();
    return { users: users };
  },


  /**
   * DELETE USERS - 
   * @param {id} ID
   * @returns User
   * @mutation 
   * mutation {
      deleteUser(id:"9cc37f1c-6409-4a70-848f-34d5eecde4bb"){
          id,
          name,
          balance,
          updated_at,
          created_at,
      }
     }
   */
  deleteUser: async function ({ id, userInput }) {
    const user = await db.user.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User Not found!');
    }
    await user.destroy();
    return {
      ...user.dataValues,
    };
  },

  /**
  * CREATE BET - 
  * @param { BetInputData }
  * @returns Bet
  * @mutation 
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
  */
  createBet: async function ({ betInput }) {
    const user = await db.user.findOne({ where: { id: betInput.userId } });
    if (!user) {
      throw new Error('User Not found!');
    }

    if (betInput.chance <= 0) throw new Error('Invalid Bet chance!');
    let newBet = null;
    if (betInput.chance >= 5) {
      // We will conside > 5 chance as a win with fixed payout of 1200
      newBet = db.bet.build({
        id: uuidv4(),
        userId: user.dataValues.id,
        betAmount: (0.0).toFixed(1),
        chance: betInput.chance,
        payout: 1200,
        win: true,
      });
    } else {
      newBet = db.bet.build({
        id: uuidv4(),
        userId: user.dataValues.id,
        betAmount: betInput.betAmount,
        chance: betInput.chance,
        payout: (0.0).toFixed(1),
        win: false,
      });
    }
    const createdBet = await newBet.save();

    return {
      ...createdBet.dataValues,
    };
  },

  /**
  * READ: QUERY All BETS - 
  * @returns Bets 
  * @query
  * {
      getBestBetPerUser(id: "c9edbe82-71e7-4ea2-b9e1-55255e03a3eb"){bets{id, userId,betAmount, chance,payout,win,createdAt,updatedAt}}
    }
  * */
  getBetList: async function () {
    const bets = await db.bet.findAll();
    return { bets: bets };
  },

  getBestBetPerUser: async function ({ id }) {
    const user = await db.user.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User Not found!');
    }

    // For best bets will only check where user won.
    const filteredBets = await db.bet.findAll({ where: { userId: id, win: true } });
  },


};
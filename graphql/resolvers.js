const { v4: uuidv4 } = require('uuid');
const db = require('../models/index');

module.exports = {

  /**
   * CREATE USER - 
   * @param { name } 
   * @returns User
   * @mutation 
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
   */
  getUserList: async function () {
    const users = await db.user.findAll();
    return { users: users };
  },

  /**
   * DELETE USERS - 
   * @param {id} ID
   * @returns User
   * @mutation 
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
  * @returns [Bets!]! 
  * @query
  *
   */
  getBetList: async function () {
    const bets = await db.bet.findAll();
    return { bets: bets };
  },

  /**
  * READ: QUERY USERS BEST BETS - 
  * @returns [Bets!]! 
  * @query
  *
   */

  getBestBetPerUser: async function ({ id }) {
    const user = await db.user.findOne({ where: { id: id } });
    if (!user) {
      throw new Error('User Not found!');
    }
    // For best bets will only check where user won.
    const filteredBets = await db.bet.findAll({ where: { userId: id, win: true } });
  },


};
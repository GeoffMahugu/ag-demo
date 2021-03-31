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
          updatedAt,
          createdAt,
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
   * {users{users{_id, balance,created_at,updated_at}}}
   */
  getUserList: async function () {

    // const users = await db.user.findAll({attributes: ['name', 'balance']});
    const users = await db.user.findAll();
    return { users: users };
  },

  /**
   * UPDATE PRODUCT - 
   * @param {id}, { name, description, price, discount} ID,ProductInput
   * @returns Product
   * @mutation 
   * mutation {
      updateProduct(id:"605497bce3ad5c614f21c292",productInput: { name: "Test Product 2",description: "Test Product",price: 7500.50,discount: 8}){
          _id,
          name,
          description,
          price,
          discount,
          created_at,
          updated_at
      }
      }
   */
  // updateProduct: async function ({ id, productInput }) {
  //     const product = await Product.findById(id);
  //     if (!product) {
  //       throw new Error('Product Not found!');
  //     }
  //     product.name = productInput.name;
  //     product.description = productInput.description;
  //     product.price = productInput.price;
  //     product.discount = productInput.discount;

  //     const updatedProduct = await product.save();
  //     return {
  //       ...updatedProduct._doc,
  //       _id: updatedProduct._id.toString(),
  //     };
  //   },

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
          updatedAt,
          createdAt,
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
     createBet(userInput: { name: "TestUser"}){
         id,
         name,
         balance,
         updatedAt,
         createdAt,
     }
   },
  */
  createBet: async function ({ betInput }) {
    console.log(betInput);

    const user = await db.user.findOne({ where: { id: betInput.userId } });
    if (!user) {
      throw new Error('User Not found!');
    }
    console.log('------------------------');
    console.log(user);
    console.log('------------------------');

    if (betInput.chance <= 0) throw new Error('Invalid Bet chance!');
    let newBet = null;
    if (betInput.chance >= 5) {
      // We will conside >5 chance as a win with fixed payout of 1200
      newBet = db.bet.build({
        userId: user,
        betAmount: (0.0).toFixed(1),
        chance: betInput.chance,
        payout: 1200,
        win: true,
      });
    } else {
      newBet = db.bet.build({
        userId: user,
        betAmount: betInput.betAmount,
        chance: betInput.chance,
        payout: (0.0).toFixed(1),
        win: false,
      });
    }

    // const dummyBet = {
    //   id: "1212",
    //   userId: user.id,
    //   betAmount: betInput.betAmount,
    //   chance: betInput.chance,
    //   payout: 1000,
    //   win: true,
    //   created_at: "asdasdasd",
    //   updated_at: "asdasdasdas"
    // };

    // return dummyBet;

    const createdBet = await newBet.save();

    return {
      ...createdBet.dataValues,
    };

    // const newUser = db.user.build({
    //   id: uuidv4(),
    //   name: userInput.name,
    // });

    // const createdUser = await newUser.save();

    // return {
    //   ...createdUser.dataValues,
    // };
  },
};
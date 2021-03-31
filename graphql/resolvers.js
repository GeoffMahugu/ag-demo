// const user = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/index');
// const user = require('../models/user');
// const User = require('../models/user').default;
// const bet = require('./models/bet');

module.exports = {
    
    /**
     * CREATE USER - 
     * @param { name, balance} ProductInput
     * @returns User
     * 
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
        const newUser =  db.user.build({
          id: uuidv4(),
          name: userInput.name,
        });

        const createdUser= await newUser.save();
      
        return {
          ...createdUser.dataValues,
        };
    },

    /**
     * READ: QUERY USERS - 
     * @returns USER 
     * { name, balance, created_at, updated_at}
     * @query
     * 
       {
        users{users{_id, balance,created_at,updated_at}}
       }
     */
      getUserList: async function() {

          // const users = await db.user.findAll({attributes: ['name', 'balance']});
          const users = await db.user.findAll();
          return {users: users};
      },

    /**
     * UPDATE PRODUCT - 
     * @param {id}, { name, description, price, discount} ID,ProductInput
     * @returns Product
     * 
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
     * 
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
        const user = await db.user.findOne({where: {id: id}});
        if (!user) {
          throw new Error('User Not found!');
        }
        await user.destroy();
        return {
          ...user.dataValues,
          };      
        },
};
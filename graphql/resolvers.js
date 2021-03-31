const User = require('../models/user');
// const User = require('../models/user').default;
// import User from '../models/user';
// const bet = require('./models/bet');

module.exports = {
    
    /**
     * CREATE USER - 
     * @param { name, balance} ProductInput
     * @returns User
     * 
     * @mutation 
     * mutation {
        createUser(userInput: { name: "TestUser",balance: 0.50}){
            _id,
            name,
            balance,
            created_at,
            updated_at
        }
       }
     */
    createUser: async function ({ userInput }) {
        // const user = new User({
        //   name: userInput.name,
        //   balance:userInput.balance
        // });
        // const createdUser= await user.save();
        // return createdUser;
        console.log(User);
        return Hello;


        // return {
        //   ...createdUser._doc,
        //   _id: createdUser._id.toString(),
        // };
    },

    /**
     * READ: QUERY PRODUCT - 
     * @returns Product 
     * { name, description, price, discount, created_at, updated_at}
     * @query
     * 
       {
        products{products{_id, description, price, discount,created_at,updated_at}}
       }
     */
        // products: async function() {
        //     const products = await Product.find();
        //     return {
        //         products: products.map((q)=>{
        //             return {
        //                 ...q._doc,
        //                 _id: q._id.toString(),
        //             };
        //         })
        //     };
        // },

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
     * DELETE PRODUCT - 
     * @param {id} ID
     * @returns Product
     * 
     * @mutation 
     * mutation {
        deleteProduct(id:"605497bce3ad5c614f21c292"){
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
    // deleteProduct: async function ({ id, productInput }) {
    //     const product = await Product.findById(id);
    //     if (!product) {
    //       throw new Error('Product Not found!');
    //     }
    //     await Product.findByIdAndRemove(id);
    //     return {
    //       ...product._doc,
    //       _id: product._id.toString(),
    //     };
    //   },
};
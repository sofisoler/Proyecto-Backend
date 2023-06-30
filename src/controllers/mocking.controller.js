const faker = require('faker');
const { productsModel } = require('../Daos/mongo/models/products.model');
const { logger } = require('../utils/logger');

const generateMockProducts = () => {
    const mockProducts = [];
  
    for (let i = 0; i < 100; i++) {
      const product = {
        title: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        thumbnail: faker.image.imageUrl(),
        price: faker.commerce.price(),
        code: faker.random.number(),
        stock: faker.random.number(),
      };
  
      mockProducts.push(product);
    }
    return mockProducts;
};

const getMockingProducts = async (req, res) => {
    try {
      const mockProducts = generateMockProducts();
      await productsModel.insertMany(mockProducts);
      res.status(200).json({ message: 'Mock products created successfully' });
    } 
    catch (error) {
      logger.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getMockingProducts };
const faker = require("faker");
const { productsModel } = require("../Daos/mongo/models/products.model");
const { logger } = require("../utils/logger");

// Función para generar productos de prueba
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

// Controlador para generar y agregar productos de prueba
const getMockingProducts = async (req, res) => {
    try {
        const mockProducts = generateMockProducts();
        await productsModel.insertMany(mockProducts);
        res.status(200).json({ message: 'Productos de prueba creados exitosamente' });
    } 
    catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { getMockingProducts };
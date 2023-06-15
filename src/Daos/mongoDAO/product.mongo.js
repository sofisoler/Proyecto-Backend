const { productsModel } = require("../mongo/models/products.model");

class ProductManagerMongo {

    get = async ({ page, limit, query='' }) =>  {
        return await productsModel.paginate({}, {limit, page, lean:true })
    };

    getById = async (pid) => {
        return await productsModel.findById({_id: pid});
    };
    
    create = async (newItem) => {
        return await productsModel.create(newItem)
    };

    update = async (pid, productToReplace) => {
        return await productsModel.updateOne({_id: pid}, productToReplace)
    };

    delete = async (pid) => {
        return await productsModel.deleteOne({_id: pid})
    };
};

module.exports = ProductManagerMongo
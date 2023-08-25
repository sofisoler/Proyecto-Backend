class ProductDto {
    
    constructor(product) {
        this._id = product._id;
        this.title = product.title;
        this.description = product.description;
        this.thumbnail = product.thumbnail;
        this.price = product.price;
        this.stock = product.stock;
    };
};

module.exports = { ProductDto };
productsArray = [{
    id: 1,
    title: 'Base',
    description: 'Base de maquillaje para una alta cobertura y acabado matte.',
    thumbnail: 'https://www.maybelline.com.ar/~/media/mny/global/face-makeup/foundation/super-stay-full-coverage-foundation/maybelline-foundation-super-stay-full-coverage-classic-ivory-041554541427-c.jpg?thn=0&w=380&hash=3E33CBC29C47F694836B6871906FB5F0386ED474',
    price: '6000',
    code: '0001',
    stock: 100,
}];

class ProductManager {
    constructor() {
        this.products = productsArray
    }
    addProduct(newProduct){
        const product = this.products.find(prod => prod.code === newProduct.code)
        if(product) {
            return 'Existe el producto con este código'
        }
        if (this.products.length === 0) {
            this.products.push({id: 1, ...newProduct})
        } else {
            this.products.push({id: this.products[this.product.length-1].id + 1, ...newProduct})
        }
    }
    getProducts(){
        return this.products
    }
    getProductById(id){
        const product = this.products.find(prod => prod.id === id)
        if(!product) {
            return 'Not found'
        }
        return product
    }
}

// module.exports = {
//     ProductManager
// }

const productos = new ProductManager()
import {promises as fs} from "fs"

export default class ProductManager {
    constructor() {
        this.patch = "./products.txt"
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, thumbnail, price, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            thumbnail,
            price,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        if (!respuesta3.find(product => product.id === id)){
            console.log("Product not found")
        } else {
            console.log(respuesta3.find(product => product.id === id))
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("Product deleted successfully")
    }

    updateProducts = async ({id, ...product}) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts()
        let productsModified = [{...product, id}, ...productOld]
        await fs.writeFile(this.patch, JSON.stringify(productsModified))
    }
}

// const products = new ProductManager

// products.addProduct("Base", "Base de maquillaje para una alta cobertura y acabado matte.",
// "https://www.maybelline.com.ar/~/media/mny/global/face-makeup/foundation/super-stay-full-coverage-foundation/maybelline-foundation-super-stay-full-coverage-classic-ivory-041554541427-c.jpg?thn=0&w=380&hash=3E33CBC29C47F694836B6871906FB5F0386ED474", 6000, "0001", 100)
// products.addProduct("Product1", "Description1", "Image1", 2000, "0002", 50)
// products.addProduct("Product2", "Description2", "Image2", 8000, "0003", 50)
// products.addProduct("Product3", "Description3", "Image3", 3000, "0004", 50)
// products.addProduct("Product4", "Description4", "Image4", 5000, "0005", 50)

// products.getProducts()

// products.getProductsById(1)
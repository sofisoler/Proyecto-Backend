const { logger } = require("../../utils/logger")

const socket = io()

const loadProducts = () => {
    socket.on('loadProducts', (data) => {
        logger.info(data)
    })
}

const saveProduct = (title,description,thumbnail,price,code,stock,id) => {
    socket.emit('newProduct', {
        title,
        description,
        thumbnail,
        price,
        code,
        stock,
        id
    })
}

const createProductForm = document.querySelector('#createProductForm')

createProductForm.addEventListener('submit', (e) => {
    e.preventDefault()
    saveProduct(
        createProductForm['title'].value,
        createProductForm['description'].value,
        createProductForm['thumbnail'].value,
        createProductForm['price'].value,
        createProductForm['code'].value,
        createProductForm['stock'].value,
    )
})
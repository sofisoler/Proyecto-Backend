const { connect } = require("mongoose")

let url = `mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority`

const objConfig = {
    connectDB: async () =>{
        try {
            await connect(url)
            console.log('Database connected')
        } catch (error) {
            console.log(error)
        } 
    }, 
    url: 'mongodb+srv://sofisoler01:sofia123@proyectobackend.clbjxic.mongodb.net/ecommerce?retryWrites=true&w=majority' 
}

module.exports = {
    objConfig
}
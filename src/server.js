const express = require('express')
const productRouter = require('./routes/product.router')
const cartRouter = require('./routes/cart.router')

const app = express();
const PORT = 8080;
app.use(express.urlencoded({extended : true}));

app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)

const server = app.listen(PORT, () => {
    console.log(`Express server listening on ${server.address().port}`)
});

server.on("error", (error) => console.log(`Express server error: ${error}`))
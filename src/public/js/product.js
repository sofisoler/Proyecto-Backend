const socket = io();

const createProductForm = document.querySelector('#createProductForm');

createProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = createProductForm['title'].value;
    const description = createProductForm['description'].value;
    const thumbnail = createProductForm['thumbnail'].value;
    const price = createProductForm['price'].value;
    const code = createProductForm['code'].value;
    const stock = createProductForm['stock'].value;

    const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            description,
            thumbnail,
            price,
            code,
            stock,
        }),
    });

    if (response.ok) {
        socket.emit('newProductCreated');
    }
});
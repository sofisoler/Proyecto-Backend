class RepositoryGeneric {

    constructor(dao) {
        this.dao = dao;
    };

    // Obtener elementos
    async getItems({page, limit}) {
        return await this.dao.get({page, limit});
    };

    // Obtener un elemento por su ID
    async getItemById(id) {
        return await this.dao.getById(id);
    };

    // Crear un nuevo elemento
    async createItem(newItem) {
        return await this.dao.create(newItem);
    };

    // Actualizar un elemento por su ID
    async updateItem(id, itemToUpdate) {
        return await this.dao.update(id, itemToUpdate);
    };

    // Eliminar un elemento por su ID
    async deleteItem(id) {
        return await this.dao.delete(id);
    };

    // Eliminar un producto de un carrito por los IDs de carrito y producto
    async deleteProductInCart(cid, pid) {
        return await this.dao.delete(cid, pid);
    };

    // Eliminar todos los elementos de un carrito por su ID
    async deleteItems(id) {
        return await this.dao.deleteItems(id);
    };

    // Obtener el carrito de un usuario por su ID
    async getCartByUser(uid) {
        return await this.dao.getCartByUser(uid);
    };

    // Crear un carrito nuevo para un usuario
    async createCartForUser(uid) {
        return await this.dao.createCartForUser(uid);
    };

    // Eliminar una orden por su ID
    async deleteOrder(oid) {
        return await this.dao.delete(oid);
    };

    // Obtener órdenes de un usuario por su ID
     async getUserOrders(uid) {
        return await this.dao.getUserOrders(uid);
    };
};

module.exports= RepositoryGeneric;
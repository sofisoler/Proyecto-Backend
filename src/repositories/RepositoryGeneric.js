class RepositoryGeneric {

    constructor(dao) {
        this.dao = dao
    };

    async getItems({page, limit}) {
        return await this.dao.get({page, limit})
    };

    async getItemById(id) {
        return await this.dao.getById(id)
    };

    async createItem(newItem) {
        return await this.dao.create(newItem)
    };

    async updateItem(id, itemToUpdate) {
        return await this.dao.update(id, itemToUpdate)
    };

    async deleteItem(cid, pid) {
        return await this.dao.delete(cid, pid)
    };

    async deleteItems(id) {
        return await this.dao.deleteItems(id)
    };
};

module.exports= RepositoryGeneric
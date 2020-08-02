const authRepositories = require('../repositories/authRepositories');

module.exports = {
    async findOne (filter) {
        const result = await authRepositories.findOne(filter);
        return result
    },
    async createOne (name, email, password) {
        await authRepositories.createOne(name, email, password);
        return true
    }
}
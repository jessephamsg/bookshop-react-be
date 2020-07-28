const mongoose = require('mongoose');
const {
    MongoMemoryServer
} = require('mongodb-memory-server');
const MONGO_SERVER = process.env.MONGO_SERVER || 'localhost:27017';
const DB_NAME = process.env.DB_NAME || 'Inventories';

const server = new MongoMemoryServer();

module.exports = {
    async connect() {
        const serverUrl = await server.getUri();
        try {
            await mongoose.connect(
                serverUrl, {
                    useNewUrlParser: true
                }
            )
            console.log(`Connecting to db on ${MONGO_SERVER}`);
        } catch {
            console.log(`Error connecting to db: ${err}`);
        }
    },
    async disconnect() {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await server.stop();
    },
    async clearMockData() {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
}
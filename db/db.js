const mongoose = require('mongoose');
const MONGO_SERVER = process.env.MONGO_SERVER || 'localhost:27017';
const DB_NAME = process.env.DB_NAME || 'Inventories';

module.exports = {
    async connect() {
        try {
            console.log('attempt to connect')
            await mongoose.connect(
                `mongodb://${MONGO_SERVER}/${DB_NAME}`, {
                    useNewUrlParser: true
                }
            )
            console.log(`Connecting to db on ${MONGO_SERVER}`);
        } catch {
            console.log(`Error connecting to db: ${err}`);
        }
    },
    disconnect() {
        return mongoose.connection.close(() => {
            console.log('Database connection closed');
        })
    }
}
const mongoose = require('mongoose');
const MONGO_SERVER = process.env.MONGO_SERVER || 'mongodb://localhost:27017/Bookstore';
//const DB_NAME = process.env.DB_NAME || 'Bookstore';

module.exports = {
    async connect() {
        try {
            console.log('attempt to connect')
            await mongoose.connect(
                `${MONGO_SERVER}`, {
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
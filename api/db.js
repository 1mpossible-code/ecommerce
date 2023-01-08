const mongoose = require('mongoose');

module.exports = {
    connect: DB_HOST => {
        mongoose.set('strictQuery', true);
        mongoose.connect(DB_HOST, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        mongoose.connection.on('error', err => {
            console.error(err);
            console.log(
                'MongoDB connection error. Please make sure MongoDB is running.',
            );
            process.exit();
        });
        mongoose.connection.once('open', () => {
            console.log('MongoDB connected');
        });
    },
    close: () => {
        mongoose.connection.close();
    },
};
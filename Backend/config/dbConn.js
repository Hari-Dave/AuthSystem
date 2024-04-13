const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Deprecated
        // await mongoose.connect(process.env.DATABASE_URI, {
        //     useUnifiedTopology: true,
        //     useNewUrlParser: true
        // });
        await mongoose.connect(process.env.DATABASE_URI);
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;
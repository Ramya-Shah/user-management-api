const app = require('./app.js');
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const database_url = process.env.DATABASE_URL

mongoose.connect(database_url)
    .then(() => {
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log('Error connecting to database', err);
    });
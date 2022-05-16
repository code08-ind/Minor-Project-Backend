const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config({ path: "./config.env" });

require('./db/conn.js');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//? model
const Users = require('./model/userSchema.js');
const Properties = require('./model/propertySchema.js');

//? routes
app.use(require('./router/auth.js'));

const port = process.env.PORT || 6000;

app.get('/users', async (req, res) => {
    try {
        const User = await Users.find();
        res.status(200).json(User);
        console.log(User);
    } catch (error) {
        console.log(error);
    }
});

app.get('/properties', async (req, res) => {
    try {
        const Property = await Properties.find();
        res.status(200).json(Property);
        console.log(Property);
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Server Running At Port ${port}`);
});

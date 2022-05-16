const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

require('../db/conn.js');
const Users = require('../model/userSchema.js');
const Properties = require('../model/propertySchema.js');

//! async await

//? Post User
router.post('/user', async (req, res) => {
    const { name, regno, image, isBuyer, isSeller, currentAddress, property, balance, bank } = req.body;
    try {
        const userExist = await Users.findOne({ name: name });
        if (userExist) {
            return res.status(422).json({ error: "Name Already Exists." });
        } else {
            const user = new Users({ name, regno, image, isBuyer, isSeller, currentAddress, property, balance, bank });
            const userRegister = await user.save();
            if (userRegister) {
                res.status(201).json({ message: "User Created Successfully." });
            } else {
                res.status(500).json({ error: "Failed To Register." });
            }
        }
    } catch (error) {
        console.log(error);
    }
});

//? Post Property
router.post('/property', async (req, res) => {
    const { regno, image, address, ownerName, estimatedPrice } = req.body;
    if (!regno || !image || !address || !ownerName || !estimatedPrice) {
        return res.status(422).json({ error: "Please Fill All The Details." });
    }
    try {
        const property = new Properties({ regno, image, address, ownerName, estimatedPrice });
        const propertyRegister = await property.save();
        if (propertyRegister) {
            res.status(201).json({ message: "Property Created Successfully." });
        } else {
            res.status(500).json({ error: "Failed To Register." });
        }
    } catch (error) {
        console.log(error);
    }
});

//? Edit User
router.patch('/user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, regno, image, isBuyer, isSeller, currentAddress, property, balance, bank } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
    const updatedUser = { name, regno, image, isBuyer, isSeller, currentAddress, property, balance, bank, _id: id };
    await Users.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(updatedUser);
});

//? Edit Property
router.patch('/property/:id', async (req, res) => {
    const { id } = req.params;
    const { regno, image, address, ownerName, estimatedPrice } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No property with id: ${id}`);
    const updatedProperty = { regno, image, address, ownerName, estimatedPrice, _id: id };
    await Properties.findByIdAndUpdate(id, updatedProperty, { new: true });
    res.json(updatedProperty);
});

module.exports = router;

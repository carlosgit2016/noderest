const express = require('express');
const UserModel = require('../models/UserModel');

const routes = express.Router(); // return a core.Router to configure routes
//
routes.get('/', async (req, res) => {
    const body = req.body;
    const { limit } = body;
    body.limit = undefined;
    try {
        const users = await UserModel.find(body).limit(limit).exec();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(404).json(error);
    }
})

routes.post('/save', async (req, res) => {
    const body = req.body;

    try {
        const user = new UserModel(body);
        await user.save();
        console.log('Sucess Save');
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.json({ messageError: error });
    }

})

routes.put('/update', async (req, res) => {
    const body = req.body;

    try {
        const queryUser = UserModel.findOne({ _id: body._id });
        const user = await queryUser.exec();
        if (user === null) {
            res.status(400).send({ message: 'Not Founded to update :(' }).end();
            return;
        };
        await UserModel.updateOne({ _id: user._id }, body).exec();
        res.status(200).json(await queryUser.exec());
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

})

routes.delete('/delete', async (req, res) => {
    const body = req.body;

    try {
        const queryUser = UserModel.findOne({ _id: body._id });
        const user = await queryUser.exec();
        if (user === null) {
            res.status(400).json({ message: 'Not Founded to delete :(' });
            return;
        } else {
            await UserModel.deleteOne({ _id: body._id }).exec();
            res.status(410).json(await queryUser);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

})

module.exports = routes;
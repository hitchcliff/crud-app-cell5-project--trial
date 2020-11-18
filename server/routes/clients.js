const express = require('express')
const router = express.Router();
const Client = require('../model/Clients');

// const {clientObject}
// this is just a sample schema we can use to update and create new person
const clientObject = (req) => { 
    return {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile_number: req.body.mobile_number,
        bills: req.body.bills,
        gender: req.body.gender,
        paid: req.body.paid 
    }
}

const sorting = (schema, val, order) => {
    return schema.find({}).sort({
       first_name: order 
    }) 
}

// used to search text our document
const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// get all the clients
router.get('/', async (req, res) => {
    try {
        const search = req.query.search
        // if we have params search, we search for clients database
        if(search) {
            if(search === "first_dsc" || search === "first_asc") {
                const order = search === "first_asc" ? 1 : 0;
                const data = await sorting(Client, "first_name", order);
                res.json(data)
            } else {
                const regex = new RegExp(escapeRegex(search), 'gi')
                const clients = await Client.find({
                    first_name: regex,
                });
                res.json(clients)
            }
        } 
        else {
            const clients = await Client.find(); 
            res.json(clients)
        }
    } catch (error) {
       res.status(404).json({ message: "cannot find any clients" })
    }
})

// creating a client
router.post('/', async (req, res) => {
    try {
        const client = new Client(clientObject(req))
        const savedClient = await client.save();
        res.json(savedClient)
    } catch (error) {
       res.status(501).json({ message: error });
    }
})

// get specific posts
router.get('/:id', async (req, res) => {
    try {
       const getClient = await Client.findById(req.params.id);
       res.status(200).json(getClient)

    } catch (error) {
        res.status(504).json({
            message: "cannot get the specific post"
        })
    }
})

// delete a client through id
router.delete('/:id', async (req, res) => {
    try {
        const removedClient = await Client.remove({ _id: req.params.id });
        res.json(removedClient); 
    } catch (error) {
        res.status(501).json({
            message: "cannot delete this client" 
        })
    }
})

// patch a client through id
router.patch('/:id', async (req, res) => {
    try {
       const updateClient = await Client.updateOne(
           {_id: req.params.id},
           { $set: clientObject(req)}
       )
       res.status(200).json(updateClient)
    } catch (error) {
       res.status(500).json({
           message: "cannot update this client" 
       }) 
    }
})

module.exports = router
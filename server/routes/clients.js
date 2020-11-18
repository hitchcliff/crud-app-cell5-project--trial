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

// used to search text our document
const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// sorting the documents
const sorting = (schema, value) => {
    return schema.find({}).sort(value) 
}

// check the order `asc` or `dsc`
const checkOrder = (str) => {
    const getLastStr = str.substring(str.length - 4, str.length);
    return getLastStr === "_dsc" ? -1 : 0
}

// get all the clients
router.get('/', async (req, res) => {
    try {
        const search = req.query.search
        // if we have params search, we search for clients database
        if(search) {

            // arrange in desc or asc order
            if(search === "first_dsc" || search === "first_asc") {
               const order = checkOrder(search);
               const data = await sorting(Client, {first_name: order});
               res.json(data)
            } else if (search === "last_dsc" || search === "last_asc") {
               const order = checkOrder(search);
               const data = await sorting(Client, {last_name: order});
               res.json(data)
            } 
            else if (search === "mobile_dsc" || search === "mobile_asc") {
               const order = checkOrder(search);
               const data = await sorting(Client, {mobile_number: order});
               res.json(data)
            } else if (search === "bills_asc" || search === "bills_dsc") {
               const order = checkOrder(search);
               const data = await sorting(Client, {bills: order});
               res.json(data)
            } else if (search === "gender_asc" || search === "gender_dsc") {
               const order = checkOrder(search);
               const data = await sorting(Client, {gender: order});
               res.json(data) 
            } else if (search === "paid_asc" || search === "paid_dsc") {
               const order = checkOrder(search);
               const data = await sorting(Client, {paid: order});
               res.json(data)
            } 
            else {
                const regex = new RegExp(escapeRegex(search), 'gi')
                const clients = await Client.find({
                    first_name: regex,
                });
                res.json(clients)

            }
        } 
        
        // if all of the above didn't meet the req, then @returns all documents
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
        const removedClient = await Client.deleteOne({ _id: req.params.id });
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
       res.status(200).json(req.params.id)
    } catch (error) {
       res.status(500).json({
           message: "cannot update this client" 
       }) 
    }
})

// client is paid
router.patch('/paid/:id', async (req, res) => {
    try {
       const paid = await Client.updateOne({_id: req.params.id}, 
           {$set: {paid: true}}
       ) 
        res.status(200).json(paid)
    } catch (error) {
       res.status(500).json({
           message: "cannot update paid of " + req.params.id
       }) 
    }
})

// client is upaid
router.patch('/unpaid/:id', async (req, res) => {
    try {
       const unpaid = await Client.updateOne({_id: req.params.id}, {
           $set: {paid: false}
       }) 
       res.status(200).json(unpaid)
    } catch (error) {
       res.status(500).json({
           message: "cannot unpaid of " + req.params.id
       })
    }
})


module.exports = router
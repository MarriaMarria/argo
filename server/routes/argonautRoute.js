const router = require('express').Router();
const Argonaut = require('../models/argonautModel');

// list all Argonauts 

// GET localhost:5555/argonaut/

router.get('/', async (req, res) => {
    try {
        const argonauts = await Argonaut.find();
        res.status(200).json(argonauts);
    } catch (err) {
        res.status(500).json(err)
    }
});


// create a new Argonaut

// POST localhost:5555/argonaut/ and in Body we shall pass the parameters (name, username etc)

router.post('/', async (req, res) => {
    try {

        const body = req.body;
        // we will get an object with name, email and info => we destructure them
        const { name, email, info } = req.body;

        // validation 
        if (!name && !email) {
            return res.status(400).json({ error: "You must enter both name and email to register"})
        }

        const newArgonaut = new Argonaut({
            name, email, info
        });


        const savedArgonaut = await newArgonaut.save();

        res.status(200).json(savedArgonaut);

    } catch (err) {
        res.status(500).json(err);
    }
})

// update an Argonaut

// PUT localhost:5999/api/argonauts/id and in Body we shall pass the parameters (username etc)

// router.put('/:id', async (req, res) => {
//     try {
//         const updatedArgonaut = await Argonaut.findByIdAndUpdate(req.params.id, {
//             $set: req.body, // set is a method to update, in this case body 
//         }, {new: true}); // this is to see the updated version in insomnia
//         res.status(200).json(updatedArgonaut);
        
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

// delete an Argonaut

// DELETE localhost:5555/argonaut/id

router.delete('/:id', async (req, res) => {
    try {
        const argonautId = req.params.id;
        // console.log(argonautId); we can test if our frontend sees the backend, just create a request delete http://localhost:5555/argonaut/62223411ae231025d1c9fb2c 
        
        // validation 
        if (!argonautId) {
            return res.status(400).json({ error: "Argonaut ID is not provided. Please contact a developer maria@maria.com. "})
        }

        // check if argonaut exists 
        const existingArgonaut = await Argonaut.findById(argonautId);

        if (!existingArgonaut) {
            return res.status(400).json({ error: "Argonaut ID is not provided. Please contact a developer maria@maria.com. "})
        }
        
        // delete argonaut
        await existingArgonaut.delete();

        res.json(existingArgonaut);
        
    } catch(err) {
        res.status(500).json({ error: err})
    }
})


module.exports = router;
const Entry = require('../models/entry');
const express = require('express');
const entryRouter = express.Router();

// CRUD
// Create
entryRouter.post('/', async (req, res) => {
    try{
        const newJournalEntry = await Entry.create(req.body);
        res
          .status(200)
          .json(newJournalEntry)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Read
/* Index */
entryRouter.get('/', async (req, res) => {
    try{
        const foundJournalEntries = await Entry.find({});
        res
          .status(200)
          .json(foundJournalEntries)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

/* Show */
entryRouter.get('/:id', async (req, res) => {
    try{
        const foundJournalEntry = await Entry.findById(req.params.id);
        res
          .status(200)
          .json(foundJournalEntry)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Update
entryRouter.put('/:id', async (req, res) => {
    try{
        const foundJournalEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res
          .status(200)
          .json(foundJournalEntry)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Delete 
entryRouter.delete('/:id', async (req, res) => {
    try{
        const foundJournalEntry = await Entry.findByIdAndDelete(req.params.id);
        res
          .status(200)
          .json(foundJournalEntry)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})


module.exports = entryRouter;
const Entry = require('../models/entry');
const Quote = require('../models/quote')
const express = require('express');
const quoteRouter = express.Router();

// CRUD
// Create
quoteRouter.post('/', async (req, res) => {
    try{
        const { quote, author, entryID } = req.body
        const newQuote = await Quote.create({
            quote,
            author
        });
        const foundJournalEntry = await Entry.findById(entryID);
        const journalQuote = foundJournalEntry.quote
        const updatedEntry = await Entry.findByIdAndUpdate(entryID, {quote: [...journalQuote, newQuote._id]})
        res
          .status(200)
          .json(newQuote)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Read
/* Index */
quoteRouter.get('/', async (req, res) => {
    try{
        const foundQuotes = await Quote.find({});
        res
          .status(200)
          .json(foundQuotes)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

/* Show */
quoteRouter.get('/:id', async (req, res) => {
    try{
        const foundQuote = await Quote.findById(req.params.id);
        res
          .status(200)
          .json(foundQuote)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Update
quoteRouter.put('/:id', async (req, res) => {
    try{
        const foundQuote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res
          .status(200)
          .json(foundQuote)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})

// Delete 
quoteRouter.delete('/:id', async (req, res) => {
    try{
        const foundQuote = await Quote.findByIdAndDelete(req.params.id);
        res
          .status(200)
          .json(foundQuote)
    }catch(error){
        res
          .status(400)
          .json(error)
    }
})


module.exports = quoteRouter;
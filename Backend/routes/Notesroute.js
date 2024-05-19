const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');
const authmiddle = require('../Middleware/Loginmiddle');

// ROUTE--1--Creating route for getting user notes--endpoint--/api/notes/getnotes--login required--using GET request-
router.get('/getnotes', authmiddle,

    async (req, res) => {
        try {
            const id = req.user.id;
            const getnotes = await Notes.find({ user: id });
            res.json(getnotes);
        }
        catch (error) {
            res.status(500).json({ "error": "internal server error", "message": error.message });
        }
    })

// ROUTE-2--Creating route for addding user notes-using POST request--route--/api/notes/addnotes--login required--
router.post('/addnotes', authmiddle, [
    body('title', 'please enter title of atleast 3 character').isLength({ min: 3 }),
    body('description', 'Please enter description of atleast 5 character').isLength({ min: 5 }),
    body('tag', 'Please enter tag of atleast 2 character').isLength({ min: 2 }),
], async (req, res) => {
    try {
        const result = validationResult(req);
        if (result.isEmpty()) {
            const id = req.user.id;
            const { title, description, tag } = req.body;
            const note = await Notes.create({
                title, description, tag, user: id
            })
            res.json({ "success": true, note });
        }
        //In case validation  is not satisfied --
        else {
            res.send({ "success": false, errors: result.array() });
        }
    } catch (error) {
        res.status(500).json({ "error": "internal server error", "message": error.message });
    }
})

// ROUTE-3--Updating the notes- using PUT request--route--/api/notes/updatenote--Login required-
router.put('/updatenote/:id', authmiddle, async (req, res) => {
    try {
        //Checking wheather the note with given id exist or not--
        const check = await Notes.findById(req.params.id);
        if (!check) {
            return res.status(404).json({ "Error": "not found" });
        }

        //Checking wheather the person is trying to update his own notes or someone else's notes-
        if (req.user.id !== check.user.toString()) {
            return res.status(401).json({ "error": "unauthorised" })
        }

        const { title, description, tag } = req.body;
        let newnote = {};
        if (title) { newnote.title = title };
        if (description) { newnote.description = description };
        if (tag) { newnote.tag = tag };
        const data=await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true });
        res.json({ "success": true ,data});

    } catch (error) {
        res.status(500).json({ "error": "internal server  error", "message": error.message });
    }
})

// ROUTE-4--Deleting the notes- using DELETE request--route--/api/notes/deletenote--Login required-
router.delete('/deletenote/:id', authmiddle, async (req, res) => {
    try {
        const check = await Notes.findById(req.params.id);
        //checking wheather the note with given id exits or not-
        if (!check) {
            return res.status(404).send("not found");
        }
        //Checking wheather the person is trying to delete his own notes or someone else's notes-
        if (req.user.id !== check.user.toString()) {
            return res.status(401).send("unauthorised");
        }
        await Notes.findByIdAndDelete(req.params.id);
        res.json({ "success": true });

    } catch (error) {
        res.status(500).json({ "error": "internal server  error", "message": error.message });
    }
})

module.exports = router;
const notes = require('express').Router();
const fs = require('fs');
const { request } = require('http');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving new note
notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) =>
        res.json(JSON.parse(data))
    );
});

// POST Route for new note
notes.post('/notes', (req, res) => {
    const newNote = req.body;
    console.log(req.body);
    
    newNote.id = uuidv4();

    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    data.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    console.log('New note added to file');
    
    // Send response
    res.json(data);
});

// DELETE Route for specific note
notes.delete('/notes/:id', (req, res) => {
    let noteId = req.params.id.toString();
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    const newData = data.filter( note => note.id.toString() !== noteId );

    fs.writeFileSync('./db/db.json', JSON.stringify(newData));
    res.json(newData);
});


module.exports = notes;
const router = require('express').Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

router.get('/notes', (req, res) => {
    readFromFile('db/db.json', 'utf8').then(notes => {
        return res.json(JSON.parse(notes))
    }).catch(err => console.log(err))
})

router.post('/notes', (req, res) => {
    readAndAppend({ id:uuidv4(), ...req.body }, 'db/db.json')
    res.json({success: true})
})

// router.delete('/notes/:id', (req, res) => {
//     readFromFile('db/db.json', 'utf8').then(notes => {
//         const data = JSON.parse(notes).filter(note => note.id !== req.params.id)
//         console.log(data)
//         return data
//     }).then(notes => {
//         console.log(notes)
//        writeToFile('db/db.json', JSON.stringify(notes))
//        res.json({success: true})
//     })
//    .catch(err => console.log(err))
// })

router.delete('/notes/:id', (req, res) => {
    const idToDelete = req.params.id;
    readFromFile('db/db.json', 'utf8')
      .then(data => {
        const parsedData = JSON.parse(data);
        const filteredData = parsedData.filter(note => note.id !== idToDelete);
        writeToFile('db/db.json', filteredData);
        res.json({ success: true });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Could not delete note' });
      });
  });

module.exports = router;
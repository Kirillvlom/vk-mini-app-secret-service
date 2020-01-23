const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notes')

module.exports = router

router.post('/notes', notesController.notesCreateNote)

router.get('/:uniqUrl', notesController.notesGetNote)

router.get('/:uniqUrl/:sender_id', notesController.notesGetNoteForSender)

router.post('/:uniqUrl/:password', notesController.notesAceesToNote)

router.delete('/:uniqUrl/:password', notesController.notesDeleteNote)
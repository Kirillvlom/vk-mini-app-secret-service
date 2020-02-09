const Note = require('../models/note-model')
const ShortUniqueId = require('short-unique-id')

const crypto = require('crypto')
const algorithm = 'aes-256-cbc'
const password = 'd6F3Efeq'



function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

exports.notesCreateNote= (req, res) => {
  let generatedUniqUrl = new ShortUniqueId()

  let passwordHash = encrypt(req.body.password)
  let descriptionHash = encrypt(req.body.description)

  const note = new Note({
    comment: req.body.comment,
    description: descriptionHash,
    password: passwordHash,
    uniqUrl: generatedUniqUrl.randomUUID(6),
    userId: req.body.user[0].id
  })

  note.save((err, data) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.send({
        success: true,
        message: `Note with ID_${data._id} saved successfully!`,
        uniqUrl: data.uniqUrl
      })
    }
  })
}

exports.notesGetNote = (req, res) => {
  Note.findOne({ uniqUrl: req.params.uniqUrl }).exec((err, note) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.send(note || {comment: 'not found'})
    }
  })
}

exports.notesGetNoteForSender = (req, res) => {
  Note.find({ userId: req.params.userId }).exec((err, notes) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else {
      res.send(notes)
    }
  })
}

exports.notesAceesToNote = (req, res) => {
  Note.findOne({ uniqUrl: req.params.uniqUrl }).exec((err, note) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else if (!note) {
      console.log('Note note found')
      res.sendStatus(404)
    } else {
      if (decrypt(note.password) === req.params.password) {
        res.send({
          description: decrypt(note.description)
        })
      } else {
        res.send({
          password: 'invalid'
        })
        console.log('User try read note with invalid password')
      }
    }
  })
}

exports.notesDeleteNote = (req, res) => {
  Note.findOne({ uniqUrl: req.params.uniqUrl }).exec((err, note) => {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    } else if (!note) {
      console.log('Note not found')
      res.sendStatus(200)
    } else {
      if (decrypt(note.password) === req.params.password) {
        Note.remove({ uniqUrl: req.params.uniqUrl }, err => {
          if (err) {
            res.sendStatus(500)
          } else {
            res.sendStatus(200)
          }
        })
      } else {
        res.send({
          password: 'invalid'
        })
        console.log('User try delete note with invalid password')
      }
    }
  })
}
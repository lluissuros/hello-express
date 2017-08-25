// import express from 'express'
const express = require('express')
const app = express()

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const shortid = require('shortid')

// Set some defaults if your JSON file is empty
db.defaults({ books: [], user: {} })
  .write()

// // Set a user using Lodash powerful shorthand syntax
// db.set('user.name', 'Lluis')
//   .write()

app.get('/books', function (req, res) {
  res.send(db.get('books'))
})

app.post('/books', function (req, res) {
  // console.log('guardo a base de datos')
  // Add a post
  const id = shortid.generate()
  const newBook = { id: id, title: 'lowdb is awesome'}
  db.get('books')
    .push(newBook)
    .write()

  res.send(newBook)
})

const getBook = (id) => db.get('books').find({ id: id })

app.get('/books/:id', function (req, res) {
  res.send(getBook(req.params.id))
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

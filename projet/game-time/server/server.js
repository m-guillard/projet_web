const express = require('express')
const http = require('http');
const app = express()
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', (err, client) => {
  if (err) throw err

//   const db = client.db('animals')

//   db.collection('mammals').find().toArray((err, result) => {
//     if (err) throw err

//     console.log(result)
//   })
})

server.listen(process.env.PORT || 3000);

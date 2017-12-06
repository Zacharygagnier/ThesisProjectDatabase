const express = require('express');
const knex = require('../db.js');

const path = 'route';

const app = express();

app.use(express.json());

app.get(`/${path}`, (req, res) => {
  const filter = req.headers.filter ? JSON.parse(req.headers.filter) : {};
  knex(path)
    .where(filter)
    .select()
    .then((results) => {
      res.send(results);
    })
    .catch(err => res.status(400).send('Something went wrong!', err.detail));
});

app.post(`/${path}`, (req, res) => {
  knex(path)
    .insert(req.body)
    .then(() => {
      res.send('Success!');
    })
    .catch(err => res.status(400).send('Something went wrong!', err.detail));
});

app.put(`/${path}`, (req, res) => {
  res.sendStatus(400);
});

app.delete(`/${path}`, (req, res) => {
  if (Object.keys(req.body).length) {
    knex(path)
      .where(req.body)
      .del()
      .then(res.send('Deleted'))
      .catch(err => res.status(400).send('Something went wrong!', err.detail));
  }
  res.send('Please specify row');
});

module.exports = app;

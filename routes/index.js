const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const app = require('../app');
const Tea = require('../models/tea')

router.get('/', async (req, res, next) => {
  const allTea = await Tea.find({visible: true});
  res.render('index', {
    allTea
  });
});

router.post('/', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;



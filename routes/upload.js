const express = require('express');
const mongoose = require('mongoose');
const Tea = require('../models/tea')

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, description, img, placeBorn } = req.body;
  const tea = await Tea.create({
    name,
    description,
    img,
    placeBorn,
  });
  res.redirect('/')
});


module.exports = router;

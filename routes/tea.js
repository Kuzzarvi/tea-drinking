const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Tea = require('../models/tea.js');

router.get('/:id', async (req, res) => {
  let teaId = req.params.id;
  let teaToShow = await Tea.findById({ _id: teaId });
  let comments = teaToShow.comment;
  res.render('tea', { teaToShow, comments });
});

router.post('/comment/:id', async (req, res) => {
  let teaId = req.params.id;
  const { content } = req.body;
  const author = res.locals.verifiedUser
  let findTea = await Tea.findById({ _id: teaId });
  findTea.comment.push({ content, author });
  await findTea.save();

  res.redirect(`/tea/${teaId}`);
});

comment: [
  {
    author: String,
    content: String,
    commentData: String
  }
],

  router.get('/delete/:id', async (req, res) => {
    let teaId = req.params.id;
    let result = await Tea.findOneAndUpdate({ _id: teaId }, { visible: false });
    res.redirect('/')
  })

module.exports = router;

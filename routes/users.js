const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');

const Tea = require('../models/tea');
const app = require('../app');

const router = express.Router();

router.post('/trueRegister', (req, res, next) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { login, email, password } = req.body;
  const user = await User.create({
    login,
    email,
    password,
  });
  res.redirect('/');
});

router.post('/trueLogin', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { login, password } = req.body;
  const currentUser = await User.findOne({ login });
  if (currentUser && currentUser.password === password) {
    if (currentUser.role === 'admin') {
      req.session.adminId = currentUser._id;
      req.session.userId = currentUser._id;
      req.session.save((err) => {
        if (err) throw err;
        res.redirect('/');
      });
    } else {  
      req.session.userId = currentUser._id;
      req.session.save((err) => {
        if (err) throw err;
        res.redirect('/');
      });
    }
  } else {
    res.redirect('/');
  }
});


router.post('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.post('/profile', async (req, res) => {
  const allTea = await Tea.find({ visible: true });
  let allTeaObjectWithComment = [...allTea]
  allTeaObjectWithComment.filter(el => el.comment.length > 0)
  res.render('profile', {
    allTea, allTeaObjectWithComment,
  });

});

module.exports = router;

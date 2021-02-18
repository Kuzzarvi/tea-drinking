const mongoose = require('mongoose');

const User = require('./user.js')

const Tea = mongoose.model('Tea', {
  userCreated: { type: mongoose.ObjectId, ref: 'User' },
  name: String,
  placeBorn: String,//Попробовать подгружать координаты из апишки яндекса
  img: String,
  description: String,//Описание
  comment: [
    {
      author: String,
      content: String,
      commentData: String
    }
  ],
  visible: { type: Boolean, default: true }
})

module.exports = Tea

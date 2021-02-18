const mongoose = require('mongoose')

const User = mongoose.model('User', {
  login: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  avatar: { type: String, default: 'https://scientificrussia.ru/data/auto/material/large-preview-190612_tea.jpg' },
  role: { type: String, default: 'guest' }
})

module.exports = User

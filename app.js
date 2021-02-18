const dotenv = require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const teaRouter = require('./routes/tea');
const uploadFile = require('./routes/upload');

const app = express();

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


const store = new MongoStore({
  collection: 'session',
  uri: process.env.DB,
})
app.use(session({
  secret: 'secret value',
  resave: false,
  saveUninitialized: false,
  store
}))


app.use((req, res, next) => {
  res.locals.adminUser = req.session.adminId
  res.locals.verifiedUser = req.session.userId
  next()
})



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tea', teaRouter);
app.use('/uploadfile', uploadFile);


app.listen(process.env.PORT, () => {
  console.log("Let's go!!!");
});

module.exports = app;

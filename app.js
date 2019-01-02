var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var maincategoryRouter = require('./routes/maincategory')
var subcategoryRouter = require('./routes/subcategory')
var organizationRouter = require('./routes/organization')
var examcategoryRouter = require('./routes/examcategory')
var examsetRouter = require('./routes/examset')
var questionsRouter = require('./routes/questions')
var adminRouter = require('./routes/admin')
var userInterface=require('./routes/userinterface');
var order=require('./routes/order');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());``
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/maincategory',maincategoryRouter)
app.use('/subcategory',subcategoryRouter)
app.use('/organization',organizationRouter)
app.use('/examcategory',examcategoryRouter)
app.use('/examset',examsetRouter)
app.use('/questions',questionsRouter)
app.use('/admin',adminRouter)
app.use('/userinterface',userInterface);
app.use('/order',order)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

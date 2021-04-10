var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/student');
var bodyParser = require('body-parser');
var createError = require('http-errors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3306
const Cosmic = require('cosmicjs')
const api = Cosmic()
const bucket_slug = process.env.COSMIC_BUCKET || 'node-starter'
const read_key = process.env.COSMIC_READ_KEY
var opn = require('opn')
const bucket = api.bucket({
	slug: bucket_slug,
	read_key: read_key
})
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.get('/:slug?', async (req, res) => {
	let slug = req.params.slug
	const year = (new Date().getFullYear())
	if (!slug)
		slug = 'home'
	try {
		const data = await bucket.getObject({ slug })
		const page = data.object
		res.render('pages/default', { page, year })
	} catch(e) {
		const page = { title: 'Page not found' }
		res.render('pages/404', { page, year })
	}
})
// view engine setup
app.use('/', indexRouter);
app.use('/student', usersRouter);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
app.listen(PORT, () => { 
	console.log('Your Cosmic JS starter app is running at http://localhost:' + PORT)
	opn('http://localhost:' + PORT)
})

  
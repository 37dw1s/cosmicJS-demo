const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const Cosmic = require('cosmicjs')
const api = Cosmic()
const bucket_slug = process.env.COSMIC_BUCKET || 'node-starter'
const read_key = process.env.COSMIC_READ_KEY
var opn = require('opn')
const bucket = api.bucket({
	slug: bucket_slug,
	read_key: read_key
})
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
app.listen(PORT, () => { 
	console.log('Your Cosmic JS starter app is running at http://localhost:' + PORT)
	opn('http://localhost:' + PORT)
})

// DataBase 
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "ttsql",
  password: "Qswa1w2q!",
  database: "db"
});
// con.connect(function(err){
//   if(err){
//     console.log('Error connecting to Db'+err);
//     return;
//   }
//   console.log('Connection established');
// });


con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	var sql = "SELECT * from student";
	con.query(sql, function (err, result) {
	  if (err) throw err;
	  console.log(result);
	});
  });
  
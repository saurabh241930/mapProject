var bodyParser = require('body-parser'),
    knex = require('knex'),
    express = require('express')

    app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'saurabh',
    password : '1234567890',
    database : 'recordDB'
  }
});


app.get("/",function (req,res) {
	var records = ""
 res.render("home")
})


app.get("/:region",function (req,res) {

	db('records')
   .where('region', req.params.region)
   .then(records => res.json(records))
    
})


app.post("/addRecord",function (req,res) {

db('records').insert({
	region:req.body.regionName,
	date:req.body.saleDate,
	amount:req.body.saleAmount
}).then(console.log)
res.redirect("back")

})





app.get("/recordForm",function (req,res) {
 res.render("recordForm")
})


  app.listen(3000, function() {
  console.log('Server started');
});

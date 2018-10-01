var bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  express = require('express')

  app = express();


var Record = require('./models/Record');



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mapProject',{ useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/",function (req,res) {
	var records = ""
 res.render("home",{records:records})
})

app.get("/recordForm",function (req,res) {
 res.render("recordForm")
})





app.post("/addRecord",function (req,res) {

	let saleDate = new Date(req.body.saleDate);


 var newRecord = {
 	regionName:req.body.regionName,
 	saleDate:saleDate.toDateString(),
 	saleAmount:req.body.saleAmount
 }

 Record.create(newRecord,function(err,record){
 	if (err) {
 		console.log(err)
 	} else {

 		console.log(record)
 	}
 })

res.redirect("back")

})




app.get("/:region",function (req,res) {
    
   Record.find({"regionName":req.params.region},function (err,records) {
      if (err) {
      	console.log(err)
      } else {

     

         res.json(records)
      }
   })
})





app.listen(3000, function() {
  console.log('Server started');
});
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/stamp_swap", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//schema setup
var stampSchema = new mongoose.Schema({
   country: String,
   name: String,
   year: String,
   description: String,
   image: String
});
var Stampcollection = mongoose.model("Stampcollection", stampSchema); 

//add item to db one by one

// Stampcollection.create( 
//     {country: "Polynesia", name:"Year of snake sheetlet", year: "2013", description: " ", image:"https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/537729_4964202455870_174346086_n.jpg?_nc_cat=103&_nc_ht=scontent-atl3-1.xx&oh=87fdb03bf59a447110ae0b1929d7d6b2&oe=5CC88884"},
//     function(err, stampcollection){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("Newly Created stampcollection: ");
//             console.log(stampcollection);
//         }
//     });

// var collections = [
// {country: "New Zealnd", name:"Year of snake", year: "2013", description: " ", image: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/602242_4964201375843_159943800_n.jpg?_nc_cat=109&_nc_ht=scontent-atl3-1.xx&oh=5e5fe6efe97dc51f572441bfc9993ce0&oe=5CD6A3F1"},
// {country: "US", name:"Year of snake", year: "2013", description: " ", image: "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/225403_4964202375868_1148111228_n.jpg?_nc_cat=108&_nc_ht=scontent-atl3-1.xx&oh=17669f60810a12a5795fa841aff9cd46&oe=5CCA8354"},
// {country: "France", name:"Year of snake", year: "2013", description: " ", image:"https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/486885_4964202295866_358639013_n.jpg?_nc_cat=103&_nc_ht=scontent-atl3-1.xx&oh=e7cb9c6ee795f2e4b51f45e5ffdd8d84&oe=5CC81047"},
// {country: "Thailand", name:"Year of snake", year: "2013", description: " ", image:"https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/599212_4964199775803_1940242300_n.jpg?_nc_cat=101&_nc_ht=scontent-atl3-1.xx&oh=fd5d170799889d32016645ca224fd9ec&oe=5CD21D2A"},
// {country: "HongKong", name:"Year of snake", year: "2013", description: " ", image:"https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/482168_4964203615899_943521180_n.jpg?_nc_cat=103&_nc_ht=scontent-atl3-1.xx&oh=a126da4ae5825dca0a6bddfb358ec2e3&oe=5CD1202E"},
// {country: "Canada", name:"Year of snake", year: "2013", description: " ", image:"https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/225184_4964204495921_407672086_n.jpg?_nc_cat=107&_nc_ht=scontent-atl3-1.xx&oh=2cbb9ef71616436e517fd1db47c275b1&oe=5C974C9A"},
// {country: "Australia", name:"Year of snake sheetlet", description: " ", year: "2013", image:"https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/557976_4964200535822_1312347539_n.jpg?_nc_cat=105&_nc_ht=scontent-atl3-1.xx&oh=0167d94497b66c6e9f439128485b90dd&oe=5C96CCCE"},
// {country: "New Caledonie", name:"Year of snake sheetlet", year: "2013", description: " ", image:"https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/734363_4964201895856_554355311_n.jpg?_nc_cat=103&_nc_ht=scontent-atl3-1.xx&oh=13d264bba7c186e7426e3e8d6eb198b7&oe=5CC5FC6F"},
// {country: "Polynesia", name:"Year of snake sheetlet", year: "2013", description: " ", image:"https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/537729_4964202455870_174346086_n.jpg?_nc_cat=103&_nc_ht=scontent-atl3-1.xx&oh=87fdb03bf59a447110ae0b1929d7d6b2&oe=5CC88884"}
// ]; 

app.get("/", function(req, res){
   res.render("landing"); 
});

//index route
app.get("/collections", function(req, res){
    //get all collections from db
    Stampcollection.find({}, function(err, collections){
        if(err){
            console.log(err);
        }else{
            res.render("index", {collections: collections});
        }
    });
    
});

//create route
app.post("/collections", function(req,res){
    //get data from form and add to collections array
    var country = req.body.country;
    var name = req.body.name;
    var year = req.body.year;
    var image = req.body.image;
    var description = req.body.description;
    var newCollection = {country : country, name: name, year: year, image: image, description: description};
    //collections.push(newCollection);
    Stampcollection.create(newCollection, function(err, newadd){
        if(err){
            console.log(err);
        }else{
            console.log(newadd);
            //redirct back to collections page
            res.redirect("/collections");
        }
    });
    
});


//new route
app.get("/collections/new", function(req, res){
    res.render("new");
})

// show one item detail
app.get("/collections/:id", function(req, res){
    
   Stampcollection.findById(req.params.id, function(err, foundcollection){
      if(err){
          console.log(err);
      } else{
          //render show template with that collection
          console.log(foundcollection);
          res.render("show", {collection: foundcollection}); 
      }
   });
   
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("StampSwap has Started!");
});

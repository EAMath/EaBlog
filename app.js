//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
var timeout = require('connect-timeout')

const multer = require("multer");
const alert = require("alert");
const path = require("path");
const fs = require("fs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(timeout("45s"));




var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./uploads");
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage});

mongoose.connect("mongodb+srv://admin-Ea:lyzer61@eablog.vbg6b.mongodb.net/blogDB", {useNewUrlParser: true , useUnifiedTopology: true});

const p1 ="Bonjour à tous!";
const p2 ="Pouvez -vous écrire sur ces sujets dans notre blog:";
const p3 ="-La musique -Le sport -Le théatre -Le cinéma -La mode -Le repas -La caricature etc.";
const p4 ="Nous sommes heureux de lire vos opinions. De plus,tous vos lecteurs vous admirent et veulent avoir votre point de vue. Alors , vous aussi , écrivez s'il vous plait!";


const postSchema = {
  title: String,
  content: String,
  author: String,
  link: String,
  img:{
    name: String,
    data: Buffer,
    contentType: String
  }
};

const Post = mongoose.model("Post" , postSchema);


app.get("/" , function(req, res){

  Post.find({} , function(err , posts){
      //console.log(posts);

      res.render("home" , {
        posts: posts ,
        p1: p1,
        p2: p2,
        p3: p3,
        p4: p4

      });
   });
});


app.get("/Ea-Panel", function(req, res){
  Post.find({} , function(err , posts){
      //console.log(posts);
      res.render("Admin" , {
        posts: posts ,
        startingContent: homeStartingContent,

      });
   });
});


app.get("/compose" , function(req , res){
  res.render("compose");
});


app.post("/compose" ,upload.single("image"), timeout("45s"), bodyParser.json(), haltOnTimedout, (req, res, next) => {

  if(req.file == null){
    console.log("no img");

    const post = new Post ({
      title: req.body.postTitle ,
      content: req.body.postBody,
      author: req.body.postAuthor,
      link: req.body.link
    });

    post.save(function(err){
      if(err) return next(err);
      if(req.timeout) return;
      res.redirect("/");
    });

  }else{
    console.log("have img");

    if(path.extname(req.file.originalname).toLowerCase() === ".png"){
      const size = Math.round((req.file.size / 1024));

      if(size < 3072){

        const post = new Post ({
          title: req.body.postTitle ,
          content: req.body.postBody,
          author: req.body.postAuthor,
          link: req.body.link,
          img:{
            name:req.file.filename,
            data:fs.readFileSync(path.join(__dirname + "/uploads/" + req.file.filename)),
            contentType: "image/png"
          }
        });

        post.save(function(err){
          if(err) return next(err);
          if(req.timeout) return;
          res.redirect("/");
        });

      }else{
        console.log("this is not png");
        alert("The file size must be lower 3mb , Change the file and try again");
        res.redirect("/compose");
      }

    }else{
      console.log("this is not png");
      alert("The file format must be .png , Change the file and try again");
      res.redirect("/compose");
    }
  }
});

function haltOnTimedout(req, res, next){
  if (!req.timedout) next();
}

app.get("/posts/:postId" , function(req ,res){
  const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId} , function(err,post){
    res.render("post", {
      title: post.title,
      content: post.content,
      author: post.author,
      link: post.link,
      imgname: post.img.name,
      imgdata: post.img.data,
      imgtype: post.img.contentType
    });
  });

});



app.post("/delete" , function(req, res){
  const checkBoxId = req.body.checkbox;

  Post.findByIdAndRemove(checkBoxId, function(err){
    if(!err){
      console.log("Successfuly deleted the Post");
      res.redirect("/Ea-Panel");
    }
  });
});


let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfuly");
});

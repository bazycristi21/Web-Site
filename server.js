const express = require('express');
var cookieParser = require('cookie-parser');
var morgan = require("morgan");
const session = require('express-session');
const flash = require('express-flash');
var logged = false;
var app = express();
let ejs = require('ejs');
let cnt = 0;



var Leaderboard = [];
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret:'secretkey',
    resave:true,
    saveUninitialized:true,
    cookie: { maxAge: 1000000}
}));

const MongoClient = require('mongodb').MongoClient;
//app.use(morgan('dev'));
app.set('view engine','ejs')


const uri = "mongodb+srv://bazycristi21:B7crbz34y**@tw-a0dmi.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true,
    server: {
        socketOptions: {
            keepAlive:300000,
            connectTimeoutMS: 30000
        }
    },
    replset: {
        socketOptions: {
            keepAlive:300000,
            connectTimeoutMS: 30000
        }
    }}
        );

client.connect(async err => {
    if(err)
        return console.log(err);
  const collection = client.db("TW").collection("useri");
  // perform actions on the collection object
    let array = await collection.find().toArray();
    for(var i = 0 ; i < array.length;i++)
        console.log(array[i].name,"---->",array[i].email);
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.set('view engine','ejs')
    
    app.get('/login', function (req, res, next) {
        if(logged == false)
            res.render('login',{loginmessage:"",loggedin:logged});
        else
        {
            logged = false;
            res.redirect('/');
        }
    });
    app.post('/login',async function (req, res, next) {
        console.log(req.body);
        let array = await collection.find({"email":req.body.email}).toArray();
        if(array.length > 0)
        {   
            if(array[0].password == req.body.password)
            {
                logged = true;
                req.session.sessionID = Math.floor(Math.random() * 13000);
                cnt++;
                res.redirect("/");
                collection.updateOne({"email":req.body.email}, {$set:{"sessionID":req.session.sessionID}});
            }
            else{
                res.render("login", {loginmessage: "Incorrect Password" ,loggedin:logged})
            }
        }
        else{
            res.render("login",{loginmessage:"This user does not exist",loggedin:logged});
        }
    });
    app.get('/logout',async function (req, res, next) {
        let array = await collection.find({"sessionID":req.session.sessionID}).toArray();
        if(array.length > 0)
        {   
            console.log("haideeee");
            logged = false;
            collection.updateOne({"sessionID":req.session.sessionID}, {$unset:{"sessionID":req.session.sessionID}});
            req.session.destroy();
        }
        res.redirect('/');
    });

    app.get('/register', (req,res) => {
        res.render('register',{registermessage:"",loggedin:logged});
    })
    app.post('/register',async function (req, res, next) {
        try{
            user ={
                id:Date.now().toString(),
                name: req.body.username,
                email: req.body.email,
                password: req.body.password,
                maxScore: 0
            }
            var ok = true;
            let array = await collection.find({"name":user.name}).toArray();
            for(var i = 0 ; i < array.length; i++ )
            {
                if(array[i].name == user.name)
                {    
                    res.render('register',{registermessage: "Username already exists", loggedin: logged})
                    ok = false;
                }
            }
            array = await collection.find({"email":req.body.email}).toArray();
            for(var i = 0 ; i < array.length; i++){
                if(array[i].email == req.body.email)
                {
                    res.render('register',{registermessage: "Email already used", loggedin: logged})
                    ok = false;
                }       
            }
            if(ok == true)
            {
                collection.insertOne(user, (err,result) => {
                    if(err)
                        return console.log(err);
                    console.log("Saved user to database");
                    res.redirect('/');
                } )
            }
        }
        catch(err){
            console.log(err);
            res.redirect('/register');
        }
    });

    app.get('/',function(req,res,next)
    {
        res.render('index',{loggedin:logged});
        
    })
    app.get('/index',(req,res)=> {
        res.render('index',{loggedin:logged});
    })
    app.get('/about',(req,res)=> {
        res.render('about',{loggedin:logged});
    })
    app.get('/howtoplay',(req,res)=> {
        res.render('howtoplay',{loggedin:logged});
    })
    app.get('/leaderboard',async function (req,res){
        var users = await collection.find({}).toArray();
        console.log(users);
        users.sort((a,b) => (a.score > b.score) ? -1 : 1);
        Leaderboard = [ ];
        for(var i = 0 ; i < users.length; i ++)
        {
            
            if(users[i].score > users[i].maxScore)
                collection.updateOne({"sessionID":req.session.sessionID}, {$set:{"maxScore":req.body.score}});
            Leaderboard.push([users[i].name,users[i].score]);
        }
        
        res.render('leaderboard',{loggedin:logged,Leaderboard:Leaderboard});
        
    })
    app.post('/submitScore',async function(req,res) {
        console.log(req.body.score);
        var user = await collection.find({"sessionID":req.session.sessionID}).toArray();
        collection.updateOne({"sessionID":req.session.sessionID}, {$set:{"score":req.body.score}});
        res.render('breakout',{loggedin:logged});
        })
    app.get('/1vs1',(req,res)=> {
        res.render('1vs1',{loggedin:logged});
    })
    app.get('/breakout',(req,res)=> {
        res.render('breakout',{loggedin:logged});
    })
    app.use('/static', express.static('public'))
    app.use(flash());
    app.get('*', function(req, res){
        res.status(404).render('404');
      });
});


module.exports = app;


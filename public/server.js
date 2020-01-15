const express = require('express')
const app = express()
const path = require('path');
app.set('view-engine','ejs')

app.get('/',(req,res)=> {
    res.sendFile(path.join(__dirname,'index.html'));
})
app.get('/index.html',(req,res)=> {
    res.sendFile(path.join(__dirname,'index.html'));
})
app.get('/about.html',(req,res)=> {
    res.sendFile(path.join(__dirname,'about.html'));
})
app.get('/other.html',(req,res)=> {
    res.sendFile(path.join(__dirname,'other.html'));
})
app.get('/leaderboard.html',(req,res)=> {
    res.sendFile(path.join(__dirname,'leaderboard.html'));
})
app.get('/1vs1.html',(req,res)=> {
    res.sendFile(path.join(__dirname,'1vs1.html'));
})
app.use('/static', express.static('public'))
app.get('/login', (req,res) => {
    res.render('login.ejs')
})

app.get('/register', (req,res) => {
    res.render('register.ejs')
})

app.post('/register',(req,res) =>{

})
app.listen(3000)

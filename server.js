var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var dbconfig=require('./app/config/dbconfig');
var cors=require('cors');
var validator=require('express-validator');
var fileUpload=require('express-fileupload');
var passport=require('passport');
mongoose.connect(dbconfig.url);
var db=mongoose.connection;
global.token='';
db.on('error',()=>{
    console.log('There is an error in connecting with database..');
})

db.once('open',()=>{
    console.log('Successfully connected to database.');
})


require('./app/config/passport')(passport);
var app=express();
app.use((req,res,next)=>{
    //res.header('Access-Control-Allow-Origin',' http://localhost:3008');
    //res.header('Access-Control-Allow-Origin',' http://localhost:3002');
    //res.header('Access-Control-Allow-Origin','http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth");
    res.header("Access-Control-Allow-Credentials",true);
    res.header(`Access-Control-Allow-Methods`, `POST`);
    res.header(`Access-Control-Allow-Methods`, `DELETE`);
    res.header(`Access-Control-Allow-Methods`, `PATCH`);
    res.header(`Access-Control-Expose-Headers`, `x-auth`);
    next();
})
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(validator());

require('./app/routes/person.route')(app,passport);

app.use(express.static(__dirname+'/'));
app.get('/',(res,resp)=>{
   resp.sendFile(__dirname+'/');
});
app.listen(3000,()=>{
    console.log('server is started');
})
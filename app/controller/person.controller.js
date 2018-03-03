var Person=require('../models/person.model');
var State=require('../models/state.model');
var City=require('../models/city.model');
var User=require('../models/user.model');

exports.create=(req,res)=>{
    console.log('in');

    console.log(req.body);
    console.log(req.files);
    if(!req.files)
        return res.status(400).send('No files were uploaded.');
    let sample=req.files.file;
    sample.mv(__dirname + '../../../uploads/' + sample.name,(err)=>{
        if(err)
            console.log(err);
    });
    req.checkBody('firstName',"Enter a valid first name").isAlpha();
    req.checkBody('lastName',"Enter a valid last name").isAlpha();
    req.checkBody('email',"Enter a valid email").isEmail();
    var errors=req.validationErrors();
    if(errors){
        res.send({"message":'Errors','error':errors});
        return;
    }
    var person=new Person({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        state:req.body.state,
        city:req.body.city,
        img:sample.name
    })
    person.save().then((data)=>{
        res.send({"message":'Data Successfully inserted.','record':data});
    }).catch(()=>{
        console.log('error in inserting record.');
    })
}

exports.delete=(req,res)=>{
    Person.findById(req.params.pid).then((p)=>{
        if(p) {
            Person.remove({_id: req.params.pid}).then(() => {
                res.send(p);
            }).catch(()=>{
                console.log('Error in deletion');
            })
        }
    })
}

exports.deleteMultiple=(req,res)=>{
    var arr=req.body.arr;
    var flag=0;
    var l=arr.length;
    for(var i=0;i<l;i++) {
        Person.findById(arr[i]).then((p)=>{
            if(p) {
                Person.remove({_id: p._id}).then((dt) => {
                    flag++;
                }).catch((err)=>{
                    flag--;
                })
            }
        }).catch(()=>{
            console.log('error in finding id for deletion');
        })
    }
    //console.log(flag);
    if(flag===l-1){
        res.send({"message":"Deleted all records"});
    }
    else{
        res.send({"message":"Error in Deletion of records"});
    }
}

exports.update=(req,res)=>{
    Person.findById(req.params.pid).then((p)=>{
        p.firstName=req.body.firstName;
        p.lastName=req.body.lastName;
        p.email=req.body.email;
        p.state=req.body.state;
        p.city=req.body.city;
        p.img=req.files.file.name;
        console.log("Person",p);
        p.save().then((data)=>{
            res.send({"message":'Data Successfully updated.','record':data});
        }).catch((err)=>{
            console.log('Error in record updation',err);
        })
    })
}

exports.fetch=(req,res)=>{
    Person.find().then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log('Error in retrieving data.',err);
    })
}

exports.fetchById=(req,res)=>{
    Person.findById(req.params.pid).then((data)=>{
        res.send(data);
    }).catch(()=>{
        console.log('Error in retrieving data.');
    })
}

exports.fetchState=(req,res)=>{
    State.find().then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}

exports.fetchCity=(req,res)=>{


    City.find({stateid:req.params.sid}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}

exports.sortdata=(req,res)=> {
    var attr = req.body.attr;
    if (attr === 'firstName') {
        Person.find().sort({firstName: 1}).exec((err, p) => {
            res.send(p);
        })
    }
    else if(attr === 'lastName') {
        Person.find().sort({lastName: 1}).exec((err, p) => {
            res.send(p);
        })
    }
    else if(attr === 'email') {
        Person.find().sort({email: 1}).exec((err, p) => {
            res.send(p);
        })
    }
    else if(attr === 'state') {
        Person.find().sort({state: 1}).exec((err, p) => {
            res.send(p);
        })
    }
    else if(attr === 'city') {
        Person.find().sort({city: 1}).exec((err, p) => {
            res.send(p);
        })
    }
}

exports.search=(req,res)=> {
    console.log(req.body);
    Person.find({ $or: [ { firstName:{ "$regex":req.body.txt} },
        { lastName:{"$regex": req.body.txt }},
        { state:{"$regex": req.body.txt }},
        { city:{"$regex": req.body.txt }}
    ] })
        .then((data)=>{
            res.send(data)
        }).catch((err)=>{
            res.send(err)
    })

}

exports.stateWiseCity=(req,res)=> {
   State.aggregate([
       {
           $lookup: {
               from: 'cities',
               localField: '_id',
               foreignField: 'stateid',
               as:'data'
           }
       }
   ]).then((data1)=>{
       console.log(data1);
       res.send(data1);
   }).catch((err)=>{
       console.log(err);
   })
}

exports.createUser=(req,res)=>{
    var user=new User({
        username:req.body.username,
        password:req.body.password
    });

    user.save().then(() => {

        return user.generateAuthToken(user);
    }).then(()=>{

        res.header('x-auth',user.tokens[0].token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })

}

exports.authenticate=(req,res,next)=>{
    var token=req.header('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user) {
            return Promise.reject();
        }
        req.user=user;
        req.token=token;
        next();
    }).catch(()=>{
        res.status(401).send({"message":"Please login first."});
    })
}

exports.getUser=(req,res)=>{
    res.status(200).send(user);
}
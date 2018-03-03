var mongoose=require('mongoose');
var jwt=require('jsonwebtoken');

var userSchema=mongoose.Schema({
    username:String,
    password:String,
    tokens:[{
        access:String,
        token:String
    }]
});

userSchema.methods.generateAuthToken=(user)=>{
    var access='auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    user.tokens.push({access,token});
    user.save().then(()=>{
        return token;
    });
};

userSchema.statics.findByToken=function (token) {
    var User=this;
    console.log("In token",token);
    var decoded;
    try{
        decoded=jwt.verify(token,'abc123');
    }catch (err){
        return Promise.reject(err);
    }
     return User.findOne({
        _id:decoded._id,
    });

}
module.exports=mongoose.model('tbluser',userSchema);
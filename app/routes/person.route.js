var controller=require('../controller/person.controller');
module.exports=(app,passport)=>{

    app.post('/login',passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/login'
    }))
    app.get('/',(req,res)=>{
        res.status(200).send({"message":"success","Token":token});
    })
    app.get('/login',(req,res)=>{
        res.status(400).send({"message":"fail"});
    })
    app.post('/p',controller.create);
    app.post('/users',controller.createUser);
    app.get('/users',controller.authenticate,controller.getUser);
    app.get('/person',controller.fetch);
    app.delete('/person/:pid',controller.delete);
    app.put('/person/:pid',controller.update);
    app.get('/person/:pid',controller.fetchById);
    app.get('/state',controller.fetchState);
    app.get('/city/:sid',controller.fetchCity);
    app.post('/sort',controller.sortdata);
    app.post('/search',controller.search);
    app.post('/deleteall',controller.deleteMultiple);
    app.get('/c',controller.stateWiseCity);
}
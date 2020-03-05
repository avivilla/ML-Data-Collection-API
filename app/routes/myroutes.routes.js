const User = require('../models/user.model.js');
const Article = require('../models/article.model.js');
const Summary = require('../models/summary.model');
module.exports = (app) => {
    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/login');
    });
    app.get('/register', (req, res) => {
        if (req.session.reg_no)
            res.redirect('/');
        else
            res.render("signup", { layout: false });
    });
    app.post('/register', (req, res) => {

        if (!req.body.name || !req.body.reg_no || !req.body.idx) {
          //  console.log("here");
            res.redirect('/register');
        }
        else {
                 const user = new User({
                Name: req.body.name,
                Reg_No : req.body.reg_no,
                Idx : req.body.idx,
            });
            user.save()
                .then(data => {
                    console.log(user);
                    //res.send("created "+req.body.name+" "+req.body.reg_no+" "+req.body.idx);
                   res.redirect('/');
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the user"
                    });
                });
        }
       
        });

    //redirect to login page 
    app.get('/login', (req, res) => {
        if (req.session.reg_no)
            res.redirect('/');
        else
            res.render("login", { layout: false });
    });
    //process login
    app.post('/login', (req, res) => {
        if (!req.body.name || !req.body.reg_no) {
            //console.log("hi");
            res.redirect('/login');
        }
        console.log(req.body);
        User.findOne({ Reg_No : req.body.reg_no })
            .then(user => {
                  //  console.log(user);
                    if (user.Name == req.body.name) {
                        // req.session.name = user.name;
                        // req.session.userid = user._id;
                        req.session.reg_no = user.Reg_No;
                        req.session.name = user.Name;
                        req.session.save();
                        res.redirect('/');
                    } else {
                     //   console.log("hi2");
                        res.redirect('/login');
                    }
            
            })
            .catch(error => {
                
                res.redirect('/login');
            });


    });
    app.get('/test',(req,res)=>{
        Article.find()
            .then(response => {
                // res.render('pendingorders', {
                //     layout: false,
                //     list: response
                // });
               // console.log(response);
               // res.json(response);
            }).catch(error => {
                res.send("error");
            });
    });
    app.get('/article',(req,res)=>{
        if (req.session.reg_no)
            {
                User.findOne({Reg_No : req.session.reg_no})
                .then(res1 =>{
                    idx = res1.Idx;
                    console.log(res1)
                    Article.findOne({id : idx})
                    .then(art =>{
                        res.render('article', {
                            layout: false,
                            article : art.article,
                            idx : art.id,
                            id : req.session.reg_no
                        });
                    })
                    .catch(res3=>{
                        res.send("error0");
                    });
                    
                })
                .catch(res1 =>{
                    res.send("error1");
                });
            }
        else
            res.redirect('/login');
    });
    app.post('/article',(req,res) =>{
        //res.send(req.body);
        if (req.session.reg_no)
        {
            const summary = new Summary({
                summary : req.body.summary,
                std_id : req.body.std_id,
                art_id : req.body.art_id
            });
            summary.save()
            .then(res1 =>{
                User.findOneAndUpdate({Reg_No : req.session.reg_no},{
                    Reg_No : req.session.reg_no,
                    Name : req.session.name,
                    Idx : parseInt(req.body.art_id) + 1
                },{new : true})
                .then(res3=>{
                    res.redirect('/article');
                })
                .catch(res4=>{
                    res.send("errorX");
                });
            })
            .catch(res2 =>{
                res.send("errorY");
            });
        }
        else res.redirect('/login');
    });
}
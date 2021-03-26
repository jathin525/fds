const express = require('express');
const cors = require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const multer=require('multer');
const geolib=require('geolib');
const MY_COORDS= {latitude: 18.1124372, longitude: 79.01929969999999};
const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }
    else{
    cb(new Error('message'),false);
    }
}
const upload=multer({
    storage: storage
});
const shopDetails=require('./models/shopDetails');
const User=require('./models/usersignup');
const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/issues');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
//COffee Shop Details
router.route('/shopDetails').get((req, res) => {
    shopDetails.find((err,shopDetails) => {
        if (err)
            console.log(err);
        else
            res.json(shopDetails);
            // console.log(shopDetails);
    });
});

router.route('/shopDetails/:_id').get((req, res) => {
    shopDetails.findById(req.params._id, (err, shopDetails) => {
        if (err)
            console.log(err);
        else
            res.json(shopDetails);
    });
});
router.route('/shopDetails/add').post((req,res)=>{
  let issue = new shopDetails(req.body);
  // console.log(coffeeData);
  issue.save()
      .then(issue => {
          // console.log(issue)
          res.status(200).json({
              'issue': 'Added successfully'
          });
      })
      .catch(err => {
          res.status(400).send('Failed to create new record');
      });
 });



router.route('/shopDetails/update/:id').post((req, res) => {
    shopDetails.findById(req.params.id, (err, shopDetails) => {
        if (!shopDetails)
            return next(new Error('Could not load document'));
        else {
            shopDetails.name = req.body.name;
            shopDetails.description=req.body.description;
            shopDetails.latitude = req.body.latitude;
            shopDetails.longitude = req.body.longitude;
            shopDetails.rating = req.body.rating;
            shopDetails.review = req.body.review;
            shopDetails.timing=req.body.timing;
            shopDetails.offers=req.body.offers;
            shopDetails.specials=req.body.specials;
            shopDetails.sales=req.body.sales;
            shopDetails.save()
            .then(shopDetails => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/shopDetails/delete/:id').get((req, res) => {
    shopDetails.findByIdAndRemove({_id: req.params.id}, (err, shopDetails) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

// signup verification
router.post("/signup/add",
(req, res, next) => {
  //const profile=req.profile;
 // console.log(profile.filename);
  // if(!profile){
  //   const error=new Error('No file choosen');
  //   error.httpStatusCode=400
  //   return next(error);
  // }
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                FirstName:req.body.FirstName,
                LastName:req.body.LastName,
                phoneno:req.body.phoneno,
                gender:req.body.gender,
                age:req.body.age,
                dateofbirth:req.body.dateofbirth,
                email: req.body.email,
                password: hash
               // profile:req.file.path
              });
              user
                .save()
                .then(result => {
                  // console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                 res.send(profile);
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
  });
 // get data of all users
  router.route('/signupusersdata').get((req, res) => {
    User.find((err, sud) => {
        if (err)
            console.log(err);
        else
            res.json(sud);
            // console.log(sud);
    });
});
//get data of particular user

router.route('/signupusersdata/:id').get((req, res) => {
  User.findById(req.params.id, (err, sud) => {
      if (err)
          console.log(err);
      else
          res.json(sud);
  });
});
  //signup update
  router.post('/signup/update/:id',
  (req,res,next)=>{
      User.findById(req.params.id,(err,details)=>{
          if(!details){
              return next(new error('Try again'));
          }
          else{
              details.FirstName=req.body.FirstName;
              details.LastName=req.body.LastName;
              details.phoneno=req.body.phoneno;
              details.gender=req.body.gender;
              details.age=req.body.age;
              details.dateofbirth=req.body.dateofbirth;
              details.email=req.body.email;
              details.password=req.body.password
              details.save().then(details=>{
                  res.json('Update successful');
              }).catch(err => {
                  res.status(400).send('Update failed........');
              })

          }
      })
  })
  //login
router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const datanow=user;
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              'secret',
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              signupusersdata:user,
              token:token,
              dataofnow:datanow,
              message:"Success"
            }
            );
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
  router.delete("/signup/delete/:signupId", (req, res, next) => {
    User.remove({ _id: req.params.signupId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
router.route('/nearby').get((req,res)=>{
  shopDetails.find((err,shops)=>{
      if(err){
          console.log(err);
      }
      else{
          var k;
          let coordinates={
              latitude:shops.latitude,
              longitude:shops.longitude,
              name:shops.name
          };
             res.json(shops);
          }
      // console.log(coffeeData);
    })
});
router.route('/nearbyshops/:_id').get((req,res)=>{
  // console.log('You selected',req.params.id);
  shopDetails.findById(req.params._id,(err,shops)=>{
   res.json(shops) 
})
})
app.post('/userprofile/updatefavbar/:id', (req, res) => {  
    User.findById(req.params.id, (err, user) => {
        if (!user)
            return new Error('Could not load document');
        else {
          x=[];
          x=user.favouritebars;
          x.push(req.body.shopid);
          user.set('favouritebars',x).save().then(user=>{
            res.json("Value = "+x);
          }).catch(err => {
            console.log(err)
          })
        }
    })
});

app.post('/userprofile/removefavbar/:id', (req, res) => {  
    User.findById(req.params.id, (err, user) => {  
        if (!user)
            return new Error('Could not load document');
        else {
          x=[];
          x=user.favouritebars;
          value=req.body.shopid;
          index=x.indexOf(value);
          x.splice(index,1);
          // console.log(x)
          user.set('favouritebars',x).save().then(user=>{
              res.json("Value removed was = "+value);
              console.log(x);
            }).catch(err => {
              console.log(err)
            })        
        }      
    })
});

app.get('/userprofile/findfavbar/:id',(req,res)=>{
    console.log('Requesting user with id:', req.params.id);
    User.findById(req.params.id, (err, user) => {
        if (err){
            console.log("caught an err : "+err);
        }
        else{
        x=[];
        x=user.favouritebars;
        res.json(x);
        }
    })
})

app.post('/bardb/updatereview/:id', (req, res) => {
  
  shopDetails.findById(req.params.id, (err, user) => {

      if (!user)
          return new Error('Could not load document');
      else {
        b=[];
        b=user.review;
        b.push(req.body.uname+" : "+req.body.review);
        user.set('review',b).save().then(user=>{
          res.json({'message':'review add success'});
        }).catch(err => {
          console.log(err)
        })

      }
  })
})
app.post('/coffe/addrating/:id', (req, res) => {
  
  shopDetails.findById(req.params.id, (err, user) => {
      if (!user)
          return new Error('Could not load document');
      else {
          b=user.rating;
          value=req.body.value;
          // console.log(b,value);
          ratevalue=(b+value)/2;
          updatedresult=ratevalue.toFixed(2);
          // console.log(updatedresult);
          user.set('rating',updatedresult).save().then(user=>{
              res.json({'message':'rating updated success'});
          }).catch(err => {
                  console.log(err)
          })
      }
  })
})
app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));
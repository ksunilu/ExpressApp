var express = require('express');
var router = express.Router();

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/phonedb'); // connect to our database
var Phone = require('./model.phone');

router.get('/', function(req, res, next) {
    Phone.find(function(err, phone) {
        if (err) res.send(err);
        res.json(phone);
    });
});


router.get('/:name',function(req, res) {
    Phone.findOne({
        pname: req.params.name
    }).exec(
      function(err, phone){
        if(err){res.send('error in phone geting name');}
        else {
          res.json(phone);
        }
      }
    );

});

router.post('/', function(req, res) {

    var phone = new Phone();

    phone.pname  = req.body.name;
    phone.pphone = req.body.phone;

        console.log( phone.name );
        //console.log( phone.phone );

        // save
        phone.save(function(err) {
            if (err) res.send(err);

            res.json({ message: 'Phone Number Saved!' });
        });

});

router.put('/:id', function(req, res) {

      //res.send( req.body.phone+req.body.name );

      Phone.findOneAndUpdate({_id:req.params.id},
          {$set:{pphone:req.body.phone, pname:req.body.name}},
          {upsert:true},
          function(err,oldPhone){
              if(err) res.send(err);
              else res.json(oldPhone);
          }
      );
});

router.delete('/:id', function(req, res) {

    Phone.findOneAndRemove({_id:req.params.id},
        function(err,oldPhone){
            if(err) res.send(err);
            else res.json(oldPhone);
        }
    );

});




module.exports = router;

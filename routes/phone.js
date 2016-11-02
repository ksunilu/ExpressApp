var express = require('express');
var router = express.Router();

var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/phonedb');
var Phone = require('./model.phone');

router.get('/', function(req, res, next) {
    Phone.find(function(err, phone) {
        if (err) res.send(err);
        res.json(phone);
    });
});


router.get('/:name',function(req, res) {
    Phone.findOne({pname: req.params.name}, 'pname pphone',
      function(err, phone){
        if(err)res.send(err);
        else res.json(phone);
      }
    );
});

router.post('/', function(req, res) {
    var phone = new Phone();
    phone.pname  = req.body.name;
    phone.pphone = req.body.phone;
    phone.save(function(err) {
        if (err) res.send(err);
        res.json({ message: 'Phone Number Saved!' });
    });
});

router.put('/:id', function(req, res) {
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

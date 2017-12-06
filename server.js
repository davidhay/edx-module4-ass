const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://localhost:27017/edx-module4-ass-db',{useMongoClient: true});

db.on('error', (err) => {
  console.log(`error : ${error}`);
  mongoose.disconnect();
  process.exit(-1);
});

const Account = mongoose.model(
  'Account',
  { name: {type :String, required: true},
    balance: {type:Number, default: 0}
  }
);

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json())

const processError = (res,err) => {
  console.log(err);
  res.status(500).send(err);
}

const findAccount = (req, res, next) => {
  Account.findById(req.params.id, (err, acc) => {
    if (err) return processError(res,err);
    if (!acc) {
      res.status(404).send(`The account with id ${req.params.id} does not exist.`);
    } else {
      req.account = acc;
      next();
    }
  });
}

app.get('/accounts', (req,res) => {
  Account.find({}, (err, accounts) => {
    if (err) return processError(res,err);
    res.send(accounts || []);
  });
});

app.get('/accounts/:id', findAccount, (req,res) => {
  res.send(req.account);
});

app.post('/accounts', (req,res) => {
  const acc = new Account();
  Object.assign(acc, req.body);
  acc.save( (err, newAcc) => {
    if (err) return processError(res,err);
    res.status(201).send({"id":newAcc._id});
  });
});

app.put('/accounts/:id', findAccount, (req,res) => {
  Object.assign(req.account, req.body);
  req.account.save( (err, saved) => {
    if (err) return processError(res,err);
    res.status(200).send(`updated. ${saved}.`);
  });
});

app.delete('/accounts/:id', findAccount, (req,res) => {
  req.account.remove( (err, removed) => {
    if (err) return processError(res,err);
    res.status(200).send(`The account with id ${req.account._id} has been deleted.`);
  });
});

app.listen(3000);

const router = require('express').Router();
let LenderInfo = require('./data.model');

//if there is a get request return all the users 
// router.route('/').get((req, res) => {
//   Course.find()
//     .then(courses => res.json(courses))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/add').post((req, res) => {
  const lender = req.body.lender;
  const region = req.body.region;
  const city = req.body.city;
  const contact = req.body.contact;
  const email = req.body.email;
  const phone = req.body.phone;
  const notes = req.body.notes;
  const fee = req.body.fee;
  const loanType = req.body.loanType;
  const maxLTV = req.body.maxLTV;
  const interestRange = req.body.interestRange;
  const minCreditScore = req.body.minCreditScore;
  const maxAmortization = req.body.maxAmortization;
  const maxLoanAmount = req.body.maxLoanAmount;

  const newLender = new LenderInfo({lender, region, city, contact, email, phone, notes, fee, loanType, maxLTV, interestRange, minCreditScore, maxAmortization, maxLoanAmount });
  newLender.save()
    .then(() => res.json('Lender added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
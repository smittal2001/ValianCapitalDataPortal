const router = require('express').Router();
let LenderInfo = require('./data.model');

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
    .catch(err => res.status(400).json(`Error: ${err} Lender Data ${newLender}`));
});

router.route('/get/:loanTypes/:region').get((req, res) => {
  const loanTypes = req.params.loanTypes.substring(0,req.params.loanTypes.length-1).split("-");

  LenderInfo.find({ loanType: { $all: loanTypes }, region: req.params.region})
    .then(items => {
      res.json(items)
      console.log(req.params.region)
      console.log(loanTypes)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
const router = require('express').Router();
let LoanType = require('./loanType.model');

router.route('/add').post((req, res) => {
  const loanType = req.body.loanType;

  const newLoanType = new LoanType({loanType});
  newLoanType.save()
    .then(() => res.json('Loan Type added!'))
    .catch(err => res.status(400).json(`Error: ${err} Loan Data ${newLoanType}`));
});

router.route('/').get((req, res) => {

  LoanType.find()
    .then(items => {
      res.json(items)
      
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/distinctLoanTypes').get((req, res) => {

  LoanType.distinct("loanType")
    .then(items => {
      res.json(items)
      
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
const router = require('express').Router();
let LenderInfo = require('./data.model');

router.route('/add').post((req, res) => {
  const lender = req.body.lender;
  const region = req.body.region;
  // const city = req.body.city;
  const contact = req.body.contact;
  const email = req.body.email;
  const phone = req.body.phone;
  const notes = req.body.notes;
  // const fee = req.body.fee;
  const loanType = req.body.loanType;
  const maxLTV = req.body.maxLTV;
  const interestRange = req.body.interestRange;
  const minCreditScore = req.body.minCreditScore;
  const maxAmortization = req.body.maxAmortization;
  const maxLoanAmount = req.body.maxLoanAmount;
  console.log(loanType);

  const newLender = new LenderInfo({lender, region, contact, email, phone, notes, loanType, maxLTV, interestRange, minCreditScore, maxAmortization, maxLoanAmount });
  newLender.save()
    .then(() => res.json('Lender added!'))
    .catch(err => res.status(400).json(`Error: ${err} Lender Data ${newLender}`));
});

router.route('/getAll').get((req, res) => {
  LenderInfo.find()
    .then(items => {
      res.json(items)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getLenderName/:lender').get((req, res) => {
  var name = req.params.lender
  LenderInfo.find({lender: new RegExp(name, 'i') })
    .then(items => {
      res.json(items)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get/:loanTypes/:regions').get((req, res) => {
  const loanTypes = req.params.loanTypes.substring(0,req.params.loanTypes.length-1).split("-");
  const regions = req.params.regions.substring(0,req.params.regions.length-1).split("-");

  LenderInfo.find({ loanType: { $all: loanTypes }, region: { $in: regions }})
    .then(items => {
      res.json(items)
      console.log(req.params.region)
      console.log(loanTypes)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/get/:regions').get((req, res) => {
  const regions = req.params.regions.substring(0,req.params.regions.length-1).split("-");

  LenderInfo.find({region: { $in: regions }})
    .then(items => {
      res.json(items)
      console.log(req.params.region)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/loanTypes/:loanTypes').get((req, res) => {
  const loanTypes = req.params.loanTypes.substring(0,req.params.loanTypes.length-1).split("-");

  LenderInfo.find({ loanType: { $all: loanTypes }})
    .then(items => {
      res.json(items)
      console.log(req.params.region)
      console.log(loanTypes)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getRegions').get((req, res) => {

  LenderInfo.distinct("region")
    .then(items => {
      res.json(items)
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  var updateFields = [];
  updateFields.push(["lender",req.body.lender]);
  updateFields.push(["region", req.body.region]);
  updateFields.push(["contact", req.body.contact]);
  updateFields.push(["email", req.body.email]);
  updateFields.push(["phone", req.body.phone]);
  updateFields.push(["notes", req.body.notes]);
  updateFields.push(["loanType",req.body.loanType]);
  updateFields.push(["maxLTV",req.body.maxLTV]);
  updateFields.push(["interestRange", req.body.interestRange]);
  updateFields.push(["minCreditScore", req.body.minCreditScore]);
  updateFields.push(["maxAmortization",req.body.maxAmort]);
  updateFields.push(["maxLoanAmount", req.body.maxLoanAmt]);
  updateFields.push(["loanType", req.body.loanTypes]);

  console.log(updateFields);


  LenderInfo.findById(req.params.id)
  .then(document => {
    updateFields.forEach(field => {
    
      console.log(field);
      document[field[0]] = field[1];
    }
    );
    document.save()
      .then(() => res.json('Lender Data updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })  
});
router.route('/delete/:id').delete((req, res) => {
  LenderInfo.findByIdAndDelete(req.params.id)
    .then(() => res.json('Lender Data deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
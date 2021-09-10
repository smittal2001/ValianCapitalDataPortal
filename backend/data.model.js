const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lenderInfoSchema = new Schema({
  lender: {
    type: String,
    required: false,
    trim: true,
  },
  
  region: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,

  },
  contact: {
    type: String,
    required: false,

  },
  email: {
    type: String,
    required: false,

  },
  phone: {
    type: String,
    required: false,

  },
  notes: {
    type: String,
    required: false,
  },
  fee: {
    type: String,
    required: false,
  },
  loanType: {
    type: [String],
    required: false,
  },
  maxLTV: {
    type: String,
    required: false,
  },
  interestRange: {
    type: String,
    required: false,
  },
  minCreditScore: {
    type: String,
    required: false,
  },
  maxAmortization: {
    type: String,
    required: false,
  },
  maxLoanAmount: {
    type: String,
    required: false,
  }

}, {
  timestamps: true,
});

const LenderInfo = mongoose.model('LenderInfo', lenderInfoSchema);

module.exports = LenderInfo;
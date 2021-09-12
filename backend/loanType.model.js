const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loanType = new Schema({
  loanType: {
    type: String,
    required: true,
    trim: true,
  }

}, {
  timestamps: true,
});

const LoanType = mongoose.model('LoanTypes', loanType);

module.exports = LoanType;
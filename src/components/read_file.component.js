import React, { Component } from 'react';
import axios from 'axios';

export default class Readfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      lender: "",
      region: "",
      city: "", 
      contact: "", 
      email: "", 
      phone: "", 
      notes: "", 
      fee: "", 
      loanType: "", 
      maxLTV: "", 
      interestRange: "", 
      minCreditScore: "", 
      maxAmortization: "", 
      maxLoanAmount: ""
    }
  }

  componentDidMount() {
    var data = [
    ]

    for(let lenderInfo of data) {
      var loanType = [];
      if(lenderInfo["Conv. Lender"] === "X") {
         loanType.push("Conv. Lender")
      }
      if(lenderInfo["SBA Lender"] === "X"){
          loanType.push("SBA Lender")
      }
      if(lenderInfo["Hotel Lender"] === "X"){
          loanType.push("Hotel Lender")
      }
      if(lenderInfo["Asset Based Lender"] === "X"){  
          loanType.push("Asset Based Lender")
      }
      if(lenderInfo["ABL Hybrid"] === "X"){  
        loanType.push("ABL Hybrid")
      }
      if(lenderInfo["Private Money Lender"] === "X"){  
        loanType.push("Private Money Lender")
      }
      if(lenderInfo["Factoring"] === "X"){  
        loanType.push("Factoring")
      }
      if(lenderInfo["Merchant Cash Advance"] === "X"){
        loanType.push("Merchant Cash Advance")
      }
      if(lenderInfo["Unsecured Lending"] === "X"){
          loanType.push("Unsecured Lending")
      }
      if(lenderInfo["504 Program"] === "X"){
        loanType.push("504 Program")
      }
      if(lenderInfo["7(a)Program"] === "X"){
        loanType.push("7(a)Program")
      }
      if(lenderInfo["Owner Occupied"] === "X"){
        loanType.push("Owner Occupied")
      }
      if(lenderInfo["Non Owner Occupied"] === "X"){
        loanType.push("Non Owner Occupied")
      }
      if(lenderInfo["Lot Loans Res/Commercial 80% LTC"] === "X"){
        loanType.push("Lot Loans Res/Commercial 80% LTC")
      }
      if(lenderInfo["Construction Notes LTC or completed Value"] === "X"){
              loanType.push("Construction Notes LTC or completed Value")
      }
      if(lenderInfo["Metal Buildings"] === "X"){
              loanType.push("Metal Buildings")
      }
      if(lenderInfo["Residential Investment"] === "X"){
              loanType.push("Residential Investment")
      }
      if(lenderInfo["Residential Homestead"] === "X"){
              loanType.push("Residential Homestead")
      }
      if(lenderInfo["Gas Stations"] === "X"){
              loanType.push("Gas Stations")
      }
      if(lenderInfo["MultiFamily"] === "X"){
              loanType.push("MultiFamily")
      }
      if(lenderInfo["Self Storage"] === "X"){
              loanType.push("Self Storage")
      }
      if(lenderInfo["Retail Centers"] === "X"){
        loanType.push("Retail Centers")     
      }
      if(lenderInfo["Mobile Home Parks"] === "X"){    
        loanType.push("Mobile Home Parks")
      }
      if(lenderInfo["NOTES RECEIVABLE"] === "X"){
        loanType.push("NOTES RECEIVABLE")
      }
      if(lenderInfo["Auto FloorPlans for Ind Dealers"] === "X"){
        loanType.push("Auto FloorPlans for Ind Dealers")
      }
      if(lenderInfo["Aircraft and Yact"] === "X"){
        loanType.push("Aircraft and Yact")
      }
      if(lenderInfo["Equipment Loans"] === "X"){
        loanType.push("Equipment Loans")    
      }
      const lenderData = {
        lender: lenderInfo["Lender"],
        region: lenderInfo["State"],
        city: lenderInfo["City"], 
        contact: lenderInfo["Contact"], 
        email: lenderInfo["Email"], 
        phone: lenderInfo["Phone"], 
        notes: lenderInfo["Notes"], 
        fee: lenderInfo["Referral Fee Paid"], 
        maxLTV: lenderInfo["Max LTV"], 
        interestRange: lenderInfo["Interest Range"], 
        minCreditScore: lenderInfo["Min Credit Score"], 
        maxAmortization: lenderInfo["Max Amortization (years)"], 
        maxLoanAmount: lenderInfo["Max Loan Amount"],
        loanType: loanType
      }
      console.log(lenderData);
      axios.post('https://val-cap-backend.herokuapp.com/lenderData/add', lenderData)
          .then(res => console.log(res));
    }
  }
   
  render () {
    return (<div>
      {/* <input type="file" onChange={(e) => this.showFile(e)} /> */}
      JAY PORTAL
    </div>
    )
  }
}


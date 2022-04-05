import React, {Component} from 'react';
import { Col, Form, Row } from "react-bootstrap";
import logo from '../images/landingLogo.png'

import axios from 'axios';

export default class AddLenderData extends Component {
    constructor(props) {
        super(props);

        this.onChangeLoanType= this.onChangeLoanType.bind(this);
        this.onChangeNewLoanType= this.onChangeNewLoanType.bind(this);
        this.onChangeRegion = this.onChangeRegion.bind(this);
        this.onChangeLender = this.onChangeLender.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContact= this.onChangeContact.bind(this);
        this.onChangeInterestRange = this.onChangeInterestRange.bind(this);
        this.onChangePhoneNum = this.onChangePhoneNum.bind(this);
        this.onChangeMinCredScore = this.onChangeMinCredScore.bind(this);
        this.onChangeMaxLTV = this.onChangeMaxLTV.bind(this);
        this.onChangeMaxLoanAmt = this.onChangeMaxLoanAmt.bind(this);
        this.onChangeMaxAmort = this.onChangeMaxAmort.bind(this);
        this.onChangeNotes = this.onChangeNotes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            newLoanType: "",
            loanTypes: "",
            region: "",
            lender: '',
            email: '',
            contact: '',
            phoneNum: '',
            interestRange: '',
            minCredScore: '',
            maxLTV: '',
            maxAmort: '',
            maxLoanAmt: '',
            notes: ''

        }
    }
    onChangeNewLoanType(e)
    {
        this.setState({
            newLoanType: e.target.value
        });
    }
    onChangeLoanType(e)
    {
         if(e.target.checked) {
            this.state.loanTypes += e.target.value + '-';
        }
        else {
            var length = e.target.value.length;
            var index = this.state.loanTypes.indexOf(e.target.value)
            if(index != -1){
                this.state.loanTypes = this.state.loanTypes.substring(0,index) + this.state.loanTypes.substring(index+length+1);
                // console.log("removed " + index + " " + this.state.loanTypes.substring(0,index))
            }
        }
        console.log(this.state.loanTypes);
    }
    onChangeRegion(e)
    {
        this.setState({
            region: e.target.value
        });
    }
    onChangeLender(e)
    {
        this.setState({
            lender: e.target.value
        });
    }
    onChangeEmail(e)
    {
        this.setState({
            email: e.target.value
        });
    }
    onChangeContact(e)
    {
        this.setState({
            contact: e.target.value
        });
    }
    onChangePhoneNum(e)
    {
        this.setState({
            phoneNum: e.target.value
        });
    }
    onChangeInterestRange(e)
    {
        this.setState({
            interestRange: e.target.value
        });
    }
    onChangeMinCredScore(e)
    {
        this.setState({
            minCredScore: e.target.value
        });
    }
    onChangeMaxLTV(e)
    {
        this.setState({
            maxLTV: e.target.value
        });
    }
    onChangeMaxAmort(e)
    {
        this.setState({
            maxAmort: e.target.value
        });
    }
    onChangeMaxLoanAmt(e)
    {
        this.setState({
            maxLoanAmt: e.target.value
        });
    }
    onChangeNotes(e)
    {
        this.setState({
            notes: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        if(this.state.newLoanType != "") {
            this.state.loanTypes += this.state.newLoanType + '-';
            const loanType = {
                loanType: this.state.newLoanType
            }
            axios.post('https://val-cap-backend.herokuapp.com/loanTypes/add', loanType)
                .then(res => console.log(res.data));
        }
        

        var loanTypesFormated = this.state.loanTypes.substring(0,this.state.loanTypes.length-1).split("-");
        console.log(loanTypesFormated);
        const lenderData = {
            loanType: loanTypesFormated,
            region: this.state.region,
            lender: this.state.lender,
            email: this.state.email,
            contact: this.state.contact,
            phoneNum: this.state.phoneNum,
            interestRange: this.state.interestRange,
            minCredScore: this.state.minCredScore,
            maxLTV: this.state.maxLTV,
            maxAmort: this.state.maxAmort,
            maxLoanAmt: this.state.maxLoanAmt,
            notes: this.state.notes
        }
        axios.post('https://val-cap-backend.herokuapp.com/lenderData/add', lenderData)
             .then(res => console.log(res.data));
        alert("Lender Data has been added");
        this.setState({
            newLoanType: "",
            loanTypes: "",
            region: "",
            lender: '',
            email: '',
            contact: '',
            phoneNum: '',
            interestRange: '',
            minCredScore: '',
            maxLTV: '',
            maxAmort: '',
            maxLoanAmt: '',
            notes: ''
        });
      }


    render() {
        return (
             <div class="container" style = {{ backgroundColor: 'white', borderRadius:10, padding: 25}}>
                <h3>Create New Lender Data </h3>
                <img src={logo} alt="Logo"  style={{width:'60%', height:"250px"}}/>
                <form onSubmit={this.onSubmit}>
                    <Row className="g-2">
                        <Form style = {{textAlign: "left"}}>
                            
                            <Col md>
                                <Form.Group className="mb-3" >
                                    <Form.Label><strong>Lender</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Lender" onChange={this.onChangeLender}  value={this.state.lender}/>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className="mb-3" >
                                    <Form.Label><strong>Region</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Region" onChange={this.onChangeRegion}  value={this.state.region}/>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className="mb-3" >
                                    <Form.Label><strong>Email</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Email" onChange={this.onChangeEmail}  value={this.state.email}/>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className="mb-3" >
                                    <Form.Label><strong>Contact</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Contact" onChange={this.onChangeContact}  value={this.state.contact}/>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className="mb-3" >
                                    <Form.Label><strong>Phone Number</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Phone Number" onChange={this.onChangePhoneNum}  value={this.state.phoneNum}/>
                                </Form.Group>
                            </Col>

                            <Col md>
                                <Form.Group className="mb-3" >
                                    <Form.Label><strong>Interest Range</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Interest Range" onChange={this.onChangeInterestRange}  value={this.state.interestRange}/>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className="mb-3" >
                                    <Form.Label><strong>Minimum Credit Score</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Minimum Credit Score" onChange={this.onChangeMinCredScore}  value={this.state.minCredScore}/>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className="mb-3" >
                                    <Form.Label><strong>Max LTV</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Max LTV" onChange={this.onChangeMaxLTV}  value={this.state.maxLTV}/>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className="mb-3" >
                                    <Form.Label><strong>Max Amortization (years)</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Max Amortization" onChange={this.onChangeMaxAmort}  value={this.state.maxAmort}/>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className="mb-3" >
                                    <Form.Label><strong>Max Loan Amount</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Max Loan Amount" onChange={this.onChangeMaxLoanAmt}  value={this.state.maxLoanAmt}/>
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className="mb-3" >
                                    <Form.Label><strong>Notes</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Notes" onChange={this.onChangeNotes}  value={this.state.notes}/>
                                </Form.Group>
                            </Col>
                        
                            <Form.Label style = {{paddingTop: 10}}> <strong>Selct Loan Types</strong>  </Form.Label>
                                <Row xs={3}>
                                {["Conv. Lender", "SBA Lender", "Hotel Lender", "Asset Based Lender", "ABL Hybrid", "Private Money Lender", "Factoring", "Merchant Cash Advance", "Unsecured Lending", "504 Program", "7(a)Program", "Owner Occupied", "Non Owner Occupied", 
                                "Lot Loans Res/Commercial 80% LTC", "Construction Notes LTC or completed Value", "Metal Buildings", "Residential Investment", 
                                "Residential Homestead", "Gas Stations", "MultiFamily", "Self Storage", "Retail Centers", "Mobile Home Parks", "NOTES RECEIVABLE", "Auto FloorPlans for Ind Dealers", "Aircraft and Yact", "Equipment Loans" ].map((type) => (
                                    <div key={type} className="mb-3" >
                                    
                                            <Col>
                                            <input
                                                inline
                                                value = {type}
                                                type="checkbox"
                                                defaultChecked={false}
                                                ref="complete"
                                                onChange={this.onChangeLoanType}
                                                
                                            />
                                            <label style={{padding: 5}}>
                                            {type}
                                            </label>
                                            </Col>
                                        
                                    </div>
                            ))}
                            </Row>
                            <br></br>
                        </Form>
                        <Col md>
                            <Form.Group className="mb-3" >
                                <Form.Label style={{textAlign:"center"}}><h5>Add a loan type not on the list here</h5></Form.Label>
                                <Form.Control type="text" placeholder="Enter Loan Type"  onChange={this.onChangeNewLoanType} value={this.state.newLoanType} />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                   
                    <br></br>
                    <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
                </div>
        );
    }
}
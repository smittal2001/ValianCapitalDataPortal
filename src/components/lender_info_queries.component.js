import React, {Component} from 'react';
import { Col, Form, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import DisplayData from "./lender_display_data.component";

export default class LenderInfoData extends Component {
    constructor(props) {
        super(props);

        this.onChangeLender = this.onChangeLender.bind(this);
        this.onChangeRegion = this.onChangeRegion.bind(this);
        this.onChangeLoanType = this.onChangeLoanType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSearchAgain = this.onSearchAgain.bind(this);

        this.state = {
            recieved: false,
            lender: '',
            region: 'None',
            loanTypeList: '',

        }
       
    }
    componentDidMount() {
        this.setState({});
      }
    
    onChangeLoanType(e){
        if(e.target.checked) {
            this.state.loanTypeList += e.target.value + '-';
        }
        else {
            var length = e.target.value.length;
            var index = this.state.loanTypeList.indexOf(e.target.value)
            if(index != -1){
                this.state.loanTypeList = this.state.loanTypeList.substring(0,index) + this.state.loanTypeList.substring(index+length+1);
                console.log("removed " + index + " " + this.state.loanTypeList.substring(0,index))
            }
        }
        console.log(this.state.loanTypeList)
    }

    onChangeLender(e)
    {
        this.setState({
            lender: e.target.value
        });
    }

    onChangeRegion(e)
    {
        this.setState({
            region: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.loanTypeList)
        var recieved= this.state.recieved
        this.setState({
            recieved:true,
        });
        // this.forceUpdate()
    }
    onSearchAgain(e) {
        e.preventDefault();
        
        this.setState({
            recieved: false,
            lender: '',
            region: 'None',
            loanTypeList: '',
        });
        // this.forceUpdate()
    }

    render() {

        if(this.state.recieved) {
           
            // return <Redirect to={"/data/" + this.state.loanTypeList + "/"+this.state.region} />
              return(
                  <div style = {{  padding: 50}}>
                    <div className ="container" style = {{ backgroundColor: 'white', borderRadius:10, padding: 50}}>
                        <div style = {{textAlign:"left"}}>
                            <strong>Results for:  </strong> 
                            <br></br>
                            Loan Types: <strong>{this.state.loanTypeList.substring(0,this.state.loanTypeList.length-1).replaceAll("-", ", ")} </strong>
                            <br></br>
                            Region: <strong>{this.state.region}</strong> 
                        </div>
                        
                        <button   onClick = {this.onSearchAgain} type="button" class="btn btn-secondary btn-lg btn-block">Search Again</button>
                        <br></br>
                        <br></br>
                        <DisplayData loanTypes= {this.state.loanTypeList} region = {this.state.region}/>
                        

                        {/* <button onClick = {this.onSubmit} type="button" class="btn btn-light btn-lg">Search Again</button> */}
                    </div>
                  </div>
                    
              ) 
        } 
        else {
           return (
               <div style = {{  padding: 50}}>
                     <div className ="container" style = {{ backgroundColor: 'white', borderRadius:10, padding: 50}}>
                    <h1> Get Lender Data </h1>
                    <form onSubmit={this.onSubmit} style = {{ padding: 15, textAlign: "left"}}>
                        <div className="form-group" style = {{ textAlign: "center"}} >
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </div>
                        <br></br>
                        <label ><strong>Region</strong> </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.region}
                            onChange={this.onChangeRegion}
                            style = {{padding: 10}}>
                            {
                                ['None','Natioan wide', 'TX'].map(function(region) {
                                    return <option 
                                        key={region}
                                        value={region}>{region}
                                        </option>;
                                    })
                            }
                        </select>
                        <Form.Label style = {{paddingTop: 10}}> <strong>Selct Loan Types</strong>  </Form.Label>
                        {["Conv. Lender", "SBA Lender", "Hotel Lender", "Asset Based Lender", "ABL Hybrid", "Private Money Lender", "Factoring", "Merchant Cash Advance", "Unsecured Lending", "504 Program", "7(a)Program", "Owner Occupied", "Non Owner Occupied", 
                        "Lot Loans Res/Commercial 80% LTC", "Construction Notes LTC or completed Value", "Metal Buildings", "Residential Investment", 
                        "Residential Homestead", "Gas Stations", "MultiFamily", "Self Storage", "Retail Centers", "Mobile Home Parks", "NOTES RECEIVABLE", "Auto FloorPlans for Ind Dealers", "Aircraft and Yact", "Equipment Loans" ].map((type) => (
                            <div key={type} className="mb-3" >
                                <input
                                        inline
                                        value = {type}
                                        type="checkbox"
                                        defaultChecked={false}
                                        ref="complete"
                                        onChange={this.onChangeLoanType}
                                        
                                    />
                                    {/* <Form.Check
                                        inline
                                        label={type}
                                        value = {type}
                                        name="group1"
                                        type="checkbox"
                                        id={`inline-${type}`}
                                    /> */}
                                <label style={{padding: 5}}>
                                {type}
                                </label>
                            </div>
                        ))}
                        
                    </form>
                    {/* { this.state.recieved && <DisplayData loanTypes= {this.state.loanTypeList} region = {this.state.region}/>} */}
                   
                </div>
               </div>
               
           );
            
        }
    }
}
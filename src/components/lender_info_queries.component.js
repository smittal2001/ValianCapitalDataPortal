import React, {Component} from 'react';
import axios from 'axios';
import { Col, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";


export default class LenderInfoData extends Component {
    constructor(props) {
        super(props);

        
        this.onChangeLoanType = this.onChangeLoanType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            recieved: false,
            lender: '',
            region: '',
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

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.loanTypeList)
        this.setState({
            recieved:true,
        });
    }


    render() {
        var labelStyle={
            'padding': "10px;"
        };

        if(this.state.recieved) {
           
            return <Redirect to={"/data/" + this.state.loanTypeList} />
              
        } 
        else {
           return (
                <div className ="container">
                <h3>Get Lender Info </h3>
                <form onSubmit={this.onSubmit}>
                {/* <div className = "center">
                    <Form.Group as={Col} controlId="my_multiselect_field" style = {{width: 300 }} >
                        <Form.Label>Select Loan Type: </Form.Label>
                        <br></br>
                        <Form.Control as="select" multiple value={ this.state.loanTypes} onChange = {this.onChangeLoanType}>
                        {["Conv. Lender", "SBA Lender", "Hotel Lender", "Asset Based Lender", "ABL Hybrid", "Private Money Lender", "Owner Occupied", "Non Owner Occupied", "Construction Notes LTC or completed Value", "Metal Buildings", "Retail Centers"].map(function(school) {
                            return <option 
                                key={school}
                                value={school}>{school}
                                </option>;
                            })
                        }
                        </Form.Control>
                    </Form.Group>
                </div> */}
                
                <br></br>
                {["Conv. Lender", "SBA Lender", "Hotel Lender", "Asset Based Lender", "ABL Hybrid", "Private Money Lender", "Owner Occupied", "Non Owner Occupied", "Construction Notes LTC or completed Value", "Metal Buildings", "Retail Centers"].map((type) => (
                    <div key={type} className="mb-3">
                        <input
                                value = {type}
                                type="checkbox"
                                defaultChecked={false}
                                ref="complete"
                                onChange={this.onChangeLoanType}
                            />
                        <label style={{padding: 5}}>
                        {type}
                        </label>
                        
                         
                    </div>
                ))}
                <div className="form-group" >
                    <input type="submit" value="Submit" className="btn btn-primary" />
                </div>
                </form>
                </div>
           );
            
        }
    }
}
import React, {Component} from 'react';
import { Col, Form, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";


export default class LenderInfoData extends Component {
    constructor(props) {
        super(props);

        this.onChangeLender = this.onChangeLender.bind(this);
        this.onChangeRegion = this.onChangeRegion.bind(this);
        this.onChangeLoanType = this.onChangeLoanType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            recieved: false,
            lender: '',
            region: 'Natioan wide',
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
        this.setState({
            recieved:true,
        });
    }


    render() {

        if(this.state.recieved) {
           
            return <Redirect to={"/data/" + this.state.loanTypeList + "/"+this.state.region} />
              
        } 
        else {
           return (
               
                <div className ="container" style = {{ backgroundColor: 'white', borderRadius:10, padding: 50}}>
                    <h1> Get Lender Data </h1>
                    <form onSubmit={this.onSubmit} style = {{ padding: 15, textAlign: "left"}}>
                        <label ><strong>Region</strong> </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.region}
                            onChange={this.onChangeRegion}
                            style = {{padding: 10}}>
                            {
                                ['Natioan wide', 'TX'].map(function(region) {
                                    return <option 
                                        key={region}
                                        value={region}>{region}
                                        </option>;
                                    })
                            }
                        </select>
                        <Form.Label style = {{paddingTop: 10}}> <strong>Selct Loan Types</strong>  </Form.Label>
                        {["Conv. Lender", "SBA Lender", "Hotel Lender", "Asset Based Lender", "ABL Hybrid", "Private Money Lender", "Owner Occupied", "Non Owner Occupied", "Construction Notes LTC or completed Value", "Metal Buildings", "Retail Centers"].map((type) => (
                            <div key={type} className="mb-3" style = {{textAlign: "left"}}>
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
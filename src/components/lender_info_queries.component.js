import React, {Component} from 'react';
import { Col, Form, Row, Button } from "react-bootstrap";
import axios from 'axios';
import DisplayData from "./lender_display_data.component";

export default class LenderInfoData extends Component {
    constructor(props) {
        super(props);

        this.onChangeLender = this.onChangeLender.bind(this);
        this.onChangeRegion = this.onChangeRegion.bind(this);
        this.onChangeLoanType = this.onChangeLoanType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSearchAgain = this.onSearchAgain.bind(this);
        this.onLogIn = this.onLogIn.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            regions: [],
            username: '',
            password: '',
            loggedIn: false,
            recieved: false,
            lender: '',
            region: 'None',
            loanTypeList: '',

        }
       
    }
    componentDidMount() {
        this.setState({});
        axios.get('https://val-cap-backend.herokuapp.com/lenderData/getRegions')
        .then(response => {
            if(response.data.length > 0) {
                this.setState({
                    regions : response.data
                })
            }  
        })
        .catch((error) => {
            console.log(error);
        })
        

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
    onChangeUsername(e)
    {
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e)
    {
        this.setState({
            password: e.target.value
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
    onLogIn(e) {
        e.preventDefault();
        console.log(this.state.loggedIn)
        if(this.state.username === "ValCap" && this.state.password === "ValCap") {
            this.setState({
                loggedIn:true
            });
        }
        else {
            alert("Invalid Username or Password Try again")
            this.setState({
                password:''
            });
        }
    }

    render() {
        if(!this.state.loggedIn) {
            return (
                <div className= "container" style={{padding:80}}>
                    <h1 style = {{color:"white"}}>Welcome to the Lender Info Data Portal</h1>
                    <div style={{width:"50%", padding:50, margin: "0 auto", backgroundColor: "white", transform: "translateY(40%)", borderRadius:10}}>
                        <form onSubmit = {this.onLogIn}>
                            <label style= {{padding: 10}}>Username:</label>
                            <input
                                inline
                                value = {this.state.username}
                                type="text"
                                onChange={this.onChangeUsername}
                                
                            />
                            <br></br>
                            <label  style= {{padding: 10}}>Password:</label>
                            <input
                                inline
                                value = {this.state.password}
                                type="password"
                                onChange={this.onChangePassword}
                                
                            />
                            <br></br>
                            <input type="submit" value="Log In" className="btn btn-primary" />
                        </form>
                    </div>
                </div>
                
                
            );

            
        }
        else if(this.state.recieved) {
           
            // return <Redirect to={"/data/" + this.state.loanTypeList + "/"+this.state.region} />
              return(
                  <div style = {{  padding: 100}}>
                    <div style = {{ backgroundColor: 'white', borderRadius:10, padding: 25}}>
                        <div style = {{textAlign:"left"}}>
                            <strong>Search Results for:  </strong> 
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
                        
                        <br></br>
                        <label ><strong>Region</strong> </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.region}
                            onChange={this.onChangeRegion}
                            style = {{padding: 10}}>
                            {
                                this.state.regions.map(function(region) {
                                    return <option 
                                        key={region}
                                        value={region}>{region}
                                        </option>;
                                    })
                            }
                        </select>
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
                         <div className="form-group" style = {{ textAlign: "center"}} >
                            <input type="submit" value="Submit" className="btn btn-primary" />
                        </div>
                    </form>
                   
                </div>
               </div>
               
           );
            
        }
    }
}
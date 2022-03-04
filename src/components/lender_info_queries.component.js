import React, {Component} from 'react';
import { Col, Form, Row, Button } from "react-bootstrap";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import {Link} from 'react-router-dom';
import "./searchBar.css";

export default class LenderInfoData extends Component {
    constructor(props) {
        super(props);

        this.onChangeLender = this.onChangeLender.bind(this);
        this.onChangeRegion = this.onChangeRegion.bind(this);
        this.onChangeLoanType = this.onChangeLoanType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);
        this.onSearchAgain = this.onSearchAgain.bind(this);
        this.search = this.search.bind(this);
        this.viewAllData = this.viewAllData.bind(this);
        this.onLogIn = this.onLogIn.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            regions: [],
            password: '',
            loggedIn: false,
            recieved: false,
            lender: '',
            region: 'None',
            loanTypeList: '',
            loanTypes: [],
            newRegion: "",
            newLender: '',
            email: '',
            contact: '',
            phoneNum: '',
            interestRange: '',
            minCredScore: '',
            maxLTV: '',
            maxAmort: '',
            maxLoanAmt: '',
            searchResponse: [],
            searchLender: 'None'
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
            this.state.regions.push("None") 
        })
        .catch((error) => {
            console.log(error);
        })
        
        axios.get('https://val-cap-backend.herokuapp.com/loanTypes/distinctLoanTypes')
        .then(response => {
            if(response.data.length > 0) {
                this.setState({
                    loanTypes : response.data
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
        axios.get('https://val-cap-backend.herokuapp.com/lenderData/getLenderName/'+this.state.lender)
        .then(response =>  {
            this.setState({
                searchResponse: response.data
            })
        })
        console.log(this.state.searchResponse)
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
        console.log("submit")
        if(this.state.loanTypeList === '') {
            this.setState({
                loanTypeList: "None-"
            })
        } 
        if(this.state.lender != '') {
            this.setState({
                searchLender: this.state.lender
            })
        }
        this.setState({
            recieved: true,
        });
    }
    viewAllData() {
        this.setState({
            searchLender: "View",
            region: "All",
            loanTypeList: "Data"
        })
        this.setState({
            recieved: true,
        });
    }
    onSubmit2(e) {
        //console.log(e.key.length)
        if((e.key.length > 0 && (e.key === 'Enter' || e.key === 'NumpadEnter')) || e.key.length===0) {
            e.preventDefault();
            console.log("submit")
            if(this.state.loanTypeList === '') {
                this.setState({
                    loanTypeList: "None-"
                })
            } 
            if(this.state.lender != '') {
                this.setState({
                    searchLender: this.state.lender
                })
            }
            this.setState({
                recieved: true,
            });
        } 
       
    }
    search(val) {
        console.log(val)
        if(this.state.loanTypeList === '') {
            this.setState({
                loanTypeList: "None-"
            })
        } 
        if(this.state.lender != '') {
            this.setState({
                searchLender: val
            })
        }
        this.setState({
            recieved: true,
        });
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
        if(this.state.password === "Valiant1234!") {
            this.setState({
                loggedIn:true
            });
        }
        else {
            alert("Invalid Password Try again")
            this.setState({
                password:''
            });
        }
    }

    render() {
    if(this.state.recieved) {
       return (  
        <Redirect to= { "/display/" + this.state.region + "/" + this.state.loanTypeList + "/" + this.state.searchLender } />
       )    
    }
    else {
        return (
            <div style = {{  padding: 50}}>
                    <div className ="container" style = {{ backgroundColor: 'white', borderRadius:10, padding: 50}}>
                <h1> Lender Info </h1> 
                <br></br>
                <button  class="btn btn-grey btn-lg btn-block">  
                        <Link to="/addLenderData" className="nav-link"> Click here to add Lender Data </Link> 
                </button>
                    
               
                <form onSubmit={this.onSubmit} style = {{ padding: 15, textAlign: "left"}}>
                    <div className="search" >
                    <Form.Label style = {{ paddingTop: 15, textAlign: "left"}}><strong>Lender</strong></Form.Label>
                    <Form.Control type="text" onKeyPress={this.onSubmit2} placeholder="Enter Lender" onChange={this.onChangeLender}  value={this.state.lender}/>
                        {/* <div>
                            <input
                            type="text"
                            placeholder= "Enter Lender"
                            value={this.state.lender}
                            onChange={this.onChangeLender}
                            />
                        </div> */}
                        {this.state.searchResponse.length != 0 && (
                            <div className="dataResult">
                            {this.state.searchResponse.slice(0, 15).map((value, key) => {
                                return (
                                <a className="dataItem"  target="_blank">
                                    <button style= {{ width:"100%", backgroundColor:'transparent', border: "none", textAlign:'left' }}onClick= {() => this.search(value.lender)}>{value.lender} </button>
                                </a>
                                );
                            })}
                            </div>
                        )}
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
                            this.state.regions.map(function(region) {
                                return <option 
                                    key={region}
                                    value={region}>{region}
                                    </option>;
                                })
                        }
                    </select>
                
                    <Form.Label style = {{paddingTop: 10}}> <strong>Select Loan Types</strong>  </Form.Label>
                        <Row xs={3}>
                            {this.state.loanTypes.map((type) => (
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
                        {/* <Row xs={2}> 
                            <Col>
                                <input  type="submit" value="Submit" className="btn btn-primary" />
                            </Col>  
                            <Col>
                                <Button variant ="secondary" style={{ paddingLeft:15}}> Test </Button>
                            </Col>  
                        </Row> */}
                        <input  type="submit" value="Submit" className="btn btn-primary" />
                        <Button variant ="secondary" style={{transform:"translateX(30px)"}} onClick= {this.viewAllData}> View All Data </Button>
                        
                        
                    </div>
                </form>
                
            </div>
            </div>
            
        );
        
        }
    }
}
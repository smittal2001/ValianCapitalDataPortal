import React, {Component} from 'react';
import { Col, Form, Row, Button } from "react-bootstrap";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import {Link} from 'react-router-dom';
// import logo from '../images/homepagelogo.jpg'
import logo from '../images/landingLogo.png'
// import Select from 'react-select'
import Select from 'react-select'

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
            selRegions: "None",
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
                    regions : response.data.map( (region) => ({
                        "value" : region,
                        "label" : region === "-" || region === "" ? "No Region" : region
                      }))
                })
            } 
            // const noneOpt = {
            //     "value" : "None",
            //     "label" : "No Region"
            // }
            // this.state.regions.unshift(noneOpt);
            console.log(response.data)
            console.log(this.state.regions)
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
    
    onChangeLoanType(selectedTypes){
        this.state.loanTypeList = "";
        selectedTypes.map( (loanType) => {
            this.state.loanTypeList += loanType.value + '-';
        })
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

    onChangeRegion(selectedOptions)
    {
        this.state.selRegions = "";
        selectedOptions.map( (region) => {
            this.state.selRegions += region.value + '+';
        })
        console.log(this.state.selRegions);
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
            selRegions: "All",
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
        <Redirect to= { "/display/" + this.state.selRegions + "/" + this.state.loanTypeList + "/" + this.state.searchLender } />
       )    
    }
    else {
        const loanTypesOptions = this.state.loanTypes.map( (loanType) => ({
            "value" : loanType,
            "label": loanType
        }));    

        return (
            <div style = {{  padding: 50}}>
                    <div className ="container" style = {{ backgroundColor: 'white', borderRadius:10, padding: 50}}>
                <h1> Search Lender Data </h1> 
                {/* <img src={logo} alt="Logo"  style={{width:'200px', height:"200px", transform: "translateY(-10%)" }}/> */}
                <img src={logo} alt="Logo"  style={{width:'60%', height:"250px"}}/>
                <br></br>
                
                <button  class="btn btn-grey btn-lg btn-block" style={{transform: "translateY(-60%)"}}>  
                        <Link to="/addLenderData" className="nav-link"> Click here to add Lender Data </Link> 
                </button>
               
                <form onSubmit={this.onSubmit} style = {{ padding: 15, textAlign: "left", transform: "translateY(-10%)"}}>
                    <div className="search" >
                    <Form.Label style = {{ paddingTop: 15, textAlign: "left"}}><strong>Lender</strong></Form.Label>
                    <Form.Control type="text" onKeyPress={this.onSubmit2} placeholder="Search for Lender Name" onChange={this.onChangeLender}  value={this.state.lender}/>
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
                    
                    <div style = {{paddingTop: 30}}>
                        <label><strong>Region</strong> </label>
                        <Select 
                            options={this.state.regions} 
                            onChange={this.onChangeRegion}
                            isMulti
                        />
                    </div>

                    <div style = {{paddingTop: 30}}>
                        <strong>Select Loan Types</strong>
                        <Select 
                            options={loanTypesOptions} 
                            onChange={this.onChangeLoanType}
                            isMulti
                        />
                    </div>
                    
                    
                    {/* <Form.Label style = {{paddingTop: 10}}> <strong>Select Loan Types</strong>  </Form.Label>
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
                    </Row> */}
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
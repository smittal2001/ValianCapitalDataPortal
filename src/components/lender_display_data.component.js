import React, {Component} from 'react';
import axios from 'axios';
import { ListGroup } from "react-bootstrap";


export default class DisplayData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [[]],
            noData: false,
        }
       
    }
    componentDidMount() {
        const loanTypesArr = this.props.loanTypes.split(" ")
        var loanTypes = "";
        for(var i =0; i<loanTypesArr.length-1; i++) {
            loanTypes += loanTypesArr[i] + "%20";
        }
        loanTypes += loanTypesArr[loanTypesArr.length-1];
        console.log(this.props.loanTypes)
        if(this.props.loanTypes==="") {
            
            axios.get('https://val-cap-backend.herokuapp.com/lenderData/get/'+this.props.region)
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        recieved: true,
                        data : response.data.map(item => [item.lender, item.region, item.email, item.contact, item.phone, item.interestRange, item.minCreditScore, item.maxLTV, item.maxAmortization, item.maxLoanAmount, item.notes, item.loanType, item._id.toString()])
                    })
                    console.log(this.state.data[0])
                }
                else {
                    
                    console.log("no data");
                    this.setState({
                        noData: true
                    })
                }
                
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else if(this.props.region==="None"){
           
            console.log(loanTypes)
            axios.get('https://val-cap-backend.herokuapp.com/lenderData/loanTypes/'+loanTypes)
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        recieved: true,
                        data : response.data.map(item => [item.lender, item.region, item.email, item.contact, item.phone, item.interestRange, item.minCreditScore, item.maxLTV, item.maxAmortization, item.maxLoanAmount, item.notes, item.loanType, item._id.toString()])
                    })
                    console.log(this.state.data[0])
                }
                else {
                    console.log("no data");
                    this.setState({
                        noData: true
                    })
                }
                
            })
            .catch((error) => {
                console.log(error);
            })
            
        }
        else {
            console.log('https://val-cap-backend.herokuapp.com/lenderData/get/'+loanTypes+"/"+this.props.region)
            axios.get('https://val-cap-backend.herokuapp.com/lenderData/get/'+loanTypes+"/"+this.props.region)
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        recieved: true,
                        data : response.data.map(item => [item.lender, item.region, item.email, item.contact, item.phone, item.interestRange, item.minCreditScore, item.maxLTV, item.maxAmortization, item.maxLoanAmount, item.notes, item.loanType, item._id.toString()])
                    })
                    console.log(this.state.data[0])
                }
                else {
                    console.log("no data");
                    this.setState({
                        noData: true
                    })
                }
                
            })
            .catch((error) => {
                console.log(error);
            })
        }
        
    }
   
    render() {
        if(this.state.recieved) {
            return (
                <div style={{padding: 50}} > 
                   <table class="table" style= {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid', }}  >
                            <thead>
                                <tr>
                                    <th scope="col">Lender</th>
                                    <th scope="col">Region</th>
                                    <th scope="col">Email</th>
                                    <th scope='col'> Contact </th>
                                    <th scope="col">Phone Number </th>
                                    <th scope="col"> Interest Range </th>
                                    <th scope="col"> Minimum Credit Score </th>
                                    <th scope="col">Max LTV</th>
                                    <th scope='col'> Max Amortization (years)</th>
                                    <th scope='col'> Max Loan Amount</th>
                                    <th scope="col">Notes</th>
                                    {/* <th scope="col">Loan Types</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.data.map( item => (
                                <tr>
                                    <td style = {{'width':'300px'}}>{item[0] === ""  ?  "None" : item[0]}</td>
                                    <td>{item[1] === ""  ?  "None" : item[1]}</td>
                                    <td>{item[2] === ""  ?  "None" : item[2]}</td>
                                    <td>{item[3] === ""  ?  "None" : item[3]}</td>
                                    <td style = {{'width':'300px'}}> {item[4] === ""  ?  "None" : item[4]}</td>
                                    <td>{item[5] === ""  ?  "None" : item[5]}</td>
                                    <td>{item[6] === ""  ?  "None" : item[6]}</td>
                                    <td>{item[7] === ""  ?  "None" : item[7]}</td>
                                    <td>{item[8] === ""  ?  "None" : item[8] }</td>
                                    <td>{item[9] === ""  ?  "None" : item[9]}</td>
                                    <td style = {{'width':'700px'}}>{item[10] === ""  ?  "None" : item[10]}</td>
                                    {/* <td>{item[5]}</td> */}
                                  </tr> 
                                ))}
                            </tbody>
                    </table>

                    {/* <h3>Loan Types</h3>
                    <ListGroup >
                        {this.state.loanTypes.map(item => (
                             <ListGroup.Item>{item}</ListGroup.Item>                            
                        ))}

                    </ListGroup> */}
                </div>


         


           );
        }
        else if(this.state.noData) {
            return <h1>No Search Results </h1>
        }
        else
        {
            return <h1> Loading... </h1>
        }
          
            
        
    }
}

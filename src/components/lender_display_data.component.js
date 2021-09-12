import React, {Component} from 'react';
import axios from 'axios';
import { ListGroup } from "react-bootstrap";


export default class DisplayData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [[]],
            count: 0
        }
       
    }
    componentDidMount() {
        const loanTypesArr = this.props.match.params.loanTypes.split(" ")
        var loanTypes = "";
        for(var i =0; i<loanTypesArr.length-1; i++) {
            loanTypes += loanTypesArr[i] + "%20";
        }
        loanTypes += loanTypesArr[loanTypesArr.length-1];

        const lenderArr = this.props.match.params.lender.split(" ")
        var lender = "";
        for(var i =0; i<lenderArr.length-1; i++) {
            lender += lenderArr[i] + "%20";
        }
        lender += lenderArr[lenderArr.length-1];

        const regionArr = this.props.match.params.region.split(" ")
        var region = "";
        for(var i =0; i<regionArr.length-1; i++) {
            region += regionArr[i] + "%20";
        }
        region += regionArr[regionArr.length-1];
        
        console.log('https://val-cap-backend.herokuapp.com/lenderData/get/'+loanTypes+"/"+this.props.match.params.lender+"/"+this.props.match.params.lender)
        axios.get('https://val-cap-backend.herokuapp.com/lenderData/get/'+loanTypes+"/"+this.props.match.params.lender+"/"+this.props.match.params.region)
        .then(response => {
            if(response.data.length > 0) {
                this.setState({
                    data : response.data.map(item => [item.lender, item.region, item.phone, item.maxLTV, item.notes, item.loanType, item._id.toString()])
                })
                console.log(this.state.data[0])
            }
            else {
                console.log("no data");
            }
            
        })
        .catch((error) => {
            console.log(error);
        })
    }
   
    render() {
           return (
                <div className = "container"> 
                   <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Lender</th>
                                    <th scope="col">Region</th>
                                    <th scope="col">Phone Number </th>
                                    <th scope="col">Max LTV</th>
                                    <th scope="col">Notes</th>
                                    {/* <th scope="col">Loan Types</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.data.map( item => (
                                <tr>
                                    <td>{item[0]}</td>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                    <td>{item[3]}</td>
                                    <td>{item[4]}</td>
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
}

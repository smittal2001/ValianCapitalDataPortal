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
        
        console.log('http://localhost:5000/lenderData/get/'+loanTypes)
        axios.get('http://localhost:5000/lenderData/get/'+loanTypes)
        .then(response => {
            if(response.data.length > 0) {
                this.setState({
                    data : response.data.map(item => [item.lender, item.region, item.phone, item.maxLTV, item.notes, item._id.toString()])
                    
                })
            }
            else {
                console.log("no data");
            }
            
        })
        .catch((error) => {
            console.log(error);
        })
      
    }
    incrementCount= () => {
        this.setState({
          count:this.state.count+1
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.data.map( item => (
                                <tr task = { () => this.incrementCount() }>
                                    <td>{item[0]}</td>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                    <td>{item[3]}</td>
                                    <td>{item[4]}</td>
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

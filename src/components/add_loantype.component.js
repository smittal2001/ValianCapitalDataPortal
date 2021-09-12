import React, {Component} from 'react';
import { Col, Form, Row } from "react-bootstrap";

import axios from 'axios';

export default class AddLoanType extends Component {
    constructor(props) {
        super(props);

        this.onChangeLoanType= this.onChangeLoanType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            loanType: "",
            region: ""
        }
    }
    
    onChangeLoanType(e)
    {
        this.setState({
            loanType: e.target.value
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
    
        const loanType = {
            loanType: this.state.loanType
        }
        axios.post('http://localhost:5000/loanTypes/add', loanType)
            .then(res => console.log(res.data));
      }


    render() {
        return (
             <div class="container">
                <h3>Create New Loan Type </h3>
                <form onSubmit={this.onSubmit}>
                    <Row className="g-2">
                        <Form style = {{textAlign: "left"}}>
                            <Col md>
                                <Form.Group className="mb-3" >
                                    <Form.Label><strong>Loan Type</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Loan Type"  onChange={this.onChangeLoanType} value={this.state.loanType} />
                                </Form.Group>
                            </Col>
                            <Col md>
                                <Form.Group className="mb-3" >
                                    <Form.Label><strong>Region</strong></Form.Label>
                                    <Form.Control type="text" placeholder="Enter Region" onChange={this.onChangeRegion}  value={this.state.region}/>
                                </Form.Group>
                            </Col>
                        </Form>
                    </Row>
                    <br></br>
                    <div className="form-group">
                    <input type="submit" value="Create Course" className="btn btn-primary" />
                    </div>
                </form>
                </div>
        );
    }
}
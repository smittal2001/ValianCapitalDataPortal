import React, {Component} from 'react';
import { Redirect } from "react-router-dom";
import logo from '../images/landingLogo.png'

export default class LandingPage extends Component {
    constructor(props) {
        super(props);

      
        this.onLogIn = this.onLogIn.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            password: '',
            loggedIn: false,            
        }
       
    }
    componentDidMount() {
        this.setState({});
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
        if(this.state.loggedIn){
            return ( <Redirect to="/queryData" />);
        }
        else {
            return (
                <div className= "container" style={{padding:30, background:"white", transform:"translateY(5%)", height:"600px"}}>
                    
                    <img src={logo} alt="Logo"  style={{width:'60%', height:"250px"}}/>
                    {/* <h1 style = {{color:"white"}}>Welcome to the Lender Info Data Portal</h1> */}
                    <div style={{width:"50%", padding:30, margin: "0 auto", backgroundColor: "white", transform:"translateX(-2%)", borderRadius:10}}>
                        <h4 style = {{color:"black"}}>Welcome to the Lender Info Data Portal</h4>
                        <br></br>
                        <form onSubmit = {this.onLogIn}>
                            <label  style= {{padding: 10}}>Password:</label>
                            <input
                                inline
                                value = {this.state.password}
                                type="password"
                                onChange={this.onChangePassword}
                            />
                            <br></br>
                            <br></br>
                            <input type="submit" value="Log In" className="btn btn-primary" />
                        </form>
                    </div>
                </div>
            );
        }

            
        }
}

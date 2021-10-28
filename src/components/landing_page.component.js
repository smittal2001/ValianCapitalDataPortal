import React, {Component} from 'react';

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
            window.open("/getLenderData");
            var win = window.open("/", "_self");
            win.close(); 
            
        }
        else {
            alert("Invalid Password Try again")
            this.setState({
                password:''
            });
        }
    }

    render() {
        return (
            <div className= "container" style={{padding:80}}>
                <h1 style = {{color:"white"}}>Welcome to the Lender Info Data Portal</h1>
                <div style={{width:"50%", padding:50, margin: "0 auto", backgroundColor: "white", transform: "translateY(40%)", borderRadius:10}}>
                    <form onSubmit = {this.onLogIn}>
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
}

import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route } from "react-router-dom";
import AddLoanType from './components/add_loantype.component'

import LenderInfoData from './components/lender_info_queries.component'
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayData from "./components/lender_display_data.component"
import valcap from './images/valiant_capital.jpeg'


function App() {
  return (
    <div className="App" style= {{backgroundColor: 'lightblue', padding:50}}>
      {/* <img src = {valcap} alt = "ValCap"/> */}
      <Router>
        <Route exact path = "/"  component={LenderInfoData} />
        <Route path = "/data/:loanTypes/:lender/:region" component = {DisplayData} />
        <Route path = "/addLoanType" component = {AddLoanType} />
     </Router>
    </div>
  );
}

export default App;

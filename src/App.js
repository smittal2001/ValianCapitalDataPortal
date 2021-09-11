import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route } from "react-router-dom";

import LenderInfoData from './components/lender_info_queries.component'
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayData from "./components/lender_display_data.component"


function App() {
  return (
    <div className="App">

      <Router>
        <Route exact path = "/"  component={LenderInfoData} />
        <Route path = "/data/:loanTypes" component = {DisplayData} />
     </Router>
    </div>
  );
}

export default App;

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import {BrowserRouter as Router, Route } from "react-router-dom";
import {Helmet} from 'react-helmet';

import AddLenderData from "./components/add_lender_data.component.js"
import LenderInfoData from './components/lender_info_queries.component'


function App() {
  return (
    <div className="App" >
      <Helmet>
                <style>{'body { background-color: #98c541; }'}</style>
        </Helmet>
      <Router>
        <Route exact path = "/"  component={LenderInfoData} />
        <Route path = "/addLenderData" component = {AddLenderData} />
     </Router>
    </div>
  );
}

export default App;

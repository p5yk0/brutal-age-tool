import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import "@material/react-material-icon/dist/material-icon.css";
import "@material/react-checkbox/dist/checkbox.css";

import "@fortawesome/fontawesome-free/css/brands.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";


import Login from "Routes/_Login/";
import Register from "Routes/_Register/";
import Home from "Routes/Home/";
import Partners from "Routes/Partners";


function App() {
   return (
      <Router>
         <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/home" component={Home} />
            <Route path="/partners" component={Partners} />
            <Route component={Login} />
         </Switch>
      </Router>
   );
}

export default App;

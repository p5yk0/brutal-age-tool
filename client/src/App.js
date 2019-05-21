import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import "@material/react-material-icon/dist/material-icon.css";
import "@material/react-checkbox/dist/checkbox.css";

import "@fortawesome/fontawesome-free/css/brands.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";


import Home from "./Routes/Home/";
import Login from "./Routes/_Login/";
import Partners from "./Routes/Partners";


function App() {
   return (
      <Router>
         <Route exact path="/" component={Login} />
         <Route exact path="/home" component={Home} />
         <Route path="/partners" component={Partners} />
      </Router>
   );
}

export default App;

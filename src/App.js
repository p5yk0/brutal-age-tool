import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import "@material/react-material-icon/dist/material-icon.css";

import HeaderNavbar from "./Components/Navbar";
import Home from "./Routes/Home.js";
import Partners from "./Routes/Partners.js";

function App() {
   return (
      <Router>
         <HeaderNavbar />

         <Route exact path="/" component={Home} />
         <Route path="/partners" component={Partners} />
      </Router>
   );
}

export default App;

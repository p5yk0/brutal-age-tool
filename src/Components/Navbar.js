import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/logo.jpg";

function HeaderNavbar() {
   return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
         <Navbar.Brand as={Link} to="/partners">
            <img src={logo} alt="logo" style={{height:'50px', borderRadius:'15px', marginRight:'15px'}} /> Brutal Age Tools
         </Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
            <Nav defaultActiveKey="home" className="ml-auto font-weight-bold">
               <Nav.Link as={Link} to="/" eventKey="admin">
                  Admin
               </Nav.Link>
               <Nav.Link as={Link} to="/" eventKey="home">
                  Home
               </Nav.Link>
               <Nav.Link as={Link} to="/partners" eventKey="partners">
                  Partners
               </Nav.Link>
            </Nav>
         </Navbar.Collapse>
      </Navbar>
   );
}

export default HeaderNavbar;
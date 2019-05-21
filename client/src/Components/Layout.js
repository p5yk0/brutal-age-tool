import React from "react";

import './Layout.css';

import HeaderNavbar from "../Components/Navbar";


function Layout(props) {

   return (
      <div className={ 'layout-inner ' + props.className  }>
         <HeaderNavbar />

         <div className="container">
            {props.children}
         </div>
      </div>
   );
}

export default Layout;
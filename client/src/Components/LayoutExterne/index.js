import React from "react";

import './styles.css';


function Layout(props) {

   return (
      <div className={ 'layout-outer ' + props.className  }>
         <div className="container">
            <div className="d-flex justify-content-center h-100">

               <div className="card">
                  {props.children}
               </div>

            </div>
         </div>
      </div>
   );
}

export default Layout;
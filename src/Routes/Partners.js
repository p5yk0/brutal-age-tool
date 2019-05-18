import React from "react";
import { Route, Link } from "react-router-dom";
import PartnerInfos from "./PartnerInfos.js";

function Partners({ match }) {
   return (
      <div>
         <h2>Partners</h2>
         <ul>
            <li>
               <Link to={`${match.url}/rendering`}>Rendering with React</Link>
            </li>
            <li>
               <Link to={`${match.url}/components`}>Components</Link>
            </li>
         </ul>

         <Route path={`${match.path}/:topicId`} component={PartnerInfos} />
         <Route exact path={match.path} render={defaultPartner} />
      </div>
   );
}

function defaultPartner() {
   return <h3>Please select a topic.</h3>;
}

export default Partners;

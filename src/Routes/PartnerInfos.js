import React from "react";

function PartnerInfos({ match }) {
   return (
      <div>
         <h3>{match.params.topicId}</h3>
      </div>
   );
}

export default PartnerInfos;

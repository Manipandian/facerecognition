import React from 'react';
import './Rank.css';

const Rank = ({user}) => {
    return(
     <div>
         <div className="white f3">
            { user.name} , Your current rank is
         </div>
         <div className="white f1">
            {user.entries}
         </div>
     </div>
    )
}

export default Rank;
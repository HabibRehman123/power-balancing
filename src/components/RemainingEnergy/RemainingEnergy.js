import React from 'react';

const RemainingEnergy = ({totalpowerused, allowedenergy, endTime, startTime}) => {
    return(
        <div>
            <p className = 'f3 pa1'> {`Your Remaining Energy is ${allowedenergy - ((totalpowerused*((endTime-startTime)/3600000)).toFixed(2))} WH `}</p>
        </div>
    )
}

export default RemainingEnergy;
import React from 'react';

const CurrentPower = ({powerlimit, name, onGetPower, totalpowerused, startTime, endTime}) => {
    return(
        <div className= "center">
            <article className="db br3 ba b--black-10 mv4 w-100 w-50-m w-33-l shadow-5 grow center">
                <p className = 'f3 pa1'> {`${name}, your balanced power limit is`}</p>
                <p className = 'f1 '>{`${powerlimit}W`}</p>
            </article>
            <article onClick= {onGetPower} className="db br3 ba b--black-10 mv4 w-100 w-50-m w-33-l shadow-5 grow center">
                <p className = 'f3 pa1'>{`${name}, your current energy usage is`}</p>
                <p className = 'f1 '>{`${(totalpowerused*((endTime-startTime)/3600000)).toFixed(2)} WH`}</p>
            </article>
        </div>
    )
}

export default CurrentPower;
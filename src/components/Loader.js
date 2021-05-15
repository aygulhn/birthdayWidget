import React from 'react';

const Loader = () => {

    return (
        <div className="loader">
            <img src={require('../assets/images/Loader.gif').default} alt="loader"></img>
        </div>
    )
}

export default Loader
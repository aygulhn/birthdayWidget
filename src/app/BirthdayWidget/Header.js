import React from 'react'

export const  Header = (props) => {

    return (
        <header>
            <img className="gift-img" src={require('../../assets/images/gift.png').default} alt="gift"/>
        </header>
    )

}

export default Header
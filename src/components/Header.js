import React from "react";
import '../styles/header.css';
import '../styles/container.css';

const Header = (props) => {
    return (
        <div  className="header" >
                <div className="header_container">
                    <img className="header_img" src={require('../styles/ragacs.svg')} alt="something"/>
                    <div style={{flexBasis: '30%'}}>
                        <h1 className="header__title">{props.title}</h1>
                        {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
                    </div>
                </div>
        </div>
    );
};

Header.defaultProps = {
    title: 'Darling'
};

export default Header;
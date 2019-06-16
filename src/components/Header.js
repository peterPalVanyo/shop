import React from "react";
import '../styles/header.css';
import '../styles/container.css';
import {Link} from 'react-router-dom';

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
            <div style={ {overflow: 'auto'} }>
                <Link style={ linkStyle } to="/actual">  Actual  </Link>
                <div style={ linkStyle }>|</div>
                <Link style={ linkStyle } to="/" >Welcome  </Link>
            </div>
        </div>
    );
};

Header.defaultProps = {
    title: 'Darling'
};

const linkStyle = {
    color: '#F2F0CC',
    textDecoration: 'none',
    marginLeft: 10,
    marginRight: 10,
    float: 'right'
};

export default Header;
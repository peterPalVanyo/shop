import React from "react";
import StandardOptions from "./StandardOptions";
import LogedinOptions from "./LogedinOptions";
import '../../styles/header.css';
import '../../styles/container.css';

const Header = (props) => {
    const options = props.user ? <LogedinOptions /> : <StandardOptions showModal={props.showModal} />;

    return (
        <div  className="header" >
                <div className="header_container">
                    <img className="header_img" src={require('../../styles/ragacs.svg')} alt="something"/>
                        <div style={{flexBasis: '30%'}}>
                            <h1 className="header__title">{props.title}</h1>
                            {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
                        </div>
                </div>
            <React.Fragment>
                {options}
            </React.Fragment>
        </div>
    );
};

Header.defaultProps = {
    title: 'Darling',
};

const linkStyle = {
    color: '#F2F0CC',
    textDecoration: 'none',
    marginLeft: 10,
    marginRight: 10,
    float: 'right'
};

export default Header;
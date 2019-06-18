import React from "react";
import '../../styles/header.css';
import '../../styles/container.css';
import {Link} from 'react-router-dom';


const StandardOptions = (props) => {
    function showLoginModal() {
        props.showModal("login");
    }
    function showRegisterModal() {
        props.showModal("register")
    }
    return (
        <div style={ {overflow: 'auto'} }>
            <Link style={ linkStyle } onClick={showLoginModal}>  Login  </Link>
            <div style={ linkStyle }>|</div>
            <Link style={ linkStyle } onClick={showRegisterModal}>  Register  </Link>
        </div>
    );
};

const linkStyle = {
    color: '#F2F0CC',
    textDecoration: 'none',
    marginLeft: 10,
    marginRight: 10,
    float: 'right'
};

export default StandardOptions;
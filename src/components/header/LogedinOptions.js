import React from "react";
import '../../styles/header.css';
import '../../styles/container.css';
import {Link} from 'react-router-dom';

const LogedinOptions = (props) => {
    return (
        <div style={ {overflow: 'auto'} }>
            <Link style={ linkStyle } to="/shops">  Shops  </Link>
            <div style={ linkStyle }>|</div>
            <Link style={ linkStyle } to="/actual">  Actual  </Link>
            <div style={ linkStyle }>|</div>
            <Link style={ linkStyle } to="/" >Welcome  </Link>
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

export default LogedinOptions;
import React from "react";
import '../../styles/header.css';
import '../../styles/container.css';
import Selector from "../selector/Selector";
import {Link} from 'react-router-dom';

const LogedinOptions = (props) => {
    return (
        <div style={ {overflow: 'auto'} }>
            <Link style={ linkStyle } onClick={props.logout}>  Logout  </Link>
            <div style={ linkStyle }>|</div>
            <Link style={ linkStyle } to="/shops">  Shops  </Link>
            <div style={ linkStyle }>|</div>
            <Link style={ linkStyle } to="/actual">  Actual  </Link>
            <div style={ linkStyle }>|</div>
            <Link style={ linkStyle } to="/" >Welcome  </Link>
            <Selector style={ linkStyle } optionList={props.selectorOptions} changeHandler={props.selectorChangeHandler}/>
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
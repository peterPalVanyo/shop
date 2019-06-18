import React from "react";
import '../../styles/button.css';
import '../../styles/option.css';


const Shop = (props) => {
    return (
        <div className="option">
            <p className="option__text">{props.count}. {props.optionText}</p>
            <button
                className="button button--link"
                onClick={(e) => {
                    props.handleDeleteOption(props.optionObject);
                }}
            >
                remove
            </button>
        </div>
    );
};
export default Shop;
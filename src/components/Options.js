import Option from "./Option";
import React from "react";
import '../styles/widget.css';


const Options = (props) => {
    return (
        <div>
            <div className="widget-header">
                <h3 className="widget-header__title">Your shop items:</h3>
                <button
                    className="button button--link"
                    style={{color: '#F2F0CC'}}
                    onClick={props.handleDeleteOptions}
                >Remove All
                </button>
            </div>
            {props.options.length === 0 && <p className="widget__message">Please add an some shoppin' to get started!</p>}
            {
                props.options.map((option, index) => (
                    <Option
                        key={option}
                        optionText={option}
                        count={index+1}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
        </div>
    );
};

export default Options;
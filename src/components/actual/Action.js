import React from "react";
import '../../styles/button.css';

const Action = (props) => {
    return (
        <div>
            <button
                className="big-button"
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                What should I buy?
            </button>
        </div>
    );
};

export default Action;
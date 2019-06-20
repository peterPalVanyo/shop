import React from "react";
import '../../styles/widget.css';


const NoShoppingList = (props) => {
    function onCreate(e) {
        e.preventDefault();
        const loginCredentials = {
            memberId: props.user.id,
        };
        props.creationHandler(loginCredentials)
    }
    return (
        <div className="container">
            <div className="widget">
                <h2>
                    You have not created any shopping lists yet
                </h2>
                <button type="button" onClick={onCreate}>
                    Create new shopping list
                </button>
            </div>
        </div>
    );
};

export default NoShoppingList;
import React from "react";
import '../../styles/widget.css';
import LineItem from "./LineItem";
import AddLineItem from "./AddLineItem";
import Action from "./Action";


const ShoppingList = (props) => {
    return (
        <div className="container">
            <div className="widget">
                <LineItem
                    options={props.options}
                    handleDeleteOptions={props.handleDeleteOptions}
                    handleDeleteOption={props.handleDeleteOption}
                />
                <AddLineItem
                    handleAddOption={props.handleAddOption}
                />
            </div>
            <Action
                hasOptions={props.hasOptions}
                handlePick={props.handlePick}
            />
        </div>
    );
};

export default ShoppingList;
import React from "react";
import '../../styles/widget.css';
import LineItem from "./LineItem";
import AddLineItem from "./AddLineItem";
import Action from "./Action";


const ShoppingList = (props) => {
    const lineItems = [];
    if(props.lineItems) {
        for (const lineItem of props.lineItems) {
            lineItems.push(<LineItem
                lineItem={lineItem}
                handleDeleteOptions={props.handleDeleteOptions}
                handleDeleteOption={props.handleDeleteOption}
            />)
        }
    }
    return (
        <div className="container">
            <div className="widget">
                <div className="widget-header">
                    <h3 className="widget-header__title">The group {props.groupName}'s latest list :</h3>
                    <button
                        className="button button--link"
                        style={{color: '#F2F0CC'}}
                        onClick={props.handleDeleteOptions}>
                        Remove All
                    </button>
                </div>
                {lineItems}
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
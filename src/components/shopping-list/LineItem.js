import Product from "./Product";
import React from "react";
import '../../styles/widget.css';


const LineItem = (props) => {
    return (
        <div>
            <Product
                key={props.lineItem.product.name}
                optionText={props.lineItem.product.name}
                optionObject={props.lineItem}
                count={props.lineItem.index+1}
                handleDeleteOption={props.handleDeleteOption}
            />
        </div>
    );
};

export default LineItem;
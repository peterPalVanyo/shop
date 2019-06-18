import Shop from "./Shop";
import React from "react";
import '../../styles/widget.css';


const Shops = (props) => {
    return (
        <div>
            <div className="widget-header">
                <h3 className="widget-header__title">Your shops:</h3>
                <button
                    className="button button--link"
                    style={{color: '#F2F0CC'}}
                    onClick={props.handleDeleteOptions}
                >Remove All
                </button>
            </div>
            {props.shops.length === 0 && <p className="widget__message">Please add some shop to get started!</p>}
            {
                props.shops.map((shop, index) => (
                    <Shop
                        key={shop.name}
                        optionText={shop.name}
                        optionObject={shop}
                        count={index+1}
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
        </div>
    );
};

export default Shops;
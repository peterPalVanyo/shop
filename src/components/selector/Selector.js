import React from "react";
import '../../styles/header.css';
import '../../styles/container.css';

const Selector = (props) => {
    const options = [];
    for(const option of props.optionList) {
        options.push(
            <option value={option.id}>
                {option.name}
            </option>
        )
    }
    function handleChange(e) {
        e.preventDefault();
        props.changeHandler({selectedGroupId: parseInt(document.querySelector("#selector").value)})
    }
    return (
        <select id="selector" onChange={handleChange}>
            {options}
        </select>
    );
};

export default Selector;
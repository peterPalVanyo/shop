import React from "react";
import '../../styles/button.css';
import '../../styles/add-option.css';


class AddShop extends React.Component {
    state = {
        error: undefined
    };
    handleAddOption = (e) => {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));

        if (!error) {
            e.target.elements.option.value = '';
        }
    };
    render() {
        return (
            <div>
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="text" name="option" placeholder="please shops here..." />
                    <button className="button">Add Shop</button>
                </form>
            </div>
        );
    }
}

export default AddShop;
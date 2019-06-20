import React from 'react';
import '../../styles/modal.css';

const LoginForm = (props) => {
    function handleOnSubmit(e) {
        e.preventDefault();
        const loginCredentials = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value
        };
        props.handleLogin(loginCredentials);
    }
    return (
        <form className="modal_form_reg" onSubmit={handleOnSubmit}>
            <input className="modal_input" name="username" placeholder="username" type="text"/>
            <input className="modal_input" name="password" placeholder="password" type="password"/>
            <button className="modal_button" type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
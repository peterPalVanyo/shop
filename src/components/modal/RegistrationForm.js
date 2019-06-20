import React from 'react';
import '../../styles/modal.css';

const RegistrationForm = (props) => {
    function confirmPassword(password, confirmation) {
        return password === confirmation
    }
    function handleOnSubmit(e) {
        e.preventDefault();
        if(!confirmPassword(e.target.elements.password.value, e.target.elements.passwordConfirm.value)) {
            props.errorMessageSender("Confirmation does not match password");
            return;
        }
        const registrationCredentials = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
            email: e.target.elements.email.value,
            groupKey: e.target.elements.groupId.value
        };
        props.handleRegistration(registrationCredentials);
    }
    return (
        <form className="modal_form_reg" onSubmit={handleOnSubmit}>
            <input className="modal_input_reg" name="groupId" placeholder="group ID" type="text"/>
            <input className="modal_input_reg" name="email" placeholder="email" type="text"/>
            <input className="modal_input_reg" name="username" placeholder="username" type="text"/>
            <input className="modal_input_reg" name="password" placeholder="password" type="password"/>
            <input className="modal_input_reg" style={{marginRight: 0}} name="passwordConfirm" placeholder="confrimation" type="password"/>
            <button  className="modal_button" style={{marginLeft: '1.2rem'}} type="submit">Registration</button>
        </form>
    );
};

export default RegistrationForm;
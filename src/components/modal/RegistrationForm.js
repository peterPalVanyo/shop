import React from 'react';

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
        <form onSubmit={handleOnSubmit}>
            <input name="groupId" placeholder="group ID" type="text"/>
            <input name="email" placeholder="email" type="text"/>
            <input name="username" placeholder="username" type="text"/>
            <input name="password" placeholder="password" type="password"/>
            <input name="passwordConfirm" placeholder="confrimation" type="password"/>
            <button type="submit">Registration</button>
        </form>
    );
};

export default RegistrationForm;
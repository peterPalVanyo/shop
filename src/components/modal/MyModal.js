import React from 'react';
import Modal from "react-bootstrap/Modal";
import LoginForm from './LoginForm';
import '../../styles/modal.css';
import RegistrationForm from "./RegistrationForm";

const MyModal = (props) => {
    const inputForm = props.type === "login" ? <LoginForm handleLogin={props.handleLogin}/> : <RegistrationForm errorMessageSender={props.errorMessageSender} handleRegistration={props.handleRegistration}/>;

    return (
        <Modal show={props.showModal} onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {props.errorMessage}
                </p>
                <React.Fragment>
                    {inputForm}
                </React.Fragment>
            </Modal.Body>
        </Modal>
    );
};

export default MyModal;
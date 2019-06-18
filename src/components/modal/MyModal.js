import React from 'react';
import Modal from "react-bootstrap/Modal";
import LoginForm from './LoginForm';
import '../../styles/modal.css';

const MyModal = (props) => {
    return (
        <Modal show={props.showModal} onHide={props.hideModal}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <React.Fragment>
                    <LoginForm handleLogin={props.handleLogin}/>
                </React.Fragment>
            </Modal.Body>
        </Modal>
    );
};

export default MyModal;
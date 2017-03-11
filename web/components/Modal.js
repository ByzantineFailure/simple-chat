import React from 'react';

const Modal = (props) =>
    <div className="modal" hidden={!props.display}>
        <div className="modal-content">
            { props.children }
        </div>
    </div>
;

Modal.PropTypes = {
    display: React.PropTypes.bool.isRequired
}

export default Modal;


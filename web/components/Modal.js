import modalCss from '../styles/modal.css';

import React from 'react';

const Modal = (props) =>
    <div className={ props.additionalClasses ? `${props.additionalClasses} modal` : 'modal' } hidden={!props.display}>
        <div className="modal-content">
            { props.children }
        </div>
    </div>
;

Modal.PropTypes = {
    display: React.PropTypes.bool.isRequired,
    additionalClasses: React.PropTypes.string
}

export default Modal;


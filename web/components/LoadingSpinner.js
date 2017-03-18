import spinnerCss from '../styles/spinner.css';

import React from 'react';
import Modal from './Modal';

const LoadingSpinner = ({ display }) => (
    <Modal display={ display } additionalClasses="loadingModal"> 
        <div>Loading...</div>
        <div className="loader"></div>  
    </Modal>
);

export default LoadingSpinner;


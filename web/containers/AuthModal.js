import React from 'react';
import { connect } from 'react-redux';
import AuthInput from './AuthInput.js';
import Modal from '../components/Modal';

const AuthModal = ({ isAuthenticated }) => 
    <div>
        <Modal display={ !isAuthenticated }>
            <div className="modal-header">
                Please enter your username
            </div>
            <AuthInput />
        </Modal>
    </div>
;

AuthModal.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({ });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthModal);


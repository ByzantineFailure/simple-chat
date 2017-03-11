import React from 'react';

/**
 * Form-based input component.  submitCallback should return a promise.
 **/
class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            value: props.value ? props.value : '',
            submitting: false,
            error: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.submitCallback = props.submitCallback;
        this.clearValueOnError = props.clearValueOnError;
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.submitCallback(this.state.value)
            .then(result => {
                this.setState(Object.assign({}, this.state, { 
                    error: false,
                    submitting: false ,
                    value: ''
                }));
            })
            .catch(error => {
                this.setState(Object.assign({}, this.state, {
                    error: true,
                    submitting: false,
                    value: this.clearValueOnError ? '' : this.state.value
                }));
            });
    }

    render() { 
        return (
            <div className={this.props.className} hidden={!this.props.display}>
                <form onSubmit={this.onSubmit}>
                    <input type="text" className="text-input" value={this.state.value} onChange={this.onChange}></input>
                    <button className="send-button" onClick={this.onSubmit}>Send!</button>
                </form>
            </div>
        );
    }
}

Input.propTypes = {
    submitCallback: React.PropTypes.func.isRequired,
    display: React.PropTypes.bool.isRequired,
    value: React.PropTypes.string,
    className: React.PropTypes.string,
    clearValueOnError: React.PropTypes.bool.isRequired
};

Input.defaultProps = {
    clearValueOnError: true,
    display: true,
    className: 'input-bar'
}

export default Input;


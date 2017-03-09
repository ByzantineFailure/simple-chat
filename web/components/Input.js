import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.submitCallback = props.submitCallback;
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.submitCallback(this.state.value); 
        this.setState({ value: ''});
    }

    render() { 
        return (
            <div className="input-bar">
                <form onSubmit={this.onSubmit}>
                    <input type="text" className="text-input" value={this.state.value} onChange={this.onChange}></input>
                    <button className="send-button" onClick={this.onSubmit}>Send!</button>
                </form>
            </div>
        );
    }
}

Input.propTypes = {
    submitCallback: React.PropTypes.func.isRequired
};

export default Input;


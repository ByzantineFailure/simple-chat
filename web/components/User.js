import React, { PropTypes } from 'react';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.className = "user" + (props.additionalClasses ? " " + props.additionalClasses : "");
    }
    render() {
        return (
            <div className={ this.className }>
                <span>{ this.props.username } ({ this.props.id.slice(-5) })</span>
            </div>
        );
    }
}

User.propTypes = {
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    additionalClasses: PropTypes.string
};

export default User;


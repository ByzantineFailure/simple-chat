import { connect } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';

const mapStateToProps = (state) => ({
    display: state.appLoading
});

const mapDispatchToProps = (dispatch) => ({

});

const ConnectedLoadingSpinner = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadingSpinner);

export default ConnectedLoadingSpinner;


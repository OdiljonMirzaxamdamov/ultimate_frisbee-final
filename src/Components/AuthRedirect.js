import React from 'react';
import { connect } from 'react-redux';
import { ADMIN, SCOREKEEPER } from '../constants';
import { goTo } from '../AC';

class AuthRedirect extends React.Component {
  render() {
    const { user, goTo } = this.props;

    if (!user || !user.role || (user.role !== SCOREKEEPER && user.role !== ADMIN)) {
      goTo('/network');
      return (<></>);
    }

    return (
      <>
        {this.props.children}
      </>
    );
  }
}

AuthRedirect.propTypes = {};

const mapStateToProps = (state) => ({
  user: state.user.userData,
});

const mapDispatchToProps = (dispatch) => ({
  goTo: (path) => dispatch(goTo(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);

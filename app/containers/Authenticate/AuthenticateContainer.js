import React, { Component, PropTypes } from 'react'
import { Authenticate } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as usersActionCreators from 'redux/modules/users'

class AuthenticateContainer extends Component {
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired
  }
  handleAuth = (e) => {
    e.preventDefault()
    this.props.fetchAndHandleAuthedUser ()
    .then(() => this.context.router.replace('feed'))
  }
  render () {
    return (
      <Authenticate 
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth}
      />
    )
  }
}

AuthenticateContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

function mapStateToProps ({users}) {
  return {
    isFetching: users.isFetching,
    error: users.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(usersActionCreators, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (AuthenticateContainer)
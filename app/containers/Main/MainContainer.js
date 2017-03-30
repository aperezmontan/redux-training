import React, { Component, PropTypes } from 'react'
import { NavigationContainer } from 'containers'
import { container, innerContainer } from './styles.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

class MainContainer extends Component {
  propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired
  }
  contextTypes: {
    router: PropTypes.object.isRequired
  }
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, userData.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        if (this.props.location.pathname === '/') {
          this.context.router.replace('feed')
        }
      } else {
        this.props.removeFetchingUser()
      }
    })
  }
  render () {
    return (
      this.props.isFetching
      ? null
      : <div className={container}>
          <NavigationContainer />
          <div className={innerContainer}>
            {this.props.children}
          </div>
        </div>
    )
  }
}

export default connect (
  ({users}) => ({isAuthed: users.isAuthed, isFetching: users.isFetching}), 
  (dispatch) => (bindActionCreators(userActionCreators, dispatch))
)(MainContainer)

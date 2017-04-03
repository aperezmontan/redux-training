import React, { Component, PropTypes } from 'react'
import { NavigationContainer } from 'containers'
import { container, innerContainer } from './styles.css'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

class MainContainer extends Component {
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, userData.uid)
        this.props.authUser(userInfo.uid)
        this.props.fetchingUserSuccess(userInfo.uid, userInfo, Date.now())
        this.props.setUsersLikes()
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

MainContainer.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  authUser: PropTypes.func.isRequired,
  fetchingUserSuccess: PropTypes.func.isRequired,
  setUsersLikes: PropTypes.func.isRequired,
  removeFetchingUser: PropTypes.func.isRequired
}
MainContainer.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect (
  ({users}) => ({isAuthed: users.isAuthed, isFetching: users.isFetching}), 
  (dispatch) => (bindActionCreators({...userActionCreators, ...usersLikesActionCreators}, dispatch))
)(MainContainer)

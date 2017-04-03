import React, { Component, PropTypes } from 'react'
import { Duck } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as usersLikesActionCreators from 'redux/modules/usersLikes'

class DuckContainer extends Component {
  goToProfile = (e) => {
    e.stopPropagation()
    this.context.router.push('/' + this.props.duck.uid)
  }
  handleClick = (e) => {
    e.stopPropagation()
    this.context.router.push('/duckDetail/' + this.props.duck.duckId)
  }
  render () {
    return (
      <Duck
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        {...this.props}
      />
    )
  }
}

const { object, number, bool, func } = PropTypes

DuckContainer.propTypes = {
  duck: object.isRequired,
  numberOfLikes: number,
  isLiked: bool.isRequired,
  handleDeleteLike: func.isRequired,
  addAndHandleLike: func.isRequired,
  hideLikeCount: bool.isRequired,
  hideReplyBtn: bool.isRequired
}

DuckContainer.contextTypes = {
  router: object.isRequired
}
DuckContainer.defaultProps = {
  hideReplyBtn: false,
  hideLikeCount: true
}

function mapStateToProps ({ducks, likeCount, usersLikes}, props) {
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId]
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(usersLikesActionCreators, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (DuckContainer)
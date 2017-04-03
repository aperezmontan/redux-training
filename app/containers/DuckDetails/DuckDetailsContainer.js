import React, { Component, PropTypes } from 'react'
import { DuckDetails } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as ducksActionCreators from 'redux/modules/ducks'
import * as repliesActionCreators from 'redux/modules/replies'

class DuckDetailsContainer extends Component {
  componentDidMount () {
    this.props.fetchAndHandleLikeCount(this.props.duckId)
    if (!this.props.duckAlreadyFetched) {
      this.props.fetchAndHandleDuck(this.props.duckId)
    } else {
      this.props.removeFetching()
    }
  }
  render () {
    return (
      <DuckDetails 
        authedUser={this.props.authedUser}
        duckId={this.props.duckId}
        error={this.props.error}
        isFetching={this.props.isFetching}
        addAndHandleReply={(duckId, reply) => this.props.addAndHandleReply(duckId, reply)}
      />
    )
  }
}

DuckDetailsContainer.propTypes = {
  duckId: PropTypes.string.isRequired,
  authedUser: PropTypes.object.isRequired, 
  isFetching: PropTypes.bool.isRequired, 
  error: PropTypes.string.isRequired,
  duckAlreadyFetched: PropTypes.bool.isRequired,
  removeFetching: PropTypes.func.isRequired,
  fetchAndHandleDuck: PropTypes.func.isRequired,
  fetchAndHandleLikeCount: PropTypes.func.isRequired,
  addAndHandleReply: PropTypes.func.isRequired
}

function mapStateToProps ({ducks, likeCount, users}, props) {
  return {
    isFetching: ducks.isFetching || likeCount.isFetching,
    error: ducks.error,
    authedUser: users[users.authedId].info,
    duckId: props.routeParams.duckId,
    duckAlreadyFetched: !!ducks[props.routeParams.duckId]
  }
}

function mapActionsToProps (dispatch) {
  return bindActionCreators ({ ...likeCountActionCreators, ...ducksActionCreators, ...repliesActionCreators}, dispatch)
}

export default connect (mapStateToProps, mapActionsToProps) (DuckDetailsContainer)
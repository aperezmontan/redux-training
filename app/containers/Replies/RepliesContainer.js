import React, { Component, PropTypes } from 'react'
import { Replies } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as repliesActionCreators from 'redux/modules/replies'

class RepliesContainer extends Component {
  componentDidMount () {
    this.props.fetchAndHandleMultipleReplies(this.props.duckId)
  }
  render () {
    return (
      <Replies 
        isFetching={this.props.isFetching}
        error={this.props.error}
        lastUpdated={this.props.lastUpdated}
        replies={this.props.replies}
      />
    )
  }
}

RepliesContainer.PropTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  lastUpdated: PropTypes.number.isRequired,
  replies: PropTypes.object.isRequired,
  duckId: PropTypes.string.isRequired,
  fetchingRepliesSuccess: PropTypes.func.isRequired
}

RepliesContainer.defaultProps = {
  lastUpdated: 0,
  replies: {}
}

function mapStateToProps (state, props) {
  const duckRepliesInfo = state.replies[props.duckId] || {}
  const { lastUpdated, replies } = duckRepliesInfo
  return {
    isFetching: state.replies.isFetching,
    error: state.replies.error,
    lastUpdated,
    replies
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(repliesActionCreators, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (RepliesContainer)
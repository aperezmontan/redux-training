import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { Feed } from 'components'
import { connect } from 'react-redux'
import * as feedActionCreators from 'redux/modules/feed'

class FeedContainer extends Component {
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }
  render () {
    return (
      <Feed {...this.props} />
    )
  }
}

FeedContainer.propTypes = {
  newDucksAvailable: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
  duckIds: PropTypes.array.isRequired
}

function mapStateToProps ({feed}) {
  const { isFetching, error, newDucksAvailable, duckIds } = feed
  return {
    duckIds,
    isFetching, 
    error, 
    newDucksAvailable
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (FeedContainer)
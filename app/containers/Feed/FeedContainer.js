import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { Feed } from 'components'
import { connect } from 'react-redux'
import * as feedActionCreators from 'redux/modules/feed'

class FeedContainer extends Component {
  propTypes: {
    newDucksAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    newDucksAvailable: PropTypes.bool.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    resetNewDucksAvailable: PropTypes.func.isRequired
  }
  componentDidMount () {
    this.props.setAndHandleFeedListener()
  }
  render () {
    return (
      <Feed {...this.props} />
    )
  }
}

function mapStateToProps ({feed}) {
  const { isFetching, error, newDucksAvailable } = feed

  return {
    isFetching, 
    error, 
    newDucksAvailable
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(feedActionCreators, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (FeedContainer)
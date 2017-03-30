import React, { Component, PropTypes } from 'react'
import { Navigation } from 'components'
import { connect } from 'react-redux'

class NavigationContainer extends Component {
  propTypes: {

  }
  render () {
    return (
      <Navigation isAuthed={this.props.isAuthed} />
    )
  }
}

function mapStateToProps ({users}) {
  return {
    isAuthed: users.isAuthed
  }
}

export default connect (mapStateToProps) (NavigationContainer)
import React, { Component } from 'react'
import { Navigation } from 'components'
import { connect } from 'react-redux'

class NavigationContainer extends Component {
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
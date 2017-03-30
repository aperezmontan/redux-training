import { Modal } from 'components'
import { bindActionCreators } from 'redux'
import * as modalActionCreators from 'redux/modules/modal'
import * as ducksActionCreators from 'redux/modules/ducks'
import { connect } from 'react-redux'

function mapStateToProps ({users, modal}) {
  const duckTextLength = modal.duckText.length

  return {
    isOpen: modal.isOpen,
    isSubmitDisabled: duckTextLength <= 0 || duckTextLength > 140,
    duckText: modal.duckText,
    user: users[users.authedId] ? users[users.authedId].info : {}
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ ...modalActionCreators, ...ducksActionCreators}, dispatch)
}

export default connect (mapStateToProps, mapDispatchToProps) (Modal)
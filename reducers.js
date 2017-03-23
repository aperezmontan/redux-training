const initialUsersState = {
  isAuthed: false,
  isFetching: false,
  error: '',
  authedId: ''
}
const initialUserState = {
  lastUpdated: 0
  info: {
    name: '',
    uid: '',
    avatar: ''
  }
}

// USERS

function user (state = initialUserState, action) {
  switch (action.type) {
    case 'FETCHING_USER_SUCCESS':
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp
      }
    default:
      return state
  }
}

function users (state = initialUsersState, action) {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        isAuthed: true,
        authId: action.uid
      }
    case 'UNAUTH_USER':
      return {
        ...state,
        isAuthed: false,
        authId: ''
      }
    case 'FETCHING_USER':
      return {
        ...state,
        isFetching: true
      }
    case 'FETCHING_USER_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case 'FETCHING_USER_SUCCESS':
      return action.user === null
      ? {
        ...state,
        error: '',
        isFetching: false
      }
      : {
        ...state,
        error: '',
        isFetching: false,
        [action.uid]: user (state[action.uid], action)
      }
    default:
      return state
  }
}
// ACTIONS

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'

// REDUCERS

const initialUserState = {
  lastUpdated: 0
  info: {
    name: '',
    uid: '',
    avatar: ''
  }
}

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

const initialUsersState = {
  isAuthed: false,
  isFetching: false,
  error: '',
  authedId: ''
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

// ACTION CREATORS

export function authUser (uid) {
  type: 'AUTH_USER',
  uid
}

export function unauthUser () {
  type: 'UNAUTH_USER'
}

export function fetchingUser () {
  type: 'FETCHING_USER'
}

export function fetchingUserFailure () {
  type: 'FETCHING_USER_FAILURE',
  error: 'Error fetching user'
}

export function fetchingUserSuccess (uid, user) {
  type: 'FETCHING_USER_SUCCESS',
  uid,
  user,
  lastUpdated: Date.now()
}
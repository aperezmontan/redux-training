import { fetchUsersLikes, saveToUsersLikes, deleteFromUsersLikes, incrementNumberOfLikes, decrementNumberOfLikes } from 'helpers/api'

// ACTIONS

export const LIKED = 'LIKED'
export const DISLIKED = 'DISLIKED'
const FETCHING_LIKES = 'FETCHING_LIKES'
const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR'
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS'

// REDUCERS

const initialUserLikes = {
  isFetching: false,
  error: ''
}

export default function userLikes (state = initialUserLikes, action) {
  switch(action.type) {
    case LIKED:
      return {
        ...state,
        [action.duckId]: true,
      }
    case DISLIKED:
      return {
        ...state,
        [action.duckId]: false,
      }
    case FETCHING_LIKES:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_LIKES_SUCCESS:
      return {
        ...state,
        ...action.duckIds,
        isFetching: false,
        error: ''
      }
    case FETCHING_LIKES_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default: return state
  }
}

// ACTION CREATORS

export function liked (duckId) {
  return {
    type: LIKED,
    duckId
  }
}

export function disliked (duckId) {
  return {
    type: DISLIKED,
    duckId
  }
}

export function fetchingLikes () {
  return {
    type: FETCHING_LIKES
  }
}

export function fetchingLikesError (error) {
  return {
    type: FETCHING_LIKES_ERROR,
    error: 'Error fetching likes'
  }
}

export function fetchingLikesSuccess (duckIds) {
  return {
    type: FETCHING_LIKES_SUCCESS,
    duckIds
  }
}

// THUNKS

export function setUsersLikes () {
  return function (dispatch, getState) {
    const uid = getState().users.authedId

    dispatch(fetchingLikes())
    fetchUsersLikes(uid)
    .then((duckIds) => dispatch(fetchingLikesSuccess(duckIds)))
    .catch((err) => dispatch(fetchingLikesError(err)))
  }
}

export function addAndHandleLike (duckId, e) {
  e.stopPropagation()

  return function (dispatch, getState){
    dispatch(liked(duckId))
    const uid = getState().users.authedId
    Promise.all(
      [saveToUsersLikes(uid, duckId),
      incrementNumberOfLikes(duckId)]
    ).catch((err) => {
      console.warn(err)
      dispatch(disliked(duckId))
    })
  }
}

export function handleDeleteLike (duckId, e) {
  e.stopPropagation()

  return function (dispatch, getState){
    dispatch(disliked(duckId))
    const uid = getState().users.authedId
    Promise.all([
      deleteFromUsersLikes(uid, duckId),
      decrementNumberOfLikes(duckId)
    ]).catch((err) => {
      console.warn(err)
      dispatch(liked(duckId))
    })
  }
}

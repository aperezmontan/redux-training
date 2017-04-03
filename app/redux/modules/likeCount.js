import { fetchLikeCount } from 'helpers/api'

// ACTIONS
import { LIKED, DISLIKED } from './usersLikes'
const FETCHING_COUNT = 'FETCHING_COUNT'
const FETCHING_COUNT_ERROR = 'FETCHING_COUNT_ERROR'
const FETCHING_COUNT_SUCCESS = 'FETCHING_COUNT_SUCCESS'

const initialLikeCount = {
  isFetching: false,
  error: ''
}

export default function likeCount (state = initialLikeCount, action) {
  switch(action.type) {
    case LIKED:
    case DISLIKED:
      return typeof state[action.duckId] === 'undefined'
        ? state 
        : {
          ...state,
          [action.duckId]: count (state[action.duckId], action)
        }
    case FETCHING_COUNT:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_COUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        [action.duckId]: action.likeCount
      }
    case FETCHING_COUNT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    default:
      return state
  }
}

export function fetchAndHandleLikeCount (duckId) {
  return function (dispatch) {
    dispatch(fetchingCount())

    fetchLikeCount(duckId)
      .then((count) => dispatch(fetchingCountSuccess(duckId, count)))
      .catch((error) => dispatch(fetchingCountError(error)))
  }
}

function count (state = 0, action) {
  switch(action.type) {
    case LIKED: 
      return state + 1
    case DISLIKED:
      return state - 1
    default:
      return state
  }
}

function liked (duckId) {
  return {
    type: LIKED,
    duckId
  }
}
function disliked (duckId) {
  return {
    type: DISLIKED,
    duckId
  }
}
function fetchingCount () {
  return {
    type: FETCHING_COUNT
  }
}
function fetchingCountSuccess (duckId, likeCount) {
  return {
    type: FETCHING_COUNT_SUCCESS,
    likeCount,
    duckId
  }
}
function fetchingCountError (error) {
  return {
    type: FETCHING_COUNT_ERROR,
    error: 'Error fetching like count'
  }
}


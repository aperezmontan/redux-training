import { addFeedListener } from 'redux/modules/listeners'
import { addMultipleDucks } from 'redux/modules/ducks'
import { listenToFeed } from 'helpers/api'

// ACTIONS

const SETTING_FEED_LISTENER = 'SETTING_FEED_LISTENER'
const SETTING_FEED_LISTENER_ERROR = 'SETTING_FEED_LISTENER_ERROR'
const SETTING_FEED_LISTENER_SUCCESS = 'SETTING_FEED_LISTENER_SUCCESS'
const ADD_NEW_DUCK_ID_TO_FEED = 'ADD_NEW_DUCK_ID_TO_FEED'
const RESET_NEW_DUCKS_AVAILABLE = 'RESET_NEW_DUCKS_AVAILABLE'

// REDUCERS

const initialFeedState = {
  isFetching: false,
  error: '',
  newDucksAvailable: false,
  newDucksToAdd: [],
  duckIds: []
}

export default function feed (state = initialFeedState, action) {
  switch (action.type) {
    case SETTING_FEED_LISTENER: {
      return {
        ...state,
        isFetching: true
      }
    }
    case SETTING_FEED_LISTENER_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    }
    case SETTING_FEED_LISTENER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        duckIds: action.duckIds,
        newDucksAvailable: false,
        error: ''
      }
    }
    case ADD_NEW_DUCK_ID_TO_FEED: {
      return {
        ...state,
        newDucksToAdd: [action.duckId, ...state.newDucksToAdd],
        newDucksAvailable: true
      }
    }
    case RESET_NEW_DUCKS_AVAILABLE: {
      return {
        ...state,
        duckIds: [...state.newDucksToAdd, ...state.duckIds],
        newDucksAvailable: false
      }
    }
    default:
      return state
  }
}

// ACTION CREATORS

export function setAndHandleFeedListener () {
  let initialFetch = true

  return function (dispatch, getState) {
    if (getState().listeners.feed) {
      return 
    }

    dispatch(addFeedListener('feed'))
    dispatch(settingFeedListener())

    listenToFeed(({feed, sortedIds}) => {
      dispatch(addMultipleDucks(feed))
      initialFetch
        ? dispatch(settingFeedListenerSuccess(sortedIds))
        : dispatch(addNewDuckIdToFeed(sortedIds[0]))
      initialFetch = false
    }, (error) => dispatch(settingFeedListenerError(error)))
  }
}

function settingFeedListener () {
  return {
    type: 'SETTING_FEED_LISTENER'
  }
}

function settingFeedListenerError (error) {
  console.warn(error)
  return {
    type: 'SETTING_FEED_LISTENER_ERROR',
    error: 'Error setting feed listener'
  }
}

function settingFeedListenerSuccess (duckIds) {
  return {
    type: 'SETTING_FEED_LISTENER_SUCCESS',
    duckIds
  }
}

function addNewDuckIdToFeed (duckId) {
  return {
    type: 'ADD_NEW_DUCK_ID_TO_FEED',
    duckId
  }
}

export function resetNewDucksAvailable () {
  return {
    type: 'RESET_NEW_DUCKS_AVAILABLE'
  }
}

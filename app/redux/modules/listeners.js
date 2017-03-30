// ACTIONs
const ADD_FEED_LISTENER = 'ADD_FEED_LISTENER'

// REDUCERS
export default function listeners (state = {}, action) {
  switch(action.type) {
    case ADD_FEED_LISTENER: 
      return {
        ...state,
        [action.listenerId]: true
      }
    default:
      return state
  }
}

// ACTION CREATORS

export function addFeedListener (listenerId) {
  return {
    type: 'ADD_FEED_LISTENER',
    listenerId
  }
}
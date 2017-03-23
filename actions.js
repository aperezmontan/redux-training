// USERS
{
  type: 'AUTH_USER',
  uid
}

{
  type: 'UNAUTH_USER'
}

{
  type: 'FETCHING_USER'
}

{
  type: 'FETCHING_USER_FAILURE',
  error: 'Error fetching user'
}

{
  type: 'FETCHING_USER_SUCCESS',
  uid,
  user,
  lastUpdated: Date.now()
}

// DUCKS
{
  type: 'FETCHING_DUCKS'
}

{
  type: 'FETCHING_DUCKS_FAILURE',
  error: 'There was an error fetching ducks'
}

{
  type: 'FETCHING_DUCKS_SUCCESS',
  ducks,
  timestamp


{
  type: 'ADD_DUCK',
  duck,
  lastUpdated: Date.now()
}

{
  type: 'REMOVE_DUCK',
  duck
}

{
  type: 'ADD_MULTIPLE_DUCKS',
  ducks
}

// FEED
{
  type: SETTING_FEED_LISTENER
}

{
  type: SETTING_FEED_LISTENER_ERROR,
  error: "There was an error setting the feed listener"
}

{
  type: SETTING_FEED_LISTENER_SUCCESS,
  duckIds
}

{
  type: 'ADD_DUCKS_TO_FEED',
  ducks
}

{
  type: 'RESET_NEW_DUCKS_AVAILABLE',
}

// LISTENERS
{
  type: 'ADD_FEED_LISTENER',
  listenerId
}

// MODAL
{
  type: 'MODAL_OPEN'
}

{
  type: 'CLOSE_MODAL'
}

{
  type: 'UPDATE_DUCK_TEXT',
  newDuckText
}

// REPLIES
{
  type: 'FETCHING_REPLIES'
}

{
  type: 'FETCHING_REPLIES_FAILURE',
  error: 'There was an error fetching replies'
}

{
  type: 'FETCHING_REPLIES_SUCCESS',
  replies,
  duckId,
  lastUpdated: Date.now()
}

{
  type: 'ADD_REPLY',
  duckId,
  reply
}

{
  type: 'ADD_REPLY_ERROR',
  error: 'There was an error adding the reply'
}

{
  type: 'REMOVE_REPLY',
  duckId,
  reply
}

//LIKECOUNT
{
  type: 'FETCHING_COUNT'
}

{
  type: 'FETCHING_COUNT_FAILURE',
  error: 'There was an error fetching the count'
}

{
  type: 'FETCHING_COUNT_SUCCESS',
  uid,
  likeCount
}

//USERSDUCKS
{
  type: 'FETCHING_USERS_DUCKS'
}

{
  type: 'FETCHING_USERS_DUCKS_FAILURE',
  error: 'There was an error fetching users ducks'
}

{
  type: 'FETCHING_USERS_DUCKS_SUCCESS',
  uid,
  duckIds,
  lastUpdated
}

{
  type: 'ADD_SINGLE_USERS_DUCK',
  uid,
  duckIds,
  lastUpdated
}

//USERSLIKES
{
  type: 'FETCHING_USERS_LIKES'
}

{
  type: 'FETCHING_USERS_LIKES_FAILURE',
  error: 'There was an error fetching users likes'
}

{
  type: 'FETCHING_USERS_LIKES_SUCCESS',
  uid,
  likes
}

{
  type: 'ADD_LIKE',
  duckId
}

{
  type: 'REMOVE_LIKE',
  duckId
}
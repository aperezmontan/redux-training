{
  users: {
    isAuthed,
    isFetching,
    error,
    authedId
    [uid]: {
      lastUpdated, // caching
      info: {
        name,
        uid,
        avatar
      }
    }
  },
  ducks: {
    isFetching,
    error,
    [duckId]: {
      lastUpdated, 
      info: {
        avatar,
        duckId,
        name,
        text,
        timestamp,
        uid
      }
    }
  },
  usersDucks: {
    isFetching,
    error,
    [uid]: {
      lastUpdated,
      duckIds: [duckIds...]
    }
  },
  likeCount: {
    [duckId]: 0
  },
  userLikes: {
    [duckId]: true // if the duckId is included in this array, the duck has been liked by this user
  },
  replies: {
    isFetching,
    error,
    [duckId]: {
      lastUpdated,
      replies: {
        [replyId]: {        
          name,
          comment,
          uid,
          timestamp,
          avatar   
        }
      }
    }
  },
  modal: {
    duck,
    isOpen
  },
  listeners: {
    [listernersid]: true
  },
  feed: {
    isFetching,
    error,
    newDucksAvailable,
    duckIdsToAdd: [duckIds...],
    duckIds: [duckIds...]
  }
}
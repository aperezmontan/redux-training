import { saveDuck } from 'helpers/api'
import { closeModal } from './modal'
import { addSingleUsersDuck } from './usersDucks'

// ACTIONS

const FETCHING_DUCK = 'FETCHING_DUCK'
const FETCHING_DUCK_SUCCESS = 'FETCHING_DUCK_SUCCESS'
const FETCHING_DUCK_ERROR = 'FETCHING_DUCK_ERROR'
const ADD_DUCK = 'ADD_DUCK'
const ADD_MULTIPLE_DUCKS = 'ADD_MULTIPLE_DUCKS'
const REMOVE_FETCHING = 'REMOVE_FETCHING'

// REDUCERS

const initialDucksState = {
  isFetching: false,
  error: ''
}

export default function ducks (state = initialDucksState, action) {
  switch (action.type) {
    case 'FETCHING_DUCK':
      return {
        ...state,
        isFetching: true
      }
    case 'FETCHING_DUCK_SUCCESS':
    case 'ADD_DUCK':
      return {
        ...state,
        [action.duck.duckId]: action.duck,
        isFetching: false,
        error: ''
      }
    case 'FETCHING_DUCK_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case 'ADD_MULTIPLE_DUCKS':
      return {
        ...state,
        ...action.ducks,
        error: ''
      }
    case 'REMOVE_FETCHING':
      return {
        ...state,
        isFetching: false,
        error: ''
      } 
    default:
      return state
  }
}

// ACTION CREATORS

function fetchingDuck () {
  return {
    type: 'FETCHING_DUCK'
  }
}

function fetchingDuckSuccess (duck) {
  return {
    type: 'FETCHING_DUCK_SUCCESS',
    duck
  }
}

function fetchingDuckError (error) {
  return {
    type: 'FETCHING_DUCK_ERROR',
    error: 'Error fetching duck'
  }
}

function addDuck (duck) {
  return {
    type: 'ADD_DUCK',
    duck
  }
}

export function addMultipleDucks (ducks) {
  return {
    type: 'ADD_MULTIPLE_DUCKS',
    ducks
  }
}

function removeFetching () {
  return {
    type: 'REMOVE_FETCHING'
  }
}

export function duckFanout (duck) {
  return function (dispatch, getState) {
    console.log('Current state', getState())
    const uid = getState().users.authedId

    saveDuck(duck)
    .then((duckWithId) => {
      dispatch(addDuck(duck))
      dispatch(closeModal())
      dispatch(addSingleUsersDuck(uid, ))
    })
    .catch((err) => {
      console.log('Error in duck fanout', err)
    })
  }
}






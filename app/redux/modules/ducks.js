import { saveDuck, fetchDuck } from 'helpers/api'
import { closeModal } from './modal'
import { addSingleUsersDuck } from './usersDucks'
import { Map, fromJS } from 'immutable'

// ACTIONS

const FETCHING_DUCK = 'FETCHING_DUCK'
const FETCHING_DUCK_SUCCESS = 'FETCHING_DUCK_SUCCESS'
const FETCHING_DUCK_ERROR = 'FETCHING_DUCK_ERROR'
const ADD_DUCK = 'ADD_DUCK'
const ADD_MULTIPLE_DUCKS = 'ADD_MULTIPLE_DUCKS'
const REMOVE_FETCHING = 'REMOVE_FETCHING'

// REDUCERS

const initialDucksState = Map({
  isFetching: true,
  error: ''
})

export default function ducks (state = initialDucksState, action) {
  switch (action.type) {
    case 'FETCHING_DUCK':
      return state.merge({
        isFetching: true
      })
    case 'FETCHING_DUCK_SUCCESS':
    case 'ADD_DUCK':
      return state.merge({
        [action.duck.duckId]: action.duck,
        isFetching: false,
        error: ''
      })
    case 'FETCHING_DUCK_ERROR':
      return state.merge({
        isFetching: false,
        error: action.error
      })
    case 'ADD_MULTIPLE_DUCKS':
      return state.merge({
        ...action.ducks,
        error: ''
      })
    case 'REMOVE_FETCHING':
      return state.merge({
        isFetching: false,
        error: ''
      }) 
    default:
      return state
  }
}

export function fetchAndHandleDuck(duckId) {
  return function (dispatch) {
    dispatch(fetchingDuck())

    fetchDuck(duckId)
      .then((duck) => dispatch(fetchingDuckSuccess(duck)))
      .catch((error) => dispatch(fetchingDuckError(error)))
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

export function removeFetching () {
  return {
    type: 'REMOVE_FETCHING'
  }
}

export function duckFanout (duck) {
  return function (dispatch, getState) {
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






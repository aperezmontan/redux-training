// ACTIONS
const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const UPDATE_DUCK_TEXT = 'UPDATE_DUCK_TEXT'

// INITIAL STATE
const initialModalState = {
  duckText: '',
  isOpen: false
}

// REDUCER
export default function modal (state = initialModalState, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isOpen: true
      } 
    case 'CLOSE_MODAL':
      return {
        ...state,
        duckText: '',
        isOpen: false
      } 
    case 'UPDATE_DUCK_TEXT':
      return {
        ...state,
        duckText: action.newduckText
      }
    default:
      return state
  }
}

// ACTION CREATORS
export function openModal (){
  return {
    type: 'OPEN_MODAL'
  }
}

export function closeModal (){
  return {
    type: 'CLOSE_MODAL'
  }
}

export function updateDuckText (newduckText){
  return {
    type: 'UPDATE_DUCK_TEXT',
    newduckText
  }
}
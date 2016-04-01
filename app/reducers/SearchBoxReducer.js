
const initialState = {
  inputField: '',
  placeHolder: 'Ask Dream Bot Anything'
}


// TODO: Insert a payload somewhere to display query results
export default function searchBox(state = initialState, action){
  switch (action.type) {
    case 'FILTER_MESSAGES':
      return Object.assign({}, state, { inputField: action.username });
    default:
      return state
  }
}

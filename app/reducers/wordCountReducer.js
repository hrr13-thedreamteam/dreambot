
export default function wordCountReducer(state = {}, action){
  switch (action.type) {
    case 'RECEIVE_WORD_COUNT':
    return Object.assign({}, state, action.words);
    default:
    return state;
  }
}



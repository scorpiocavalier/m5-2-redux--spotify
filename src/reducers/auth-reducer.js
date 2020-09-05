const initialState = {
  token: null,
  status: 'idle'
}

export default ( state = initialState, action ) => {
  const { type, token } = action
  switch ( type ) {
    case 'REQUEST_ACCESS_TOKEN':
      return { ...state, status: 'loading' }
    case 'RECEIVE_ACCESS_TOKEN':
      return { ...state, status: 'idle', token }
    case 'RECEIVE_ACCESS_TOKEN_ERROR':
      return { ...state, status: 'error' }
    default:
      return state
  }
}

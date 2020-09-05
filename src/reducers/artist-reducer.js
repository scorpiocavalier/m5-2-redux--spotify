const initialState = {
  currentArtist: null,
  status: 'idle'
}

export default ( state = initialState, action ) => {
  const { type, currentArtist } = action
  switch ( type ) {
    case 'REQUEST_ARTIST_PROFILE':
      return { ...state, status: 'loading' }
    case 'RECEIVE_ARTIST_PROFILE':
      return { ...state, status: 'idle', currentArtist }
    case 'RECEIVE_ARTIST_PROFILE_ERROR':
      return { ...state, status: 'error' }
    default:
      return state
  }
}

import { combineReducers } from 'redux'

import auth from './auth-reducer.js'
import artist from './artist-reducer'

export default combineReducers( { auth, artist } )
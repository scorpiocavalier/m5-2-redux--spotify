import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { GlobalStyles } from '../../GlobalStyles'
import ArtistRoute from '../ArtistRoute/index'
import { requestAccessToken, receiveAccessToken, receiveAccessTokenError } from '../../actions'

const DEFAULT_ARTIST_ID = '07YZf4WDAMNwqr4jfgOZ8y'

const App = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(requestAccessToken())

    fetch( '/spotify_access_token' )
      .then( res => res.json() )
      .then( data => dispatch(receiveAccessToken(data.access_token)) )
      .catch( err => {
        console.error( err )
        dispatch(receiveAccessTokenError())
      } )
  }, [] )

  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path='/'>
          <Redirect to={ `/artists/${ DEFAULT_ARTIST_ID }` } />
        </Route>
        <Route path='/artists/:id'>
          <ArtistRoute />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
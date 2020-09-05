import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { GlobalStyles } from '../../GlobalStyles'
import { ArtistRoute } from '../ArtistRoute'

const DEFAULT_ARTIST_ID = '07YZf4WDAMNwqr4jfgOZ8y'

const App = () => {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route exact path='/'>
          <Redirect path={ `/artists/${ DEFAULT_ARTIST_ID }` } />
        </Route>
        <Route path='/artists/:id'>
          <ArtistRoute />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
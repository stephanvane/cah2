import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import GamesIndex from '../../ui/games_index.js'
import GamesTable from '../../ui/games_table.js'
import GamesClient from '../../ui/games_client.js'
import App from '../../ui/app.js'

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/games' component={GamesIndex} />
      <Route path='/games/:id/table' component={GamesTable} />
      <Route path='/games/:id/client' component={GamesClient} />
    </Route>
  </Router>
)

export default renderRoutes

import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import GamesIndex from '../../ui/pages/games/index.js'
import GamesTable from '../../ui/pages/games/table.js'
import GamesClient from '../../ui/pages/games/client.js'
import GamesCzar from '../../ui/components/czar.js'
import App from '../../ui/layouts/app.js'

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/games' component={GamesIndex} />
      <Route path='/games/:id/table' component={GamesTable} />
      <Route path='/games/:id/client' component={GamesClient} />
      <Route path='/games/:id/czar' component={GamesCzar} />
    </Route>
  </Router>
)

export default renderRoutes

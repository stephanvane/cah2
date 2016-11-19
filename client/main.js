import { render } from 'react-dom'

import renderRoutes from '../imports/startup/client/routes.js'

import '../imports/startup/client'

render(renderRoutes(), document.getElementById('root'))

import React, { Component } from 'react'
import { render } from 'react-dom'

import { renderRoutes } from '../imports/startup/client/routes.js'
import GamesIndex from '../imports/ui/games_index.js'

// export class Foo extends Component {
//   render() {
//     return (
//       <div className='container'>
//         abc
//         {this.props.children}
//       </div>
//     )
//   }
// }

// render(<Foo />, document.getElementById('root'))
render(renderRoutes(), document.getElementById('root'))

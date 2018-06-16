import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import IllegalElectromechanicalWell from './container/IllegalElectromechanicalWell'
import App from './components/App'
import Config from './config'


const Index = () => (
  <Router basename={`/${Config.projectName}`}>
    <div style={{ height: "100%" }}>
      {/* 预留菜单栏 */}
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/app'>app</Link></li>
            <li><Link to='/schedule'>Schedule</Link></li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route exact path="/" component={IllegalElectromechanicalWellComp} />
        <Route path="/app" component={App} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
)


const IllegalElectromechanicalWellComp = ({ match }) => {
  return (
    <IllegalElectromechanicalWell />
  )
}
const NoMatch = ({ match }) => {
  return (
    <h2 style={{ textAlign: 'center' }}>4000000000000000000000.............4...........<br />请选择正确的路由。。。</h2>
  )
}

export default Index
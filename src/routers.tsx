import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import IllegalElectromechanicalWell from './container/IllegalElectromechanicalWell'
import DynamicImport from './components/DynamicImport'

const Index = () => (
  <Router basename="/">
    <div style={{ height: "100%" }}>
      {/* 预留菜单栏 */}
      <div>
        <NavLink
          to="/"
          activeStyle={{ color: 'green', fontWeight: 'bold' }}
        >home</NavLink>
        <NavLink
          to="/app"
          activeStyle={{ color: 'red', fontWeight: 'bold' }}
        >app</NavLink>
        <NavLink
          to="/test"
          activeStyle={{ color: 'blue', fontWeight: 'bold' }}
        >no match</NavLink>
      </div>
      <Switch>
        <Route exact path="/" component={IllegalElectromechanicalWellComp} />
        {/* <Route render={()=>{}}>ttt</Route> */}
        <Route path="/app" component={AppComponent} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
)

const AppComponent = (props) => (
  <DynamicImport load={() => import('./container/App/AppSrc')}>
    {(Component: any) => Component === null
      ? <p>Loading</p>
      : <Component {...props} />}
  </DynamicImport>
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
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
// import 'antd/dist/antd.css'
import DynamicImport from './components/DynamicImport'
import Loading from './components/Loading'
import NoMatch from './components/NoMatch'
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
// 路由： App
const AppComponent = (props) => (
  <DynamicImport load={() => import('./container/App/index')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)
// 路由： 非法机电井
const IllegalElectromechanicalWellComp = (props) => (
  <DynamicImport load={() => import('./container/IllegalElectromechanicalWell')}>
    {(Component: any) => Component === null
      ? <Loading />
      : <Component {...props} />}
  </DynamicImport>
)


export default Index
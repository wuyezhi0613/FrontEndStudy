import * as React from 'react'
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import IllegalElectromechanicalWell from './container/IllegalElectromechanicalWell'
// import LoadableApp from './container/App'
import Loadable from 'react-loadable'
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
        <Route path="/app" component={MyComponent /* the same as <LoadableBar/>*/} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
)

/**
 * TODO： react-loadable 代码分割
 */
function loading () {
  return <div>Loading...</div>
}
const LoadableBar = Loadable({
  loader: () => import('./container/App/AppSrc'),
  loading
})

class MyComponent extends React.Component {
  render() {
    return <LoadableBar/>
  }
}

// const Test = ({}) => {
//   return(
//     <LoadableApp />
//   )
// }

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
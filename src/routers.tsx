import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import MaptalksCom from './components/mapComponents/MaptalksCom'

import * as Config from './config'

const Index = () => (
  <Router basename="/">
    {/* <div style={{ height: "100%" }}> */}
    {/* 预留菜单栏 */}
    <Switch>
      <Route exact path="/" component={Maptalks} />
      {/* <Route path="/cesium" component={Cesium} /> */}
      <Route component={NoMatch} />
    </Switch>
    {/* </div> */}
  </Router>
)

function getMap(map) {
  console.log(map)
  Config.default.maptalksMap = map
}

const Maptalks = ({ match }) => {
  return (
    <MaptalksCom isArcGISLayer mapStyle={{ height: "100%", width: '100%' }} onCreate={getMap} />
  )
}
const NoMatch = ({ match }) => {
  return (
    <h2 style={{textAlign: 'center'}}>4000000000000000000000.............4...........<br />请选择正确的路由。。。</h2>
  )
}

export default Index
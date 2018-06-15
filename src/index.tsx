import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import App from './components/App/index'
import Index from './routers'
import './index.scss'
import 'antd/dist/antd.css'

ReactDOM.render(
  <Index />,
  document.getElementById('root') as HTMLElement
)

declare var module:any
if(module.hot){
  module.hot.accept()
}

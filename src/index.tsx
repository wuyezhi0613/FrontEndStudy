import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App/index'
import './index.scss'
import 'antd/dist/antd.css'

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
)

declare var module:any
if(module.hot){
  module.hot.accept()
}

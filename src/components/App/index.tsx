import * as React from 'react'
import { Button } from 'antd'
import './App.scss'
// import logo from './logo.svg'

import Summit from '../Summit'
import Web from '../Web'

interface IState {
  SummitMessage?: string
  WebMessage?: string
}
export interface IProps {
  empty?: any
}

class App extends React.Component<IProps, IState> {

  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      SummitMessage: '',
      WebMessage:''
    }
    this.receiveFromSummit = this.receiveFromSummit.bind(this)
    this.receiveFromWeb = this.receiveFromWeb.bind(this)
  }
  public say() {
    alert('test')
  }
  public receiveFromSummit(content: any) {
    this.setState({
      WebMessage: content
    }, ()=> {
      console.log(`父容器收到信息，内容为：${this.state.WebMessage}`)
    })
  }
  receiveFromWeb(content: any) {
    this.setState({
      SummitMessage: content
    })
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={require('./logo.svg')} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcomes to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button onClick={this.say}> antd test</Button>
        <Summit message={this.state.SummitMessage} onSay={this.receiveFromSummit}/>
        <h3>分割线哈</h3>
        <Web message = {this.state.WebMessage} onSendMessage={this.receiveFromWeb}/>
      </div>
    )
  }
}

export default App

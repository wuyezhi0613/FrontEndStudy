import * as React from 'react'
import { Button } from 'antd'
import './App.scss'
// import logo from './logo.svg'
import MaptalksCom from '../../components/mapComponents/MaptalksCom'
import Summit from '../../components/Summit'
import Web from '../../components/Web'
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import fontawesome from "@fortawesome/fontawesome"
import { faUser } from "@fortawesome/fontawesome-free-solid"
fontawesome.library.add(faUser)
import AjaxTest from '../../components/Ajax'
interface IState {
  SummitMessage?: string
  WebMessage?: string
}
export interface IProps {
  empty?: any
}

class AppSrc extends React.Component<IProps, IState> {

  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      SummitMessage: '',
      WebMessage: ''
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
    }, () => {
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
          <img src={require('./image/logo.svg')} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcomes to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button onClick={this.say}> antd test</Button>
        <Summit message={this.state.SummitMessage} onSay={this.receiveFromSummit}/>
        <h3>分割线哈</h3>
        <AjaxTest />
        <FontAwesomeIcon icon={faUser} size='2x' style={{color: 'green'}}/>
        <Web message = {this.state.WebMessage} onSendMessage={this.receiveFromWeb}/>
        <MaptalksCom mapStyle={{height: '500px'}} />
      </div>
    )
  }
}

export default AppSrc

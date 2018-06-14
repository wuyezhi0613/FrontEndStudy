import * as React from 'react'
import { Button } from 'antd'

interface  IState {
  content?: string
}

export interface IProps {
  onSay: (content?:string) => void
}

export default class Summit extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      content: ''
    }
    this.getValue = this.getValue.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }
  // c#中方法默认私有，ts中方法默认公共
  getValue(evt:any) {
    if (evt.target.value) {
      this.setState({
        content: evt.target.value
      }, ()=> {
        console.log(this.state.content)
      })
    }
  }
  private sendMessage () {
    this.props.onSay(this.state.content)
  }
  public render() {
    return (
      <div>
        <input type="text" onChange= {this.getValue}/>
        <Button onClick={this.sendMessage}>发送</Button>
      </div>
    )
  }
  
  
  
}
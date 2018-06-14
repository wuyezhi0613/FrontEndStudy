import * as React from 'react'
import {Button} from 'antd'

enum Type { // 枚举类型
  SEND,
  RECEIVE
}
interface IMessage {
  type: Type, // 消息类型
  message: string // 消息内容
}
interface IState {
  messageList?: IMessage[], // 消息列表
  content?: string
}

interface IProps {
  onSendMessage?:(message: string) => void
}

export default class Web extends React.Component<IProps, IState> {
  constructor(props: IProps, state: IState) {
    super(props)
    this.state = {
      messageList: []
    }
    this.getValue = this.getValue.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
  }
  getValue(evt:any) {
    if (evt.target.value) {
      this.setState({
        content: evt.target.value
      }, ()=> {
        console.log(this.state.content)
      })
    }
  }
  private sendMessage (message: any) {
    if (this.state.content) {
      if (this.props.onSendMessage) {
        this.props.onSendMessage(this.state.content)
      }
    }
  }

  render() {
    return (
      <div>
        {
          this.state.messageList && this.state.messageList.length >0 &&this.state.messageList.map(item => {
            if ( item.type === Type.SEND) {
              return <div>{item.message}</div>
            }else {
              return <div>From {item.message}</div>
            }
          })
        }

        <div>
        <input type="text" onChange= {this.getValue}/>
        <Button onClick={this.sendMessage}>发送</Button>
      </div>
      </div>
    )
  }
}
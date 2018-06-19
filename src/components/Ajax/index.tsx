import * as React from 'react'
import Axios from 'axios'


interface IProps {
  test?: any
}

interface IState {
  userInfo?: any
}

export default class AjaxTest extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      userInfo: {
        name: 'anonymous'
      }
    }
  }
  componentDidMount() {
    Axios.get('/api/0.4/?randomapi').then(res => {
      if (res && res.status === 200) {
        const length = res.data.results.length
        this.setState({
          userInfo: res.data.results[length - 1].user
        })
      }
    })
  }


  render() {
    let userName = ''
    const userInfoName = this.state.userInfo.name
    if (userInfoName.first || userInfoName.last) {
      userName = `${userInfoName.first} ${userInfoName.last}` 
    } else {
      userName = userInfoName
    }
    return (
      <div>
        {userName ? `hello: ${userName}` : false}
      </div>
    )
  }
}
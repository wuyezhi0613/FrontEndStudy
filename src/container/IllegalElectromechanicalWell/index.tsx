import * as React from 'react'
import MaptalksCom from '../../components/mapComponents/MaptalksCom'
import './index.scss'
interface IState {
  test?: any
}

interface IProps {
  test?: any
}

export default class IllegalElectromechanicalWell extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.getMap = this.getMap.bind(this)
  }


  getMap(map) {
    console.log(map)
  }
  render() {
    return (
      <div className='maptalksContainer'>
        <MaptalksCom isArcGISLayer mapStyle={{ height: "100%", width: '100%' }} onCreate={this.getMap} >test</MaptalksCom>
      </div>
    )
  }
}
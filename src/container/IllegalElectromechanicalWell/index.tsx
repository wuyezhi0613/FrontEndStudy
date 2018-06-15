import * as React from 'react'
import MaptalksCom from '../../components/mapComponents/MaptalksCom'
import './index.scss'
import CSVReader from 'react-csv-reader'
import * as maptalks from 'maptalks'
// import logo from'./image/logo.svg'
interface IState {
  maptalksMap?: any // maptalks 地图
  hasData?: boolean // 是否已经有csv上传
}

interface IProps {
  test?: any
}

export default class IllegalElectromechanicalWell extends React.Component<IProps, IState> {
  uiMarkerList: any[] = []  // uiMarker管理器
  constructor(props: IProps) {
    super(props)
    this.state = {
      hasData: false
    }
    this.getMap = this.getMap.bind(this)
    this.handleLoadedFile = this.handleLoadedFile.bind(this)
  }

  addIllegalElectromechanicalWellToMap(dataList: string[][]) {
    const self = this
    dataList.map(item => {
      const longitude = parseFloat(item[9])
      const latitude = parseFloat(item[10])
      if (longitude && latitude) {
        const dom = document.createElement('div')
        dom.innerHTML = `<img  src=${require('./image/jidianjin.gif')}/>`
        const tempMarker = new maptalks.ui.UIMarker([longitude, latitude], {
          draggable: false,
          content: dom
        }).addTo(self.state.maptalksMap)
        self.uiMarkerList.push(tempMarker)
      }
    })
  }
  /**
   * 处理从csv中获取到的数据
   *
   * @param {Object[]} data csv中读取到的数据
   * @memberof IllegalElectromechanicalWell
   */
  handleLoadedFile(dataList) {
    if(this.state.hasData) {
      this.uiMarkerList.map(item=> {
        item.remove()
      })
      this.uiMarkerList.splice(0, this.uiMarkerList.length)
    }
    if (dataList && dataList.length > 0) {
      this.setState({
        hasData: true
      },()=>{
        this.addIllegalElectromechanicalWellToMap(dataList)
      })      
    }
  }
  /**
   * 获取创建的地图
   *
   * @param {*} map 返回的地图对象
   * @memberof IllegalElectromechanicalWell
   */
  getMap(map) {
    this.setState({
      maptalksMap: map
    })
  }
  render() {
    return (
      <div className='maptalksContainer'>
        <MaptalksCom isArcGISLayer mapStyle={{ height: "100%", width: '100%' }} onCreate={this.getMap} />
        <CSVReader
          cssClass="react-csv-input"
          label="选择您的非法机电井csv数据   "
          onFileLoaded={this.handleLoadedFile}
        />
      </div>
    )
  }
}
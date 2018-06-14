import * as React from 'react'
import * as maptalks from 'maptalks'
import 'maptalks/dist/maptalks.css'

interface IState {
  mapOptions?: object // maptalks的初始化配置信息
  mapStyle?: CSSStyleDeclaration
}
interface IProps {
  mapOptions?: object // maptalks的初始化配置信息
  mapStyle?: React.CSSProperties
}

export default class MaptalksCom extends React.Component<IProps, IState> {
  map = null
  mapContainer: HTMLDivElement| null
  
  constructor(props: IProps, state: IState) {
    super(props)
    // 地图默认配置
    const mapDefaultOptions: any = {
      center: [-0.113049,51.498568],
      zoom: 14,
      baseLayer: new maptalks.TileLayer('base', {
        urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        subdomains: ['a','b','c','d'],
        attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      })
    }
    // 地图默认样式
    const mapDefaultStyle: any = {
      height: "500px", width: '100%'
    }
    this.state = {
      mapOptions: Object.assign({}, ...mapDefaultOptions, this.props.mapOptions),
      mapStyle: Object.assign({}, ...mapDefaultStyle, this.props.mapStyle)
    }

  }
  componentDidMount() {
    this.map = new maptalks.Map(this.mapContainer, this.state.mapOptions)
  }
  refs: {
    [key: string]: any
  }
  render() {
    const style = this.state.mapStyle? this.state.mapStyle: {}
    return <div >
      <div ref={node => this.mapContainer = node} style={style}/>
    </div>
  }
}
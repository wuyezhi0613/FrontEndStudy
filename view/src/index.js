let ws, viewer

getViewer().then(viewer => {
  return viewer
}, err => {
  if (err) {
    console.errpr(err)
    return null
  }
}).then(viewer => {
  connectWS()
})

/**
 * 连接Websocket
 */
function connectWS () {
  return new Promise((resolve, reject) => {
    if ('WebSocket' in window) {
      ws = new WebSocket('ws://localhost:8181')
      ws.onopen = function (e) {
        console.log('websocket has connected')
      }
      ws.onmessage = function (res) {
        let modalData = JSON.parse(res.data)
        AddModals(modalData)
      }
      ws.onclose = function (e) {
        console.log('websocket has disconnected')
      }
      resolve(ws)
    } else {
      window.alert('你的浏览器不支持WebSocket, 请更新浏览器。')
      reject(new window.Errow('un supported browser....'))
    }
  })
}
/**
 * 创建三维视图
 */
function getViewer () {
  return new Promise((resolve, reject) => {
    viewer = new Cesium.Viewer('cesiumContainer', {
      animation: false,
      baseLayerPicker: false, // 地图切换控件(底图以及地形图)是否显示,默认显示true
      fullscreenButton: true, // 全屏按钮,默认显示true
      geocoder: false, // 地名查找,默认true
      timeline: false, // 时间线,默认true
      vrButton: false, // 双屏模式,默认不显示false
      homeButton: false, // 主页按钮，默认true
      infoBox: false, // 点击要素之后显示的信息,默认true
      selectionIndicator: true, // 选中元素显示,默认true
      sceneModePicker: false, // 是否显示投影方式控件
      navigationHelpButton: false, // 是否显示帮助信息控件
      terrainProvider: Cesium.createWorldTerrain({
        requestVertexNormals: true,
        requestWaterMask: true
      })
    })

    viewer.scene.globe.enableLighting = false
    viewer._cesiumWidget._creditContainer.style.display = 'none'
    resolve(viewer)
  })
}

/**
 * 添加多个模型
 * @param {Array[Array]} modals 模型集信息
 */
function AddModals (modals) {
  viewer.entities.removeAll()
  for (let index in modals) {
    AddModal(modals[index])
  }
}
/**
 * 添加单个模型
 * @param {Cesium.Ｖiewer} viewer 三维球视图
 */
function AddModal (modalInfo) {
  // modal 位置
  let position = new Cesium.Cartesian3.fromDegrees(modalInfo[2], modalInfo[1], modalInfo[4])
  let heading = Cesium.Math.toRadians(modalInfo[3])
  let pitch = Cesium.Math.toRadians(2)
  let roll = Cesium.Math.toRadians(-6)
  let hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
  let orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr)
  let entity = viewer.entities.add({
    name: 'truck',
    position: position,
    orientation: orientation,
    model: {
      uri: '../lib/Cesium-1.45/Apps/SampleData/models/CesiumGround/Cesium_Ground.gltf',
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
      minimumPixelSize: 128,
      maximumScale: 20,
      scale: 8.0
    }
  })
  viewer.trackedEntity = entity
}

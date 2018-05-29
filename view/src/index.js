
let viewer = new Cesium.Viewer('cesiumContainer',{
    animation: false,
    baseLayerPicker: false, //地图切换控件(底图以及地形图)是否显示,默认显示true
    fullscreenButton: true, //全屏按钮,默认显示true
    geocoder: false, //地名查找,默认true
    timeline: false, //时间线,默认true
    vrButton: false, //双屏模式,默认不显示false
    homeButton: false, //主页按钮，默认true
    infoBox: false, //点击要素之后显示的信息,默认true
    selectionIndicator: true, //选中元素显示,默认true
    sceneModePicker: false, //是否显示投影方式控件
    navigationHelpButton: false, //是否显示帮助信息控件
    // imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
    //     url: 'http://{s}.tianditu.com/img_c/wmts?service=WMTS&version=1.0.0&request=GetTile&tilematrix={TileMatrix}&layer=img&style={style}&tilerow={TileRow}&tilecol={TileCol}&tilematrixset={TileMatrixSet}&format=tiles',
    //     layer : 'img',
    //     style : 'default',
    //     format : 'tiles',
    //     tileMatrixSetID : 'c',
    //     credit : new Cesium.Credit('天地图全球影像服务'),
    //     subdomains : ['t0','t1','t2','t3','t4','t5','t6','t7'],
    //     maximumLevel : 15,
    //     tilingScheme : new Cesium.GeographicTilingScheme(),
    //     tileMatrixLabels:['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19']
    // }),
    terrainProvider : Cesium.createWorldTerrain({
        requestVertexNormals: true,
        requestWaterMask: true
    }),
    baseLayerPicker : false
});

viewer.scene.globe.enableLighting = false;
viewer._cesiumWidget._creditContainer.style.display="none";

// modal 位置
var position = new Cesium.Cartesian3(-1371108.6511167218, -5508684.080096612, 2901825.449865087);
var heading = Cesium.Math.toRadians(180);
var pitch = Cesium.Math.toRadians(2);
var roll = Cesium.Math.toRadians(-6);
var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

var entity = viewer.entities.add({
    name : 'truck',
    position : position,
    orientation : orientation,
    model : {
        uri: '../lib/Cesium-1.45/Apps/SampleData/models/CesiumGround/Cesium_Ground.gltf',
        heightReference : Cesium.HeightReference.CLAMP_TO_GROUND,
        minimumPixelSize : 128,
        maximumScale : 20,
        scale : 8.0
    }
});
viewer.trackedEntity = entity;


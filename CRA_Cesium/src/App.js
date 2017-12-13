import React, { Component } from 'react';
import 'cesium/Widgets/widgets.css';
import Cesium from "cesium/Cesium";

class App extends Component {
  viewer;
  cesiumContainer;
  componentDidMount() {

    this.viewer = new Cesium.Viewer(this.cesiumContainer);
  }

  render() {
    return (
      <div>
        <div id="cesiumContainer" ref={element => this.cesiumContainer = element} />
      </div>
    );
  }
}

export default App;

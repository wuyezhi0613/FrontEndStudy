//index.js
//获取应用实例


Page({
  data: {
    idChooseLocation: true, // 是否进行地址选择
    location: null // 选择好的地址信息
  },

  onLoad: function (opts) {
    // console.log(opts);
  },


  onReady: function () {
    console.log('ready');
    
  },
  onShow: function () {
    if (this.data.idChooseLocation){
      wx.chooseLocation({
        success: (res) => {
          this.setData({
            location: res,
            idChooseLocation: false
          });
        },
        fail: function (res) { },
        complete: function (res) { },
      });
    }else{

    }
    
  },
  onHide: function () {

  },
  onUnload: function () { },
})

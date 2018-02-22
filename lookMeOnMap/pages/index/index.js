//index.js
//获取应用实例


Page({
  data: {
    title: "查看位置",
    idChooseLocation: true, // 是否进行地址选择
    location: null, // 选择好的地址信息
    scale: 15
  },

  onLoad: function (opts) {
    // console.log(opts);
  },


  onReady: function () {
    console.log('ready');
    wx.setNavigationBarTitle({
      title: this.data.title,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    });

  },
  onShow: function () {
    if (this.data.idChooseLocation){
      wx.chooseLocation({
        success: (res) => {
          this.setData({
            location: res,
            idChooseLocation: false
          },()=>{

          });
        },
        fail: function (res) { },
        complete: (res) =>{ 
          this.setData({
            idChooseLocation: false
          });
        },
      });
    }else{

    }
    
  },
  onHide: function () {

  },
  onUnload: function () { },
})

//index.js
//获取应用实例


Page({
  data: {
    title: "查看位置",
    idChooseLocation: true, // 是否进行地址选择
    location: null, // 选择好的地址信息
    scale: 15,
    markers: []
  },

  onLoad: function (opts) {
    // console.log(opts);
  },


  onReady: function () {
    console.log('ready');
    // 设置导航标题
    wx.setNavigationBarTitle({
      title: this.data.title,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    });

  },
  onShow: function () {
    // 选择地址
    if (this.data.idChooseLocation){
      wx.chooseLocation({
        success: (res) => {
          this.setData({
            location: res,
            idChooseLocation: false
          },()=>{
            let info = this.data.location;
            let marker = {
              id: Math.random()*10,
              latitude: info.latitude,
              longitude: info.longitude,
              label: {
                content: info.name,
                bgColor: '#fff',
                padding: 5,
                textAlign: 'center',
                x: -35,
                y: -60
              }
            };
            this.setData({
              markers:[marker]
            });
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

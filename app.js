//app.js
//var qcloud = require('./vendor/wafer2-client-sdk/index')
//var config = require('./config')

//test
App({
  onLaunch: function () {
    //console.log('app Launching ...');
    var that = this
    // wx.getSystemInfo({
    //   success(res) {
    //     that.systemInfo = res;
    //   },
    // });
    //console.log('app setLoginUrl ...',config.config.service);

    //qcloud.setLoginUrl(config.config.service.loginUrl)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },
  systemInfo: null
})
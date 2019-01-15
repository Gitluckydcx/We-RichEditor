// example/example.js
/* 引用WeRicheditor组件 */
const WeRicheditor = require('./components/We-RichEditor/WeRicheditor').WeRicheditor;
/* 导出WeRicheditor组件的事件列表 */
const Event = WeRicheditor.Event;
/* 实例化WeRicheditor组件 */
var weRicheditor = new WeRicheditor();

/* 调用者监听组件触发的事件 */
 function richeditorIsReady (data) {
  console.log("richeditorIsReady context is : ", data);
}
 function richeditorOnBeforeTxtEdit(data)
 {
  console.log("richeditor BeforeTxtEdit context is : ", data);
 }

 function richeditorOnAfterTxtEdit(data)
 {
  console.log("richeditor afterTxtEdit context is : ", data);
 }

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   /*  初始化组件，必须在Page的生命周期中调用，因此， this 才能代表页面 */
    weRicheditor.Init(this);
    
    /* 各种事件监听 */
    weRicheditor.on(Event.Init, richeditorIsReady);
    weRicheditor.on(Event.beforeTxtEdit, richeditorOnBeforeTxtEdit);
    weRicheditor.on(Event.afterTxtEdit, (ctx) => {
      console.log("richeditor afterTxtEdit context is : ", ctx);
    });
    weRicheditor.on(Event.beforeImgEdit, (ctx) => {
      console.log("richeditor beforeImgEdit context is : ", ctx);
    });
    weRicheditor.on(Event.afterImgEdit, (ctx) => {
      console.log("richeditor afterImgEdit context is : ", ctx);
    });
    weRicheditor.on(Event.moveUp, (ctx) => {
      console.log("richeditor moveUp , dataIndex is : ", ctx);
    });
    weRicheditor.on(Event.moveDown, (ctx) => {
      console.log("richeditor moveDown , dataIndex is : ", ctx);
    });
    weRicheditor.on(Event.delete, (ctx) => {
      console.log("richeditor delete , dataIndex is : ", ctx);
    });
      
      

    //weRicheditor.DoSomeFuc(" DoSomeFuc ");
    //console.log("Get Data form class : ", weRicheditor.layout);
    //weRicheditor.SetData("prareData","123");
    //weRicheditor.SetData("layoutList",layout);
    //console.log("page load  prareData ",this.data.prareData);

    /* 用户登录，将用户信息保存在日志的meta中 */
    app.getUserInfo(info => {
      if(!info){
      this.setData({
        'diary.meta.avatar': info.avatarUrl,
        'diary.meta.nickName': info.nickName,
      })
    }else{
      this.setData({
        'diary.meta.avatar': "info.avatarUrl",
        'diary.meta.nickName': "info.nickName",
      }) 
    }


    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
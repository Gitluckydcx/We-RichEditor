// client/pages/new/coverEdit.js
import WeCropper from '../we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50


Page({

  /**
   * 页面的初始数据
   */
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    },
    diary: {
      meta: {
        title: "",
        create_time: "",
        cover: "",
        avatar: "",
        nickName: ""
      },
      diaryID: ""
    },
    height: 0,
    width: 0,
    olddistance: "",
    newdistance: "",
    diffdistance: '',
    Scale: 1,
    baseHeight: '',
    baseWidth: '',
    src: ""
  },
  // olddistance,//上一次两个手指的距离
  // newdistance:"",//本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）  
  // diffdistance:'', //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  
  // Scale: 1,//图片放大的比例，
  // baseHeight:'',       //原始高  
  // baseWidth:''        //原始宽  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad,options ", options);

    let jsonObj = options.jsonObj;
    if (jsonObj) {
      let diary = JSON.parse(jsonObj);
      this.setData({
        diary: diary
      });

    }
    console.log("onLoad,diary ", this.data.diary);
    const { cropperOpt } = this.data

    new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
        wx.hideToast()
      })
      .on('beforeDraw', (ctx, instance) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      })
      .updateCanvas()
  },
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage() {
    this.wecropper.getCropperImage((src) => {
      if (src) {
        // to do , 检查大小
      
        this.setData({
          "diary.meta.cover": src
        })
        console.log("this.data.diary.meta.cover", this.data.diary.meta.cover);
        var pages = getCurrentPages();
        if (pages.length > 1) {
          //上一个页面实例对象
          var prePage = pages[pages.length - 2];
          //关键在这里
          prePage.changeCoverData(src)

        }
        wx.navigateBack();

        // wx.previewImage({
        //   current: '', // 当前显示图片的http链接
        //   urls: [src] // 需要预览的图片http链接列表
        // })
      } else {
        console.log('获取图片地址失败，请稍后重试')
      }
    })
  },
  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  setCover(event) {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        //util.showBusy('正在上传')
        let tempFilePaths = res.tempFilePaths[0];
        that.setData({
          src: tempFilePaths
        })
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            console.log(res.width);
            console.log(res.height);
            var str = res.width / res.height;//图片的宽高比
            if (str > 1) {//横版图片
              let width = str * 400;
              that.setData({
                height: 400,
                width: width
              })
              //that.data.height = 400;//图片的显示高度为400
              //that.data.width = str  * that.data.height; //图片的宽度 = 宽高比 * 图片的显示高度
            } else {//竖版图片
              let height = 400 / str;
              that.setData({
                width: 400,
                height: height
              })
              //that.data.width = 400;//图片的显示宽度为400
              //that.data.height = str  * that.data.width; //图片的高度 = 宽高比 * 图片的显示宽度
            }

          }
        });
        // console.log("imageContent",that.data.imageContent);

      }
    })
  },
  //手指在屏幕上移动
  scroll: function (e) {
    var _this = this;
    //当e.touches.length等于1的时候，表示是单指触摸，我们要的是双指
    if (e.touches.length == 2) {//两个手指滑动的时候
      var xMove = e.touches[1].clientX - e.touches[0].clientX;//手指在x轴移动距离
      var yMove = e.touches[1].clientY - e.touches[0].clientY;//手指在y轴移动距离
      var distance = Math.sqrt(xMove * xMove + yMove * yMove);//根据勾股定理算出两手指之间的距离  
      if (_this.data.olddistance == 0) {
        _this.data.olddistance = distance; //要是第一次就给他弄上值，什么都不操作  
        // console.log("第一次");
      } else {
        _this.data.newdistance = distance; //第二次就可以计算它们的差值了  
        _this.data.diffdistance = _this.data.newdistance - _this.data.olddistance;//两次差值
        _this.data.olddistance = _this.data.newdistance; //计算之后更新比例  
        _this.data.Scale = _this.data.oldscaleA + 0.005 * _this.data.diffdistance;//这条公式是我查阅资料后找到的，按照这条公式计算出来的比例来处理图片，能给用户比较好的体验
        if (_this.data.Scale > 2.5) {//放大的最大倍数
          return;
        } else if (_this.data.Scale < 1) {//缩小不能小于当前
          return;
        }
        //刷新.wxml ，每次相乘，都是乘以图片的显示宽高
        _this.setData({
          height: _this.data.baseHeight * _this.data.Scale,
          width: _this.data.baseWidth * _this.data.Scale
        })
        _this.data.oldscaleA = _this.data.Scale;//更新比例 


      }
    }
  },
  //手指离开屏幕
  endTou: function (e) {
    this.data.olddistance = 0;//重置
    this.getRect();
  },
  getRect: function () {
    var _this = this;
    wx.createSelectorQuery().select('.FilePath').boundingClientRect(function (rect) {
      _this.data.x = Math.abs(rect.left);//x坐标
      _this.data.y = Math.abs(rect.top);//y坐标
    }).exec()
  },
  generate: function () {
    var _this = this;
    const ctx_A = wx.createCanvasContext('myCanvas_A');
    var baseWidth = _this.data.baseWidth * _this.data.Scale;//图片放大之后的宽
    var baseHeight = _this.data.baseHeight * _this.data.Scale;//图片放大之后的高
    ctx_A.drawImage(_this.data.src, 0, 0, baseWidth, baseHeight);//我们要在canvas中画一张和放大之后的图片宽高一样的图片
    ctx_A.draw();
    wx.showToast({
      title: '截取中...',
      icon: 'loading',
      duration: 10000
    });//
    setTimeout(function () {//给延时是因为canvas画图需要时间
      wx.canvasToTempFilePath({//调用方法，开始截取
        x: _this.data.x,
        y: _this.data.y,
        width: 400,
        height: 400,
        destWidth: 400,
        destHeight: 400,
        canvasId: 'myCanvas_A',
        success: function (res) {
          console.log(res.tempFilePath);
        }
      })
    }, 2000)

  },





  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //console.log("onReady");
    //this.setCover();

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
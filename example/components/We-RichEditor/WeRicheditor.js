/* 基础类，让继承的类又事件，基本的行为特性
 */
class eventObs {
  constructor() {
    this.handleFunc = {}
  }

  // Enum(a){
  //     let i = Object
  //       .keys(a)
  //       .reduce((o,k)=>(o[a[k]]=k,o),{});

  //     return Object.freeze(
  //       Object.keys(a).reduce(
  //         (o,k)=>(o[k]=a[k],o), v=>i[v]
  //       )
  //     );
  //   } // y u so terse?

/* 注册事件
type ： 事件名字
func ： 注册的Function
 */
  on(type, func) {
    // console.log("in add");
    if (this.handleFunc[type]) {
      //console.log("in handleFunc");

      if (this.handleFunc[type].indexOf(func) === -1) {
        this.handleFunc[type].push(func);
      }
    } else {
      // console.log("in handleFunc else");

      this.handleFunc[type] = [func];
      //console.log("in handleFunc end");

    }

  };
  /* 触发事件 */
  fire(type, func) {
    try {

      if (arguments.length === 1) {
        let target = this.handleFunc[type];
        let count = target.length;
        for (var i = 0; i < count; i++) {
          target[i]();
        }
      } else {
        let target = this.handleFunc[type];
        let index = target.indexOf(func);

        if (index === -1) throw error;
        func();
      }
      return true;
    } catch (e) {
      console.error('别老想搞什么飞机，触发我有的东西！');
      return false;
    }
  };

  /* 注销事件
type ： 事件名字
func ： 注销的Function
 */
  off(type, func) {
    try {
      let target = this.handleFunc[type];
      let index = target.indexOf(func);
      if (index === -1) throw error;
      target.splice(index, 1);
    } catch (e) {
      console.error('别老想搞什么飞机，删除我有的东西！');
    }

  };

  /* 只触发一次事件，并不注册事件 */
  once(type, func) {

    this.fire(type, func) ?
      this.off(type, func) : null;

  }
  /* 触发事件 */
  trigger(type, params) {
    try {
      if (params.length === 1) {
        let target = this.handleFunc[type];
        let count = target.length;
        for (var i = 0; i < count; i++) {
          target[i]();
        }
      } else {
        let target = this.handleFunc[type];
        if (!target) { return false; }
        let count = target.length;
        for (var i = 0; i < count; i++) {
          target[i](params);
          //console.log("in typeof target ", typeof target, params )

        }
      }
      return true;
    } catch (e) {
      console.error('别老想搞什么飞机，触发我有的东西！', e);
      return false;
    }

    // this.handleFunc[type].forEach(func => {
    // 　　　　func.call(this, params);
    // 　　})

  }

}
/*--------------- base class end--------------------------*/

var arrymove = require('../We-RichEditor/utils/arrymove')
var util = require('./utils/util')

/* 枚举基类 */
function Enum(a) {
  let i = Object
    .keys(a)
    .reduce((o, k) => (o[a[k]] = k, o), {});

  return Object.freeze(
    Object.keys(a).reduce(
      (o, k) => (o[k] = a[k], o), v => i[v]
    )
  );
} 

/* 基于 枚举基类 定义枚举值 事件名字 */
var Event = Enum({
  Init: "Init",
  beforeTxtEdit: "beforeTxtEdit",
  afterTxtEdit: "afterTxtEdit",
  beforeImgEdit: "beforeImgEdit",
  afterImgEdit: "afterImgEdit",
  moveUp: "moveUp",
  moveDown: "moveDown",
  delete: "delete",

});

/* 
组件类， 继承 事件 基类
 */
class WeRicheditor extends eventObs {
  constructor(...args) {
    super(...args);

    //this.layoutList = "config.appId";
    //this._that = "";
    //this.that = this;
    this.target = "";
  }

}

/* 
class fucntion , here is Enum event name list 
*/
WeRicheditor.Event = Event;

/* 
init function , it do some important things.
1. 定义暴露在页面的function （target.goEditPage = goEditPage etc.）
2. 设定页面显示模式 showMode = 'common';  common/textInput/imageInput/articlePreview
3. 定义初始的layoutList 数组
4. 定义初始的diary meta
*/
WeRicheditor.prototype.Init = function (target, options) {
  target.goEditPage = goEditPage;
  target.textareainput = textareainput;
  target.txtInputDone = txtInputDone;
  target.schooseNewEditType = schooseNewEditType;
  target.movehandle = movehandle;
  target.delarrayhandle = delarrayhandle;
  target.fontEvent = fontEvent;
  target.InputCancel = InputCancel;
  target.goArticlePrview = goArticlePrview;
  target.changeCoverData = changeCoverData;
  target.goCoverEditPage = goCoverEditPage;
  target.previewDone = previewDone;
  target.chooseImage = chooseImage;
  target.imageInputDone = imageInputDone;
  target.getImageRemark = getImageRemark;
  target.writeContent = writeContent;
  target.loadContent = loadContent;
  this.target = target;
  let that = this.target;

  var pages = getCurrentPages();
  //  获取到当前page上下文
  var pageContext = pages[pages.length - 1];
  //  把this依附在Page上下文的wecropper属性上，便于在page钩子函数中访问
  pageContext.weRicheditor = this;

  //console.log("in Init  target", this.target)


  //console.log("options", options);
  if (JSON.stringify(options) == '{}' || options == undefined) {
    //console.log("options is {}");
    let textExampleJson = JSON.parse('{"mytype": "1","content": "在这里开始记录吧","font":{"fontSetting": ""}}');
    let layoutList = [];
    // 拼接函数(索引位置, 要删除元素的数量, 元素)
    layoutList.splice(0, 0, textExampleJson);
    //that.setData({ layoutList: layoutList });
    // 页面所处模式
    let showMode = 'common';
    that.setData({
      'diary.meta.title': "",
      'diary.meta.create_time': new Date(),
      'diary.meta.cover': '',
      layoutList: layoutList,
      showMode: showMode,
      editContent: ""
    });
    // console.log("this.data.layoutList", that.data.layoutList);
  }



  this.trigger(Event.Init, "some things Inited");
}

// WeRicheditor.prototype.DoSomeFuc = function (data) {
//   console.log("DoSomeFuc call", data);
//   this.trigger("Ready", data + "some things");
// }

/* 
组件方法，获取layoutList数组
 */
WeRicheditor.prototype.GetlayoutList = function () {
  let that = this.target;
  return that.data.layoutList;
}

/* 
组件方法，获取 DiaryMeta
 */
WeRicheditor.prototype.GetDiaryMeta = function () {
  let that = this.target;
  return that.data.diary;
}


/* 
组件方法，日志保存在缓存里
 */
WeRicheditor.prototype.SaveToCache = function () {
  let that = this.target;
  let layoutList = that.data.layoutList;
  let diary = that.data.diary;

  wx.setStorageSync('layoutList', layoutList);
  wx.setStorageSync('diary', diary);
  wx.setStorageSync('saveTime',  util.formatTime(new Date()));
  //util.showModel("日志已保存在缓存里！")
}


/* 
组件方法，在缓存里读取日志
 */
WeRicheditor.prototype.loadCache = function () {
  console.log("save time begin");

  let that = this.target;
  let saveTime = wx.getStorageSync('saveTime');
  console.log("save time ",saveTime);
  if(saveTime == "")
  return;
  let layoutList = wx.getStorageSync('layoutList');
  let diary = wx.getStorageSync('diary');
  that.setData({
    layoutList : layoutList,
    diary : diary
  })
  //util.showModel("已从缓存里调出日志！")
}

/* 
组件方法， 设定组件的内部数据、
bindName ： setData 的Key 如："layoutList[0].content" 
transData ： setData 的value 如："layoutList[]" 
 */
WeRicheditor.prototype.SetData = function (bindName, transData) {
  let that = this.target;
  var bindData = {};
  bindData[bindName] = transData;
  console.log("in class target", this.target)
  that.setData(bindData)
}

/* 跳转到文字、图片的编辑画面
event : 点击的组件，可以导入 dataIndex ，TXT or IMG 等信息
 */
function goEditPage(event) {

  let that = this

  let eventString = event.currentTarget.dataset.eventid;
  let selectype = event.currentTarget.dataset.selectype;
  //console.log("点击了" + event.currentTarget.dataset.eventid)
  let eventid = eventString.split("-");
  let dataIndex = parseInt(eventid[1]);
  let editContent1 = that.data.layoutList[dataIndex];
  // clone , so change editContent1 should not impact layoutList
  let editContent = JSON.parse(JSON.stringify(editContent1));
  editContent.act = "edit";
  editContent.dataIndex = dataIndex;
  //console.log("goEditPage layoutList[dataIndex] ", editContent);


  if (selectype == "TXT") {
    that.setData({
      showMode: "textInput",
      editContent: editContent,
      editindex: dataIndex,
      fontSetting: ""
    })
  }
  if (selectype == "IMG") {
    that.setData({
      showMode: "imageInput",
      editContent: editContent,
      editindex: dataIndex,
    })
  }


  //console.log("goEditPage end ");



}

/* textarea 每个输入值都保存起来
后续就知道用户最终在文本框都输入的什么
e :  textarea 组件
*/
function textareainput(e) {
  let inputValue = e.detail.value;
  //console.log("textareainput", e.detail.value);
  this.setData({
    ["editContent.content"]: inputValue,
  });
}

/*
 文本编辑完毕
 讲编辑的文本会写到layoutList数组对应索引位置
 处理新增和修改2个逻辑
*/
function txtInputDone() {

  let fontContent = this.data.editContent;
  let dataIndex = fontContent.dataIndex;
  //console.log("come back changeTxtData", JSON.stringify(fontContent));
  let beforeContent = this.data.layoutList[dataIndex];
  beforeContent.act = fontContent.act;
  beforeContent.dataIndex = fontContent.dataIndex;
  // this = page.  因为钩子函数已经注册了组件实例
  this.weRicheditor.trigger(Event.beforeTxtEdit, beforeContent)


  //let dataIndex = fontContent.dataIndex;
  let rcvContent = fontContent.content;
  let rcvFont = fontContent.font;
  //console.log("come back fontContent.act ", fontContent.act);
  let newContent = JSON.parse('{"mytype":"1","content":"","font":"{}"}');
  if (fontContent.act == "new") {
    //console.log("new new new ");
    newContent.content = rcvContent;
    newContent.font = rcvFont;
    let layoutList = this.data.layoutList;
    // 拼接函数(索引位置, 要删除元素的数量, 元素)
    layoutList.splice(dataIndex, 0, newContent); // 
    //console.log("new input layoutList", layoutList);
    this.setData({
      layoutList: layoutList,
      showMode: "common",

    });
  }
  else {
    //console.log("edit edit edit ");
    let content = 'layoutList[' + dataIndex + ']';
    let newContent = JSON.parse('{"mytype":"1","content":"","font":"{}","remark":""}');
    newContent.content = fontContent.content;
    newContent.font = fontContent.font;
    newContent.remark = fontContent.remark;
    
    this.setData({
      [content]: newContent,
      showMode: "common",

    });

  }
  // this = page.  因为钩子函数已经注册了组件实例
  this.weRicheditor.trigger(Event.afterTxtEdit, fontContent)

}

/* 图片编辑画面完成事件
将图片的临时地址替换回layoutList数组对应的位置
 */
function imageInputDone() {
  let imageContent = this.data.editContent;
  let dataIndex = imageContent.dataIndex;
  //console.log("come back changeTxtData", JSON.stringify(imageContent));
  let beforeContent = this.data.layoutList[dataIndex];
  beforeContent.act = imageContent.act;
  beforeContent.dataIndex = imageContent.dataIndex;
  // this = page.  因为钩子函数已经注册了组件实例
  this.weRicheditor.trigger(Event.beforeImgEdit, beforeContent)


  //let dataIndex = fontContent.dataIndex;
  let rcvContent = imageContent.content;
  let remark = imageContent.remark;
  //console.log("come back fontContent.act ", imageContent.act);
  let newContent = JSON.parse('{"mytype":"2","content":"","remark":""}');
  if (imageContent.act == "new") {
    //console.log("new new new ");
    newContent.content = rcvContent;
    newContent.remark = remark;
    let layoutList = this.data.layoutList;
    // 拼接函数(索引位置, 要删除元素的数量, 元素)
    layoutList.splice(dataIndex, 0, newContent); // 
    //console.log("new input layoutList", layoutList);
    this.setData({
      layoutList: layoutList,
      showMode: "common",

    });
  }
  else {
    //console.log("edit edit edit ");
    let content = 'layoutList[' + dataIndex + ']';
    let newContent = JSON.parse('{"mytype":"2","content":"","remark":""}');
    newContent.content = imageContent.content;
    newContent.remark = imageContent.remark;

  
    this.setData({
      [content]: newContent,
      showMode: "common",

    });

  }
  // this = page.  因为钩子函数已经注册了组件实例
  this.weRicheditor.trigger(Event.afterImgEdit, imageContent)
}
// 取消文本编辑
function InputCancel() {
  this.setData({ showMode: 'common' });
}



/* 选择不同的类型，跳转到对应的新增画面
event ： 导入 TXT 、 IMG 等信息
 */
function schooseNewEditType(event) {

  let eventString = event.currentTarget.dataset.eventid;
  //console.log("点击了(New))" + event.currentTarget.dataset.eventid)
  let eventid = eventString.split("-");
  let dataIndex = parseInt(eventid[1]);

  let layoutList = this.data.layoutList
  //console.log("dataIndex down", dataIndex, "  layoutList.length", layoutList.length, "eventid[1]", eventid[1]);
  var that = this;
  //console.log("newEditType befor", that.data.newEditType);

  wx.showActionSheet({
    //itemList: ['文字', '图片', '视频', '分隔线'],
    itemList: ['文字', '图片'],
    success: function (res) {
      //console.log("showActionSheet : ", res.tapIndex);
      let tapIndex = res.tapIndex;
      let newEditType = "";
      if (!res.cancel) {
        if (tapIndex == 0) {
          newEditType = "TXT";
        }
        if (tapIndex == 1) {
          newEditType = "IMG";
        }
        if (tapIndex == 2) {
          newEditType = "VIDEO";
        }
        if (tapIndex == 3) {
          newEditType = "SPLIT";
        }


        //   let newEditPage = {
        //     newEditType: newEditType,
        //     dataIndex: dataIndex
        //   }

        if (newEditType == "TXT") {
          let editContent = JSON.parse('{\"mytype\":\"1\",\"content\":\"\",\"font\":{\"size\":0,\"weight\":0,\"del\":0,\"line\":0,\"center\":1,\"color\":\"#ED1C24\",\"bgcolor\":\"#fff \",\"showcolor\":0,\"fontSetting\":\"\"},\"remark\":\"\"}');
          editContent.act = "new";
          editContent.dataIndex = dataIndex;

          that.setData({
            showMode: "textInput",
            editContent: editContent

          })

        }

        if (newEditType == "IMG") {
          let editContent = JSON.parse('{"mytype":"2","content":"","remark":""}');
          editContent.act = "new";
          editContent.dataIndex = dataIndex;

          that.setData({
            showMode: "imageInput",
            editContent: editContent

          })

        }

        //that.goNewEditPage(newEditPage)
      }
    }
  });

}

/* 上下移动事件处理
实质就是数组的移动，主要的影响因数是目前移动的是第几个（dataIndex，这个变量）
event ： 点击的view 组件， 导入 Up/down 和dataIndex 等变量
 */
function movehandle(event) {
  let eventString = event.currentTarget.dataset.eventid;
  //console.log("点击了" + event.currentTarget.dataset.eventid)
  let eventid = eventString.split("-");
  let dataIndex = parseInt(eventid[1]);

  let layoutList = this.data.layoutList
  console.log("defore ", JSON.stringify(layoutList))

  if (eventid[0] == 5) {
    console.log("dataIndex up ", dataIndex);
    //up
    let dataIndex = parseInt(eventid[1]) - 1;
    if (dataIndex < 0) {
      console.log("can not up  ", dataIndex);
      return;
    }
    console.log("dataIndex  ", dataIndex);

    arrymove.zIndexUp(layoutList, dataIndex, layoutList.length);
    //arrymove.zIndexDown(layoutList,dataIndex+1,layoutList.length);

    console.log("up", layoutList)
    this.weRicheditor.trigger(Event.moveUp, dataIndex + 1);

  }
  else if (eventid[0] == 6) {

    //console.log("dataIndex down", dataIndex, "  layoutList.length", layoutList.length, "eventid[1]", eventid[1]);
    if (parseInt(dataIndex + 1) >= layoutList.length) {
      console.log("can not down  ", dataIndex);
      return;
    }
    arrymove.zIndexDown(layoutList, dataIndex + 1, layoutList.length);
    console.log(layoutList)
    this.weRicheditor.trigger(Event.moveDown, dataIndex);

  }
  this.setData({
    layoutList: layoutList
  });
}

/* 删除某一个节点
event  ： 带入删除的节点  dataIndex
 */
function delarrayhandle(event) {

  let eventString = event.currentTarget.dataset.eventid;
  //console.log("点击了(删除))" + event.currentTarget.dataset.eventid)
  let eventid = eventString.split("-");
  let dataIndex = parseInt(eventid[1]);

  let layoutList = this.data.layoutList
  //console.log("dataIndex down", dataIndex, "  layoutList.length", layoutList.length, "eventid[1]", eventid[1]);
  if (layoutList.length == 1) {
    wx.showToast({
      title: '最后一个段落，不能删除了',
      icon: 'none',
      duration: 3000
    });
    return;
  }
  layoutList = arrymove.delArray(layoutList, dataIndex, layoutList.length);
    this.setData({
      layoutList: layoutList
    });
    this.weRicheditor.trigger(Event.delete, dataIndex);

}


/* 设置字体事件
font是一个字体的设定对象，包括size、weight等属性
font.fontSetting 是 font 转换成CSS的表达式
 */
function fontEvent(event) {
  let eventString = event.currentTarget.dataset.eventid;
 // console.log("点击了" + event.currentTarget.dataset.eventid)
  let eventid = eventString.split("-");
  if (eventid.length != 2) {
    console.error("there is less 2 data in eventid.length. the length is:" + eventid.length);
    return;
  }
  let editContent = this.data.editContent;

  if (eventid[0] == 8) {
    console.log("eventid 8 in hit" + eventid[0]);
    console.log("eventid 8 in editContent font", editContent.font);

    if (editContent.font.weight == undefined || editContent.font.weight == 0) {
      editContent.font.weight = 1;

    }
    else {
      editContent.font.weight = 0;
    }

  }
  else if (eventid[0] == 9) {
    console.log("eventid 9 in hit" + eventid[0]);

    if (editContent.font.size != undefined) {
      editContent.font.size = editContent.font.size + 2;

    }
    else {
      editContent.font.size = 16;
    }
  }
  else if (eventid[0] == 10) {
    console.log("eventid 10 in hit" + eventid[0]);

    if (editContent.font.size != undefined) {
      editContent.font.size = editContent.font.size - 2;
      if (editContent.font.size < 10) {
        editContent.font.size = 10
      }

    }
    else {
      editContent.font.size = 16;

    }
  }

  let fontSetting = initstyle(editContent.font);
  editContent.font.fontSetting = fontSetting
  console.log("fontSetting", fontSetting);

  this.setData({
    "editContent.font": editContent.font,
    fontSetting: fontSetting
  });

}


/* 将字体设定变成CSS表达式
font ：  字体 设定
 */
function initstyle(font) {
  console.log("initstyle called.1", font);
  var stylestr = "";
  //var fontsize = 18;
  //fontsize += font.size * 3;
  if (font.size != undefined) {
    stylestr += "font-size: " + font.size + "px;"
  }
  if (font.weight != undefined && font.weight == 1) { stylestr += "font-weight: bold;" }
  else if (stylestr.indexOf("font-weight: bold;")) {
    stylestr.replace("font-weight: bold;", "");
  }

  //if (font.del == 1) stylestr += "text-decoration:line-through;"
  //if (font.line == 1) stylestr += "text-decoration:underline;"
  //if (font.center == 1) stylestr += "text-align: center;"
  //if (font.color) stylestr += ("color:" + font.color + ";");
  //if (font.bgcolor) stylestr += ("display: inline;background-color:" + font.bgcolor + ";");
  return stylestr;
}

/* 预览画面
 */
function goArticlePrview() {
  //let diary = this.data.diary;
  //console.log("goArticlePrview check", diary);

  // if(!diary || !diary.meta || !diary.meta.cover )
  // {
  //   util.showModel("信息","文章封面没有上传！");
  //   console.log("empty empty");
  //   return;
  // }
  this.setData({
    showMode: "articlePreview"
  })
  // console.log("goArticlePrview ",this.data.diary);
  // console.log("goArticlePrview layoutList ",this.data.layoutList);
  // let url = "./components/We-RichEditor/articlePreview?diaryObj=" + JSON.stringify(this.data.diary) + "&layoutObj=" + JSON.stringify(this.data.layoutList);
  // //let  url= "../new/articlePreview?jsonObj="+JSON.stringify(this.data.diary);
  // console.log("go articlePreview", url);
  // wx.navigateTo({
  //   url: url
  // });

}

/* 将数据写入到本地缓存中
 */
function writeContent()
{
  this.weRicheditor.SaveToCache();
}

/* 在本地缓存中取回数据
 */
function loadContent()
{
  this.weRicheditor.loadCache();
}


/* 跳转到封面编辑画面
由于此页面与截图组件整合，需要变成template 的工作比较乱，暂时不整合
 */
function goCoverEditPage(event) {
  let url = "./components/We-RichEditor/coverEdit?jsonObj=" + JSON.stringify(this.data.diary);
  console.log("goCoverEditPage", url);
  wx.navigateTo({
    url: url
  });
}

/* 
预览完毕
 */
function previewDone() {
  this.setData({
    showMode: "common"
  })
}
/* 
在编辑图片画面调用的选择图片方法
上传图片不能大于2M!
 */
function chooseImage(event) {
  var that = this;

  //console.log(config.config.service.uploadUrl );
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      //util.showBusy('正在上传')
      var tempFilePaths = res.tempFilePaths[0];
      var fileSize = res.tempFiles[0].size;
      //console.log("res", res);
      //console.log("tempFilePaths", tempFilePaths, "fileSize", fileSize);
      if(fileSize > 2000000)
      {
        wx.showToast({
          title:'上传图片不能大于2M!',  //标题
          icon:'none'       //图标 none不使用图标
      })
      return
      }
      that.setData({
        "editContent.content": tempFilePaths,
        "editContent.filesize": fileSize
      });

    }
  })
}
/* 
记录用户在图片的描述的输入值
 e: input 组件
 */
function getImageRemark(e)
{
  let inputValue = e.detail.value;
  //console.log("textareainput", e.detail.value);
  this.setData({
    ["editContent.remark"]: inputValue,
  });
}



/* 
call back ,接收数据，更新到本封面画面
封面编辑的换面通过prePage.changeCoverData(src)调用此function
cover ： 图片本地地址
 */
function changeCoverData(cover) {
  this.setData({
    "diary.meta.cover": cover
  })
  console.log("this.data.diary.meta.cover", this.data.diary.meta.cover);

}


module.exports = {
  WeRicheditor: WeRicheditor,
  Event: Event
}




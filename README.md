#　diaryPublish

####　项目介绍
用于微信小程序的图文编辑器
https://www.cnblogs.com/shitian-net/p/9366896.html
在　IT副工-小布　大神的启发下，参考vue编译出来的小程序代码，本人使用小程序原生语言开发的　图文编辑器，　命名为　We-RichEditor。

目前在"Hollow"、"Ho，我的小蠢货"　2位的帮助下，完成了　图文编辑器　的封装。调用者下载此控件，按照example展示例子，迁移到自己的项目中。实现小程序富文本编辑。

![Image text](https://github.com/Gitluckydcx/We-RichEditor/blob/master/Preview-Image/rich1.jpg)

![Image text](https://github.com/Gitluckydcx/We-RichEditor/blob/master/Preview-Image/rich2.jpg)
####　软件架构
本项目在文本编辑的封面图片功能使用的we-cropper进行图片剪切。


D:\workSpace\diaryPublishGitee\example　的目录

2019/01/09　　18:08　　“DIR”　　　　　　　　　　.

2019/01/09　　18:08　　“DIR”　　　　　　　　　　..

2019/01/09　　18:08　　　　“DIR”　　　　　　　　　　components

2019/01/09　　18:08　　　　“DIR”　　　　　　　　　　	we-cropper

2019/01/09　　18:08　　　　“DIR”　　　　　　　　　　	We-RichEditor

2019/01/09　　18:08　　　　“DIR”　　　　　　　　　　		images

2019/01/09　　18:08　　　　“DIR”　　　　　　　　　　		style

2019/01/09　　18:08　　　　“DIR”　　　　　　　　　　		utils

2019/01/09　　18:08　　　　　　　　　　　　　2,376　			arrymove.js

2019/01/09　　18:08　　　　　　　　　　　　　4,368　			util.js

2019/01/09　　18:08　　　　　　　　　　　　　2,278　		articlePreview.wxml

2019/01/09　　18:08　　　　　　　　　　　　　　470　		articlePreview.wxss

2019/01/09　　18:08　　　　　　　　　　　　　9,323　		coverEdit.js

2019/01/09　　18:08　　　　　　　　　　　　　　　2　		coverEdit.json

2019/01/09　　18:08　　　　　　　　　　　　　　491　		coverEdit.wxml

2019/01/09　　18:08　　　　　　　　　　　　　　266　		coverEdit.wxss

2019/01/09　　18:08　　　　　　　　　　　　　1,831　		imageInput.wxml

2019/01/09　　18:08　　　　　　　　　　　　　　931　		imageInput.wxss

2019/01/09　　18:08　　　　　　　　　　　　　3,889　		textInput.wxml

2019/01/09　　18:08　　　　　　　　　　　　　　511　		textInput.wxss

2019/01/09　　18:08　　　　　　　　　　　　　23,600　		WeRicheditor.js

2019/01/09　　18:08　　　　　　　　　　　　　8,990　		WeRicheditor.wxml

2019/01/09　　18:08　　　　　　　　　　　　　3,423　		WeRicheditor.wxss

2019/01/09　　18:08　　　　　　　　　　　　　1,184　config.js

2019/01/09　　18:08　　　　　　　　　　　　　3,313　example.js

2019/01/09　　18:08　　　　　　　　　　　　　　　2　example.json

2019/01/09　　18:08　　　　　　　　　　　　　　316　example.wxml

2019/01/09　　18:08　　　　　　　　　　　　　　85　example.wxss



####　安装教程　
本插件不支持npm，需要下载后Copy文件夹到自己的项目中



####　使用说明

1.　下载最新代码

2.　Copy　we-cropper　、　We-RichEditor　到　components　下　

3.　app.json　加入　"example/components/We-RichEditor/coverEdit"

4.　按照example使用案例嵌入你的项目中


####　参与贡献

1.　Ho，我的小蠢货　初始化西安古墓
2.　Hollow，　富文本2.0　设计



####　码云特技

1.　有问题可以加微信咨询，微信：luckydcx
![Image text](https://github.com/Gitluckydcx/We-RichEditor/blob/master/Preview-Image/luckydcx_wx.jpg)
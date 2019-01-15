function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 
function listToMatrix(list, elementPerSubArray) {
  let matrix = [], i, k;

  for (i = 0, k = -1; i < list.length; i += 1) {
    if (i % elementPerSubArray === 0) {
      k += 1;
      matrix[k] = [];
    }

    matrix[k].push(list[i]);
  }

  return matrix;
}

function lengthStr(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

var mergeObjs = (def, obj) => {
  if (!obj) {
    return def;
  } else if (!def) {
    return obj;
  }

  for (var i in obj) {
    // if its an object
    if (obj[i] != null && obj[i].constructor == Object) {
      def[i] = mergeObjs(def[i], obj[i]);
    }
    // if its an array, simple values need to be joined. Object values need to be remerged.
    else if (obj[i] != null && (obj[i] instanceof Array) && obj[i].length > 0) {
      // test to see if the first element is an object or not so we know the type of array we're dealing with.
      if (obj[i][0].constructor == Object) {
        var newobjs = [];
        // create an index of all the existing object IDs for quick access. There is no way to know how many items will be in the arrays.
        var objids = {}
        for (var x = 0, l = def[i].length; x < l; x++) {
          objids[def[i][x].id] = x;
        }

        // now walk through the objects in the new array
        // if the ID exists, then merge the objects.
        // if the ID does not exist, push to the end of the def array
        for (var x = 0, l = obj[i].length; x < l; x++) {
          var newobj = obj[i][x];
          if (objids[newobj.id] !== undefined) {
            def[i][x] = mergeObjs(def[i][x], newobj);
          }
          else {
            newobjs.push(newobj);
          }
        }

        for (var x = 0, l = newobjs.length; x < l; x++) {
          def[i].push(newobjs[x]);
        }
      }
      else {
        for (var x = 0; x < obj[i].length; x++) {
          var idxObj = obj[i][x];
          if (def[i].indexOf(idxObj) === -1) {
            def[i].push(idxObj);
          }
        }
      }
    }
    else {
      def[i] = obj[i];
    }
  }
  return def;
}

var guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}

// 这个可以指定长度和基数。比如
// uuid(8, 2)  //  "01001010"
// // 8 character ID (base=2)
var uuid = (len, radix) => {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random()*16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}

module.exports = {
  formatTime: formatTime,
  lengthStr: lengthStr,
  listToMatrix: listToMatrix,
  showBusy: showBusy,
  showSuccess: showSuccess,
  showModel: showModel,
  mergeObjs: mergeObjs,
  guid:guid,
  uuid:uuid
}
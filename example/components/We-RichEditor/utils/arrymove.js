/**
* 数组元素交换位置
* @param {array} arr 数组
* @param {number} index1 添加项目的位置
* @param {number} index2 删除项目的位置
* index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
*/
function swapArray(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}

//上移 将当前数组index索引与后面一个元素互换位置，向数组后面移动一位

function zIndexUp(arr, index, length) {
  if (index + 1 != length) {
    console.log("swapArray", index, index + 1)
    swapArray(arr, index, index + 1);
  } else {
    // alert('已经处于置顶，无法上移');
    console.log("can not up.已经处于置顶，无法上移")
  }
}

//下移 将当前数组index索引与前面一个元素互换位置，向数组前面移动一位

function zIndexDown(arr, index, length) {
  if (index != 0) {
    swapArray(arr, index, index - 1);
  } else {
    //alert('已经处于置底，无法下移');
    console.log("can not Down.已经处于置底，无法下移")

  }
}

//置顶，即将当前元素移到数组的最后一位

function zIndexTop(arr, index, length) {
  if (index + 1 != length) {

    //首先判断当前元素需要上移几个位置,置底移动到数组的第一位
    var moveNum = length - 1 - index;

    //循环出需要一个一个上移的次数
    for (var i = 0; i < moveNum; i++) {

      swapArray(arr, index, index + 1);

      index++;

    }
  } else {
    alert('已经处于置顶');
  }
}

//置底，即将当前元素移到数组的第一位

function zIndexBottom(arr, index, length) {
  if (index != 0) {

    //首先判断当前元素需要上移几个位置,置底移动到数组的第一位
    var moveNum = index - 0;

    //循环出需要一个一个上移的次数
    for (var i = 0; i < moveNum; i++) {

      swapArray(arr, index, index - 1);

      index--;

    }
  } else {
    alert('已经处于置底');
  }
}
function delArray(arr, index, length) {

  if (index > -1) {
     arr.splice(index, 1);
     return arr;
  }
  
}
module.exports = {
  zIndexUp: zIndexUp,
  zIndexDown: zIndexDown,
  delArray:delArray,
  swapArray:swapArray
}
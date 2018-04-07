const fs = require("fs");

/**
 * 食谱风格
 */

let data = '';
let words = [];
let word_freqs = [];

// 取文件路径，将文件内容赋值给全局变量
function read_file(path_to_file) {
  data = fs.readFileSync(path_to_file).toString();
}

// 用空白替代所有的非字母数字字符
function filter_chars_and_normalize() {
  data = data.replace(/[\"\.\;\,\n]/g," ").toLowerCase().split(' ');
}

// 扫描单词，填补全局变量单词
function scan() {
  data.forEach((item) => {
    if (!item) {
      return;
    }
    words.push(item);
  })
}

function remove_stop_words() {
  const stop_words = fs.readFileSync('../public/stop_words.txt').toString().toLowerCase().replace(/[\n]/g,',').split(",");

  words.forEach((word,index) => {
    stop_words.forEach((stopWord)=> {
      if (word == stopWord || !word) {
        words[index] = '';
        return;
      }
    })
  });

  words = words.filter((item) => {
    return item;
  });
}

// 创建列表，存放单词及其词频
function frequencies() {
  // 数组去重复 (下标法去重数组)
  const array = [];
  words.forEach((item) => {
    if (array.indexOf(item) == -1) {
      array.push([item,1])
    }
  })
  word_freqs = array;

  words.forEach((word) => {
    word_freqs.forEach((item) => {
      if (word === item[0]) {
        item[1] += 1;
      }
    })
  })
}

// 按频数对 word_freqs 进行排序
function sort() {
  word_freqs.sort((value1,value2) => {
    if (value1[1] > value2[1]) {
      return -1;
    }
    if (value1[1] < value2[1]) {
      return 1;
    }
    return 0;
  })
}


read_file('../public/test.txt');
filter_chars_and_normalize();
scan();
remove_stop_words();
frequencies();
sort();

// console.log("word_freqs",word_freqs)
word_freqs.forEach((item) => {
  console.log(`${item[0]} --- ${item[1]}`)
})

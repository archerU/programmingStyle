const fs = require("fs");

/**
 * 流水线风格
 */

// 取文件路径，将文件内容赋值给全局变量
function read_file(path_to_file) {
  return fs.readFileSync(path_to_file).toString();
}

// 用空白替代所有的非字母数字字符
function filter_chars_and_normalize(str_data) {
 	return str_data.replace(/[^\w]/g," ").toLowerCase().split(" ");
}

// 扫描单词，填补全局变量单词
function scan(str_data) {
	const words = [];
  str_data.forEach((item) => {
    if (!item) {
      return;
    }
    words.push(item);
  })
  return words;
}

function remove_stop_words(word_list) {
  const stop_words = fs.readFileSync('../public/stop_words.txt').toString().toLowerCase().replace(/[^\w]/g,',').split(",");
  word_list.forEach((word,index) => {
    stop_words.forEach((stopWord)=> {
      if (word == stopWord || !word) {
        word_list[index] = '';
        return;
      }
    })
  });

  word_list = word_list.filter((item) => {
    return item;
  });
  return word_list;
}

// 创建列表，存放单词及其词频
function frequencies(word_list) {
  // 数组去重复 
  const array = [];
  word_list.forEach((items) => {
    let repeat = false;
    array.forEach((item) => {
      if (item[0] == items) {
        repeat = true;
      }
    })
    if (!repeat) {
      array.push([items,1])
    }
  })
  const word_freqs = array;
  word_list.forEach((word) => {
    word_freqs.forEach((item) => {
      if (word === item[0]) {
        item[1] += 1;
      }
    })
  })
  return word_freqs;
}

// 按频数对 word_freqs 进行排序
function sort(word_freqs) {
  word_freqs.sort((value1,value2) => {
    if (value1[1] > value2[1]) {
      return -1;
    }
    if (value1[1] < value2[1]) {
      return 1;
    }
    return 0;
  })
  return word_freqs;
}

function print_all(word_freqs) {
	word_freqs.forEach((item,index) => {
	  if (index > 10) {
	    return;
	  }
	  console.log(`${item[0]} --- ${item[1]}`)
	})
}


print_all(sort(frequencies(remove_stop_words(scan(filter_chars_and_normalize(read_file('../public/test.txt')))))))



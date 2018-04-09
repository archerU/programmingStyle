const fs = require("fs");

/**
 * 单片风格
 */

const word_freqs = [];

// const data = fs.readFileSync('../public/《傲慢与偏见》英文版.txt');
const data = fs.readFileSync('../public/test.txt').toString();
const articleArray = data.split("\n");
// 逐行迭代文件
articleArray.forEach((items) => {
  // 每行 去除 . , ; 的影响 并且全部转化为小写
  const array = items.replace(/[^\w]/g," ").toLowerCase().split(' ');

  // 迭代每个单词
  array.forEach((word) => {
    if (!word) {
      return;
    }

    // 忽略停止词
    const stop_words = fs.readFileSync('../public/stop_words.txt').toString();
    let stop_words_array = stop_words.replace(/[^\w]/g,' ').toLowerCase().split(' ');

    stop_words_array = stop_words_array.filter((item) => {
      return item;
    })

    stop_words_array.forEach((stopWord) => {
      if (word == stopWord || word.length < 4) {
        return;
      }
    })

    let repeat = false;

    word_freqs.forEach((wordFreqs) => {
      if (wordFreqs[0] != word) {       
        return;
      } 
      repeat = true;
      wordFreqs[1] += 1;
    })

    if (!repeat) {
      word_freqs.push([word, 1]);
      return;
    }
    
  })
})
console.log('word_freqs',word_freqs)

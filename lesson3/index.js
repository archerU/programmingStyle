const fs = require("fs");

const word_freqs = [];

// const data = fs.readFileSync('../public/《傲慢与偏见》英文版.txt');
const data = fs.readFileSync('../public/test.txt');
// console.log("文件打开成功！",data.toString().split('\r\n'));
const articleArray = data.toString().split('\r\n');

// 逐行迭代文件
articleArray.forEach((items) => {
  // 每行 去除 . , ; 的影响 并且全部转化为小写
  const array = items.replace(/[\"\.\,\;\!\?]/g," ").toLowerCase().split(' ');

  // 迭代每个单词
  array.forEach((word) => {

    // 忽略停止词
    const stop_words = fs.readFileSync('../public/stop_words.txt');
    const stop_words_array = stop_words.toString().replace(/[\n\,]/g,' ').toLowerCase().split(' ');

    stop_words_array.forEach((stopWord) => {
      // console.log('word',word)
      if (word == stopWord || word.length < 4) {
        return;
      }

      word_freqs.push([word,0]);

      // 检查是否已经存在
      // if (word_freqs.length === 0) {
      //   word_freqs.push([word, 1]);
      // } else {
      //   word_freqs.forEach((wordFreqs) => {
      //     if (word === wordFreqs[0]) {
      //       wordFreqs[1] += 1;
      //     } else {
      //       // console.log('wordsafs',word)
      //       // word_freqs.push([word, 1]);
      //     }
      //   })
      //   // console.log('word_freqs',word_freqs)
      // }
    })
  })
})
console.log('word_freqs',word_freqs)

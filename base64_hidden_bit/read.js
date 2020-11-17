const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream(__dirname + '/flag3.txt'),
  output: process.stdout,
  terminal: false,
});

let ans = '';
console.log(__dirname);
rl.on('line', function (line) {
  handleLine(line);
});
console.log('READ FILE ASYNC END');

rl.on('close', () => {
  // console.log(ans);
  let arr = ans.match(/.{1,8}/g);
  let flag = '';
  arr.forEach((item) => {
    // console.log(item);
    flag += String.fromCharCode(parseInt(item, 2));
  });
  console.log(flag);
});

function handleLine(str) {
  let base64chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let count = 0;
  let firstIndex = str.indexOf('=');
  if (firstIndex > -1) {
    if (firstIndex === str.lastIndexOf('=')) {
      count = 1;
    } else {
      count = 2;
    }
  } else {
    return;
  }
  //   console.log(count);

  str = str.replace(/=/g, '');
  //   console.log(str);
  let lastChar = str.charAt(str.length - 1);
  let binChar = base64chars.indexOf(lastChar).toString(2); // 最后一个字符在 base64 表中的编号对应的二进制
  let res = '';
  // if (binChar.length < count * 2) { //
  //   res = getSomeZero(count * 2 - binChar.length) + binChar;
  // } else {
  let tmp = ('00000' + binChar).slice(-6);
  res = tmp.substr(tmp.length - count * 2, count * 2);
  // }
  // console.log(
  //   tmp + '===' + lastChar + '===' + binChar + '===' + count + '===' + res
  // );
  ans += res;
}

function getSomeZero(count) {
  let res = '';
  while (count > 0) {
    res += '0';
    count--;
  }
  return res;
}

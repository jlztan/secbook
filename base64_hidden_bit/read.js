const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream(__dirname + '/flag3.txt'),
  output: process.stdout,
  terminal: false,
});

let ans = '';
rl.on('line', function (line) {
  handleLine(line);
});

rl.on('close', () => {
  let arr = ans.match(/.{1,8}/g);
  let flag = '';
  arr.forEach((item) => {
    flag += String.fromCharCode(parseInt(item, 2));
  });
  console.log(flag);
});

function handleLine(str) {
  let base64chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let count = 0;
  if (str.substring(str.length - 1) === '=') {
    count++;
    if (str.substring(str.length - 2) === '==') {
      count++;
    }
  }
  if (count === 0) {
    return;
  }

  str = str.replace(/=/g, '');
  let lastChar = str.charAt(str.length - 1);
  let binChar = base64chars.indexOf(lastChar).toString(2); // 最后一个字符在 base64 表中的编号对应的二进制
  let res = '';
  let tmp = ('00000' + binChar).slice(-6); // 二进制不足 6 位的补前导 0
  res = tmp.substr(tmp.length - count * 2, count * 2);
  ans += res;
}

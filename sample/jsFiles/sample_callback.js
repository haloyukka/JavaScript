// コールバック
// 関数を2回実行する関数！！
function doTwice(func) {
  func(); // 1回目！
  func(); // 2回目！
}

// あいさつするだけの関数
function hello() {
  console.log('Hello!');
}

// あいさつを2回実行する
doTwice(hello);
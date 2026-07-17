const { JSDOM } = require('jsdom');
const dom = new JSDOM();
console.log(dom.window.encodeURI("https://raw.githubusercontent.com/roog24/11/main/2030 - 좀비보다 사람이 더 무서워.mp3"));

// Here You can type your custom JavaScript...
const originalDebugger = window.debugger;
Object.defineProperty(window, "debugger", {
  configurable: true,
  get: function () {
    return function () {};
  },
  set: function () {
    return originalDebugger;
  },
});
(function () {
  const playbutton = document.querySelector("iframe#playerframe");
  if (playbutton) {
    console.log("hackvj - player frame found");
  } else {
    console.log("hackvj -player frame not found");
  }
  const url = "https://ww5.gogoanime2.org/playlist/";
  const hlsFilePathParts = playbutton.getAttribute("src").split("/");
  const hlsFileName = hlsFilePathParts[hlsFilePathParts.length - 1];
  console.log("hackvj -m3u8 file:", url + hlsFileName);
})();

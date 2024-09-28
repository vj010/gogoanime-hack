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
(async function () {
  const playbutton = document.querySelector("iframe#playerframe");
  if (playbutton) {
    console.log("hackvj - player frame found");
  } else {
    console.log("hackvj -player frame not found");
  }
  const url = "https://ww5.gogoanime2.org/playlist/";
  const animeInfo = getAnimeNameFromPageUrl(document.location.href);
  console.log("document location", document.location.href);
  const hlsFilePathParts = playbutton.getAttribute("src").split("/");
  // alert(JSON.stringify(animeInfo));
  const hlsFileName = hlsFilePathParts[hlsFilePathParts.length - 1];
  console.log("hackvj -animeINfo", JSON.stringify(animeInfo));
  console.log("hackvj -m3u8 file:", url + hlsFileName);

  await fetch(
    `http://localhost:${2323}/${animeInfo.name}/${
      animeInfo.episode
    }/${hlsFileName}`,
    {
      mode: "no-cors",
    }
  );
})();

function getAnimeNameFromPageUrl(pageUrl) {
  console.log("pageUrl:", pageUrl);
  const urlParts = pageUrl.split("/");
  return {
    name: urlParts[urlParts.length - 2],
    episode: urlParts[urlParts.length - 1],
  };
}

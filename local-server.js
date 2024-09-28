const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const path = req.url;
  const pathComponents = path.split("/");
  const hslFileName = pathComponents[pathComponents.length - 1];
  console.log("hslFileName", hslFileName);
  const episode = pathComponents[pathComponents.length - 2];
  const animeName = pathComponents[pathComponents.length - 3];
  const url = "https://ww5.gogoanime2.org/playlist/";
  const hslFileUrl = url + hslFileName + ".m3u8";
  writeToLinkFile(animeName, hslFileUrl, episode);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type"
  );

  res.end();
});

async function writeToLinkFile(animeName, hslFileUrl, episode) {
  console.log("data:", animeName, episode, hslFileUrl);
  createFolderIfNotExists(animeName);
  const linkAlreadyExits = checkIfLinkAlreadyExits(animeName, hslFileUrl);
  if (linkAlreadyExits) {
    return;
  }
  fs.appendFile(
    `anime-links/${animeName}/videolinks.txt`,
    `${episode} ${hslFileUrl}\n`,
    () => {
      console.log("written", hslFileUrl);
    }
  );
}

function createFolderIfNotExists(animeName) {
  const folderName = `anime-links/${animeName}`;
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function checkIfLinkAlreadyExits(animeName, hslFileUrl) {
  const fileLocation = `anime-links/${animeName}/videolinks.txt`;
  if (!fs.existsSync(fileLocation)) {
    return false;
  }
  const data = fs.readFileSync(fileLocation, "utf-8");
  if (!data) {
    return false;
  }
  const lines = data.split("\n");
  if (lines.includes(hslFileUrl)) {
    return true;
  }
  return false;
}

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Optionally, log the error or perform cleanup
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  // Optionally, log the error or perform cleanup
});

server.listen(2323, () => console.log("ready to download anime video files"));

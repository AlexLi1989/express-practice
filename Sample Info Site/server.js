// const fs = require("node:fs");
// const http = require("node:http");
// const path = require("node:path");
// const url = require("node:url");
// const PORT = process.env.PORT || 8080;

// use readfilesync to load the html files from the filesystem, as we are doing a static site
// const head = fs.readFileSync(
//   path.join(__dirname, "partials", "head.html"),
//   "utf8",
// );
// const indexBody = fs.readFileSync(
//   path.join(__dirname, "pages", "index.html"),
//   "utf8",
// );
// const aboutBody = fs.readFileSync(
//   path.join(__dirname, "pages", "about.html"),
//   "utf8",
// );
// const contactBody = fs.readFileSync(
//   path.join(__dirname, "pages", "contact-me.html"),
//   "utf8",
// );
// const notFoundBody = fs.readFileSync(
//   path.join(__dirname, "pages", "404.html"),
//   "utf8",
// );
// const nav = fs.readFileSync(
//   path.join(__dirname, "partials", "nav.html"),
//   "utf8",
// );
// const css = fs.readFileSync(
//   path.join(__dirname, "assets", "style.css"),
//   "utf8",
// );

// Create a local server to receive data from
// const server = http.createServer((req, res) => {
//   if (req.url === "/" || req.url === "/index") {
//     res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//     const customHead = head.replace("{{TITLE}}", "Node Practice - Index");
//     res.end(`
//       <!doctype html>
//       <html lang="en">
//       ${customHead}
//       ${nav}
//       ${indexBody}
//       </html>
//       `);
//   } else if (req.url === "/about") {
//     res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//     const customHead = head.replace("{{TITLE}}", "Node Practice - About");
//     res.end(`
//       <!doctype html>
//       <html lang="en">
//       ${customHead}
//       ${nav}
//       ${aboutBody}
//       </html>
//       `);
//   } else if (req.url === "/contact-me") {
//     res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//     const customHead = head.replace("{{TITLE}}", "Node Practice - Contact Me");
//     res.end(`
//       <!doctype html>
//       <html lang="en">
//       ${customHead}
//       ${nav}
//       ${contactBody}
//       </html>
//       `);
//   }
//   //handle request for css file
//   else if (req.url === "/style.css") {
//     res.writeHead(200, { "Content-Type": "text/css" });
//     res.end(css);
//   }
//   //handle error requesting pages not existed
//   else {
//     res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
//     const customHead = head.replace("{{TITLE}}", "Node Practice - 404");
//     res.end(`
//       <!doctype html>
//       <html lang="en">
//       ${customHead}
//       ${nav}
//       ${notFoundBody}
//       </html>
//       `);
//   }
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const app = express();
const path = require("node:path"); //this is still needed as it is a basic function of NodeJS
const PORT = process.env.PORT || 8080;

//use express.static middleware to handle file request
// 它是鎖定「資料夾」，而不是「單一檔案」
// 它不需要 utf8 參數
app.use(express.static(path.join(__dirname, "assets")));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "index.html")),
);
app.get("/about", (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "about.html")),
);
app.get("/contact", (req, res) =>
  res.sendFile(path.join(__dirname, "pages", "contact-me.html")),
);
app.get("*", (req, res) =>
  res
    .status(404) //預設為 200：Express 會自動假設這次的請求是成功的，因此會在底層自動幫你加上 200 OK 的狀態碼發送給瀏覽器。這就是為什麼你之前不用特別寫。404 需要手動指定：當你要回傳的不是成功的內容（例如找不到網頁的 404，或是伺服器出錯的 500），Express 無法預知你的意圖。如果你不寫 .status(404)，Express 依然會用預設值 200 把那張 404.html 檔案送出去。
    .sendFile(path.join(__dirname, "pages", "404.html")),
);

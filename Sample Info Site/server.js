const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const url = require("node:url");
const PORT = process.env.PORT || 8080;

// use readfilesync to load the html files from the filesystem, as we are doing a static site
const head = fs.readFileSync(
  path.join(__dirname, "partials", "head.html"),
  "utf8",
);
const indexBody = fs.readFileSync(
  path.join(__dirname, "pages", "index.html"),
  "utf8",
);
const aboutBody = fs.readFileSync(
  path.join(__dirname, "pages", "about.html"),
  "utf8",
);
const contactBody = fs.readFileSync(
  path.join(__dirname, "pages", "contact-me.html"),
  "utf8",
);
const notFoundBody = fs.readFileSync(
  path.join(__dirname, "pages", "404.html"),
  "utf8",
);
const nav = fs.readFileSync(
  path.join(__dirname, "partials", "nav.html"),
  "utf8",
);
const css = fs.readFileSync(
  path.join(__dirname, "assets", "style.css"),
  "utf8",
);

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  if (req.url === "/" || req.url === "/index") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    const customHead = head.replace("{{TITLE}}", "Node Practice - Index");
    res.end(`
      <!doctype html>
      <html lang="en">
      ${customHead}
      ${nav}
      ${indexBody}
      </html>
      `);
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    const customHead = head.replace("{{TITLE}}", "Node Practice - About");
    res.end(`
      <!doctype html>
      <html lang="en">
      ${customHead}
      ${nav}
      ${aboutBody}
      </html>
      `);
  } else if (req.url === "/contact-me") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    const customHead = head.replace("{{TITLE}}", "Node Practice - Contact Me");
    res.end(`
      <!doctype html>
      <html lang="en">
      ${customHead}
      ${nav}
      ${contactBody}
      </html>
      `);
  }
  //handle request for css file
  else if (req.url === "/style.css") {
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(css);
  }
  //handle error requesting pages not existed
  else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    const customHead = head.replace("{{TITLE}}", "Node Practice - 404");
    res.end(`
      <!doctype html>
      <html lang="en">
      ${customHead}
      ${nav}
      ${notFoundBody}
      </html>
      `);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import { readFile } from "fs/promises";
import { createServer } from "http";
import { URL } from "url";
import { join } from "path";

createServer(async (req, res) => {
  // Construct a URL object (provide the base URL)
  const baseURL = `http://${req.headers.host}`;
  const q = new URL(req.url, baseURL);
  const filename = q.pathname === "/" ? "index.html" : `${q.pathname}.html`;

  const filePath = join(process.cwd(), filename);

  res.writeHead(200, { "Content-Type": "text/html" });
  try {
    const data = await readFile(filePath, "utf8"); // Read file as UTF-8
    res.end(data);
  } catch (err) {
    const data = await readFile("404.html", "utf8"); // Read file as UTF-8
    res.end(data);
  }
}).listen(8080, () => {
  console.log("Server running at http://localhost:8080");
});

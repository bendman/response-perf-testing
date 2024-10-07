import NodeStream from "stream";
import nav from "./_template/nav.js";

const early = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <script defer src="https://slowfil.es/file?type=js&delay=3000&payload=dom"></script>
    <script defer src="/public/script.js"></script>
    <link rel="preload" href="/public/img.png" as="image" />
    <link rel="stylesheet" href="/public/style.css" />
`.trim();

const late = `
    <title>Page Loading Tests</title>
  </head>
  <body>
    <h1>Routes</h1>
    <p>Note: send a query parameter like <code>?error=true</code> to cause an error.</p>
    ${nav}
  </body>
</html>
`.trim();

/** @type {import("express").RequestHandler} **/
const streamRoute = (req, res) => {
  // Required for Firefox to start parsing head
  res.setHeader("Content-Type", "text/html");

  // Following headers are automatically set
  // res.status(200);
  // res.setHeader("Transfer-Encoding", "chunked");

  // Prepare response for streaming
  const resStream = new NodeStream.PassThrough();
  resStream.setEncoding("utf8");
  resStream.on("end", () => res.end(""));
  resStream.pipe(res, { end: false });

  // Send first head chunk with resource hint
  resStream.push(early);

  // Wait to send the last chunk
  setTimeout(() => {
    resStream.push(late);

    // end the stream
    resStream.push(null);
  }, 3000);
};

export default streamRoute;

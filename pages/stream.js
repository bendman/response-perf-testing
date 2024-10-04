import nav from "./_template/nav.js";

const early = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <script defer src="https://slowfil.es/file?type=js&delay=2500&payload=dom"></script>
    <link rel="preload" href="https://slowfil.es/file?type=png&delay=2500" as="image" />
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

/** @type {import("express").RequestHandler **/
const streamRoute = (req, res) => {
  res.status(200);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  res.write(early);

  setTimeout(() => {
    res.write(late);
    res.end();
  }, 3000);
};

export default streamRoute;

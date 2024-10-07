import nav from "./_template/nav.js";

const page = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Page Loading Tests</title>
    <script defer src="/public/script.js"></script>
    <link rel="stylesheet" href="/public/style.css" />
  </head>
  <body>
    <h1>Routes</h1>
    <p>Note: send a query parameter like <code>?error=true</code> to cause an error.</p>
    ${nav}
  </body>
</html>
`.trim();

/** @type {import("express").RequestHandler} **/
const homeRoute = (req, res) => {
  setTimeout(() => {
    res.status(200).send(page);
  }, 3000);
};

export default homeRoute;

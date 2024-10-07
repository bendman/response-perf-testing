const start = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Page Loading Tests</title>
  </head>
  <body>
    <h1>Routes</h1>
    <p>Note: send a query parameter like <code>?error=true</code> to cause an error.</p>
    <ul>
      <li><a href="/">/home</a></li>
      <li><a href="/normal">/normal</a></li>
      <li><a href="/raw-async-await">/raw-async-await</a></li>
      <li><a href="/wrapped-async-await">/wrapped-async-await</a></li>
    </ul>
  </body>
</html>
`.trim();
const end = ``.trim();

/** @type {import("express").RequestHandler} **/
const homeRoute = (req, res, next) => {
  res.status(200).send(page);
  next();
};

export default homeRoute;

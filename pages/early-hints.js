import nav from "./_template/nav.js";

const page = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Page Loading Tests</title>
    <script defer rel="preload" src="https://slowfil.es/file?type=js&delay=3000&payload=dom"></script>
    <script defer rel="preload" src="/public/script.js"></script>
    <link rel="stylesheet" rel="preload" href="/public/style.css" />
  </head>
  <body>
    <h1>Routes</h1>
    <p>Note: send a query parameter like <code>?error=true</code> to cause an error.</p>
    ${nav}
  </body>
</html>
`.trim();

/** @type {import("express").RequestHandler} **/
const earlyHintsRoute = (req, res) => {
  // Send early hints to the client
  const earlyHints = [
    //"<https://slowfil.es/file?type=js&delay=3000&payload=dom>;rel=preload;as=script",
    "</public/script.js>; rel=preload; as=script",
    //"</public/style.css>; rel=preload; as=styles",
    //"</public/img.png>;rel=preload;as=image",
  ];
  res.writeEarlyHints({ link: earlyHints });

  // Wait to send the rest of the page
  setTimeout(() => {
    res.send(page);
  }, 3000);
};

export default earlyHintsRoute;

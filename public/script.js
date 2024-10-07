{
  const addChild = () => {
    const child = document.createElement("p");
    child.innerHTML = "script.js wrote to DOM";
    document.body.appendChild(child);
  };

  if (document.readyState === "loading") {
    addChild();
  } else {
    document.addEventListener("DOMContentLoaded", addChild);
  }
}

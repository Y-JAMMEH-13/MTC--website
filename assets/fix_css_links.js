const fs = require("fs");

if (fs.existsSync("assets/css/main.css")) {
  fs.renameSync("assets/css/main.css", "assets/css/main.min.css");
}
if (fs.existsSync("assets/css/main.purged.css")) {
  fs.unlinkSync("assets/css/main.purged.css");
}

const files = [
  "index.html",
  "about.html",
  "contact.html",
  "events.html",
  "projects.html",
  "resources.html",
  "team.html",
  "404.html",
];
files.forEach((file) => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, "utf8");
    content = content.replace(
      /href="assets\/css\/main\.css"/g,
      'href="assets/css/main.min.css"',
    );
    fs.writeFileSync(file, content);
  }
});
console.log("Renamed CSS and updated HTML references.");

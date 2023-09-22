import Table from "./table.js";

const table = new Table({
  columns: ["Name", "Email"],
  data: [
    ["Syahrul", "sya@.com"],
    ["Syahrul", "sya@.com"],
  ],
});

const app = document.getElementById("app");
table.render(app);

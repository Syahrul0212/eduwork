import Table from "./table.js";

const table = new Table();
const app = document.getElementById("app");

table.fetchData(function () {
  table.render(app);
});
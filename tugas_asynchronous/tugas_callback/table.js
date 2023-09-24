class Table {
  constructor() {
    this.columns = ["ID", "Name", "Username", "Email", "Address", "Company"];
    this.data = [];
    this.isLoading = false;
  }

  fetchData(callback) {
    this.isLoading = true;

    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        this.data = data;
        this.isLoading = false;
        callback();
      })
      .catch((err) => {
        this.isLoading = false;
        console.log("Error fetching data:", err);
      });
  }

  createHeader() {
    let open = "<thead><tr>";
    let close = "</tr></thead>";
    this.columns.forEach((column) => {
      open += `<th>${column}</th>`;
    });

    return open + close;
  }

  createBody() {
    let open = "<tbody>";
    let close = "</tbody>";
    this.data.forEach((user) => {
      open += `
              <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.address.street}</td>
                <td>${user.company.name}</td>
              </tr>
              `;
    });

    return open + close;
  }

  render(element) {
    let table = "";
    if (this.isLoading) {
      table = "<p class='text-center'>Loading...</p>";
    } else {
      table =
        "<table class='table table-dark table-striped'>" +
        this.createHeader() +
        this.createBody() +
        "</table>";
    }

    element.innerHTML = table;
  }
}

export default Table;
